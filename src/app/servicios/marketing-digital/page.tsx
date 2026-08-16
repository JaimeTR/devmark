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
  title: 'Marketing Digital para Aumentar tus Ventas Online',
  description: 'Estrategias de marketing digital integrales para aumentar tu visibilidad, atraer clientes potenciales y potenciar tus ventas online en Perú.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/marketing-digital',
    languages: {
      es: 'https://devmarkpe.com/servicios/marketing-digital',
      en: 'https://devmarkpe.com/en/services/digital-marketing',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/marketing-digital',
    title: 'Marketing Digital | Devmark Perú',
    description: 'Estrategias de marketing digital integrales para aumentar tu visibilidad y ventas online.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Marketing digital - DEVMARK' }],
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
  badge: "Crecimiento y Captación",
  title: "Marketing digital",
  description: "Diseñamos e implementamos estrategias de marketing digital integrales para aumentar tu visibilidad, atraer clientes potenciales y potenciar tus ventas online.",
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
  title: 'Cómo impulsamos tu crecimiento',
  subtitle: 'Un plan estratégico medible y optimizado constantemente para multiplicar tus ventas online.',
  steps: [
    { title: 'Definir la estrategia', description: "Definimos un plan de acción a medida para alcanzar tus objetivos de negocio, identificando los canales y tácticas más efectivos para tu marca." },
    { title: 'Lanzar campañas', description: "Gestionamos campañas en Google Ads y Meta Ads (Facebook, Instagram) para generar tráfico cualificado y maximizar tu retorno de inversión." },
    { title: 'Analizar resultados', description: "Medimos y analizamos el rendimiento de todas las acciones para optimizar continuamente la estrategia y presentarte resultados claros y comprensibles." },
    { title: 'Nutrir y fidelizar', description: "Creamos flujos de comunicación automatizados y campañas de email marketing para nutrir leads y fidelizar a tus clientes actuales." },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cuánto debo invertir en publicidad online?",
      answer: "La inversión depende de tus objetivos, tu sector y la competencia. Podemos empezar con un presupuesto modesto para validar canales y luego escalar las campañas que demuestren un mejor rendimiento."
    },
    {
      question: "¿En cuánto tiempo veré resultados?",
      answer: "Las campañas de publicidad pueden generar resultados a corto plazo (días o semanas), mientras que otras estrategias como el SEO o el marketing de contenidos requieren una visión a medio-largo plazo para consolidarse."
    },
    {
      question: "¿Qué métricas utilizan para medir el éxito?",
      answer: "Nos enfocamos en las métricas que realmente importan para tu negocio, como el Costo de Adquisición de Cliente (CAC), el Retorno de la Inversión Publicitaria (ROAS), la tasa de conversión y el valor de vida del cliente (LTV)."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 700",
        description: "Gestión básica de redes sociales.",
        period: "/mes",
        features: [
          "8 publicaciones al mes",
          "Gestión de 1 red social",
          "Enfoque en redes",
          "Reporte mensual básico",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 1500",
        description: "Marketing digital con contenido y pauta.",
        period: "/mes",
        features: [
          "Todo lo del plan Emprendedor",
          "16 publicaciones al mes",
          "Gestión de 2 redes sociales",
          "Publicidad en Meta/Google",
          "Diseño de piezas",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "S/ 3000",
        description: "Estrategia de marketing digital integral.",
        period: "/mes",
        features: [
          "Todo lo del plan Negocio",
          "Campañas multicanal",
          "Email marketing",
          "Optimización de conversión",
          "Analítica avanzada",
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

export default function DigitalMarketingPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Marketing digital",
            "description": "Diseñamos e implementamos estrategias de marketing digital integrales para aumentar tu visibilidad, atraer clientes potenciales y potenciar tus ventas online.",
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
            "url": "https://devmarkpe.com/servicios/marketing-digital",
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
                "name": "¿Cuánto debo invertir en publicidad online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La inversión depende de tus objetivos, tu sector y la competencia. Podemos empezar con un presupuesto modesto para validar canales y luego escalar las campañas que demuestren un mejor rendimiento."
                }
              },
              {
                "@type": "Question",
                "name": "¿En cuánto tiempo veré resultados?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Las campañas de publicidad pueden generar resultados a corto plazo (días o semanas), mientras que otras estrategias como el SEO o el marketing de contenidos requieren una visión a medio-largo plazo para consolidarse."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué métricas utilizan para medir el éxito?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nos enfocamos en las métricas que realmente importan para tu negocio, como el Costo de Adquisición de Cliente (CAC), el Retorno de la Inversión Publicitaria (ROAS), la tasa de conversión y el valor de vida del cliente (LTV)."
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