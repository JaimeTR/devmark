// Contenido de la portada en espanol e ingles. Hoy vive en el codigo; cuando exista el
// CMS del ERP (modulo `publico`), esta es la forma que debe devolver la API.

export type Lang = 'es' | 'en';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  country: string;
  /** Servicio que contrato, tal como aparece en la web (p. ej. "Desarrollo web a medida"). */
  service: string;
  quote: string;
}

// Solo testimonios REALES y aprobados por el cliente (nombre, empresa y pais verdaderos).
// Borradores para pedir aprobacion en docs/testimonios-borrador.md. Vacio = la seccion
// muestra clientes y paises en lugar de citas.
export const testimonials: Record<'es' | 'en', Testimonial[]> = {
  es: [],
  en: [],
};

export const processSteps = {
  es: [
      { number: '01', title: 'Agendar cita', description: 'Coordinamos una reunion para conocer tu negocio, tus objetivos y el tipo de web que necesitas.' },
      { number: '02', title: 'Definimos tus objetivos', description: 'Analizamos tu empresa, tus servicios y el publico al que deseas llegar para construir una web alineada a tus metas.' },
      { number: '03', title: 'Diseñamos la estructura', description: 'Organizamos el contenido en secciones claras y una navegacion intuitiva para mejorar la experiencia del usuario.' },
      { number: '04', title: 'Creamos el diseño visual', description: 'Desarrollamos una interfaz atractiva, moderna y profesional que represente la identidad de tu marca.' },
      { number: '05', title: 'Construimos tu sitio web', description: 'Maquetamos cada pagina con enfoque estrategico, utilizando llamadas a la accion pensadas para captar la atencion.' },
      { number: '06', title: 'Revisamos y optimizamos', description: 'Validamos cada seccion, optimizamos la velocidad de carga y verificamos la correcta visualizacion en todos los dispositivos.' },
      { number: '07', title: 'Lanzamos tu sitio', description: 'Publicamos tu web y la dejamos lista para que empieces a recibir visitas y potenciales clientes.' },
    ],
  en: [
      { number: '01', title: 'Book a meeting', description: 'We coordinate a meeting to understand your business, your goals, and the type of website you need.' },
      { number: '02', title: 'Define your goals', description: 'We analyze your company, your services, and the audience you want to reach to build a website aligned with your goals.' },
      { number: '03', title: 'Design the structure', description: 'We organize content into clear sections and intuitive navigation to improve the user experience.' },
      { number: '04', title: 'Create the visual design', description: 'We develop an attractive, modern, and professional interface that represents your brand identity.' },
      { number: '05', title: 'Build your website', description: 'We build each page with a strategic focus, using calls to action designed to capture attention.' },
      { number: '06', title: 'Review and optimize', description: 'We validate each section, optimize loading speed, and verify correct display on all devices.' },
      { number: '07', title: 'Launch your site', description: 'We publish your website and get it ready for you to start receiving visitors and potential clients.' },
    ],
} as const;

export const contactContent = {
  es: {
    lang: 'es',
    title: "Hablemos de tu proyecto",
    description: "¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo se pondrá en contacto contigo.",
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
    scheduleButton: 'Agendar videollamada',
    quoteButton: "Cotiza con nuestra IA"
  },
  en: {
    lang: 'en',
    title: "Let's talk about your project",
    description: "Ready to take your business to the next level? Complete the form or schedule a meeting and our team will contact you shortly.",
    contactSubtitle: "Contact us now",
    emailLabel: "Email:",
    email: "contacto@devmarkpe.com",
    phoneLabel: "Phone:",
    phone: "+51 975 646 074",
    timeZoneLabel: "Schedule:",
    formTitle: "Contact form",
    formDescription: "Send us a message and let's start building something amazing together.",
    firstNameLabel: "First name",
    firstNamePlaceholder: "Your first name",
    lastNameLabel: "Last name",
    lastNamePlaceholder: "Your last name",
    emailFormLabel: "Email address",
    emailPlaceholder: "your@email.com",
    phoneFormLabel: "Phone",
    phonePlaceholder: "Your phone number",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your project...",
    submitButton: "Send message",
    scheduleButton: 'Book a video call',
    quoteButton: "Quote with our AI"
  },
} as const;

export const hostingContent = {
  es: {
    badge: "HOSTINGER PARTNER",
    title: "Hosting dinámico como tu negocio",
    subtitle: "Somos socios directos de Hostinger. Con nuestro código DEVMARK tienes descuento en todos sus servicios: hosting, VPS, dominios y correos corporativos. Además configuramos gratis tus correos profesionales y el certificado SSL.",
    features: [
      "Descuento en hosting, VPS, dominios y correos",
      "Migración de dominios y sitios web gratis",
      "Correos corporativos y SSL configurados por nosotros",
      "Soporte en directo y en español 24/7",
    ],
    guaranteeText: "Garantía de reembolso de 30 días",
    ctaButton: "Obtener descuento",
    couponCode: "DEVMARK",
    copyButton: "Copiar código",
    copiedButton: "¡Código copiado!",
    discountText: "20% de descuento",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
  en: {
    badge: "HOSTINGER PARTNER",
    title: "Hosting as dynamic as your business",
    subtitle: "We are direct Hostinger partners. With our DEVMARK code you get a discount on all their services: hosting, VPS, domains and professional email. We also set up your professional email and SSL certificate for free.",
    features: [
      "Discount on hosting, VPS, domains and email",
      "Free domain and website migration",
      "Professional email and SSL set up by us",
      "Live support 24/7",
    ],
    guaranteeText: "30-day money-back guarantee",
    ctaButton: "Get discount",
    couponCode: "DEVMARK",
    copyButton: "Copy code",
    copiedButton: "Code copied!",
    discountText: "20% discount",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
} as const;
