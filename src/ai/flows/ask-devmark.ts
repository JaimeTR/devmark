// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that can answer questions about DevMark.
 * Sistema de fallback: Gemini (gratis) -> OpenAI
 *
 * - askDevMark - A function that handles the chat interaction.
 * - Message - The type for a single message in the chat history.
 */

import { openai } from '@/ai/openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type Message = {
  role: 'user' | 'model';
  content: string;
};

const SYSTEM_PROMPT = `Eres un asistente virtual amigable y profesional para DevMark, una empresa global de desarrollo web y soluciones digitales. Responde preguntas sobre la empresa, sus servicios y precios de forma concisa y útil.

Usa SIEMPRE el contexto provisto (extraído de la base de conocimiento Supabase o del sitio). Si falta contexto, responde con la información base y aclara que es una estimación. No inventes precios ni features.

Información base (solo si no hay contexto):
- Servicios principales: Desarrollo Web a Medida (desde $499), CMS/E-commerce (desde $999), Software a Medida (precio a medida), Automatización (precio a medida), Chatbots con IA (precio a medida), SEO y Optimización (precio a medida).
- Servicios complementarios: Diseño UI/UX, Marketing Digital, Soporte y Mantenimiento, Consultoría Tecnológica.
- Planes: Básico $499, Profesional $999, Empresa a medida.
- Contacto: contacto@devmarkpe.com | +51 975 646 074 | Código de descuento "DEVMARK" en Hostinger.`;

function detectLang(message: string): 'es' | 'en' {
  const text = message.toLowerCase();
  const spanishHints = ['¿', '¡', 'precio', 'servicio', 'hola', 'ayuda', 'solución', 'cotización'];
  return spanishHints.some(h => text.includes(h)) ? 'es' : 'en';
}

async function fetchKnowledgeContext(question: string, lang: 'es' | 'en'): Promise<string> {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn('⚠️ Supabase no configurado: sin contexto dinámico');
    return '';
  }

  const keywords = Array.from(new Set(
    question
      .toLowerCase()
      .split(/[^a-záéíóúñü0-9]+/i)
      .filter(w => w.length >= 3)
  )).slice(0, 4);

  const term = keywords[0] ?? '';

  const query = supabase
    .from('knowledge_docs')
    .select('title, content, tags')
    .eq('lang', lang)
    .limit(5);

  if (term) {
    query.ilike('content', `%${term}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('❌ Error fetching knowledge from Supabase:', error.message);
    return '';
  }

  if (!data || data.length === 0) return '';

  return data
    .map(doc => `- ${doc.title}: ${doc.content}${doc.tags?.length ? ` (tags: ${doc.tags.join(', ')})` : ''}`)
    .join('\n');
}

/**
 * Fallback a OpenAI cuando Gemini falla
 */
async function askWithOpenAI(history: Message[]): Promise<Message> {
  try {
    console.log('🔄 Usando OpenAI GPT-3.5-turbo como fallback...');
    
    const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
    const lang = detectLang(lastUserMessage);
    const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);

    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      knowledge
        ? { role: 'system', content: `Contexto de conocimiento (lang=${lang}):\n${knowledge}` }
        : { role: 'system', content: 'Sin contexto dinámico, responde solo con la información base.' },
      ...history.map(m => {
        if (m.role === 'user') return { role: 'user' as const, content: m.content };
        return { role: 'assistant' as const, content: m.content };
      })
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });
    
    const content = completion.choices?.[0]?.message?.content?.trim();
    if (content && content.length > 0) {
      console.log('✅ Respuesta de OpenAI generada exitosamente');
      return {
        role: 'model',
        content,
      };
    }
    
    throw new Error('OpenAI no devolvió contenido');
  } catch (error: any) {
    console.error('❌ Error con OpenAI:', error.message);
    throw error;
  }
}

export async function askDevMark(history: Message[]): Promise<Message> {
  // Intento 1: Gemini (GRATIS - usando API directa)
  try {
    console.log('🔄 Intentando con Gemini 1.5 Flash (cuota gratuita)...');
    
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
      throw new Error('GOOGLE_GENAI_API_KEY no configurada');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Usar el endpoint vigente con sufijo -latest
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash-001'
    });

    const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
    const lang = detectLang(lastUserMessage);
    const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);
    
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    const enrichedPrompt = `${SYSTEM_PROMPT}\n\nContexto (lang=${lang}):\n${knowledge || 'Sin contexto dinámico, usa la información base.'}\n\nUsuario: ${lastUserMessage}`;

    const result = await chat.sendMessage(enrichedPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Respuesta de Gemini generada exitosamente');
    
    return {
      role: 'model',
      content: text || 'La IA no pudo generar una respuesta útil.',
    };
  } catch (geminiError: any) {
    console.error('❌ Error con Gemini:', geminiError.message || geminiError);
    
    // Intento 2: Fallback a OpenAI
    try {
      console.log('⚠️ Gemini falló, usando OpenAI como fallback...');
      return await askWithOpenAI(history);
    } catch (openaiError: any) {
      console.error('❌ Error con OpenAI también:', openaiError.message);
      
      // Si ambos fallan, dar mensaje amigable
      const isGeminiQuota = geminiError?.message?.includes('429') || geminiError?.status === 429;
      const isOpenAIQuota = openaiError?.message?.includes('429') || openaiError?.status === 429;
      
      if (isGeminiQuota && isOpenAIQuota) {
        return {
          role: 'model',
          content: 'Nuestro servicio de IA está experimentando alta demanda. Por favor, intenta nuevamente en unos minutos. Para consultas urgentes, contacta a contacto@devmarkpe.com o llama al +51 975 646 074.',
        };
      }
      
      return {
        role: 'model',
        content: 'Lo siento, el servicio de IA está temporalmente no disponible. Por favor, contacta directamente a contacto@devmarkpe.com o llama al +51 975 646 074.',
      };
    }
  }
}
