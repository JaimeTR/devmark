import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { ServiceHero } from '@/components/home/service-hero';
import { ServiceMethodology } from '@/components/home/service-methodology';
import { Pricing } from '@/components/home/pricing';
import { Contact } from '@/components/home/contact';
import { ServiceFaq } from '@/components/home/service-faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desarrollo de Software a Medida: ERP, CRM y SaaS',
  description: 'Construimos aplicaciones robustas, escalables y seguras: sistemas ERP, CRM, plataformas SaaS y APIs a medida para automatizar la operación de tu empresa.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/desarrollo-software',
    languages: {
      es: 'https://devmarkpe.com/servicios/desarrollo-software',
      en: 'https://devmarkpe.com/en/services/custom-software-development',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/desarrollo-software',
    title: 'Desarrollo de Software a Medida | Devmark Perú',
    description: 'Aplicaciones robustas, escalables y seguras: ERP, CRM, SaaS y APIs a medida.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Desarrollo de software a medida - DEVMARK' }],
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
  badge: "Soluciones Empresariales",
  title: "Desarrollo de software a medida",
  description: "Construimos aplicaciones robustas, escalables y seguras, desde sistemas de gestión interna (ERP, CRM) hasta plataformas SaaS y APIs complejas.",
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
  title: 'Cómo desarrollamos tu software',
  subtitle: 'Un proceso end-to-end, desde la idea hasta el despliegue, garantizando calidad, seguridad y escalabilidad.',
  steps: [
    { title: 'Construir sistemas a medida', description: "Desarrollamos sistemas de gestión que se adaptan a tus procesos, centralizando la información y mejorando la toma de decisiones." },
    { title: 'Crear plataformas SaaS', description: "Creamos productos de Software como Servicio (SaaS) desde la conceptualización hasta el despliegue en la nube, listos para escalar." },
    { title: 'Desarrollar APIs', description: "Diseñamos y construimos APIs RESTful y GraphQL para conectar tus aplicaciones, servicios y datos de forma segura y eficiente." },
    { title: 'Asegurar y escalar', description: "Aplicamos las mejores prácticas de seguridad y arquitecturas escalables para garantizar que tu software sea fiable y esté preparado para el crecimiento." },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cómo garantizan la calidad del software?",
      answer: "Seguimos metodologías ágiles, realizamos pruebas exhaustivas (unitarias, de integración y de usuario) y mantenemos una comunicación constante contigo para asegurar que el producto final cumpla con los más altos estándares de calidad."
    },
    {
      question: "¿Son dueños del código fuente al final del proyecto?",
      answer: "Sí, al finalizar el proyecto y completar el pago, te entregamos la totalidad del código fuente y la documentación. Eres el único propietario de tu software."
    },
    {
      question: "¿Qué tecnologías utilizan para el desarrollo?",
      answer: "Utilizamos un stack tecnológico moderno y probado que incluye, entre otros, Node.js, React, Next.js, Python, y bases de datos como PostgreSQL y MongoDB, eligiendo siempre la mejor herramienta para cada proyecto."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 3000",
        description: "MVP o sistema básico para validar tu idea.",
        features: [
          "MVP o módulo principal",
          "Panel de administración",
          "Base de datos incluida",
          "Desarrollo responsivo",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 6500",
        description: "Sistema a medida con 2 a 4 módulos.",
        features: [
          "Todo lo del plan Emprendedor",
          "2 a 4 módulos funcionales",
          "Gestión de usuarios y roles",
          "Reportes y analítica básica",
          "Integración con APIs",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "ERP, CRM o plataforma compleja.",
        features: [
          "Todo lo del plan Negocio",
          "Módulos ilimitados",
          "Integraciones avanzadas",
          "Seguridad y escalabilidad",
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

export default function CustomSoftwarePage() {
  return (
    <div className="bg-paper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Desarrollo de software a medida",
            "description": "Construimos aplicaciones robustas, escalables y seguras, desde sistemas de gestión interna (ERP, CRM) hasta plataformas SaaS y APIs complejas.",
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
            "url": "https://devmarkpe.com/servicios/desarrollo-software",
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
                "name": "¿Cómo garantizan la calidad del software?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Seguimos metodologías ágiles, realizamos pruebas exhaustivas (unitarias, de integración y de usuario) y mantenemos una comunicación constante contigo para asegurar que el producto final cumpla con los más altos estándares de calidad."
                }
              },
              {
                "@type": "Question",
                "name": "¿Son dueños del código fuente al final del proyecto?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sí, al finalizar el proyecto y completar el pago, te entregamos la totalidad del código fuente y la documentación. Eres el único propietario de tu software."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué tecnologías utilizan para el desarrollo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Utilizamos un stack tecnológico moderno y probado que incluye, entre otros, Node.js, React, Next.js, Python, y bases de datos como PostgreSQL y MongoDB, eligiendo siempre la mejor herramienta para cada proyecto."
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