
import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Hero } from '@/components/home/hero';
import { ClientLogos } from '@/components/home/client-logos';
import { Strategy } from '@/components/home/strategy';
import { Services } from '@/components/home/services';
import { Advantages } from '@/components/home/advantages';
import { Process } from '@/components/home/process';
import { Testimonials } from '@/components/home/testimonials';
import { Contact } from '@/components/home/contact';
import { Footer } from '@/components/home/footer';
import { AdditionalServices } from '@/components/home/additional-services';
import { Hosting } from '@/components/home/hosting';
import { FeaturedProjectsCarousel } from '@/components/home/featured-projects-carousel';
import { getProjects } from '@/data/projects';


const content = {
  lang: 'es',
  header: {
    navLinks: [
      { href: '#hero', label: 'Inicio' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/contacto', label: 'Contacto' },
    ],
    contactButton: 'Contactar',
    aiAssistant: 'Asistente IA',
    aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
  },
  hero: {
    badgeMessages: ['DEVMARK, TU SOCIO DIGITAL EN PERU', 'Hablemos de tu proyecto hoy'],
    title: 'Agencia de desarrollo web y software',
    description: 'Creamos paginas web, tiendas online, software personalizado, automatizaciones, chatbots con IA y estrategias de SEO en Lima, Peru. Impulsamos empresas peruanas al mundo digital.',
    servicesButton: 'Servicios',
    contactButton: 'Agendar reunion',
    stats: [
      { value: '100+', label: 'Clientes Satisfechos' },
      { value: '6', label: 'Marcas Colaboradoras' },
      { value: '91%', label: 'Mayor Rapidez de Ejecución' },
    ],
    clients: [
      'ADLIM', 'JOPCO', 'TAKLAB', 'LUCE INMOBILIARIA', 'MEMORANDUM', 'MM TECH',
      'DETALZONE', 'SUPERPROFE', 'NEWDENIM', 'OFFROADPERU', 'BREEZLINGO', 'AS ABOGADOS',
    ],
    overlayItems: [
      '+100 proyectos entregados para negocios en Perú.',
      '91% más rápido en tiempos de ejecución.',
    ],
  },
  strategy: {
    headerText: 'Creemos que cada marca tiene una historia única. Por eso combinamos estrategia, diseño y tecnología para ayudar a los negocios a crecer con claridad.',
    headerTitle: 'Devmark fusiona estrategia y diseño para crear marcas de impacto',
    overlayText: 'Impulsamos tu negocio con propósito y dirección clara.',
    cardTitle: 'Pensamiento estratégico que impulsa resultados',
    cardDescription: 'Desarrollamos soluciones personalizadas que se alinean con tus objetivos, asegurando que cada decisión esté respaldada por datos y propósito. Nuestro enfoque se centra en resultados medibles.',
    ctaPrimary: 'Comenzar crecimiento',
  },
  services: {
    title: 'Servicios principales',
    subtitle: 'Soluciones integrales para llevar tu empresa al siguiente nivel.',
    moreInfoButton: 'Más información',
    items: [
      {
        icon: 'CodeXml',
        title: "Desarrollo web a medida",
        description: "Creación de sitios web personalizados programados desde cero para webs corporativas, landing pages y PWAs.",
        tags: ["Webs corporativas", "Landing pages", "PWAs"],
        href: '/servicios/desarrollo-web-a-medida'
      },
      {
        icon: 'Palette',
        title: "Desarrollo con CMS y plataformas",
        description: "Construcción de sitios y tiendas online con WordPress, Shopify y otras plataformas. E-commerce con integraciones de pago.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/servicios/desarrollo-cms'
      },
      {
        icon: 'ServerCog',
        title: "Desarrollo de software a medida",
        description: "Sistemas internos (ERP, CRM), SaaS y APIs. Integraciones entre herramientas para unificar datos y procesos.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/servicios/desarrollo-software'
      },
      {
        icon: 'Zap',
        title: "Automatización de procesos",
        description: "Flujos automáticos con Zapier/Make/APIs para leads, ventas, reportes, notificaciones y tareas de back-office.",
        tags: ["Zapier", "Make", "Automatización de leads"],
        href: '/servicios/automatizacion-procesos'
      },
      {
        icon: 'Bot',
        title: "Chatbots con IA",
        description: "Chatbots para web, e-commerce y redes sociales, entrenados con tu base de conocimiento para soporte y ventas 24/7.",
        tags: ["Chatbots web", "Redes sociales", "Soporte 24/7"],
        href: '/servicios/chatbots-ia'
      },
      {
        icon: 'LineChart',
        title: "SEO y optimización web",
        description: "Estrategia, SEO técnico y de contenidos, Core Web Vitals y para e-commerce. Aumenta tráfico orgánico y conversiones.",
        tags: ["Estrategia SEO", "Core Web Vitals", "Tráfico"],
        href: '/servicios/seo-optimizacion'
      }
    ]
  },
  additionalServices: {
    title: 'Servicios complementarios',
    subtitle: 'Servicios que refuerzan el desarrollo tecnológico principal',
    moreInfoButton: 'Más información',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'Diseño UI/UX',
        description: 'Diseño centrado en la experiencia del usuario. Prototipado y wireframes interactivos. Interfaces modernas, limpias y responsivas.',
        href: '/servicios/diseno-ui-ux'
      },
      {
        icon: 'Megaphone',
        title: 'Marketing digital',
        description: 'Estrategias de crecimiento y captación de clientes. Campañas publicitarias (Google Ads, Meta Ads). Email marketing y automatización de ventas.',
        href: '/servicios/marketing-digital'
      },
      {
        icon: 'Wrench',
        title: 'Soporte y mantenimiento',
        description: 'Actualizaciones periódicas de seguridad y plugins. Monitoreo de rendimiento y copias de seguridad. Resolución de incidencias y soporte técnico continuo.',
        href: '/servicios/soporte-mantenimiento'
      },
      {
        icon: 'Lightbulb',
        title: 'Consultoría tecnológica',
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
    ctaButton: "Obtener descuento",
    couponCode: "DEVMARK",
    copyButton: "Copiar código",
    copiedButton: "¡Copiado!",
    discountText: "20% de descuento",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
  advantages: {
    badge: 'Nuestros proyectos',
    title: 'Las soluciones que nos hacen diferentes',
    description: 'Combinamos creatividad con rigurosas pruebas tecnologicas para verificar cada componente antes del despliegue, asegurando resultados de alto rendimiento en cada proyecto.',
    stats: [
      { value: 'Regional', label: 'Alcance total' },
      { value: 'Miles+', label: 'Conversiones' },
    ],
    clients: [
      { name: 'WordPress', icon: 'Globe' },
      { name: 'Next.js', icon: 'Layers' },
      { name: 'React', icon: 'Sparkles' },
      { name: 'Tailwind', icon: 'Compass' },
    ],
  },
  process: {
    badge: 'Como trabajamos',
    title: 'Cuando trabajas con nosotros',
    subtitle: 'Un proceso estructurado en 7 pasos para llevar tu proyecto desde la idea hasta el lanzamiento.',
    steps: [
      { number: '01', title: 'Agendar cita', description: 'Coordinamos una reunion para conocer tu negocio, tus objetivos y el tipo de web que necesitas.' },
      { number: '02', title: 'Definimos tus objetivos', description: 'Analizamos tu empresa, tus servicios y el publico al que deseas llegar para construir una web alineada a tus metas.' },
      { number: '03', title: 'Diseñamos la estructura', description: 'Organizamos el contenido en secciones claras y una navegacion intuitiva para mejorar la experiencia del usuario.' },
      { number: '04', title: 'Creamos el diseño visual', description: 'Desarrollamos una interfaz atractiva, moderna y profesional que represente la identidad de tu marca.' },
      { number: '05', title: 'Construimos tu sitio web', description: 'Maquetamos cada pagina con enfoque estrategico, utilizando llamadas a la accion pensadas para captar la atencion.' },
      { number: '06', title: 'Revisamos y optimizamos', description: 'Validamos cada seccion, optimizamos la velocidad de carga y verificamos la correcta visualizacion en todos los dispositivos.' },
      { number: '07', title: 'Lanzamos tu sitio', description: 'Publicamos tu web y la dejamos lista para que empieces a recibir visitas y potenciales clientes.' },
    ],
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
        image: "/testimonials/uifaces-human-avatar.jpg",
        hint: "man portrait",
        quote: "DevMark transformó nuestra presencia en línea. Su conocimiento del mercado internacional es inigualable. ¡Muy recomendados!"
      },
      {
        name: "John Smith",
        company: "USA Tech, EE.UU.",
        avatar: "JS",
        image: "/testimonials/uifaces-human-avatar (1).jpg",
        hint: "woman portrait",
        quote: "El equipo de desarrollo de software superó nuestras expectativas. Entregaron un producto robusto y a tiempo para nuestras operaciones globales."
      },
      {
        name: "Luis Torres",
        company: "Andes Adventures, Bolivia",
        avatar: "LT",
        image: "/testimonials/uifaces-human-avatar (2).jpg",
        hint: "man smiling",
        quote: "Gracias a su estrategia SEO, nuestras reservas online aumentaron un 70% a nivel mundial. Son verdaderos expertos."
      },
      {
        name: "Ana García",
        company: "Soluciones Digitales, España",
        avatar: "AG",
        image: "/testimonials/uifaces-human-avatar (3).jpg",
        hint: "woman professional",
        quote: "Un equipo excepcional que entiende los matices de diferentes mercados. Nos ayudaron a expandirnos en Latinoamérica con éxito."
      },
      {
        name: 'Sophie Dubois',
        company: 'Chic Boutique, Francia',
        avatar: 'SD',
        image: '/testimonials/uifaces-human-avatar (4).jpg',
        hint: 'woman stylish',
        quote: 'El chatbot con IA que desarrollaron para nosotros ha revolucionado nuestro servicio al cliente. Es inteligente, rápido y ha incrementado nuestras ventas.'
      },
      {
        name: 'David Chen',
        company: 'Innovate Startup, Canadá',
        avatar: 'DC',
        image: '/testimonials/uifaces-popular-avatar.jpg',
        hint: 'man thinking',
        quote: 'La automatización de procesos nos ahorró cientos de horas. Su capacidad para entender nuestras necesidades e implementar soluciones efectivas es increíble.'
      },
      {
        name: 'Fatima Al-Jamil',
        company: 'Global Exports, EAU',
        avatar: 'FA',
        image: '/testimonials/uifaces-popular-avatar (1).jpg',
        hint: 'woman smiling',
        quote: 'Encargamos un CRM a medida y el resultado fue perfecto. Se adapta a nuestro flujo de trabajo y ha mejorado la eficiencia de nuestro equipo notablemente.'
      },
      {
        name: 'Liam Murphy',
        company: 'Creative Agency, Irlanda',
        avatar: 'LM',
        image: '/testimonials/uifaces-popular-avatar (2).jpg',
        hint: 'man creative',
        quote: 'El diseño y la experiencia de usuario de nuestra nueva web es simplemente espectacular. Han captado la esencia de nuestra marca a la perfección.'
      },
      {
        name: 'Yuki Tanaka',
        company: 'Tokyo Games, Japón',
        avatar: 'YT',
        image: '/testimonials/uifaces-popular-avatar (3).jpg',
        hint: 'man gaming',
        quote: 'Su servicio de soporte y mantenimiento nos da la tranquilidad que necesitamos. Siempre están disponibles y resuelven cualquier problema con rapidez.'
      },
      {
        name: 'Maria Rossi',
        company: 'Gastronomía Italiana, Italia',
        avatar: 'MR',
        image: '/testimonials/uifaces-popular-avatar (4).jpg',
        hint: 'woman cooking',
        quote: 'La consultoría tecnológica fue clave para nuestra transformación digital. Nos guiaron paso a paso en la elección de las mejores herramientas para nuestro negocio.'
      }
    ]
  },
  contact: {
    lang: 'es',
    title: "Hablemos de tu proyecto",
    description: "¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo global se pondrá en contacto contigo.",
    contactSubtitle: "Contáctanos ahora",
    emailLabel: "Correo:",
    email: "contacto@devmarkpe.com",
    phoneLabel: "Teléfono:",
    phone: "+51 975 646 074",
    timeZoneLabel: "Horario:",
    formTitle: "Formulario de contacto",
    formDescription: "Envíanos un mensaje y empecemos a construir algo increíble juntos.",
    firstNameLabel: "Nombres",
    firstNamePlaceholder: "Tus nombres",
    lastNameLabel: "Apellidos",
    lastNamePlaceholder: "Tus apellidos",
    emailFormLabel: "Dirección de correo",
    emailPlaceholder: "tu@email.com",
    phoneFormLabel: "Teléfono",
    phonePlaceholder: "Tu número de teléfono",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto...",
    submitButton: "Enviar mensaje",
    scheduleButton: "Agendar reunión por Meet",
    quoteButton: "Cotiza tu proyecto con nuestra IA"
  },
  footer: {
    copyright: "DevMark. Todos los derechos reservados."
  }
} as const;

 
export default function Home() {
  const projects = getProjects('es');
   
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <Hero {...content.hero} />
        <ClientLogos stats={content.hero.stats} clients={content.hero.clients} />
        <Strategy {...content.strategy} />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-0 pt-0">
            <Services {...content.services} />
            <div>
              <Advantages {...content.advantages} />
              <FeaturedProjectsCarousel 
                projects={projects}
                lang="es"
                title="Proyectos destacados"
                subtitle="Conoce algunos de nuestros mejores trabajos"
                viewMoreText="Ver mas proyectos"
                statsLabel="PROYECTOS"
                statsDescription="Experiencia continua en proyectos personales, agencias y como desarrollador autonomo."
              />
            </div>
            <AdditionalServices {...content.additionalServices} />
            <Hosting {...content.hosting} />
            <Testimonials {...content.testimonials} />
            <Process {...content.process} />
            <Contact {...content.contact} />
          </div>
        </div>
      </main>
      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
