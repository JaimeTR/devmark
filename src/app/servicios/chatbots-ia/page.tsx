
'use client';

import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageSquare, BrainCircuit, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const serviceDetails = {
    title: "Chatbots con Inteligencia Artificial",
    description: "Implementamos chatbots inteligentes en tu web, e-commerce o redes sociales, entrenados con tu propia información para ofrecer soporte 24/7 y potenciar tus ventas.",
    badge: "Asistentes Virtuales",
    features: [
        {
            icon: BrainCircuit,
            title: "Entrenamiento Personalizado",
            description: "Entrenamos al chatbot con tu base de conocimiento (documentos, web, FAQs) para que responda de forma precisa y coherente con tu marca."
        },
        {
            icon: MessageSquare,
            title: "Soporte 24/7",
            description: "Tu chatbot atenderá consultas, resolverá dudas y guiará a los usuarios en cualquier momento, mejorando la satisfacción del cliente."
        },
        {
            icon: ShoppingCart,
            title: "Asistente de Ventas",
            description: "El chatbot puede recomendar productos, responder preguntas sobre ellos y guiar a los clientes en el proceso de compra, aumentando las conversiones."
        },
        {
            icon: Bot,
            title: "Integración Multicanal",
            description: "Desplegamos tu chatbot en tu sitio web, WhatsApp, Messenger y otras plataformas para que estés donde estén tus clientes."
        }
    ]
};

const faqContent = {
  title: "Preguntas Frecuentes",
  items: [
    {
      question: "¿El chatbot puede entender preguntas complejas?",
      answer: "Sí, utilizamos modelos de lenguaje avanzados que permiten al chatbot comprender el contexto, la intención y las variaciones en las preguntas de los usuarios para dar respuestas coherentes y útiles."
    },
    {
      question: "¿Qué pasa si el chatbot no sabe la respuesta?",
      answer: "Configuramos un sistema de escalado para que, si el chatbot no puede resolver una consulta, pueda transferir la conversación a un agente humano de forma transparente."
    },
    {
      question: "¿Puedo ver las conversaciones que tiene el chatbot?",
      answer: "Sí, tendrás acceso a un panel donde podrás revisar las conversaciones, analizar las preguntas más frecuentes y obtener información valiosa sobre las necesidades de tus clientes."
    }
  ]
};

const pricingContent = {
    title: "Planes y Precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Básico",
        price: "S/ 1600",
        description: "Ideal para startups y proyectos personales.",
        features: [
          "Diseño web responsivo",
          "3 páginas personalizadas",
          "Optimización SEO básica",
          "Soporte por email"
        ],
        buttonText: "Cotizar servicio",
        priceId: "price_1..." // Reemplazar con tu Price ID de Stripe
      },
      {
        name: "Profesional",
        price: "S/ 2800",
        description: "Perfecto para empresas en crecimiento.",
        features: [
          "Todo lo del plan Básico",
          "Hasta 10 páginas",
          "Integración con CMS",
          "Soporte prioritario"
        ],
        buttonText: "Cotizar servicio",
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

export default function AIChatbotsPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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
                        <div
                          key={index}
                          className={cn(
                            'flex flex-col items-center text-center p-6 rounded-lg bg-primary/3 transition-all duration-300 cursor-pointer',
                            hoveredFeature === index && 'gradient-border-hover'
                          )}
                          onMouseEnter={() => setHoveredFeature(index)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
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
