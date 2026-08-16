
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
  title: 'Automatización de Procesos con Zapier y Make en Perú',
  description: 'Optimizamos tus flujos de trabajo y eliminamos tareas repetitivas con automatizaciones a medida usando Zapier, Make o APIs. Ahorra tiempo y reduce errores.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/automatizacion-procesos',
    languages: {
      es: 'https://devmarkpe.com/servicios/automatizacion-procesos',
      en: 'https://devmarkpe.com/en/services/process-automation',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/automatizacion-procesos',
    title: 'Automatización de Procesos | Devmark Perú',
    description: 'Optimizamos tus flujos de trabajo y eliminamos tareas repetitivas mediante automatización a medida.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Automatización de procesos - DEVMARK' }],
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
  badge: "Eficiencia y Productividad",
  title: "Automatización de procesos",
  description: "Optimizamos tus flujos de trabajo y eliminamos tareas repetitivas mediante la automatización con herramientas como Zapier, Make o APIs a medida.",
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
  title: 'Cómo automatizamos tus procesos',
  subtitle: 'Un camino claro para optimizar tus operaciones y liberar a tu equipo.',
  steps: [
    { title: 'Automatización de marketing y ventas', description: 'Creamos flujos para la captación de leads, nutrición de contactos, y seguimiento de ventas, integrando tu CRM con otras herramientas.' },
    { title: 'Generación de reportes', description: 'Automatizamos la recolección de datos y la generación de reportes periódicos para que tengas siempre a mano la información clave de tu negocio.' },
    { title: 'Tareas de back-office', description: 'Liberamos a tu equipo de tareas administrativas como la entrada de datos, notificaciones y sincronización de archivos entre plataformas.' },
    { title: 'Integraciones a medida', description: 'Si las herramientas estándar no son suficientes, desarrollamos integraciones a medida utilizando APIs para conectar cualquier servicio.' },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Qué procesos de mi empresa se pueden automatizar?",
      answer: "Prácticamente cualquier tarea digital repetitiva y basada en reglas puede ser automatizada. Desde marketing y ventas hasta finanzas y recursos humanos. Analizamos tus procesos y te proponemos las mejores soluciones."
    },
    {
      question: "¿Necesito conocimientos técnicos para gestionar las automatizaciones?",
      answer: "No. Utilizamos plataformas intuitivas como Zapier o Make que te permiten visualizar y entender los flujos. Además, te ofrecemos formación y soporte para que puedas gestionarlos tú mismo."
    },
    {
      question: "¿Cuál es el retorno de la inversión de la automatización?",
      answer: "El ROI se manifiesta en ahorro de tiempo, reducción de errores humanos, aumento de la productividad y la capacidad de tu equipo para centrarse en tareas de mayor valor estratégico."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 1500",
        description: "Automatización de un proceso simple.",
        features: [
          "Análisis de tu proceso",
          "1 flujo automatizado",
          "Integración con herramientas",
          "Documentación",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 3500",
        description: "Automatización de varios procesos.",
        features: [
          "Todo lo del plan Emprendedor",
          "Hasta 3 flujos automatizados",
          "Integración con CRM/ERP",
          "Panel de control",
          "Capacitación incluida",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "Automatización integral de la operación.",
        features: [
          "Todo lo del plan Negocio",
          "Flujos ilimitados",
          "Integraciones avanzadas",
          "Robótica (RPA)",
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

export default function ProcessAutomationPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Automatización de procesos",
            "description": "Optimizamos tus flujos de trabajo y eliminamos tareas repetitivas mediante la automatización con herramientas como Zapier, Make o APIs a medida.",
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
            "url": "https://devmarkpe.com/servicios/automatizacion-procesos",
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
                "name": "¿Qué procesos de mi empresa se pueden automatizar?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prácticamente cualquier tarea digital repetitiva y basada en reglas puede ser automatizada. Desde marketing y ventas hasta finanzas y recursos humanos. Analizamos tus procesos y te proponemos las mejores soluciones."
                }
              },
              {
                "@type": "Question",
                "name": "¿Necesito conocimientos técnicos para gestionar las automatizaciones?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Utilizamos plataformas intuitivas como Zapier o Make que te permiten visualizar y entender los flujos. Además, te ofrecemos formación y soporte para que puedas gestionarlos tú mismo."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cuál es el retorno de la inversión de la automatización?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El ROI se manifiesta en ahorro de tiempo, reducción de errores humanos, aumento de la productividad y la capacidad de tu equipo para centrarse en tareas de mayor valor estratégico."
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
