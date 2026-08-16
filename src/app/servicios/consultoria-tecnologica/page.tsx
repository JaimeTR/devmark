
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
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const heroContent = {
  badge: "Estrategia y Crecimiento",
  title: "Consultoría tecnológica",
  description: "Te guiamos en la transformación digital de tu negocio, ayudándote a elegir las herramientas adecuadas, optimizar procesos y construir una estrategia tecnológica sólida y escalable.",
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
  title: 'Nuestro enfoque de consultoría',
  subtitle: 'Un acompañamiento estratégico para transformar tu negocio de forma sostenible.',
  steps: [
    { title: 'Digitalización de procesos', description: 'Analizamos tus operaciones y te proponemos un plan para digitalizar y automatizar tareas, aumentando la eficiencia y reduciendo costos.' },
    { title: 'Selección de plataformas', description: 'Te ayudamos a elegir las plataformas (CRM, ERP, CMS) que mejor se adapten a tus necesidades y presupuesto, asegurando una implementación exitosa.' },
    { title: 'Estrategias de escalabilidad', description: 'Planificamos la arquitectura de tu software y sistemas para que puedan crecer junto con tu negocio de manera sostenible y segura.' },
    { title: 'Innovación y nuevas tecnologías', description: 'Te mantenemos a la vanguardia, explorando cómo las nuevas tecnologías como la IA pueden aportar valor y una ventaja competitiva a tu empresa.' },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Mi empresa es demasiado pequeña para una consultoría?",
      answer: "No, la consultoría tecnológica es valiosa para empresas de todos los tamaños. Para las pymes, puede ser clave para establecer una base tecnológica sólida que permita un crecimiento futuro sin problemas."
    },
    {
      question: "¿Cómo sé qué tecnología es la correcta para mí?",
      answer: "Ese es nuestro trabajo. Realizamos un análisis exhaustivo de tu negocio, tus objetivos y tu presupuesto para recomendarte soluciones a medida que realmente resuelvan tus problemas."
    },
    {
      question: "¿La consultoría incluye la implementación?",
      answer: "La consultoría se centra en la estrategia y la planificación. Sin embargo, como agencia de desarrollo, podemos ofrecerte un servicio integral que cubra desde la consultoría hasta la implementación y el soporte."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 30",
        description: "Consultoría puntual, paga solo las horas que uses.",
        period: "/hora",
        features: [
          "Asesoría tecnológica on-demand",
          "Análisis de tu necesidad",
          "Recomendaciones accionables",
          "Sin permanencia"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 450",
        description: "Pack de 15 horas de consultoría para tu proyecto.",
        features: [
          "Todo lo del plan Emprendedor",
          "15 horas de consultoría",
          "Plan de mejora tecnológica",
          "Prioridad de atención"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "S/ 900",
        description: "Pack de 30 horas de consultoría estratégica.",
        features: [
          "Todo lo del plan Negocio",
          "30 horas de consultoría",
          "Estrategia tecnológica integral",
          "Acompañamiento del proyecto",
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
};

const footerContent = {
    copyright: "DevMark. Todos los derechos reservados."
};

export default function TechConsultingPage() {
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
