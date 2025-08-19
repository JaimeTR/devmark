
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ServerCog, Cloud, ShieldCheck, Layers } from 'lucide-react';

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const serviceDetails = {
    title: "Desarrollo de Software a Medida",
    description: "Construimos aplicaciones robustas, escalables y seguras, desde sistemas de gestión interna (ERP, CRM) hasta plataformas SaaS y APIs complejas.",
    badge: "Soluciones Empresariales",
    features: [
        {
            icon: ServerCog,
            title: "Sistemas a Medida (ERP/CRM)",
            description: "Desarrollamos sistemas de gestión que se adaptan a tus procesos, centralizando la información y mejorando la toma de decisiones."
        },
        {
            icon: Cloud,
            title: "Plataformas SaaS",
            description: "Creamos productos de Software como Servicio (SaaS) desde la conceptualización hasta el despliegue en la nube, listos para escalar."
        },
        {
            icon: Layers,
            title: "Desarrollo de APIs",
            description: "Diseñamos y construimos APIs RESTful y GraphQL para conectar tus aplicaciones, servicios y datos de forma segura y eficiente."
        },
        {
            icon: ShieldCheck,
            title: "Seguridad y Escalabilidad",
            description: "Aplicamos las mejores prácticas de seguridad y arquitecturas escalables para garantizar que tu software sea fiable y esté preparado para el crecimiento."
        }
    ]
};

const faqContent = {
  title: "Preguntas Frecuentes",
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

export default function CustomSoftwarePage() {
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
