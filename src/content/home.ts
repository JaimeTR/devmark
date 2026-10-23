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
    title: 'SEO y GEO',
    short: 'SEO y GEO',
    description: 'Que te encuentren en Google y que ChatGPT, Gemini y Perplexity te recomienden: SEO técnico y de contenidos, Core Web Vitals y GEO.',
    includes: ['SEO técnico', 'GEO para buscadores con IA', 'Contenidos', 'Core Web Vitals'],
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
    title: 'SEO & GEO',
    short: 'SEO & GEO',
    description: 'Get found on Google and recommended by ChatGPT, Gemini and Perplexity: technical and content SEO, Core Web Vitals and GEO.',
    includes: ['Technical SEO', 'GEO for AI search', 'Content', 'Core Web Vitals'],
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
        'Creamos páginas web, tiendas online, software a medida, automatizaciones, chatbots con IA y estrategias SEO y GEO para que tu negocio venda más en internet.',
      whatsapp: 'Hablemos por WhatsApp',
      whatsappMessage: 'Hola DEVMARK, vi su web y quiero conversar sobre un proyecto.',
      secondary: 'Ver servicios',
      secondaryHref: '/servicios',
    },
    intro: {
      title: ['Un equipo chico', { em: 'a propósito:' }, 'quien diseña tu proyecto es quien responde tus mensajes.'],
      text: 'Combinamos estrategia, diseño y tecnología en una sola mesa. Sin intermediarios, sin plantillas con tu logo encima y con precios publicados desde el primer mensaje.',
      stats: [
        { value: '100+', label: 'clientes satisfechos' },
        { value: '6', label: 'marcas colaboradoras' },
        { value: '91%', label: 'mayor rapidez de ejecución' },
        { value: '11', label: 'países con clientes' },
      ],
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
    products: {
      title: ['Productos', { em: 'propios,' }, 'probados primero en DEVMARK.'],
      text: 'No solo los construimos para clientes: los usamos todos los días. Por eso los chatbots, las integraciones y los sistemas que entregamos se apoyan en herramientas nuestras.',
      ai: {
        name: 'DEVMARK AI',
        tagline: 'Nuestra plataforma privada de inteligencia artificial.',
        description: 'Una API de IA compatible con OpenAI para que las apps de tu negocio usen inteligencia artificial con tus propios datos, sin depender de servicios de terceros.',
        features: ['API keys por aplicación, con límites y expiración', 'Conocimiento propio (RAG) con tus documentos', 'Herramientas que consultan tus datos reales', 'Uso, logs y consola de administración con 2FA'],
        cta: 'Conocer DEVMARK AI',
        href: 'https://ai.devmarkpe.com',
        whatsapp: 'Hola DEVMARK, quiero conectar mi negocio a DEVMARK AI.',
        ask: 'Quiero usarlo',
      },
      erp: {
        name: 'DEVMARK ERP',
        tagline: 'El sistema con el que gestionamos cada proyecto.',
        description: 'Clientes, proyectos, tareas y horas, cobros y facturas, contratos, tickets de soporte, monitoreo de sitios y marketing en un solo lugar. También lo implementamos para otras empresas de servicios.',
        features: ['Proyectos, hitos, tareas y horas', 'Cobros recurrentes, facturas y recibos', 'Contratos con aceptación y comprobantes', 'Tickets con plazos y monitoreo de sitios'],
        cta: 'Quiero un ERP así',
        whatsapp: 'Hola DEVMARK, quiero un ERP como el de ustedes para mi empresa.',
      },
    },
    portal: {
      title: ['Tu proyecto,', { em: 'a la vista' }, 'en tu portal de cliente.'],
      text: 'Cada cliente de DEVMARK tiene su propio acceso para revisar el avance cuando quiera, sin esperar un correo.',
      items: [
        { title: 'Avance e hitos', text: 'Qué se hizo, qué sigue y las novedades de cada etapa.' },
        { title: 'Pagos y facturas', text: 'Próximos cobros, facturas, recibos en PDF y tus vouchers.' },
        { title: 'Solicitudes y soporte', text: 'Pide cambios o abre un ticket y sigue su estado.' },
        { title: 'Documentos e informes', text: 'Contratos para aceptar en línea e informe mensual de tu sitio.' },
      ],
      mock: { project: 'Web corporativa', progress: 'Avance', stage: 'Diseño visual aprobado', next: 'Siguiente: desarrollo', invoice: 'Próximo cobro', ticket: 'Ticket #12 · Resuelto', report: 'Informe de octubre listo' },
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
      title: ['Negocios de 11 países', { em: 'que confían' }, 'en DEVMARK.'],
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
          a: 'Sí. Somos partners de Hostinger: con el cupón DEVMARKPE obtienes un descuento adicional y te configuramos gratis los correos profesionales y el certificado SSL.',
        },
      ],
    },
  },
  en: {
    hero: {
      proof: '+100 happy clients',
      title: ['Web and software', { em: 'development agency' }, 'in Lima, Peru.'],
      description:
        'We build websites, online stores, custom software, automations, AI chatbots and SEO & GEO strategies so your business sells more online.',
      whatsapp: "Let's talk on WhatsApp",
      whatsappMessage: 'Hi DEVMARK, I saw your website and would like to talk about a project.',
      secondary: 'See services',
      secondaryHref: '/en/services',
    },
    intro: {
      title: ['A small team', { em: 'on purpose:' }, 'whoever designs your project is the one answering your messages.'],
      text: 'Strategy, design and technology at one table. No middlemen, no templates with your logo on top, and prices published from the very first message.',
      stats: [
        { value: '100+', label: 'happy clients' },
        { value: '6', label: 'partner brands' },
        { value: '91%', label: 'faster execution' },
        { value: '11', label: 'countries with clients' },
      ],
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
    products: {
      title: ['Our own', { em: 'products,' }, 'proven at DEVMARK first.'],
      text: "We don't only build them for clients: we use them every day. That's why the chatbots, integrations and systems we deliver run on our own tools.",
      ai: {
        name: 'DEVMARK AI',
        tagline: 'Our private artificial intelligence platform.',
        description: "An OpenAI-compatible AI API so your business apps can use artificial intelligence with your own data, without depending on third-party services.",
        features: ['API keys per app, with limits and expiry', 'Your own knowledge (RAG) from your documents', 'Tools that query your real data', 'Usage, logs and an admin console with 2FA'],
        cta: 'Discover DEVMARK AI',
        href: 'https://ai.devmarkpe.com',
        whatsapp: 'Hi DEVMARK, I want to connect my business to DEVMARK AI.',
        ask: 'I want to use it',
      },
      erp: {
        name: 'DEVMARK ERP',
        tagline: 'The system we run every project on.',
        description: 'Clients, projects, tasks and hours, billing and invoices, contracts, support tickets, site monitoring and marketing in one place. We also implement it for other service companies.',
        features: ['Projects, milestones, tasks and hours', 'Recurring billing, invoices and receipts', 'Contracts with online acceptance', 'Tickets with SLAs and site monitoring'],
        cta: 'I want an ERP like this',
        whatsapp: 'Hi DEVMARK, I want an ERP like yours for my company.',
      },
    },
    portal: {
      title: ['Your project,', { em: 'in plain sight' }, 'in your client portal.'],
      text: 'Every DEVMARK client gets their own access to check progress whenever they want, without waiting for an email.',
      items: [
        { title: 'Progress and milestones', text: "What's done, what's next and updates for each stage." },
        { title: 'Payments and invoices', text: 'Upcoming charges, invoices, PDF receipts and your vouchers.' },
        { title: 'Requests and support', text: 'Ask for changes or open a ticket and follow its status.' },
        { title: 'Documents and reports', text: 'Contracts to accept online and a monthly report on your site.' },
      ],
      mock: { project: 'Corporate website', progress: 'Progress', stage: 'Visual design approved', next: 'Next: development', invoice: 'Next charge', ticket: 'Ticket #12 · Resolved', report: 'October report ready' },
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
      title: ['Businesses in 11 countries', { em: 'that trust' }, 'DEVMARK.'],
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
          a: 'Yes. We are Hostinger partners: with the DEVMARKPE coupon you get an extra discount, and we set up your professional email and SSL certificate for free.',
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
  'BREEZE LINGO',
  'AS ABOGADOS',
  'ZONA DENTAL',
  'DENTALLIFE',
  'DORTHON',
  'VISUAL MEDICA',
  'MATARRAÑA AVENTURA',
  'GEOPARQUE MAESTRAZGO',
  'ESPAÑA ABOGADOS',
  'AMYSA SHOP',
  'SEGITTUR',
  'URBANZ',
  'ENOVA',
] as const;

export type TitleParts = readonly (string | { readonly em: string })[];
