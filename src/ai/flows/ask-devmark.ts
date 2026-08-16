// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview An AI agent that can answer questions about DevMark.
 * Sistema de fallback: Groq (llama-3.3-70b-versatile) -> OpenAI -> Respuestas predefinidas
 *
 * - askDevMark - A function that handles the chat interaction.
 * - Message - The type for a single message in the chat history.
 */

import { openai } from '@/ai/openai';
import { groq, GROQ_MODEL } from '@/ai/groq';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export type Message = {
  role: 'user' | 'model';
  content: string;
  metadata?: {
    source?: 'groq' | 'openai' | 'fallback';
    leadCapture?: boolean;
  };
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
  const spanishHints = ['¿', '¡', 'precio', 'servicio', 'hola', 'ayuda', 'solución', 'cotización', 'cuánto', 'qué', 'cómo'];
  return spanishHints.some(h => text.includes(h)) ? 'es' : 'en';
}

/**
 * Función simple de similitud para manejar errores tipográficos
 */
function similarWord(word: string, target: string): boolean {
  if (word.includes(target) || target.includes(word)) return true;
  
  // Si tienen al menos 3 caracteres en común y longitud similar
  if (word.length < 3 || target.length < 3) return false;
  
  const minLen = Math.min(word.length, target.length);
  const maxLen = Math.max(word.length, target.length);
  
  // Si la diferencia de longitud es más del 30%, probablemente no es similar
  if (maxLen > minLen * 1.3) return false;
  
  // Contar caracteres coincidentes
  let matches = 0;
  for (let i = 0; i < minLen; i++) {
    if (word[i] === target[i]) matches++;
  }
  
  // Si más del 70% de caracteres coinciden, considerarlo similar
  return matches >= minLen * 0.7;
}

/**
 * Verifica si alguna palabra de la pregunta es similar a las palabras clave
 */
function containsSimilar(q: string, keywords: string[]): boolean {
  const words = q.split(/\s+/);
  return keywords.some(keyword => 
    words.some(word => similarWord(word, keyword) || word.includes(keyword) || keyword.includes(word))
  );
}

/**
 * Sistema de respuestas predefinidas inteligentes
 * Último recurso cuando todas las APIs fallan
 * Mejorado para manejar errores tipográficos
 */
function getFallbackResponse(question: string, lang: 'es' | 'en'): string {
  const q = question.toLowerCase();
  
  const responses: Record<string, { es: string; en: string }> = {
    greeting: {
      es: '¡Hola! 👋 Soy el asistente virtual de DevMark. Puedo ayudarte con información sobre nuestros servicios, precios y soluciones digitales. ¿En qué puedo ayudarte?',
      en: 'Hello! 👋 I\'m DevMark\'s virtual assistant. I can help you with information about our services, prices, and digital solutions. How can I help you?',
    },
    price: {
      es: '💰 Nuestros precios varían según el proyecto:\n\n• Desarrollo Web: desde $499\n• CMS/E-commerce: desde $999\n• Software a medida: precio personalizado\n• Otros servicios: consultar\n\n¿Te gustaría una cotización personalizada? Contacta: 📧 contacto@devmarkpe.com o 📱 +51 975 646 074.',
      en: '💰 Our prices vary by project:\n\n• Web Development: from $499\n• CMS/E-commerce: from $999\n• Custom Software: personalized price\n• Other services: inquire\n\nWould you like a personalized quote? Contact: 📧 contacto@devmarkpe.com or 📱 +51 975 646 074.',
    },
    services: {
      es: '🛠️ Ofrecemos los siguientes servicios:\n\n• Desarrollo Web a Medida\n• CMS/E-commerce (WordPress, Shopify)\n• Software Personalizado\n• Automatización de Procesos\n• Chatbots con IA\n• SEO y Optimización\n• Diseño UI/UX\n• Marketing Digital\n• Consultoría Tecnológica\n• Soporte y Mantenimiento\n\n¿Qué servicio te interesa más?',
      en: '🛠️ We offer the following services:\n\n• Custom Web Development\n• CMS/E-commerce (WordPress, Shopify)\n• Custom Software\n• Process Automation\n• AI Chatbots\n• SEO and Optimization\n• UI/UX Design\n• Digital Marketing\n• Tech Consulting\n• Support and Maintenance\n\nWhich service interests you most?',
    },
    contact: {
      es: '📞 Puedes contactarnos en:\n\n• Email: contacto@devmarkpe.com\n• Teléfono: +51 975 646 074\n\nEstamos disponibles para resolver tus dudas y ayudarte con tu proyecto digital. ¡Escríbenos o llámanos!',
      en: '📞 You can reach us at:\n\n• Email: contacto@devmarkpe.com\n• Phone: +51 975 646 074\n\nWe\'re available to answer your questions and help with your digital project. Write us or call us!',
    },
    website: {
      es: '🌐 Desarrollamos sitios web modernos y optimizados:\n\n• Landing pages: desde $499\n• Sitios corporativos completos\n• Diseño responsive (móvil, tablet, desktop)\n• SEO básico incluido\n• Optimización de velocidad\n• Panel de administración\n\n¿Qué tipo de sitio necesitas?',
      en: '🌐 We develop modern and optimized websites:\n\n• Landing pages: from $499\n• Complete corporate sites\n• Responsive design (mobile, tablet, desktop)\n• Basic SEO included\n• Speed optimization\n• Admin panel\n\nWhat type of site do you need?',
    },
    ecommerce: {
      es: '🛒 Desarrollamos tiendas online profesionales:\n\n• Plataformas: WordPress/WooCommerce, Shopify\n• Integración de pagos seguros\n• Gestión de productos y catálogo\n• Carrito de compras\n• Panel de administración\n• Precio desde $999\n\n¿Necesitas más detalles?',
      en: '🛒 We develop professional online stores:\n\n• Platforms: WordPress/WooCommerce, Shopify\n• Secure payment integration\n• Product and catalog management\n• Shopping cart\n• Admin panel\n• Price from $999\n\nNeed more details?',
    },
    chatbot: {
      es: '🤖 Desarrollamos chatbots con Inteligencia Artificial:\n\n• Entrenamiento personalizado con tu base de conocimiento\n• Disponibles 24/7\n• Atención al cliente automatizada\n• Asistente de ventas\n• Soporte técnico\n\n¿Te interesa implementar uno?',
      en: '🤖 We develop AI chatbots:\n\n• Custom training with your knowledge base\n• Available 24/7\n• Automated customer service\n• Sales assistant\n• Technical support\n\nAre you interested in implementing one?',
    },
    seo: {
      es: '🔍 Ofrecemos servicios de SEO y optimización:\n\n• Análisis de keywords\n• Optimización on-page\n• Link building\n• Core Web Vitals\n• Estrategias de contenido\n• Mejora de posicionamiento en Google\n\n¿Quieres mejorar tu visibilidad online?',
      en: '🔍 We offer SEO and optimization services:\n\n• Keyword analysis\n• On-page optimization\n• Link building\n• Core Web Vitals\n• Content strategies\n• Google ranking improvement\n\nWant to improve your online visibility?',
    },
    default: {
      es: '💼 ¡Hola! Soy el asistente de DevMark. Puedo ayudarte con:\n\n• Información sobre nuestros servicios\n• Precios y cotizaciones\n• Desarrollo web, e-commerce, software\n• Chatbots con IA, SEO, marketing digital\n\nEscribe preguntas como: "precios", "servicios", "desarrollo web", "contacto", etc.\n\nPara consultas más específicas: 📧 contacto@devmarkpe.com | 📱 +51 975 646 074',
      en: '💼 Hello! I\'m DevMark\'s assistant. I can help you with:\n\n• Information about our services\n• Prices and quotes\n• Web development, e-commerce, software\n• AI chatbots, SEO, digital marketing\n\nWrite questions like: "prices", "services", "web development", "contact", etc.\n\nFor more specific inquiries: 📧 contacto@devmarkpe.com | 📱 +51 975 646 074',
    },
  };
  
  // Palabras clave con variaciones y errores comunes
  const greetingKeywords = ['hola', 'hi', 'hello', 'hey', 'buenos', 'buenas', 'dias', 'días', 'tardes', 'noches', 'saludos'];
  const priceKeywords = ['precio', 'precios', 'costo', 'costos', 'price', 'cost', 'cuanto', 'cuánto', 'paga', 'pagar', 'cuesta', 'cotizacion', 'cotización', 'presupuesto'];
  const servicesKeywords = ['servicio', 'servicios', 'service', 'services', 'que', 'qué', 'ofrecen', 'ofrec', 'hacen', 'hac', 'trabajos'];
  const contactKeywords = ['contacto', 'contact', 'contactar', 'teléfono', 'telefono', 'phone', 'email', 'correo', 'mail', 'llamar', 'llama', 'hablar'];
  const websiteKeywords = ['sitio', 'web', 'website', 'pagina', 'página', 'landing', 'desarrollo', 'desarroll', 'crear', 'hacer'];
  const ecommerceKeywords = ['tienda', 'store', 'ecommerce', 'comercio', 'shopify', 'woocommerce', 'venta', 'vender', 'productos'];
  const chatbotKeywords = ['chatbot', 'bot', 'chat', 'asistente', 'virtual', 'ia', 'inteligencia', 'artificial', 'autom', 'automat'];
  const seoKeywords = ['seo', 'posicionamiento', 'ranking', 'google', 'busqueda', 'búsqueda', 'optimizacion', 'optimización', 'visible'];
  
  // Detectar intención con mejor manejo de errores tipográficos
  if (containsSimilar(q, greetingKeywords) || q.length < 5) {
    return responses.greeting[lang];
  }
  
  if (containsSimilar(q, priceKeywords)) {
    return responses.price[lang];
  }
  
  if (containsSimilar(q, servicesKeywords) || containsSimilar(q, ['ofrecen', 'que hacen', 'que ofrec', 'what do you', 'what do'])) {
    return responses.services[lang];
  }
  
  if (containsSimilar(q, contactKeywords)) {
    return responses.contact[lang];
  }
  
  if (containsSimilar(q, websiteKeywords)) {
    return responses.website[lang];
  }
  
  if (containsSimilar(q, ecommerceKeywords)) {
    return responses.ecommerce[lang];
  }
  
  if (containsSimilar(q, chatbotKeywords)) {
    return responses.chatbot[lang];
  }
  
  if (containsSimilar(q, seoKeywords)) {
    return responses.seo[lang];
  }
  
  // Respuesta por defecto más útil
  return responses.default[lang];
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

function buildMessages(history: Message[], lang: 'es' | 'en', knowledge: string) {
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
  return messages;
}

/**
 * Intento 1: Groq (llama-3.3-70b-versatile) - principal
 */
async function askWithGroq(history: Message[]): Promise<Message> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('gsk_') === false || apiKey.includes('xxxxx')) {
    throw new Error('GROQ_API_KEY no configurada. Por favor configura tu API key de Groq en .env.local');
  }

  const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
  const lang = detectLang(lastUserMessage);
  const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);

  const completion = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: buildMessages(history, lang, knowledge),
    temperature: 0.7,
    max_tokens: 512,
  });

  const content = completion.choices?.[0]?.message?.content?.trim();
  if (!content || content.length === 0) {
    throw new Error('Groq devolvió una respuesta vacía');
  }

  return {
    role: 'model',
    content,
    metadata: { source: 'groq' },
  };
}

/**
 * Fallback a OpenAI cuando Groq falla
 */
async function askWithOpenAI(history: Message[]): Promise<Message> {
  try {
    console.log('🔄 [DEBUG] Usando OpenAI GPT-3.5-turbo como fallback...');
    
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxx') || !apiKey.startsWith('sk-')) {
      throw new Error('OPENAI_API_KEY no configurada o inválida');
    }
    
    console.log('✅ [DEBUG] API Key de OpenAI encontrada');
    
    const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
    const lang = detectLang(lastUserMessage);
    const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: buildMessages(history, lang, knowledge),
      max_tokens: 512,
      temperature: 0.7,
    });
    
    const content = completion.choices?.[0]?.message?.content?.trim();
    if (content && content.length > 0) {
      console.log('✅ [DEBUG] Respuesta de OpenAI generada exitosamente (longitud:', content.length, 'caracteres)');
      return {
        role: 'model',
        content,
        metadata: { source: 'openai' },
      };
    }
    
    throw new Error('OpenAI no devolvió contenido');
  } catch (error: any) {
    const errorDetails = {
      message: error?.message || 'Error desconocido',
      status: error?.status || error?.response?.status,
      code: error?.code,
    };
    console.error('❌ [DEBUG] Error detallado con OpenAI:', JSON.stringify(errorDetails, null, 2));
    throw error;
  }
}

export async function askDevMark(history: Message[]): Promise<Message> {
  // Intento 1: Groq (principal)
  try {
    console.log('🔄 [DEBUG] Intentando con Groq (llama-3.3-70b-versatile)...');
    return await askWithGroq(history);
  } catch (groqError: any) {
    const errorDetails = {
      message: groqError?.message || 'Error desconocido',
      status: groqError?.status || groqError?.response?.status,
      code: groqError?.code,
    };
    
    console.error('❌ [DEBUG] Error detallado con Groq:', JSON.stringify(errorDetails, null, 2));
    
    // Detectar tipos específicos de errores
    const isQuotaExceeded = errorDetails.status === 429 || 
                           errorDetails.message?.includes('429') ||
                           errorDetails.message?.toLowerCase().includes('quota') ||
                           errorDetails.message?.toLowerCase().includes('rate limit');
    
    const isInvalidApiKey = errorDetails.status === 401 || 
                           errorDetails.status === 403 ||
                           errorDetails.message?.toLowerCase().includes('api key') ||
                           errorDetails.message?.toLowerCase().includes('invalid') ||
                           errorDetails.message?.toLowerCase().includes('unauthorized');
    
    const isApiKeyMissing = errorDetails.message?.includes('GROQ_API_KEY no configurada');
    
    if (isApiKeyMissing || isInvalidApiKey) {
      console.error('⚠️ [DEBUG] Problema con la API key de Groq. Verificando OpenAI...');
    }
    
    // Intento 2: Fallback a OpenAI (si está configurado)
    const hasOpenAIKey = process.env.OPENAI_API_KEY && 
                         process.env.OPENAI_API_KEY.trim() !== '' && 
                         !process.env.OPENAI_API_KEY.includes('xxxxx') &&
                         process.env.OPENAI_API_KEY.startsWith('sk-');
    
    if (hasOpenAIKey) {
      try {
        console.log('⚠️ [DEBUG] Groq falló, intentando con OpenAI como fallback...');
        return await askWithOpenAI(history);
      } catch (openaiError: any) {
        const openaiErrorDetails = {
          message: openaiError?.message || 'Error desconocido',
          status: openaiError?.status || openaiError?.response?.status,
          code: openaiError?.code,
        };
        
        console.error('❌ [DEBUG] Error detallado con OpenAI:', JSON.stringify(openaiErrorDetails, null, 2));
        
        // Si ambos fallan, usar respuestas predefinidas inteligentes
        console.warn('⚠️ [DEBUG] Todas las APIs fallaron, usando respuestas predefinidas inteligentes...');
        const lastUserMessage2 = history.filter(m => m.role === 'user').pop()?.content || '';
        const lang2 = detectLang(lastUserMessage2);
        const fallbackResponse2 = getFallbackResponse(lastUserMessage2, lang2);
        
        return {
          role: 'model',
          content: fallbackResponse2,
          metadata: { source: 'fallback', leadCapture: true },
        };
      }
    } else {
      // Si OpenAI no está configurado, usar respuestas predefinidas
      console.warn('⚠️ [DEBUG] OpenAI no está configurado, solo se intentó Groq');
      
      const lastUserMessage3 = history.filter(m => m.role === 'user').pop()?.content || '';
      const lang3 = detectLang(lastUserMessage3);
      const fallbackResponse3 = getFallbackResponse(lastUserMessage3, lang3);
      
      if (isApiKeyMissing || isInvalidApiKey) {
        console.warn('⚠️ [ADMIN] Para activar IA real, configura GROQ_API_KEY en .env.local (gratis: https://console.groq.com/keys)');
      } else if (isQuotaExceeded) {
        console.warn('⚠️ [ADMIN] La cuota de IA se agotó temporalmente. Intenta más tarde o configura otra API key.');
      } else {
        console.warn('⚠️ [ADMIN] Para activar IA real, configura GROQ_API_KEY en .env.local (gratis: https://console.groq.com/keys)');
      }
      
      return {
        role: 'model',
        content: fallbackResponse3,
        metadata: { source: 'fallback', leadCapture: true },
      };
    }
  }
}