// Tema de cada articulo del blog, deducido del slug y de las etiquetas. Decide la portada
// ilustrada (blog-cover.tsx) y la imagen para redes (opengraph-image).

export type BlogTopic =
  | 'web'
  | 'pwa'
  | 'cms'
  | 'shop'
  | 'software'
  | 'crm'
  | 'seo'
  | 'marketing'
  | 'automation'
  | 'chatbot'
  | 'ai'
  | 'uiux'
  | 'consulting'
  | 'pricing'
  | 'support'
  | 'stack';

// El orden importa: gana la primera regla que coincide (chatbot antes que automatizacion, etc.).
const RULES: [BlogTopic, RegExp][] = [
  ['chatbot', /chatbot/],
  ['ai', /(^|-)(ia|ai)-(para|for)/],
  ['pwa', /pwa/],
  ['crm', /crm/],
  ['shop', /tienda|store|e-commerce/],
  ['cms', /wordpress|cms/],
  ['seo', /seo/],
  ['marketing', /marketing/],
  ['uiux', /ui-ux/],
  ['consulting', /consult/],
  ['pricing', /cuanto-cuesta|cost/],
  ['support', /soporte|support/],
  ['stack', /stack|escalabilidad|scalability/],
  ['automation', /automat/],
  ['software', /software/],
];

export function topicOf(post: { slug: string; tags?: string[] }): BlogTopic {
  const haystack = `${post.slug} ${(post.tags ?? []).join(' ').toLowerCase()}`;
  for (const [topic, re] of RULES) if (re.test(post.slug)) return topic;
  for (const [topic, re] of RULES) if (re.test(haystack)) return topic;
  return 'web';
}

export const TOPIC_LABEL: Record<BlogTopic, { es: string; en: string }> = {
  web: { es: 'Desarrollo web', en: 'Web development' },
  pwa: { es: 'Apps web', en: 'Web apps' },
  cms: { es: 'WordPress y CMS', en: 'WordPress & CMS' },
  shop: { es: 'Tiendas online', en: 'Online stores' },
  software: { es: 'Software a medida', en: 'Custom software' },
  crm: { es: 'CRM', en: 'CRM' },
  seo: { es: 'SEO', en: 'SEO' },
  marketing: { es: 'Marketing digital', en: 'Digital marketing' },
  automation: { es: 'Automatización', en: 'Automation' },
  chatbot: { es: 'Chatbots con IA', en: 'AI chatbots' },
  ai: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
  uiux: { es: 'Diseño UI/UX', en: 'UI/UX design' },
  consulting: { es: 'Consultoría', en: 'Consulting' },
  pricing: { es: 'Precios', en: 'Pricing' },
  support: { es: 'Soporte', en: 'Support' },
  stack: { es: 'Arquitectura', en: 'Architecture' },
};
