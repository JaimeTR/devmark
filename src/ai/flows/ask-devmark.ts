// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that can answer questions about DevMark.
 *
 * - askDevMark - A function that handles the chat interaction.
 * - Message - The type for a single message in the chat history.
 */

import { openai } from '@/ai/openai';

export type Message = {
  role: 'user' | 'model';
  content: string;
};

type OpenAIMsg = {
  role: 'system' | 'user' | 'assistant';
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

export async function askDevMark(history: Message[]): Promise<Message> {
  // Convertir los mensajes al formato que espera OpenAI
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(m => {
      if (m.role === 'user') return { role: 'user' as const, content: m.content };
      // Para cualquier respuesta previa del bot, usar 'assistant'
      return { role: 'assistant' as const, content: m.content };
    })
  ];
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 512,
      temperature: 0.7,
    });
    const content = completion.choices?.[0]?.message?.content?.trim();
    if (content && content.length > 0) {
      return {
        role: 'model',
        content,
      };
    } else {
      return {
        role: 'model',
        content: 'La IA no pudo generar una respuesta útil. Intenta de nuevo o pregunta algo diferente.',
      };
    }
  } catch (error: any) {
    let errorMsg = 'Lo siento, no pude generar una respuesta.';
    if (error?.response?.data?.error?.message) {
      errorMsg += ` Detalle: ${error.response.data.error.message}`;
    } else if (error?.message) {
      errorMsg += ` Detalle: ${error.message}`;
    }
    return {
      role: 'model',
      content: errorMsg,
    };
  }
}
