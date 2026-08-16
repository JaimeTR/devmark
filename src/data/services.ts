// Fuente única de verdad para servicios y precios reales del sitio.
// Mantener sincronizado con src/app/servicios/*/page.tsx (pricingContent en cada página).
// La IA del chat usa esto para responder con precios reales, no inventados.

export interface ServicePlan {
  name: string;
  price: string;
}

export interface ServiceInfo {
  slug: string;
  nameEs: string;
  nameEn: string;
  descriptionEs: string;
  descriptionEn: string;
  plans: ServicePlan[];
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: 'desarrollo-web-a-medida',
    nameEs: 'Desarrollo web a medida',
    nameEn: 'Custom web development',
    descriptionEs: 'Sitios corporativos, landing pages y PWAs programados desde cero.',
    descriptionEn: 'Corporate sites, landing pages and PWAs built from scratch.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 1200' },
      { name: 'Negocio', price: 'S/ 2500' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'desarrollo-cms',
    nameEs: 'Desarrollo con CMS y plataformas',
    nameEn: 'CMS & platform development',
    descriptionEs: 'Sitios y tiendas online con WordPress, Shopify y otras plataformas.',
    descriptionEn: 'Websites and online stores with WordPress, Shopify and other platforms.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 1800' },
      { name: 'Negocio', price: 'S/ 3200' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'desarrollo-software',
    nameEs: 'Desarrollo de software a medida',
    nameEn: 'Custom software development',
    descriptionEs: 'Sistemas internos (ERP, CRM), SaaS y APIs.',
    descriptionEn: 'Internal systems (ERP, CRM), SaaS and APIs.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 3000' },
      { name: 'Negocio', price: 'S/ 6500' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'automatizacion-procesos',
    nameEs: 'Automatización de procesos',
    nameEn: 'Process automation',
    descriptionEs: 'Flujos automáticos con Zapier/Make/APIs para leads, ventas y back-office.',
    descriptionEn: 'Automatic flows with Zapier/Make/APIs for leads, sales and back-office.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 1500' },
      { name: 'Negocio', price: 'S/ 3500' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'chatbots-ia',
    nameEs: 'Chatbots con IA',
    nameEn: 'AI chatbots',
    descriptionEs: 'Chatbots entrenados con tu base de conocimiento, 24/7.',
    descriptionEn: 'Chatbots trained with your knowledge base, 24/7.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 1200' },
      { name: 'Negocio', price: 'S/ 2500' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'seo-optimizacion',
    nameEs: 'SEO y optimización web',
    nameEn: 'SEO & web optimization',
    descriptionEs: 'SEO técnico y de contenidos, Core Web Vitals, e-commerce.',
    descriptionEn: 'Technical and content SEO, Core Web Vitals, e-commerce.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 300' },
      { name: 'Negocio', price: 'S/ 600' },
      { name: 'Empresa', price: 'S/ 1200' },
    ],
  },
  {
    slug: 'diseno-ui-ux',
    nameEs: 'Diseño UI/UX',
    nameEn: 'UI/UX design',
    descriptionEs: 'Diseño centrado en el usuario, prototipado y wireframes.',
    descriptionEn: 'User-centered design, prototyping and wireframes.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 1800' },
      { name: 'Negocio', price: 'S/ 3200' },
      { name: 'Empresa', price: 'A medida' },
    ],
  },
  {
    slug: 'marketing-digital',
    nameEs: 'Marketing digital',
    nameEn: 'Digital marketing',
    descriptionEs: 'Campañas publicitarias, email marketing y automatización de ventas.',
    descriptionEn: 'Ad campaigns, email marketing and sales automation.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 700' },
      { name: 'Negocio', price: 'S/ 1500' },
      { name: 'Empresa', price: 'S/ 3000' },
    ],
  },
  {
    slug: 'soporte-mantenimiento',
    nameEs: 'Soporte y mantenimiento',
    nameEn: 'Support and maintenance',
    descriptionEs: 'Actualizaciones, monitoreo de rendimiento y soporte técnico continuo.',
    descriptionEn: 'Updates, performance monitoring and continuous technical support.',
    plans: [
      { name: 'Básico', price: 'S/ 60' },
      { name: 'Profesional', price: 'S/ 150' },
      { name: 'Empresa', price: 'S/ 300' },
    ],
  },
  {
    slug: 'consultoria-tecnologica',
    nameEs: 'Consultoría tecnológica',
    nameEn: 'Technology consulting',
    descriptionEs: 'Asesoría para digitalización de procesos y elección de plataformas.',
    descriptionEn: 'Advisory for process digitization and platform selection.',
    plans: [
      { name: 'Emprendedor', price: 'S/ 30' },
      { name: 'Negocio', price: 'S/ 450' },
      { name: 'Empresa', price: 'S/ 900' },
    ],
  },
];

export function formatServicesForPrompt(lang: 'es' | 'en'): string {
  return SERVICES.map(s => {
    const name = lang === 'en' ? s.nameEn : s.nameEs;
    const desc = lang === 'en' ? s.descriptionEn : s.descriptionEs;
    const plans = s.plans.map(p => `${p.name}: ${p.price}`).join(', ');
    return `- ${name}: ${desc} (${plans})`;
  }).join('\n');
}

// Slug del servicio -> tipo de proyecto del cotizador con IA, para
// preseleccionarlo cuando el botón "Cotizar" de una card de servicio manda
// directo a /quote. Los servicios que no son "un tipo de sitio" (SEO,
// marketing, soporte, consultoría, diseño) van a 'other'.
const SERVICE_QUOTE_TYPE: Record<string, string> = {
  'desarrollo-web-a-medida': 'corporate-website',
  'desarrollo-cms': 'ecommerce',
  'desarrollo-software': 'custom-software',
  'automatizacion-procesos': 'custom-software',
  'chatbots-ia': 'custom-software',
  'seo-optimizacion': 'other',
  'diseno-ui-ux': 'other',
  'marketing-digital': 'other',
  'soporte-mantenimiento': 'other',
  'consultoria-tecnologica': 'other',
};

export function getServiceQuoteType(slug: string): string {
  return SERVICE_QUOTE_TYPE[slug] || 'other';
}

// Las páginas en inglés usan slugs propios (custom-web-development, etc.),
// distintos de los slugs canónicos en español de SERVICES — este mapa los
// normaliza para poder buscar precio/tipo sin duplicar la tabla en inglés.
const EN_TO_ES_SLUG: Record<string, string> = {
  'custom-web-development': 'desarrollo-web-a-medida',
  'cms-development': 'desarrollo-cms',
  'custom-software-development': 'desarrollo-software',
  'process-automation': 'automatizacion-procesos',
  'ai-chatbots': 'chatbots-ia',
  'seo-optimization': 'seo-optimizacion',
  'ui-ux-design': 'diseno-ui-ux',
  'digital-marketing': 'marketing-digital',
  'support-maintenance': 'soporte-mantenimiento',
  'tech-consulting': 'consultoria-tecnologica',
};

function slugFromHref(href: string): string {
  const last = href.split('/').filter(Boolean).pop() || '';
  return EN_TO_ES_SLUG[last] || last;
}

export function getQuoteHrefForService(href: string, lang: 'es' | 'en' = 'es'): string {
  const type = getServiceQuoteType(slugFromHref(href));
  const base = lang === 'en' ? '/en/quote' : '/quote';
  return `${base}?type=${type}`;
}

// Precio del plan más económico de un servicio, para mostrar "Desde S/ X"
// en las cards. Extrae el primer número de cada precio (algunos son "A
// medida" sin número, se ignoran) y toma el menor.
export function getStartingPrice(href: string): string | null {
  const service = SERVICES.find(s => s.slug === slugFromHref(href));
  if (!service) return null;

  const amounts = service.plans
    .map(p => {
      const match = p.price.match(/[\d,]+/);
      return match ? parseInt(match[0].replace(/,/g, ''), 10) : null;
    })
    .filter((n): n is number => n !== null);

  if (amounts.length === 0) return null;
  return `S/ ${Math.min(...amounts)}`;
}
