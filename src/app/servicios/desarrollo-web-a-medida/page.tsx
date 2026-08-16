
import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/servicios', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/contacto', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: 'Hola, soy tu asistente de IA.',
};

const heroContent = {
  badge: "Nuestro servicio",
  title: "Desarrollo web a medida",
  description: "Creamos sitios web unicos y de alto rendimiento que se adaptan perfectamente a las necesidades de tu negocio. Desde el concepto hasta el lanzamiento, te acompañamos en cada paso del camino.",
  lang: 'es' as const,
  form: {
    title: 'Cuéntanos sobre tu proyecto',
    firstNameLabel: 'Nombres',
    firstNamePlaceholder: 'Tus nombres',
    emailLabel: 'Correo',
    emailPlaceholder: 'tu@email.com',
    phoneLabel: 'Teléfono',
    phonePlaceholder: 'Tu número de teléfono',
    messageLabel: 'Mensaje',
    messagePlaceholder: 'Cuéntanos qué necesitas para tu proyecto...',
    submitButton: 'Solicitar información',
    successMessage: '¡Mensaje enviado! Un asesor te contactará pronto.',
    errorMessage: 'Hubo un error al enviar. Por favor inténtalo de nuevo.',
  },
};

const methodologyContent = {
  badge: 'Nuestra metodología',
  title: 'Cómo desarrollamos tu web a medida',
  subtitle: 'Un proceso ágil en 4 pasos para entregar un sitio web profesional, optimizado y listo para convertir.',
  steps: [
    { title: 'Análisis del negocio', description: 'Estudiamos tu empresa, tu mercado y tu competencia para definir objetivos claros y una estrategia digital alineada a tus metas comerciales.' },
    { title: 'Diseño UX/UI', description: 'Creamos wireframes y flujos de navegación intuitivos, y los convertimos en interfaces visuales modernas, limpias y de alto impacto.' },
    { title: 'Maquetación y desarrollo', description: 'Programamos tu sitio con código limpio y tecnologías modernas, integrando funcionalidades, animaciones y SEO on-page para atraer tráfico orgánico.' },
    { title: 'Lanzamiento y autoadministración', description: 'Publicamos tu web, la probamos en todos los dispositivos y te capacitamos con un manual de uso para que gestiones tu contenido de forma autónoma.' },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "Cuanto tiempo toma desarrollar un sitio web a medida?",
      answer: "El tiempo de desarrollo varia segun la complejidad del proyecto, pero generalmente oscila entre 4 y 12 semanas. Te proporcionaremos un cronograma detallado al inicio del proyecto."
    },
    {
      question: "Que tipo de soporte ofrecen despues del lanzamiento?",
      answer: "Ofrecemos planes de mantenimiento y soporte continuo para asegurar que tu sitio web se mantenga actualizado, seguro y funcionando de manera optima."
    },
    {
      question: "Pueden integrar mi sitio con otras plataformas?",
      answer: "Por supuesto. Nos especializamos en la integracion con una amplia variedad de sistemas, incluyendo CRMs, ERPs, sistemas de pago y mas, para centralizar tus operaciones."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 1200",
        description: "Web básica de 1 a 3 páginas. Ideal para empezar.",
        features: [
          "1 a 3 páginas personalizadas",
          "Diseño web responsivo",
          "Optimización SEO básica",
          "Formulario de contacto",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..."
      },
      {
        name: "Negocio",
        price: "S/ 2500",
        description: "Web corporativa de hasta 8 páginas en crecimiento.",
        features: [
          "Todo lo del plan Emprendedor",
          "Hasta 8 páginas",
          "Blog incluido",
          "Integración con CMS",
          "Integración con WhatsApp",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...",
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "E-commerce o plataforma a medida.",
        features: [
          "Todo lo del plan Negocio",
          "Páginas ilimitadas",
          "Funcionalidades E-commerce",
          "Integraciones con pagos",
          "Soporte 24/7"
        ],
        buttonText: "Contactar",
        priceId: ""
      }
    ]
  };

const contactContent = {
    lang: 'es' as const,
    title: "Hablemos de tu proyecto",
    description: "Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunion y nuestro equipo se pondra en contacto contigo.",
    contactSubtitle: "Contactanos ahora",
    emailLabel: "Correo:",
    email: "contacto@devmarkpe.com",
    phoneLabel: "Telefono:",
    phone: "+51 975 646 074",
    timeZoneLabel: "Horario:",
    formTitle: "Formulario de contacto",
    formDescription: "Envianos un mensaje y empecemos a construir algo increible juntos.",
    firstNameLabel: "Nombres",
    firstNamePlaceholder: "Tus nombres",
    lastNameLabel: "Apellidos",
    lastNamePlaceholder: "Tus apellidos",
    emailFormLabel: "Direccion de correo",
    emailPlaceholder: "tu@email.com",
    phoneFormLabel: "Telefono",
    phonePlaceholder: "Tu numero de telefono",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuentanos sobre tu proyecto...",
    submitButton: "Enviar mensaje",
    scheduleButton: "Agendar reunion por Meet",
    quoteButton: "Cotiza tu proyecto con nuestra IA"
};

const footerContent = {
    copyright: "DevMark. Todos los derechos reservados."
};

export default function CustomWebDevelopmentPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
            <ServiceHero {...heroContent} />

            <Pricing {...pricingContent} />

            <ServiceMethodology {...methodologyContent} />

            <section id="faq" className="py-12 md:py-20 max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl sm:text-4xl text-center font-semibold tracking-tight mb-8">{faqContent.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqContent.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
