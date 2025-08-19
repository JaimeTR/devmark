
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/sections/hero';
import { Services } from '@/components/landing/sections/services';
import { World } from '@/components/landing/sections/world';
import { Testimonials } from '@/components/landing/sections/testimonials';
import { Contact } from '@/components/landing/sections/contact';
import { Footer } from '@/components/landing/footer';
import { AdditionalServices } from '@/components/landing/sections/additional-services';
import { Hosting } from '@/components/landing/sections/hosting';


const content = {
  lang: 'es' as const,
  header: {
    navLinks: [
      { href: '#hero', label: 'Inicio' },
      { href: '#services', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '#hosting', label: 'Hosting' },
      { href: '#testimonials', label: 'Reseñas' },
      { href: '/blog', label: 'Blog' },
      { href: '#contact', label: 'Contacto' },
    ],
    contactButton: 'Contactar',
    aiAssistant: 'Asistente IA',
    aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
  },
  hero: {
    badge: 'Devmark Tu Socio Digital',
    title: 'Impulsa Tu Negocio con',
    animatedPhrases: [
      'Tecnología de Punta',
      'Soluciones a Medida',
      'Éxito Digital Garantizado',
    ],
    description: 'En DevMark, creamos soluciones web y de software a medida, y optimizamos tu presencia online para una audiencia global.',
    servicesButton: 'Nuestros Servicios',
    contactButton: 'Contáctanos',
  },
  services: {
    title: 'Servicios Principales',
    subtitle: 'Soluciones integrales para llevar tu empresa al siguiente nivel.',
    moreInfoButton: 'Más Información',
    items: [
      {
        icon: 'CodeXml',
        title: "Desarrollo Web a Medida",
        description: "Creación de sitios web personalizados programados desde cero para webs corporativas, landing pages y PWAs.",
        tags: ["Webs Corporativas", "Landing Pages", "PWAs"],
        href: '/servicios/desarrollo-web-a-medida'
      },
      {
        icon: 'Palette',
        title: "Desarrollo con CMS y Plataformas",
        description: "Construcción de sitios y tiendas online con WordPress, Shopify y otras plataformas. E-commerce con integraciones de pago.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/servicios/desarrollo-cms'
      },
      {
        icon: 'ServerCog',
        title: "Desarrollo de Software a Medida",
        description: "Sistemas internos (ERP, CRM), SaaS y APIs. Integraciones entre herramientas para unificar datos y procesos.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/servicios/desarrollo-software'
      },
      {
        icon: 'Zap',
        title: "Automatización de Procesos",
        description: "Flujos automáticos con Zapier/Make/APIs para leads, ventas, reportes, notificaciones y tareas de back-office.",
        tags: ["Zapier", "Make", "Automatización de Leads"],
        href: '/servicios/automatizacion-procesos'
      },
      {
        icon: 'Bot',
        title: "Chatbots con IA",
        description: "Chatbots para web, e-commerce y redes sociales, entrenados con tu base de conocimiento para soporte y ventas 24/7.",
        tags: ["Chatbots Web", "Redes Sociales", "Soporte 24/7"],
        href: '/servicios/chatbots-ia'
      },
      {
        icon: 'LineChart',
        title: "SEO y Optimización Web",
        description: "Estrategia, SEO técnico y de contenidos, Core Web Vitals y para e-commerce. Aumenta tráfico orgánico y conversiones.",
        tags: ["Estrategia SEO", "Core Web Vitals", "Trafico"],
        href: '/servicios/seo-optimizacion'
      }
    ]
  },
  additionalServices: {
    title: 'Servicios Complementarios',
    subtitle: '(Servicios que refuerzan el desarrollo tecnológico principal)',
    moreInfoButton: 'Más Información',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'Diseño UI/UX',
        description: 'Diseño centrado en la experiencia del usuario. Prototipado y wireframes interactivos. Interfaces modernas, limpias y responsivas.',
        href: '/servicios/diseno-ui-ux'
      },
      {
        icon: 'Megaphone',
        title: 'Marketing Digital',
        description: 'Estrategias de crecimiento y captación de clientes. Campañas publicitarias (Google Ads, Meta Ads). Email marketing y automatización de ventas.',
        href: '/servicios/marketing-digital'
      },
      {
        icon: 'Wrench',
        title: 'Soporte y Mantenimiento',
        description: 'Actualizaciones periódicas de seguridad y plugins. Monitoreo de rendimiento y copias de seguridad. Resolución de incidencias y soporte técnico continuo.',
        href: '/servicios/soporte-mantenimiento'
      },
      {
        icon: 'Lightbulb',
        title: 'Consultoría Tecnológica',
        description: 'Asesoría para digitalización de procesos. Elección de plataformas adecuadas para cada negocio. Estrategias de escalabilidad y seguridad.',
        href: '/servicios/consultoria-tecnologica'
      },
    ],
  },
  hosting: {
    badge: "HOSTINGER PARTNER",
    title: "Hosting dinámico como tu negocio",
    subtitle: "Como partners oficiales de Hostinger, te ofrecemos la mejor tecnología para alojar tu proyecto. Usa nuestro cupón para obtener un 20% de descuento adicional sobre sus promociones. Además, como servicio añadido, nosotros configuraremos tus correos profesionales y el certificado SSL de forma gratuita.",
    features: [
      "Migración de dominios y sitios web gratis",
      "Ejecuta WordPress o cualquier otro CMS",
      "Hosting web totalmente administrado",
      "Soporte en directo y en español 24/7",
    ],
    guaranteeText: "Garantía de reembolso de 30 días",
    ctaButton: "Obtener Descuento",
    couponCode: "DEVMARK",
    copyButton: "Copiar Código",
    copiedButton: "¡Copiado!",
    discountText: "20% de descuento",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
  world: {
    title: 'Desarrollamos proyectos para todo el mundo',
    subtitle: 'Soluciones Globales, Impacto Local',
    description: 'Somos una empresa con alcance mundial, brindando servicios a clientes en América y Europa. Entendemos los matices de los diferentes mercados y adaptamos nuestras soluciones para satisfacer las necesidades específicas de cada región.',
    ctaButton: 'Inicia tu proyecto',
    ctaButton2: 'Ver Proyectos',
    ctaButton2Link: 'https://asistente-inoia-tbuk.vercel.app/',
    stats: [
      {
        value: "95%",
        label: "Satisfacción del Cliente",
        description: "Clientes satisfechos de países como Perú, EE. UU., España y más."
      },
      {
        value: "+50%",
        label: "Aumento de Tráfico",
        description: "Crecimiento promedio en tráfico orgánico con nuestras estrategias de SEO."
      },
      {
        value: "24/7",
        label: "Soporte Global",
        description: "Soporte continuo adaptado a tu zona horaria."
      },
      {
        value: "100+",
        label: "Proyectos Exitosos",
        description: "Lanzados para empresas en América y Europa."
      }
    ]
  },
  testimonials: {
    badge: 'TESTIMONIOS',
    title: 'Lo que dicen nuestros clientes',
    subtitle: 'La confianza de empresas de todo el mundo es nuestro mayor logro.',
    items: [
      {
        name: "Carlos Rodriguez",
        company: "Inka Corp, Perú",
        avatar: "CR",
        image: "https://placehold.co/100x100.png",
        hint: "man portrait",
        quote: "DevMark transformó nuestra presencia en línea. Su conocimiento del mercado internacional es inigualable. ¡Muy recomendados!"
      },
      {
        name: "John Smith",
        company: "USA Tech, EE.UU.",
        avatar: "JS",
        image: "https://placehold.co/100x100.png",
        hint: "woman portrait",
        quote: "El equipo de desarrollo de software superó nuestras expectativas. Entregaron un producto robusto y a tiempo para nuestras operaciones globales."
      },
      {
        name: "Luis Torres",
        company: "Andes Adventures, Bolivia",
        avatar: "LT",
        image: "https://placehold.co/100x100.png",
        hint: "man smiling",
        quote: "Gracias a su estrategia SEO, nuestras reservas online aumentaron un 70% a nivel mundial. Son verdaderos expertos."
      },
      {
        name: "Ana García",
        company: "Soluciones Digitales, España",
        avatar: "AG",
        image: "https://placehold.co/100x100.png",
        hint: "woman professional",
        quote: "Un equipo excepcional que entiende los matices de diferentes mercados. Nos ayudaron a expandirnos en Latinoamérica con éxito."
      },
      {
        name: 'Sophie Dubois',
        company: 'Chic Boutique, Francia',
        avatar: 'SD',
        image: 'https://placehold.co/100x100.png',
        hint: 'woman stylish',
        quote: 'El chatbot con IA que desarrollaron para nosotros ha revolucionado nuestro servicio al cliente. Es inteligente, rápido y ha incrementado nuestras ventas.'
      },
      {
        name: 'David Chen',
        company: 'Innovate Startup, Canadá',
        avatar: 'DC',
        image: 'https://placehold.co/100x100.png',
        hint: 'man thinking',
        quote: 'La automatización de procesos nos ahorró cientos de horas. Su capacidad para entender nuestras necesidades e implementar soluciones efectivas es increíble.'
      },
      {
        name: 'Fatima Al-Jamil',
        company: 'Global Exports, EAU',
        avatar: 'FA',
        image: 'https://placehold.co/100x100.png',
        hint: 'woman smiling',
        quote: 'Encargamos un CRM a medida y el resultado fue perfecto. Se adapta a nuestro flujo de trabajo y ha mejorado la eficiencia de nuestro equipo notablemente.'
      },
      {
        name: 'Liam Murphy',
        company: 'Creative Agency, Irlanda',
        avatar: 'LM',
        image: 'https://placehold.co/100x100.png',
        hint: 'man creative',
        quote: 'El diseño y la experiencia de usuario de nuestra nueva web es simplemente espectacular. Han captado la esencia de nuestra marca a la perfección.'
      },
      {
        name: 'Yuki Tanaka',
        company: 'Tokyo Games, Japón',
        avatar: 'YT',
        image: 'https://placehold.co/100x100.png',
        hint: 'man gaming',
        quote: 'Su servicio de soporte y mantenimiento nos da la tranquilidad que necesitamos. Siempre están disponibles y resuelven cualquier problema con rapidez.'
      },
      {
        name: 'Maria Rossi',
        company: 'Gastronomía Italiana, Italia',
        avatar: 'MR',
        image: 'https://placehold.co/100x100.png',
        hint: 'woman cooking',
        quote: 'La consultoría tecnológica fue clave para nuestra transformación digital. Nos guiaron paso a paso en la elección de las mejores herramientas para nuestro negocio.'
      }
    ]
  },
  contact: {
    lang: 'es',
    title: "Hablemos de tu Proyecto",
    description: "¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo global se pondrá en contacto contigo.",
    contactSubtitle: "Contáctanos ahora",
    emailLabel: "Correo:",
    email: "contacto@devmarkpe.com",
    phoneLabel: "Teléfono:",
    phone: "+51 975 646 074",
    timeZoneLabel: "Horario:",
    formTitle: "Formulario de Contacto",
    formDescription: "Envíanos un mensaje y empecemos a construir algo increíble juntos.",
    firstNameLabel: "Nombres",
    firstNamePlaceholder: "Tus nombres",
    lastNameLabel: "Apellidos",
    lastNamePlaceholder: "Tus apellidos",
    emailFormLabel: "Dirección de Correo",
    emailPlaceholder: "tu@email.com",
    phoneFormLabel: "Teléfono",
    phonePlaceholder: "Tu número de teléfono",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto...",
    submitButton: "Enviar Mensaje",
    scheduleButton: "Agendar reunión por Meet",
    quoteButton: "Cotiza tu Proyecto con nuestra IA"
  },
  footer: {
    copyright: "DevMark. Todos los derechos reservados."
  }
};


export default function Home() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <Hero {...content.hero} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40 pt-0">
            <Services {...content.services} />
            <World {...content.world} />
            <AdditionalServices {...content.additionalServices} />
            <Hosting {...content.hosting} />
            <Testimonials {...content.testimonials} />
            <Contact {...content.contact} />
          </div>
        </div>
      </main>
      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
