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
  badge: "Experiencia de Usuario",
  title: "Diseño UI/UX",
  description: "Creamos interfaces intuitivas y atractivas centradas en el usuario. Desde la investigación inicial hasta los prototipos interactivos y el diseño visual final, nos aseguramos de que tu producto sea fácil de usar y visualmente impactante.",
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
  title: 'Cómo diseñamos tu producto',
  subtitle: 'Un proceso centrado en el usuario para crear interfaces intuitivas y visualmente impactantes.',
  steps: [
    { title: 'Investigar al usuario', description: "Comprendemos a tu público objetivo a través de entrevistas, encuestas y análisis para crear soluciones que realmente satisfagan sus necesidades." },
    { title: 'Prototipar ideas', description: "Creamos esquemas y prototipos interactivos que permiten visualizar y probar la estructura y el flujo de la aplicación antes del desarrollo." },
    { title: 'Diseñar la interfaz', description: "Diseñamos interfaces modernas, limpias y estéticamente agradables que reflejan la identidad de tu marca y guían al usuario de forma natural." },
    { title: 'Adaptar a cada pantalla', description: "Aseguramos que la experiencia de usuario sea óptima en cualquier dispositivo, ya sea móvil, tableta o escritorio." },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cuál es la diferencia entre UI y UX?",
      answer: "UX (User Experience) se centra en la experiencia general del usuario y cómo se siente al interactuar con el producto. UI (User Interface) se enfoca en el diseño visual y los elementos interactivos de la interfaz. Ambos son cruciales para un producto exitoso."
    },
    {
      question: "¿Trabajan con sistemas de diseño existentes?",
      answer: "Sí, podemos trabajar con tu sistema de diseño actual para mantener la consistencia de tu marca o podemos crear uno nuevo desde cero si es necesario."
    },
    {
      question: "¿Qué herramientas de diseño utilizan?",
      answer: "Utilizamos herramientas estándar de la industria como Figma, Sketch y Adobe XD para el diseño de interfaces, prototipado y colaboración con el equipo de desarrollo."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 1800",
        description: "Diseño UI/UX de una landing o web básica.",
        features: [
          "Wireframes y prototipo",
          "Diseño UI a medida",
          "Diseño responsive",
          "Guía de estilos básica",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 3200",
        description: "Diseño UI/UX completo de web corporativa.",
        features: [
          "Todo lo del plan Emprendedor",
          "Arquitectura de la información",
          "Hasta 10 pantallas",
          "Design system / componentes",
          "Prototipo interactivo",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "Diseño UX/UI de plataforma o aplicación.",
        features: [
          "Todo lo del plan Negocio",
          "Pantallas ilimitadas",
          "Pruebas de usabilidad",
          "Documentación del sistema",
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

export default function UiUxDesignPage() {
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