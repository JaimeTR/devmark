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
  badge: "Plataformas Populares",
  title: "Desarrollo con CMS y plataformas",
  description: "Creamos y personalizamos sitios web y tiendas online utilizando las plataformas más populares como WordPress y Shopify, garantizando una gestión de contenido sencilla y potentes capacidades de e-commerce.",
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
  title: 'Cómo construimos tu web',
  subtitle: 'Un proceso paso a paso para crear un sitio administrable, atractivo y listo para vender online.',
  steps: [
    { title: 'Personalizar el diseño', description: "Adaptamos plantillas premium o creamos diseños desde cero que reflejan tu marca y optimizan la experiencia del usuario en WordPress, Shopify, y otros CMS." },
    { title: 'Potenciar el e-commerce', description: "Configuramos tu tienda online con integraciones de pasarelas de pago (Stripe, PayPal) y sistemas de envío, lista para vender a nivel global." },
    { title: 'Asegurar la responsividad', description: "Aseguramos que tu sitio se vea y funcione perfectamente en todos los dispositivos, desde móviles hasta ordenadores de escritorio." },
    { title: 'Integrar funcionalidades', description: "Extendemos la funcionalidad de tu sitio con plugins para SEO, seguridad, marketing, y más, asegurando un rendimiento óptimo." },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Qué plataforma CMS es mejor para mi negocio?",
      answer: "La elección depende de tus necesidades. WordPress es ideal para sitios ricos en contenido y blogs, mientras que Shopify es una solución robusta y escalable para e-commerce. Te asesoramos para que tomes la mejor decisión."
    },
    {
      question: "¿Pueden migrar mi sitio existente a WordPress o Shopify?",
      answer: "Sí, ofrecemos servicios de migración completos para trasladar tu contenido, productos y datos de cliente a una nueva plataforma de manera segura y eficiente."
    },
    {
      question: "¿Mi tienda online será segura para aceptar pagos?",
      answer: "Absolutamente. Implementamos las mejores prácticas de seguridad y configuramos pasarelas de pago reconocidas y seguras para proteger las transacciones de tus clientes."
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
        description: "Web adminitrable con CMS.",
        features: [
          "Dashboard de administración",
          "3 páginas personalizadas",
          "Panel para editar contenido",
          "Diseño responsive",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 3200",
        description: "CMS avanzado con blog e integraciones.",
        features: [
          "Todo lo del plan Emprendedor",
          "Hasta 10 páginas",
          "Blog y gestor de usuarios",
          "Integraciones de terceros",
          "Optimización SEO",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "Plataforma CMS corporativa a medida.",
        features: [
          "Todo lo del plan Negocio",
          "Páginas ilimitadas",
          "Roles y permisos avanzados",
          "Multiuusuario",
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

export default function CMSDevelopmentPage() {
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