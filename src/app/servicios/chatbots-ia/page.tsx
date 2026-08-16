
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
  badge: "Asistentes Virtuales",
  title: "Chatbots con inteligencia artificial",
  description: "Implementamos chatbots inteligentes en tu web, e-commerce o redes sociales, entrenados con tu propia información para ofrecer soporte 24/7 y potenciar tus ventas.",
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
  title: 'Cómo implementamos tu chatbot',
  subtitle: 'Un proceso guiado para que tu asistente virtual atienda a tus clientes desde el primer día.',
  steps: [
    { title: 'Entrenamiento personalizado', description: 'Entrenamos al chatbot con tu base de conocimiento (documentos, web, FAQs) para que responda de forma precisa y coherente con tu marca.' },
    { title: 'Soporte 24/7', description: 'Tu chatbot atenderá consultas, resolverá dudas y guiará a los usuarios en cualquier momento, mejorando la satisfacción del cliente.' },
    { title: 'Asistente de ventas', description: 'El chatbot puede recomendar productos, responder preguntas sobre ellos y guiar a los clientes en el proceso de compra, aumentando las conversiones.' },
    { title: 'Integración multicanal', description: 'Desplegamos tu chatbot en tu sitio web, WhatsApp, Messenger y otras plataformas para que estés donde estén tus clientes.' },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿El chatbot puede entender preguntas complejas?",
      answer: "Sí, utilizamos modelos de lenguaje avanzados que permiten al chatbot comprender el contexto, la intención y las variaciones en las preguntas de los usuarios para dar respuestas coherentes y útiles."
    },
    {
      question: "¿Qué pasa si el chatbot no sabe la respuesta?",
      answer: "Configuramos un sistema de escalado para que, si el chatbot no puede resolver una consulta, pueda transferir la conversación a un agente humano de forma transparente."
    },
    {
      question: "¿Puedo ver las conversaciones que tiene el chatbot?",
      answer: "Sí, tendrás acceso a un panel donde podrás revisar las conversaciones, analizar las preguntas más frecuentes y obtener información valiosa sobre las necesidades de tus clientes."
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
        description: "Chatbot con flujos en WhatsApp o tu web.",
        features: [
          "Chatbot base conversacional",
          "Flujos y menús predefinidos",
          "Integración con WhatsApp",
          "Entrenamiento inicial",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 2500",
        description: "Chatbot con IA entrenado con tu negocio.",
        features: [
          "Todo lo del plan Emprendedor",
          "IA generativa personalizada",
          "Entrenamiento con tu info",
          "Integración multicanal",
          "Panel de conversaciones",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "Asistente IA integrado a tu operación.",
        features: [
          "Todo lo del plan Negocio",
          "Integración con CRM/ERP",
          "Asistente de ventas",
          "Automatización de pedidos",
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

export default function AIChatbotsPage() {
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
