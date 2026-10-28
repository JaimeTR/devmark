
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo Web a Medida en Perú para tu Empresa',
  description: 'Creamos sitios web únicos y de alto rendimiento adaptados a tu negocio en Perú. Del concepto al lanzamiento, te acompañamos en cada paso del proyecto.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/desarrollo-web-a-medida',
    languages: {
      es: 'https://devmarkpe.com/servicios/desarrollo-web-a-medida',
      en: 'https://devmarkpe.com/en/services/custom-web-development',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/desarrollo-web-a-medida',
    title: 'Desarrollo Web a Medida en Perú | Devmark',
    description: 'Creamos sitios web únicos y de alto rendimiento adaptados a tu negocio en Perú.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Desarrollo web a medida - DEVMARK' }],
  },
};

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
      question: "¿Cuánto tiempo toma desarrollar un sitio web a medida?",
      answer: "El tiempo de desarrollo varía según la complejidad del proyecto, pero generalmente oscila entre 4 y 12 semanas. Te proporcionaremos un cronograma detallado al inicio del proyecto."
    },
    {
      question: "¿Qué tipo de soporte ofrecen después del lanzamiento?",
      answer: "Ofrecemos planes de mantenimiento y soporte continuo para asegurar que tu sitio web se mantenga actualizado, seguro y funcionando de manera óptima."
    },
    {
      question: "¿Pueden integrar mi sitio con otras plataformas?",
      answer: "Por supuesto. Nos especializamos en la integración con una amplia variedad de sistemas, incluyendo CRMs, ERPs, sistemas de pago y más, para centralizar tus operaciones."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 800",
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
    scheduleButton: 'Agendar videollamada',
    quoteButton: "Cotiza tu proyecto con IA"
};

const footerContent = {
    copyright: "DEVMARK. Todos los derechos reservados."
};

export default function CustomWebDevelopmentPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Desarrollo web a medida",
            "description": "Creamos sitios web unicos y de alto rendimiento que se adaptan perfectamente a las necesidades de tu negocio. Desde el concepto hasta el lanzamiento, te acompañamos en cada paso del camino.",
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
                "name": "Perú"
              }
            ],
            "url": "https://devmarkpe.com/servicios/desarrollo-web-a-medida",
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
                "name": "¿Cuánto tiempo toma desarrollar un sitio web a medida?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "El tiempo de desarrollo varía según la complejidad del proyecto, pero generalmente oscila entre 4 y 12 semanas. Te proporcionaremos un cronograma detallado al inicio del proyecto."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tipo de soporte ofrecen después del lanzamiento?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ofrecemos planes de mantenimiento y soporte continuo para asegurar que tu sitio web se mantenga actualizado, seguro y funcionando de manera óptima."
                }
              },
              {
                "@type": "Question",
                "name": "¿Pueden integrar mi sitio con otras plataformas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Por supuesto. Nos especializamos en la integración con una amplia variedad de sistemas, incluyendo CRMs, ERPs, sistemas de pago y más, para centralizar tus operaciones."
                }
              }
            ]
          }),
        }}
      />
      <Header {...headerContent} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <ServiceHero {...heroContent} />

        <Pricing {...pricingContent} />

        <ServiceMethodology {...methodologyContent} />

        <ServiceFaq title={faqContent.title} items={faqContent.items} />

        <Contact {...contactContent} />
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
