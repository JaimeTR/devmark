// Lógica compartida del chat de DEVMARK: prompt, contexto (servicios reales +
// portafolio + knowledge_docs) y respuestas de fallback. Sin 'use server' —
// los archivos 'use server' solo pueden exportar funciones async, y aquí hay
// constantes y funciones síncronas que necesita tanto el server action
// (src/ai/flows/ask-devmark.ts) como la API route de streaming (src/app/api/chat/route.ts).

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { supabaseProjects } from '@/lib/supabase-projects';
import { formatServicesForPrompt } from '@/data/services';

export type Message = {
  role: 'user' | 'model';
  content: string;
  metadata?: {
    source?: 'groq' | 'openai' | 'fallback';
    leadCapture?: boolean;
  };
};

// Marcador invisible: la IA lo agrega al final de su respuesta cuando detecta
// que el usuario necesita contacto humano (cotización a medida, pidió hablar
// con alguien, ya dejó sus datos, etc.). El cliente lo detecta, lo quita del
// texto mostrado y dispara el flujo de captura de lead automáticamente.
export const LEAD_CAPTURE_MARKER = '[[LEAD_CAPTURE]]';

export function stripLeadMarker(content: string): { text: string; leadCapture: boolean } {
  const leadCapture = content.includes(LEAD_CAPTURE_MARKER);
  const text = content.split(LEAD_CAPTURE_MARKER).join('').trim();
  return { text, leadCapture };
}

const SYSTEM_PROMPT = `Eres un asistente virtual amigable y profesional para DEVMARK, una empresa de desarrollo web y soluciones digitales en Lima, Perú. Responde preguntas sobre la empresa, sus servicios y precios de forma concisa y útil.

Usa SIEMPRE el contexto provisto (servicios reales, portafolio y base de conocimiento). No inventes precios ni features que no estén en el contexto.

Contacto: contacto@devmarkpe.com | +51 975 646 074 | Código de descuento "DEVMARK" en Hostinger.

Cuándo agregar el marcador ${LEAD_CAPTURE_MARKER} al FINAL de tu respuesta (en su propia línea, nunca lo menciones ni lo expliques al usuario):
- El usuario pide explícitamente hablar con una persona, un asesor o soporte humano.
- El usuario pide una cotización personalizada o a medida que no puedes resolver solo con los planes listados.
- El usuario ya dejó su nombre, email o teléfono en la conversación.
- El usuario muestra intención clara de contratar o avanzar con un proyecto.
No agregues el marcador para preguntas generales de información (precios base, qué servicios existen, dudas técnicas simples).`;

export function detectLang(message: string): 'es' | 'en' {
  const text = message.toLowerCase();
  const spanishHints = ['¿', '¡', 'precio', 'servicio', 'hola', 'ayuda', 'solución', 'cotización', 'cuánto', 'qué', 'cómo'];
  return spanishHints.some(h => text.includes(h)) ? 'es' : 'en';
}

/**
 * Función simple de similitud para manejar errores tipográficos
 */
function similarWord(word: string, target: string): boolean {
  if (word.includes(target) || target.includes(word)) return true;

  if (word.length < 3 || target.length < 3) return false;

  const minLen = Math.min(word.length, target.length);
  const maxLen = Math.max(word.length, target.length);

  if (maxLen > minLen * 1.3) return false;

  let matches = 0;
  for (let i = 0; i < minLen; i++) {
    if (word[i] === target[i]) matches++;
  }

  return matches >= minLen * 0.7;
}

function containsSimilar(q: string, keywords: string[]): boolean {
  const words = q.split(/\s+/);
  return keywords.some(keyword =>
    words.some(word => similarWord(word, keyword) || word.includes(keyword) || keyword.includes(word))
  );
}

/**
 * Sistema de respuestas predefinidas inteligentes.
 * Último recurso cuando todas las APIs fallan.
 */
export function getFallbackResponse(question: string, lang: 'es' | 'en'): string {
  const q = question.toLowerCase();

  const responses: Record<string, { es: string; en: string }> = {
    greeting: {
      es: '¡Hola! 👋 Soy el asistente virtual de DEVMARK. Puedo ayudarte con información sobre nuestros servicios, precios y soluciones digitales. ¿En qué puedo ayudarte?',
      en: 'Hello! 👋 I\'m DEVMARK\'s virtual assistant. I can help you with information about our services, prices, and digital solutions. How can I help you?',
    },
    price: {
      es: '💰 Nuestros precios varían según el proyecto:\n\n• Desarrollo web: desde S/ 1200\n• CMS/E-commerce: desde S/ 1800\n• Software a medida: desde S/ 3000\n• Otros servicios: consultar\n\n¿Te gustaría una cotización personalizada? Contacta: 📧 contacto@devmarkpe.com o 📱 +51 975 646 074.',
      en: '💰 Our prices vary by project:\n\n• Web development: from S/ 1200\n• CMS/E-commerce: from S/ 1800\n• Custom software: from S/ 3000\n• Other services: inquire\n\nWould you like a personalized quote? Contact: 📧 contacto@devmarkpe.com or 📱 +51 975 646 074.',
    },
    services: {
      es: '🛠️ Ofrecemos los siguientes servicios:\n\n• Desarrollo web a medida\n• CMS/E-commerce (WordPress, Shopify)\n• Software personalizado\n• Automatización de procesos\n• Chatbots con IA\n• SEO y optimización\n• Diseño UI/UX\n• Marketing digital\n• Consultoría tecnológica\n• Soporte y mantenimiento\n\n¿Qué servicio te interesa más?',
      en: '🛠️ We offer the following services:\n\n• Custom web development\n• CMS/E-commerce (WordPress, Shopify)\n• Custom software\n• Process automation\n• AI chatbots\n• SEO and optimization\n• UI/UX design\n• Digital marketing\n• Tech consulting\n• Support and maintenance\n\nWhich service interests you most?',
    },
    contact: {
      es: '📞 Puedes contactarnos en:\n\n• Email: contacto@devmarkpe.com\n• Teléfono: +51 975 646 074\n\nEstamos disponibles para resolver tus dudas y ayudarte con tu proyecto digital. ¡Escríbenos o llámanos!',
      en: '📞 You can reach us at:\n\n• Email: contacto@devmarkpe.com\n• Phone: +51 975 646 074\n\nWe\'re available to answer your questions and help with your digital project. Write us or call us!',
    },
    website: {
      es: '🌐 Desarrollamos sitios web modernos y optimizados:\n\n• Landing pages: desde S/ 1200\n• Sitios corporativos completos\n• Diseño responsive (móvil, tablet, desktop)\n• SEO básico incluido\n• Optimización de velocidad\n• Panel de administración\n\n¿Qué tipo de sitio necesitas?',
      en: '🌐 We develop modern and optimized websites:\n\n• Landing pages: from S/ 1200\n• Complete corporate sites\n• Responsive design (mobile, tablet, desktop)\n• Basic SEO included\n• Speed optimization\n• Admin panel\n\nWhat type of site do you need?',
    },
    ecommerce: {
      es: '🛒 Desarrollamos tiendas online profesionales:\n\n• Plataformas: WordPress/WooCommerce, Shopify\n• Integración de pagos seguros\n• Gestión de productos y catálogo\n• Carrito de compras\n• Panel de administración\n• Precio desde S/ 1800\n\n¿Necesitas más detalles?',
      en: '🛒 We develop professional online stores:\n\n• Platforms: WordPress/WooCommerce, Shopify\n• Secure payment integration\n• Product and catalog management\n• Shopping cart\n• Admin panel\n• Price from S/ 1800\n\nNeed more details?',
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
      es: '💼 ¡Hola! Soy el asistente de DEVMARK. Puedo ayudarte con:\n\n• Información sobre nuestros servicios\n• Precios y cotizaciones\n• Desarrollo web, e-commerce, software\n• Chatbots con IA, SEO, marketing digital\n\nEscribe preguntas como: "precios", "servicios", "desarrollo web", "contacto", etc.\n\nPara consultas más específicas: 📧 contacto@devmarkpe.com | 📱 +51 975 646 074',
      en: '💼 Hello! I\'m DEVMARK\'s assistant. I can help you with:\n\n• Information about our services\n• Prices and quotes\n• Web development, e-commerce, software\n• AI chatbots, SEO, digital marketing\n\nWrite questions like: "prices", "services", "web development", "contact", etc.\n\nFor more specific inquiries: 📧 contacto@devmarkpe.com | 📱 +51 975 646 074',
    },
  };

  const greetingKeywords = ['hola', 'hi', 'hello', 'hey', 'buenos', 'buenas', 'dias', 'días', 'tardes', 'noches', 'saludos'];
  const priceKeywords = ['precio', 'precios', 'costo', 'costos', 'price', 'cost', 'cuanto', 'cuánto', 'paga', 'pagar', 'cuesta', 'cotizacion', 'cotización', 'presupuesto'];
  const servicesKeywords = ['servicio', 'servicios', 'service', 'services', 'que', 'qué', 'ofrecen', 'ofrec', 'hacen', 'hac', 'trabajos'];
  const contactKeywords = ['contacto', 'contact', 'contactar', 'teléfono', 'telefono', 'phone', 'email', 'correo', 'mail', 'llamar', 'llama', 'hablar'];
  const websiteKeywords = ['sitio', 'web', 'website', 'pagina', 'página', 'landing', 'desarrollo', 'desarroll', 'crear', 'hacer'];
  const ecommerceKeywords = ['tienda', 'store', 'ecommerce', 'comercio', 'shopify', 'woocommerce', 'venta', 'vender', 'productos'];
  const chatbotKeywords = ['chatbot', 'bot', 'chat', 'asistente', 'virtual', 'ia', 'inteligencia', 'artificial', 'autom', 'automat'];
  const seoKeywords = ['seo', 'posicionamiento', 'ranking', 'google', 'busqueda', 'búsqueda', 'optimizacion', 'optimización', 'visible'];

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

  return responses.default[lang];
}

async function fetchKnowledgeDocs(question: string, lang: 'es' | 'en'): Promise<string> {
  if (!isSupabaseConfigured() || !supabase) return '';

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

async function fetchPortfolioContext(lang: 'es' | 'en'): Promise<string> {
  if (!supabaseProjects) return '';

  const { data, error } = await supabaseProjects
    .from('projects')
    .select('title, title_es, title_en, category, rubro, technologies')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
    .limit(8);

  if (error || !data || data.length === 0) return '';

  return data
    .map(row => {
      const title = (lang === 'en' ? row.title_en : row.title_es) || row.title;
      const meta = [row.rubro || row.category, row.technologies?.join(', ')].filter(Boolean).join(' · ');
      return `- ${title}${meta ? ` (${meta})` : ''}`;
    })
    .join('\n');
}

export async function fetchKnowledgeContext(question: string, lang: 'es' | 'en'): Promise<string> {
  const [services, portfolio, docs] = await Promise.all([
    Promise.resolve(formatServicesForPrompt(lang)),
    fetchPortfolioContext(lang),
    fetchKnowledgeDocs(question, lang),
  ]);

  const sections = [
    `Servicios y precios reales (soles peruanos, S/):\n${services}`,
    portfolio ? `Proyectos reales del portafolio:\n${portfolio}` : '',
    docs ? `Base de conocimiento adicional:\n${docs}` : '',
  ].filter(Boolean);

  return sections.join('\n\n');
}

export function buildMessages(history: Message[], lang: 'es' | 'en', knowledge: string) {
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
