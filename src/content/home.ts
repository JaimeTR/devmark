// Textos de la portada (es / en). Las cifras, clientes y precios son los publicados
// por DEVMARK; no agregar cifras ni testimonios que no sean reales.

import { getStartingPrice } from '@/data/services';

export type Lang = 'es' | 'en';

export type ServiceIcon = 'web' | 'cms' | 'software' | 'automation' | 'chatbot' | 'seo';

export interface HomeService {
  id: ServiceIcon;
  title: string;
  short: string;
  description: string;
  includes: string[];
  href: string;
  from: string | null;
}

const servicesEs: Omit<HomeService, 'from'>[] = [
  {
    id: 'web',
    title: 'Desarrollo web a medida',
    short: 'Webs a medida',
    description: 'Sitios corporativos, landing pages y PWAs programados desde cero, rápidos y pensados para que te escriban.',
    includes: ['Webs corporativas', 'Landing pages', 'PWAs', 'Diseño responsive'],
    href: '/servicios/desarrollo-web-a-medida',
  },
  {
    id: 'cms',
    title: 'Tiendas y webs con CMS',
    short: 'CMS y e-commerce',
    description: 'Sitios y tiendas online con WordPress, Shopify y otras plataformas, con pagos integrados y fáciles de administrar.',
    includes: ['WordPress', 'Shopify', 'E-commerce', 'Pasarelas de pago'],
    href: '/servicios/desarrollo-cms',
  },
  {
    id: 'software',
    title: 'Software a medida',
    short: 'Software',
    description: 'Sistemas internos (ERP, CRM), SaaS y APIs que unen tus herramientas y ordenan tus procesos.',
    includes: ['ERP y CRM', 'SaaS', 'APIs e integraciones', 'Paneles de gestión'],
    href: '/servicios/desarrollo-software',
  },
  {
    id: 'automation',
    title: 'Automatización de procesos',
    short: 'Automatización',
    description: 'Flujos automáticos con Zapier, Make y APIs para leads, ventas, reportes y tareas de back-office.',
    includes: ['Captación de leads', 'Reportes automáticos', 'Notificaciones', 'Zapier y Make'],
    href: '/servicios/automatizacion-procesos',
  },
  {
    id: 'chatbot',
    title: 'Chatbots con IA',
    short: 'Chatbots IA',
    description: 'Chatbots para tu web, tienda y redes, entrenados con la información de tu negocio para vender y atender 24/7.',
    includes: ['Chat en tu web', 'Redes sociales', 'Base de conocimiento', 'Atención 24/7'],
    href: '/servicios/chatbots-ia',
  },
  {
    id: 'seo',
    title: 'SEO y optimización web',
    short: 'SEO',
    description: 'Estrategia, SEO técnico y de contenidos y Core Web Vitals para que más gente te encuentre en Google.',
    includes: ['SEO técnico', 'Contenidos', 'Core Web Vitals', 'SEO para e-commerce'],
    href: '/servicios/seo-optimizacion',
  },
];

const servicesEn: Omit<HomeService, 'from'>[] = [
  {
    id: 'web',
    title: 'Custom web development',
    short: 'Custom websites',
    description: 'Corporate sites, landing pages and PWAs built from scratch, fast and designed to make people reach out.',
    includes: ['Corporate websites', 'Landing pages', 'PWAs', 'Responsive design'],
    href: '/en/services/custom-web-development',
  },
  {
    id: 'cms',
    title: 'Stores and CMS websites',
    short: 'CMS & e-commerce',
    description: 'Websites and online stores on WordPress, Shopify and other platforms, with payments built in and easy to manage.',
    includes: ['WordPress', 'Shopify', 'E-commerce', 'Payment gateways'],
    href: '/en/services/cms-development',
  },
  {
    id: 'software',
    title: 'Custom software',
    short: 'Software',
    description: 'Internal systems (ERP, CRM), SaaS and APIs that connect your tools and put your processes in order.',
    includes: ['ERP & CRM', 'SaaS', 'APIs & integrations', 'Admin dashboards'],
    href: '/en/services/custom-software-development',
  },
  {
    id: 'automation',
    title: 'Process automation',
    short: 'Automation',
    description: 'Automated flows with Zapier, Make and APIs for leads, sales, reports and back-office tasks.',
    includes: ['Lead capture', 'Automated reports', 'Notifications', 'Zapier & Make'],
    href: '/en/services/process-automation',
  },
  {
    id: 'chatbot',
    title: 'AI chatbots',
    short: 'AI chatbots',
    description: 'Chatbots for your website, store and social media, trained on your business to sell and support 24/7.',
    includes: ['Website chat', 'Social media', 'Knowledge base', '24/7 support'],
    href: '/en/services/ai-chatbots',
  },
  {
    id: 'seo',
    title: 'SEO & web optimization',
    short: 'SEO',
    description: 'Strategy, technical and content SEO and Core Web Vitals so more people find you on Google.',
    includes: ['Technical SEO', 'Content', 'Core Web Vitals', 'E-commerce SEO'],
    href: '/en/services/seo-optimization',
  },
];

const withPrice = (list: Omit<HomeService, 'from'>[], lang: 'es' | 'en'): HomeService[] =>
  list.map((s) => ({ ...s, from: getStartingPrice(s.href, lang) }));

export const homeContent = {
  es: {
    hero: {
      proof: '+100 clientes satisfechos',
      title: ['Agencia de desarrollo', { em: 'web y software' }, 'en Lima, Perú.'],
      description:
        'Creamos páginas web, tiendas online, software a medida, automatizaciones, chatbots con IA y estrategias SEO para que tu negocio venda más en internet.',
      whatsapp: 'Hablemos por WhatsApp',
      whatsappMessage: 'Hola DEVMARK, vi su web y quiero conversar sobre un proyecto.',
      secondary: 'Ver servicios',
      secondaryHref: '/servicios',
      chips: ['+100 proyectos entregados en Perú', '91% más rápido en ejecución'],
      globeLabel: 'Arcos desde Lima hacia ciudades donde trabajamos',
    },
    intro: {
      title: ['Un equipo chico', { em: 'a propósito:' }, 'quien diseña tu proyecto es quien responde tus mensajes.'],
      text: 'Combinamos estrategia, diseño y tecnología en una sola mesa. Sin intermediarios, sin plantillas con tu logo encima y con precios publicados desde el primer mensaje.',
      stats: [
        { value: '100+', label: 'clientes satisfechos' },
        { value: '6', label: 'marcas colaboradoras' },
        { value: '91%', label: 'mayor rapidez de ejecución' },
      ],
      clientsLabel: 'Negocios que ya trabajan con nosotros',
    },
    services: {
      title: ['Todo lo que tu negocio necesita', { em: 'para venderse en internet,' }, 'en un solo equipo.'],
      text: 'Elige un servicio y te respondemos por WhatsApp con alcance y precio. Todos los planes están publicados.',
      cta: 'Cotizar por WhatsApp',
      from: 'Desde',
      details: 'Ver detalles',
      includes: 'Qué incluye',
      quoteMessage: (title: string) => `Hola DEVMARK, quiero cotizar el servicio de ${title}.`,
      items: withPrice(servicesEs, 'es'),
      extraTitle: 'También hacemos',
      extra: [
        { title: 'Diseño UI/UX', href: '/servicios/diseno-ui-ux' },
        { title: 'Marketing digital', href: '/servicios/marketing-digital' },
        { title: 'Soporte y mantenimiento', href: '/servicios/soporte-mantenimiento' },
        { title: 'Consultoría tecnológica', href: '/servicios/consultoria-tecnologica' },
      ],
      hint: 'Pasa el cursor o toca un servicio',
    },
    why: {
      title: ['¿Por qué', { em: 'trabajar con' }, 'DEVMARK?'],
      chips: [
        'Quien diseña, responde',
        'Precios publicados',
        'Propuesta en PDF al instante',
        'Código propio, sin plantillas',
        'Soporte después del lanzamiento',
        'Correos y SSL configurados',
      ],
    },
    process: {
      title: ['De la primera conversación', { em: 'a tu web publicada,' }, 'paso a paso.'],
      text: 'Cada proyecto sigue el mismo camino. Sabes qué pasa en cada etapa y qué sigue.',
      stepLabel: 'Paso',
    },
    projects: {
      title: ['Proyectos', { em: 'que ya están' }, 'trabajando.'],
      text: 'Algunos de los sitios, tiendas y sistemas que hemos entregado.',
      cta: 'Ver todo el portafolio',
      href: '/portfolio',
      empty: 'Muy pronto verás aquí nuestros proyectos destacados.',
      visit: 'Ver proyecto',
    },
    testimonials: {
      title: ['Clientes contentos', { em: 'que confiaron' }, 'en nuestro trabajo.'],
      proof: '+100 clientes satisfechos',
    },
    contact: {
      title: ['Las buenas ideas', { em: 'empiezan conversando,' }, 'hablemos.'],
      text: 'Escríbenos por WhatsApp y te respondemos hoy. Si prefieres, déjanos tus datos o agenda una videollamada.',
      whatsapp: 'Escríbenos por WhatsApp',
      schedule: 'Agendar videollamada',
      emailLabel: 'Correo',
      phoneLabel: 'Teléfono',
    },
    blog: {
      title: ['Ideas y guías', { em: 'para hacer crecer' }, 'tu negocio en internet.'],
      cta: 'Ir al blog',
      href: '/blog',
      read: 'Leer artículo',
      postBase: '/blog',
    },
    faq: {
      title: ['¿Tienes dudas', { em: 'antes de empezar?' }],
      cardTitle: 'Hablemos 15 minutos, sin compromiso.',
      cardCta: 'Hablemos por WhatsApp',
      orEmail: 'O escríbenos a',
      items: [
        {
          q: '¿Cuánto cuesta una página web?',
          a: 'Una web a medida empieza en S/ 1200 (plan Emprendedor) y una tienda con CMS en S/ 1800. Cada servicio tiene sus planes publicados; los proyectos grandes se cotizan a medida.',
        },
        {
          q: '¿Trabajan con negocios fuera de Lima?',
          a: 'Sí. Trabajamos con negocios de todo el Perú y de otros países, con reuniones por videollamada y avances que puedes revisar cuando quieras.',
        },
        {
          q: '¿Cómo empezamos?',
          a: 'Escríbenos por WhatsApp o agenda una reunión. Conversamos sobre tu negocio, definimos objetivos y te enviamos la propuesta. También puedes cotizar al instante con nuestro cotizador con IA.',
        },
        {
          q: '¿Qué pasa después de publicar mi web?',
          a: 'Ofrecemos planes de soporte y mantenimiento: actualizaciones de seguridad, copias de seguridad, monitoreo y resolución de incidencias.',
        },
        {
          q: '¿Me ayudan con el hosting y los correos?',
          a: 'Sí. Somos partners de Hostinger: con el cupón DEVMARK obtienes un descuento adicional y te configuramos gratis los correos profesionales y el certificado SSL.',
        },
      ],
    },
  },
  en: {
    hero: {
      proof: '+100 happy clients',
      title: ['Web and software', { em: 'development agency' }, 'in Lima, Peru.'],
      description:
        'We build websites, online stores, custom software, automations, AI chatbots and SEO strategies so your business sells more online.',
      whatsapp: "Let's talk on WhatsApp",
      whatsappMessage: 'Hi DEVMARK, I saw your website and would like to talk about a project.',
      secondary: 'See services',
      secondaryHref: '/en/services',
      chips: ['+100 projects delivered in Peru', '91% faster execution'],
      globeLabel: 'Arcs from Lima to cities where we work',
    },
    intro: {
      title: ['A small team', { em: 'on purpose:' }, 'whoever designs your project is the one answering your messages.'],
      text: 'Strategy, design and technology at one table. No middlemen, no templates with your logo on top, and prices published from the very first message.',
      stats: [
        { value: '100+', label: 'happy clients' },
        { value: '6', label: 'partner brands' },
        { value: '91%', label: 'faster execution' },
      ],
      clientsLabel: 'Businesses already working with us',
    },
    services: {
      title: ['Everything your business needs', { em: 'to sell online,' }, 'in one team.'],
      text: 'Pick a service and we reply on WhatsApp with scope and price. Every plan is published.',
      cta: 'Get a quote on WhatsApp',
      from: 'From',
      details: 'View details',
      includes: "What's included",
      quoteMessage: (title: string) => `Hi DEVMARK, I'd like a quote for ${title}.`,
      items: withPrice(servicesEn, 'en'),
      extraTitle: 'We also do',
      extra: [
        { title: 'UI/UX design', href: '/en/services/ui-ux-design' },
        { title: 'Digital marketing', href: '/en/services/digital-marketing' },
        { title: 'Support & maintenance', href: '/en/services/support-maintenance' },
        { title: 'Tech consulting', href: '/en/services/tech-consulting' },
      ],
      hint: 'Hover or tap a service',
    },
    why: {
      title: ['Why', { em: 'work with' }, 'DEVMARK?'],
      chips: [
        'Whoever designs, replies',
        'Published prices',
        'Instant PDF proposal',
        'Our own code, no templates',
        'Support after launch',
        'Email & SSL set up for you',
      ],
    },
    process: {
      title: ['From the first conversation', { em: 'to your live website,' }, 'step by step.'],
      text: 'Every project follows the same path. You know what happens at each stage and what comes next.',
      stepLabel: 'Step',
    },
    projects: {
      title: ['Projects', { em: 'already at' }, 'work.'],
      text: 'Some of the websites, stores and systems we have delivered.',
      cta: 'See the full portfolio',
      href: '/en/portfolio',
      empty: 'Our featured projects will be here very soon.',
      visit: 'View project',
    },
    testimonials: {
      title: ['Happy clients', { em: 'who trusted' }, 'our work.'],
      proof: '+100 happy clients',
    },
    contact: {
      title: ['Good ideas', { em: 'start with a conversation,' }, "let's talk."],
      text: 'Message us on WhatsApp and we will reply today. Or leave your details or book a video call.',
      whatsapp: 'Message us on WhatsApp',
      schedule: 'Book a video call',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
    },
    blog: {
      title: ['Ideas and guides', { em: 'to grow' }, 'your business online.'],
      cta: 'Go to the blog',
      href: '/en/blog',
      read: 'Read article',
      postBase: '/en/blog',
    },
    faq: {
      title: ['Questions', { em: 'before we start?' }],
      cardTitle: "Let's talk for 15 minutes, no strings attached.",
      cardCta: "Let's talk on WhatsApp",
      orEmail: 'Or email us at',
      items: [
        {
          q: 'How much does a website cost?',
          a: 'A custom website starts at S/ 1200 (Entrepreneur plan) and a CMS store at S/ 1800. Every service has published plans; large projects are quoted individually.',
        },
        {
          q: 'Do you work with businesses outside Lima?',
          a: 'Yes. We work with businesses across Peru and abroad, with video-call meetings and progress you can check whenever you want.',
        },
        {
          q: 'How do we get started?',
          a: 'Message us on WhatsApp or book a meeting. We talk about your business, define goals and send you a proposal. You can also get an instant quote with our AI quoter.',
        },
        {
          q: 'What happens after my site goes live?',
          a: 'We offer support and maintenance plans: security updates, backups, monitoring and issue resolution.',
        },
        {
          q: 'Can you help with hosting and email?',
          a: 'Yes. We are Hostinger partners: with the DEVMARK coupon you get an extra discount, and we set up your professional email and SSL certificate for free.',
        },
      ],
    },
  },
} as const;

export const clients = [
  'ADLIM',
  'JOPCO',
  'TAKLAB',
  'LUCE INMOBILIARIA',
  'MEMORANDUM',
  'MM TECH',
  'DETALZONE',
  'SUPERPROFE',
  'NEWDENIM',
  'OFFROADPERU',
  'BREEZLINGO',
  'AS ABOGADOS',
] as const;

export type TitleParts = readonly (string | { readonly em: string })[];
