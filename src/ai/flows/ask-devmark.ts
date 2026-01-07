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

export type Message = {
  role: 'user' | 'model';
  content: string;
};

const SYSTEM_PROMPT = `Eres un asistente virtual amigable y profesional para DevMark, una empresa global de desarrollo web y soluciones digitales. Responde preguntas sobre la empresa, sus servicios y precios de forma concisa y útil. Información relevante:
Servicios Principales:
- Desarrollo Web a Medida: Desde $499. Sitios personalizados, corporativos, landing pages, PWAs.
- Desarrollo con CMS: Desde $999. WordPress, Shopify, E-commerce.
- Desarrollo de Software a Medida: Precio a medida. ERP, CRM, SaaS, APIs.
- Automatización de Procesos: Precio a medida. Zapier, Make, APIs.
- Chatbots con IA: Precio a medida. Para web, redes sociales, soporte 24/7.
- SEO y Optimización Web: Precio a medida. Estrategia, SEO técnico y de contenidos.
Servicios Complementarios:
- Diseño UI/UX
- Marketing Digital
- Soporte y Mantenimiento
- Consultoría Tecnológica
Precios:
- Plan Básico: $499 (Ideal para startups)
- Plan Profesional: $999 (Para empresas en crecimiento)
- Plan Empresa: A medida (Soluciones corporativas)
Contacto:
- Email: contacto@devmarkpe.com
- Teléfono: +51 975 646 074
- Código de descuento "DEVMARK" para Hostinger.`;

/**
 * Fallback a OpenAI cuando Gemini falla
 */
async function askWithOpenAI(history: Message[]): Promise<Message> {
  try {
    console.log('🔄 Usando OpenAI GPT-3.5-turbo como fallback...');
    
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT },
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
    // Usar gemini-1.5-flash que es el modelo actual gratuito de Google
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash'
    });

    const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
    
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });

    const result = await chat.sendMessage(SYSTEM_PROMPT + '\n\nUsuario: ' + lastUserMessage);
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
