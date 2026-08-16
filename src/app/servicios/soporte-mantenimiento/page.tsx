import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Soporte y Mantenimiento Web con Planes Flexibles',
  description: 'Mantenimiento continuo para que tu sitio web o aplicación funcione de forma óptima, segura y actualizada, con planes flexibles según tu presupuesto.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/soporte-mantenimiento',
    languages: {
      es: 'https://devmarkpe.com/servicios/soporte-mantenimiento',
      en: 'https://devmarkpe.com/en/services/support-maintenance',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/soporte-mantenimiento',
    title: 'Soporte y Mantenimiento Web | Devmark Perú',
    description: 'Mantenimiento continuo para que tu web o app funcione de forma óptima, segura y actualizada.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Soporte y mantenimiento - DEVMARK' }],
  },
};

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const heroContent = {
  badge: "Tranquilidad y Confianza",
  title: "Soporte y mantenimiento",
  description: "Garantizamos que tu sitio web o aplicación funcione de manera óptima, segura y actualizada. Ofrecemos planes de mantenimiento flexibles para que no tengas que preocuparte por los aspectos técnicos.",
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
  title: 'Cómo mantenemos tu plataforma',
  subtitle: 'Un proceso integral y proactivo para mantener tu web segura, rápida y siempre disponible.',
  steps: [
    { title: 'Actualizar y proteger', description: "Mantenemos tu plataforma (WordPress, plugins, etc.) actualizada y aplicamos parches de seguridad para protegerte de vulnerabilidades." },
    { title: 'Monitorear el rendimiento', description: "Supervisamos el rendimiento de tu sitio 24/7 para detectar y solucionar problemas de velocidad o disponibilidad antes de que afecten a tus usuarios." },
    { title: 'Respaldar tu información', description: "Realizamos copias de seguridad periódicas de tu sitio y base de datos para que tu información esté siempre a salvo ante cualquier imprevisto." },
    { title: 'Brindar soporte técnico', description: "Resolvemos incidencias y te ofrecemos soporte técnico continuo para cualquier duda o problema que puedas tener con tu plataforma digital." },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Por qué es importante el mantenimiento web?",
      answer: "Un mantenimiento regular es crucial para la seguridad, el rendimiento (velocidad de carga), la experiencia del usuario y el posicionamiento SEO. Un sitio desactualizado es vulnerable a ataques y puede funcionar lentamente, afectando negativamente a tu negocio."
    },
    {
      question: "¿Qué tipo de soporte ofrecen?",
      answer: "Ofrecemos soporte por email, teléfono y un sistema de tickets para resolver tus consultas. El nivel de prioridad y los tiempos de respuesta dependen del plan de mantenimiento que elijas."
    },
    {
      question: "¿Pueden mantener un sitio que no han desarrollado ustedes?",
      answer: "Sí. Antes de iniciar, realizamos una auditoría completa del sitio para evaluar su estado actual, la tecnología utilizada y las posibles vulnerabilidades, para poder ofrecerte el mejor servicio posible."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Básico",
        price: "S/ 60",
        description: "Mantenimiento esencial mensual para tu web.",
        period: "/mes",
        features: [
          "Actualizaciones de seguridad",
          "Copias de seguridad",
          "Monitoreo de disponibilidad",
          "1 hora de soporte técnico",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Profesional",
        price: "S/ 150",
        description: "Mantenimiento completo con soporte proactivo.",
        period: "/mes",
        features: [
          "Todo lo del plan Básico",
          "4 horas de soporte al mes",
          "Cambios de contenido menores",
          "Optimización de velocidad",
          "Reporte mensual de estado",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "S/ 300",
        description: "Mantenimiento integral para webs críticas.",
        period: "/mes",
        features: [
          "Todo lo del plan Profesional",
          "8 horas de soporte al mes",
          "Monitoreo 24/7",
          "Respuesta inmediata",
          "Soporte telefónico",
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
    formTitle: "Formulario de contacto",
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
    quoteButton: "Cotiza tu proyecto con IA"
};

const footerContent = {
    copyright: "DEVMARK. Todos los derechos reservados."
};

export default function MaintenancePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Soporte y mantenimiento",
            "description": "Garantizamos que tu sitio web o aplicación funcione de manera óptima, segura y actualizada. Ofrecemos planes de mantenimiento flexibles para que no tengas que preocuparte por los aspectos técnicos.",
            "provider": {
              "@type": "Organization",
              "name": "Devmark",
              "url": "https://devmarkpe.com"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Lima"
              },
              {
                "@type": "Country",
                "name": "Peru"
              }
            ],
            "url": "https://devmarkpe.com/servicios/soporte-mantenimiento",
            "inLanguage": "es-PE"
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Por qué es importante el mantenimiento web?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Un mantenimiento regular es crucial para la seguridad, el rendimiento (velocidad de carga), la experiencia del usuario y el posicionamiento SEO. Un sitio desactualizado es vulnerable a ataques y puede funcionar lentamente, afectando negativamente a tu negocio."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tipo de soporte ofrecen?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ofrecemos soporte por email, teléfono y un sistema de tickets para resolver tus consultas. El nivel de prioridad y los tiempos de respuesta dependen del plan de mantenimiento que elijas."
                }
              },
              {
                "@type": "Question",
                "name": "¿Pueden mantener un sitio que no han desarrollado ustedes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí. Antes de iniciar, realizamos una auditoría completa del sitio para evaluar su estado actual, la tecnología utilizada y las posibles vulnerabilidades, para poder ofrecerte el mejor servicio posible."
                }
              }
            ]
          }),
        }}
      />
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