
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Zap, LineChart, ShieldCheck } from 'lucide-react';

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const serviceDetails = {
    title: "Desarrollo Web a Medida",
    description: "Creamos sitios web únicos y de alto rendimiento que se adaptan perfectamente a las necesidades de tu negocio. Desde el concepto hasta el lanzamiento, te acompañamos en cada paso del camino.",
    badge: "Nuestro Proceso",
    features: [
        {
            icon: Palette,
            title: "Diseño y Prototipado",
            description: "Comenzamos con un diseño UI/UX centrado en el usuario, creando prototipos interactivos para visualizar la experiencia final antes de escribir una sola línea de código."
        },
        {
            icon: Code,
            title: "Desarrollo Frontend y Backend",
            description: "Utilizamos las tecnologías más modernas (Next.js, React, Node.js) para construir un sitio rápido, seguro y escalable, con un backend robusto que gestiona tus datos de forma eficiente."
        },
        {
            icon: Zap,
            title: "Integraciones y Automatización",
            description: "Conectamos tu sitio web con las herramientas que ya utilizas (CRMs, ERPs, pasarelas de pago) y automatizamos procesos para mejorar la eficiencia de tu negocio."
        },
        {
            icon: LineChart,
            title: "Optimización SEO On-Page",
            description: "Implementamos las mejores prácticas de SEO desde el inicio para asegurar que tu sitio tenga una base sólida para posicionarse en los motores de búsqueda y atraer tráfico orgánico."
        }
    ]
};

const faqContent = {
  title: "Preguntas Frecuentes",
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
      answer: "¡Por supuesto! Nos especializamos en la integración con una amplia variedad de sistemas, incluyendo CRMs, ERPs, sistemas de pago y más, para centralizar tus operaciones."
    }
  ]
};

const pricingContent = {
    title: "Planes y Precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Básico",
        price: "$499",
        description: "Ideal para startups y proyectos personales.",
        features: [
          "Diseño web responsivo",
          "3 páginas personalizadas",
          "Optimización SEO básica",
          "Soporte por email"
        ],
        buttonText: "Comprar ahora",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Profesional",
        price: "$999",
        description: "Perfecto para empresas en crecimiento.",
        features: [
          "Todo lo del plan Básico",
          "Hasta 10 páginas",
          "Integración con CMS",
          "Soporte prioritario"
        ],
        buttonText: "Comprar ahora",
        priceId: "price_2..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Empresa",
        price: "A medida",
        description: "Soluciones completas para grandes corporaciones.",
        features: [
          "Todo lo del plan Profesional",
          "Páginas ilimitadas",
          "Funcionalidades E-commerce",
          "Soporte 24/7"
        ],
        buttonText: "Contactar",
        priceId: ""
      }
    ]
  };

const contactContent = {
    lang: 'es' as const,
    title: "Hablemos de tu Proyecto",
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

export default function CustomWebDevelopmentPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
            <section id="service-hero" className="py-12 md:py-20 text-center">
                <Badge variant="outline" className="mb-4 text-primary border-primary/50">{serviceDetails.badge}</Badge>
                <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">{serviceDetails.title}</h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">{serviceDetails.description}</p>
            </section>
            
            <section id="features" className="py-12 md:py-20">
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {serviceDetails.features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg bg-primary/5">
                            <feature.icon className="h-10 w-10 text-primary mb-4" />
                            <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
            <section id="faq" className="py-12 md:py-20 max-w-3xl mx-auto">
                <h2 className="font-headline text-3xl sm:text-4xl text-center font-bold tracking-tighter mb-8">{faqContent.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqContent.items.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
            
            <Pricing {...pricingContent} />
            <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
