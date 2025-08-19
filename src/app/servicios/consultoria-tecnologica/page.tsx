
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Rocket, BarChart, ShieldCheck } from 'lucide-react';

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const serviceDetails = {
    title: "Consultoría Tecnológica",
    description: "Te guiamos en la transformación digital de tu negocio, ayudándote a elegir las herramientas adecuadas, optimizar procesos y construir una estrategia tecnológica sólida y escalable.",
    badge: "Estrategia y Crecimiento",
    features: [
        {
            icon: Rocket,
            title: "Digitalización de Procesos",
            description: "Analizamos tus operaciones y te proponemos un plan para digitalizar y automatizar tareas, aumentando la eficiencia y reduciendo costos."
        },
        {
            icon: BarChart,
            title: "Selección de Plataformas",
            description: "Te ayudamos a elegir las plataformas (CRM, ERP, CMS) que mejor se adapten a tus necesidades y presupuesto, asegurando una implementación exitosa."
        },
        {
            icon: ShieldCheck,
            title: "Estrategias de Escalabilidad",
            description: "Planificamos la arquitectura de tu software y sistemas para que puedan crecer junto con tu negocio de manera sostenible y segura."
        },
        {
            icon: Lightbulb,
            title: "Innovación y Nuevas Tecnologías",
            description: "Te mantenemos a la vanguardia, explorando cómo las nuevas tecnologías como la IA pueden aportar valor y una ventaja competitiva a tu empresa."
        }
    ]
};

const faqContent = {
  title: "Preguntas Frecuentes",
  items: [
    {
      question: "¿Mi empresa es demasiado pequeña para una consultoría?",
      answer: "No, la consultoría tecnológica es valiosa para empresas de todos los tamaños. Para las pymes, puede ser clave para establecer una base tecnológica sólida que permita un crecimiento futuro sin problemas."
    },
    {
      question: "¿Cómo sé qué tecnología es la correcta para mí?",
      answer: "Ese es nuestro trabajo. Realizamos un análisis exhaustivo de tu negocio, tus objetivos y tu presupuesto para recomendarte soluciones a medida que realmente resuelvan tus problemas."
    },
    {
      question: "¿La consultoría incluye la implementación?",
      answer: "La consultoría se centra en la estrategia y la planificación. Sin embargo, como agencia de desarrollo, podemos ofrecerte un servicio integral que cubra desde la consultoría hasta la implementación y el soporte."
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

export default function TechConsultingPage() {
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
