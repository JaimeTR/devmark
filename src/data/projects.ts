
interface Project {
  title: string;
  description: string;
  image: string;
  hasCover: boolean;
  hint: string;
  tags: string[];
  link?: string;
  date: string;
}

const projects: Record<'es' | 'en', Project[]> = {
  es: [
    {
      title: 'Plataforma E-commerce Global',
      description: 'Una solución de comercio electrónico completa para una marca internacional, con soporte multidioma y multimoneda, integrada con pasarelas de pago locales.',
      image: '/portfolio/ecommerce-global.jpg',
      hasCover: true,
      hint: 'e-commerce website',
      tags: ['E-commerce', 'Shopify', 'Diseño UI/UX', 'Integración de Pagos'],
      link: '#',
      date: '2023-11-10T00:00:00.000Z',
    },
    {
      title: 'Chatbot de Atención al Cliente con IA',
      description: 'Un chatbot inteligente para una empresa de servicios financieros, entrenado para responder preguntas complejas y escalar a agentes humanos cuando es necesario.',
      image: '/portfolio/chatbot-ia.jpg',
      hasCover: true,
      hint: 'AI chatbot interface',
      tags: ['Chatbot con IA', 'Genkit', 'Servicio al Cliente', 'Automatización'],
      link: '#',
      date: '2024-01-15T00:00:00.000Z',
    },
    {
      title: 'CRM a Medida para Inmobiliaria',
      description: 'Un CRM desarrollado desde cero para gestionar clientes, propiedades y procesos de venta, mejorando la eficiencia del equipo en un 40%.',
      image: '/portfolio/crm-inmobiliaria.jpg',
      hasCover: true,
      hint: 'CRM dashboard',
      tags: ['Software a Medida', 'CRM', 'SaaS', 'Automatización de Procesos'],
      link: '#',
      date: '2024-03-20T00:00:00.000Z',
    },
    {
      title: 'Web Corporativa para Startup Tecnológica',
      description: 'Un sitio web corporativo moderno y rápido, con un CMS para la gestión fácil de contenido, enfocado en el rendimiento y el SEO técnico.',
      image: '/portfolio/web-corporativa.jpg',
      hasCover: false,
      hint: 'corporate website',
      tags: ['Desarrollo Web', 'Next.js', 'SEO', 'Diseño Corporativo'],
      link: '#',
      date: '2024-05-05T00:00:00.000Z',
    },
     {
      title: 'Optimización SEO para Clínica Dental',
      description: 'Estrategia de SEO local y de contenidos que posicionó a una clínica dental en los primeros resultados de Google para búsquedas clave, aumentando las citas en un 60%.',
      image: '/portfolio/seo-dental.jpg',
      hasCover: false,
      hint: 'dental clinic website',
      tags: ['SEO', 'Marketing Digital', 'Desarrollo Web'],
      link: '#',
      date: '2024-06-10T00:00:00.000Z',
    },
    {
      title: 'Campaña de Marketing para Lanzamiento de App',
      description: 'Estrategia integral de marketing digital para el lanzamiento de una aplicación móvil, combinando redes sociales, influencers y publicidad para lograr 50,000 descargas en el primer mes.',
      image: '/portfolio/marketing-app.jpg',
      hasCover: true,
      hint: 'mobile app marketing',
      tags: ['Marketing Digital', 'SEO'],
      link: '#',
      date: '2024-04-22T00:00:00.000Z',
    },
    {
      title: 'Rediseño de Experiencia de Usuario para SaaS',
      description: 'Investigación y rediseño completo de la interfaz de una plataforma SaaS, mejorando la usabilidad y reduciendo la tasa de abandono de usuarios en un 25%.',
      image: '/portfolio/diseno-ux-saas.jpg',
      hasCover: false,
      hint: 'UI/UX design process',
      tags: ['Diseño UI/UX', 'Software a Medida', 'SaaS'],
      link: '#',
      date: '2024-02-18T00:00:00.000Z',
    },
    {
      title: 'Automatización de Reportes Financieros',
      description: 'Creación de un sistema automatizado que conecta diversas fuentes de datos para generar reportes financieros consolidados, ahorrando más de 20 horas de trabajo manual al mes.',
      image: '/portfolio/automatizacion-financiera.jpg',
      hasCover: true,
      hint: 'financial report automation',
      tags: ['Automatización', 'Software a Medida', 'Integración de APIs'],
      link: '#',
      date: '2023-12-01T00:00:00.000Z',
    }
  ],
  en: [
    {
      title: 'Global E-commerce Platform',
      description: 'A complete e-commerce solution for an international brand, with multi-language and multi-currency support, integrated with local payment gateways.',
      image: '/portfolio/ecommerce-global.jpg',
      hasCover: true,
      hint: 'e-commerce website',
      tags: ['E-commerce', 'Shopify', 'UI/UX Design', 'Payment Integration'],
      link: '#',
      date: '2023-11-10T00:00:00.000Z',
    },
    {
      title: 'AI-Powered Customer Service Chatbot',
      description: 'An intelligent chatbot for a financial services company, trained to answer complex questions and escalate to human agents when necessary.',
      image: '/portfolio/chatbot-ia.jpg',
      hasCover: true,
      hint: 'AI chatbot interface',
      tags: ['AI Chatbot', 'Genkit', 'Customer Service', 'Automation'],
      link: '#',
      date: '2024-01-15T00:00:00.000Z',
    },
    {
      title: 'Custom CRM for Real Estate',
      description: 'A custom CRM developed from scratch to manage clients, properties, and sales processes, improving team efficiency by 40%.',
      image: '/portfolio/crm-inmobiliaria.jpg',
      hasCover: true,
      hint: 'CRM dashboard',
      tags: ['Custom Software', 'CRM', 'SaaS', 'Process Automation'],
      link: '#',
      date: '2024-03-20T00:00:00.000Z',
    },
    {
      title: 'Corporate Website for a Tech Startup',
      description: 'A modern and fast corporate website with a CMS for easy content management, focused on performance and technical SEO.',
      image: '/portfolio/web-corporativa.jpg',
      hasCover: false,
      hint: 'corporate website',
      tags: ['Web Development', 'Next.js', 'SEO', 'Corporate Design'],
      link: '#',
      date: '2024-05-05T00:00:00.000Z',
    },
    {
      title: 'SEO Optimization for Dental Clinic',
      description: 'A local and content SEO strategy that ranked a dental clinic in the top Google results for key searches, increasing appointments by 60%.',
      image: '/portfolio/seo-dental.jpg',
      hasCover: false,
      hint: 'dental clinic website',
      tags: ['SEO', 'Digital Marketing', 'Web Development'],
      link: '#',
      date: '2024-06-10T00:00:00.000Z',
    },
    {
      title: 'Marketing Campaign for App Launch',
      description: 'A comprehensive digital marketing strategy for a mobile app launch, combining social media, influencers, and advertising to achieve 50,000 downloads in the first month.',
      image: '/portfolio/marketing-app.jpg',
      hasCover: true,
      hint: 'mobile app marketing',
      tags: ['Digital Marketing', 'SEO'],
      link: '#',
      date: '2024-04-22T00:00:00.000Z',
    },
    {
      title: 'User Experience Redesign for SaaS',
      description: 'Complete research and redesign of a SaaS platform\'s interface, improving usability and reducing user churn by 25%.',
      image: '/portfolio/diseno-ux-saas.jpg',
      hasCover: false,
      hint: 'UI/UX design process',
      tags: ['UI/UX Design', 'Custom Software', 'SaaS'],
      link: '#',
      date: '2024-02-18T00:00:00.000Z',
    },
    {
      title: 'Financial Report Automation',
      description: 'Creation of an automated system that connects various data sources to generate consolidated financial reports, saving over 20 hours of manual work per month.',
      image: '/portfolio/automatizacion-financiera.jpg',
      hasCover: true,
      hint: 'financial report automation',
      tags: ['Automation', 'Custom Software', 'API Integration'],
      link: '#',
      date: '2023-12-01T00:00:00.000Z',
    }
  ],
};

export function getProjects(lang: 'es' | 'en'): Project[] {
  return projects[lang]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .sort((a, b) => Number(b.hasCover) - Number(a.hasCover));
}
