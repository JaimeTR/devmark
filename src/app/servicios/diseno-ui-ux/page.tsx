import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diseño UI/UX centrado en el usuario',
  description: 'Interfaces intuitivas y atractivas centradas en el usuario. Investigamos, prototipamos y diseñamos productos digitales que convierten visitas en clientes.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/diseno-ui-ux',
    languages: {
      es: 'https://devmarkpe.com/servicios/diseno-ui-ux',
      en: 'https://devmarkpe.com/en/services/ui-ux-design',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/diseno-ui-ux',
    title: 'Diseño UI/UX | Devmark Perú',
    description: 'Interfaces intuitivas y atractivas centradas en el usuario para productos digitales que enamoran.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Diseño UI/UX - DEVMARK' }],
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
    description: "¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo se pondrá en contacto contigo.",
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
    scheduleButton: 'Agendar videollamada',
    quoteButton: "Cotiza tu proyecto con IA"
};

const footerContent = {
    copyright: "DEVMARK. Todos los derechos reservados."
};

export default function UiUxDesignPage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Diseño UI/UX",
            "description": "Creamos interfaces intuitivas y atractivas centradas en el usuario. Desde la investigación inicial hasta los prototipos interactivos y el diseño visual final, nos aseguramos de que tu producto sea fácil de usar y visualmente impactante.",
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
            "url": "https://devmarkpe.com/servicios/diseno-ui-ux",
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
                "name": "¿Cuál es la diferencia entre UI y UX?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "UX (User Experience) se centra en la experiencia general del usuario y cómo se siente al interactuar con el producto. UI (User Interface) se enfoca en el diseño visual y los elementos interactivos de la interfaz. Ambos son cruciales para un producto exitoso."
                }
              },
              {
                "@type": "Question",
                "name": "¿Trabajan con sistemas de diseño existentes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, podemos trabajar con tu sistema de diseño actual para mantener la consistencia de tu marca o podemos crear uno nuevo desde cero si es necesario."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué herramientas de diseño utilizan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Utilizamos herramientas estándar de la industria como Figma, Sketch y Adobe XD para el diseño de interfaces, prototipado y colaboración con el equipo de desarrollo."
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