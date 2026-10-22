// Contenido de la portada en espanol e ingles. Hoy vive en el codigo; cuando exista el
// CMS del ERP (modulo `publico`), esta es la forma que debe devolver la API.

export type Lang = 'es' | 'en';

export const testimonials = {
  es: [
      {
        name: "Carlos Rodriguez",
        company: "Inka Corp, Perú",
        avatar: "CR",
        image: "/testimonials/uifaces-human-avatar.jpg",
        hint: "man portrait",
        quote: "DEVMARK transformó nuestra presencia en línea. Su conocimiento del mercado internacional es inigualable. ¡Muy recomendados!"
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
    ],
  en: [
      {
        name: "Carlos Rodriguez",
        company: "Inka Corp, Peru",
        avatar: "CR",
        image: "/testimonials/uifaces-human-avatar.jpg",
        hint: "man portrait",
        quote: "DEVMARK transformed our online presence. Their knowledge of the international market is unmatched. Highly recommended!"
      },
      {
        name: "John Smith",
        company: "USA Tech, USA",
        avatar: "JS",
        image: "/testimonials/uifaces-human-avatar (1).jpg",
        hint: "woman portrait",
        quote: "The software development team exceeded our expectations. They delivered a robust and timely product for our global operations."
      },
      {
        name: "Luis Torres",
        company: "Andes Adventures, Bolivia",
        avatar: "LT",
        image: "/testimonials/uifaces-human-avatar (2).jpg",
        hint: "man smiling",
        quote: "Thanks to their SEO strategy, our online bookings increased by 70% worldwide. They are true experts."
      },
      {
        name: "Ana García",
        company: "Soluciones Digitales, Spain",
        avatar: "AG",
        image: "/testimonials/uifaces-human-avatar (3).jpg",
        hint: "woman professional",
        quote: "An exceptional team that understands the nuances of different markets. They helped us expand into Latin America successfully."
      },
      {
        name: 'Sophie Dubois',
        company: 'Chic Boutique, France',
        avatar: 'SD',
        image: '/testimonials/uifaces-human-avatar (4).jpg',
        hint: 'woman stylish',
        quote: 'The AI chatbot they developed for us has revolutionized our customer service. It is intelligent, fast and has increased our sales.'
      },
      {
        name: 'David Chen',
        company: 'Innovate Start-up, Canada',
        avatar: 'DC',
        image: '/testimonials/uifaces-popular-avatar.jpg',
        hint: 'man thinking',
        quote: 'The process automation saved us hundreds of hours. Their ability to understand our needs and implement effective solutions is incredible.'
      },
      {
        name: 'Fatima Al-Jamil',
        company: 'Global Exports, UAE',
        avatar: 'FA',
        image: '/testimonials/uifaces-popular-avatar (1).jpg',
        hint: 'woman smiling',
        quote: 'We commissioned a custom CRM and the result was perfect. It fits our workflow and has significantly improved our team\'s efficiency.'
      },
      {
        name: 'Liam Murphy',
        company: 'Creative Agency, Ireland',
        avatar: 'LM',
        image: '/testimonials/uifaces-popular-avatar (2).jpg',
        hint: 'man creative',
        quote: 'The design and user experience of our new website is simply spectacular. They have captured the essence of our brand perfectly.'
      },
      {
        name: 'Yuki Tanaka',
        company: 'Tokyo Games, Japan',
        avatar: 'YT',
        image: '/testimonials/uifaces-popular-avatar (3).jpg',
        hint: 'man gaming',
        quote: 'Their technical support and maintenance service gives us the peace of mind we need. They are always available and solve any problem quickly.'
      },
      {
        name: 'Maria Rossi',
        company: 'Gastronomía Italiana, Italy',
        avatar: 'MR',
        image: '/testimonials/uifaces-popular-avatar (4).jpg',
        hint: 'woman cooking',
        quote: 'The technology consulting was key to our digital transformation. They guided us step by step in choosing the best tools for our business.'
      }
    ],
} as const;

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
    quoteButton: "Cotiza con nuestra IA"
  },
  en: {
    lang: 'en',
    title: "Let's talk about your project",
    description: "Ready to take your business to the next level? Complete the form or schedule a meeting and our global team will contact you shortly.",
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
    scheduleButton: "Schedule a meeting with Meet",
    quoteButton: "Quote with our AI"
  },
} as const;

export const hostingContent = {
  es: {
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
    copiedButton: "¡Código copiado!",
    discountText: "20% de descuento",
    referralLink: "https://hostinger.com?REFERRALCODE=JAIMETRDEV"
  },
  en: {
    badge: "HOSTINGER PARTNER",
    title: "Hosting as dynamic as your business",
    subtitle: "As official Hostinger partners, we offer you the best technology to host your project. Use our coupon to get an additional 20% discount on top of their promotions. Plus, as an added service, we will configure your professional emails and SSL certificate for free.",
    features: [
      "Free domain and website migration",
      "Run WordPress or any other CMS",
      "Fully managed web hosting",
      "Live support in English 24/7",
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
