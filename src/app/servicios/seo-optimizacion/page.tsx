
'use client';

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
  badge: 'Posicionamiento y Rendimiento',
  title: 'SEO y optimización web',
  description: 'Aumentamos tu visibilidad en los motores de búsqueda, atraemos tráfico orgánico de calidad y mejoramos la tasa de conversión de tu sitio web.',
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
    messagePlaceholder: 'Cuéntanos qué necesitas para tu posicionamiento...',
    submitButton: 'Solicitar información',
    successMessage: '¡Mensaje enviado! Un asesor te contactará pronto.',
    errorMessage: 'Hubo un error al enviar. Por favor inténtalo de nuevo.',
  },
};

const methodologyContent = {
  badge: 'Nuestra metodología',
  title: 'Cómo mejoramos tu posicionamiento',
  subtitle: 'Un proceso claro y medible para llevar tu sitio a los primeros resultados de búsqueda.',
  steps: [
    {
      title: 'Auditoría y estrategia',
      description: 'Analizamos tu web, tu sector y tu competencia para definir palabras clave y objetivos de posicionamiento realistas.',
    },
    {
      title: 'SEO on-page y contenidos',
      description: 'Optimizamos estructura, etiquetas y contenidos para que Google entienda y posicione mejor tu sitio.',
    },
    {
      title: 'SEO técnico',
      description: 'Mejoramos velocidad, indexación y arquitectura técnica para cumplir con los Core Web Vitals.',
    },
    {
      title: 'Link building y off-page',
      description: 'Construimos enlaces de calidad y reputación online para aumentar la autoridad de tu dominio.',
    },
  ],
};

const faqContent = {
  title: "Preguntas frecuentes",
  items: [
    {
      question: "¿Cuándo empezaré a ver resultados del SEO?",
      answer: "El SEO es una estrategia a medio-largo plazo. Generalmente, se pueden empezar a ver resultados significativos entre los 3 y 6 meses, aunque esto puede variar según la competitividad de tu sector."
    },
    {
      question: "¿Es el SEO una inversión única?",
      answer: "No, el SEO es un proceso continuo. Los algoritmos de los motores de búsqueda cambian constantemente y la competencia siempre está activa. Recomendamos un trabajo mensual para mantener y mejorar los resultados."
    },
    {
      question: "¿Garantizan la primera posición en Google?",
      answer: "Ninguna agencia de SEO seria puede garantizar la primera posición, ya que el algoritmo de Google es complejo y está fuera de nuestro control. Lo que sí garantizamos es un trabajo profesional, transparente y enfocado en mejorar tu visibilidad y tráfico de forma sostenible."
    }
  ]
};

const pricingContent = {
    title: "Planes y precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Emprendedor",
        price: "S/ 300",
        description: "SEO local básico para negocios que empiezan.",
        period: "/mes",
        features: [
          "Optimización on-page",
          "Google My Business",
          "Configuración de Search Console",
          "Reporte mensual básico",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Negocio",
        price: "S/ 600",
        description: "SEO completo para pymes en crecimiento.",
        period: "/mes",
        features: [
          "Todo lo del plan Emprendedor",
          "Investigación de keywords",
          "2 artículos optimizados al mes",
          "SEO técnico básico",
          "Link building básico",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_2...", // Reemplazar con tu Price ID de Stripe
        recommended: true
      },
      {
        name: "Empresa",
        price: "S/ 1200",
        description: "SEO avanzado para mercados competitivos.",
        period: "/mes",
        features: [
          "Todo lo del plan Negocio",
          "4 artículos optimizados al mes",
          "SEO técnico avanzado",
          "Link building de calidad",
          "Optimización GEO (IA)",
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

export default function SeoOptimizationPage() {
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
