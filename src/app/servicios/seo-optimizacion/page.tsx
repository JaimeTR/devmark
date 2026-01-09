
'use client';

import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Pricing } from '@/components/landing/sections/pricing';
import { Contact } from '@/components/landing/sections/contact';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { LineChart, Search, FileText, ArrowUpCircle } from 'lucide-react';
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
    title: "SEO y Optimización Web",
    description: "Aumentamos tu visibilidad en los motores de búsqueda, atraemos tráfico orgánico de calidad y mejoramos la tasa de conversión de tu sitio web.",
    badge: "Posicionamiento y Rendimiento",
    features: [
        {
            icon: Search,
            title: "Auditoría y Estrategia SEO",
            description: "Realizamos un análisis completo de tu web y tu competencia para definir una estrategia de palabras clave y acciones para alcanzar tus objetivos."
        },
        {
            icon: FileText,
            title: "SEO On-Page y de Contenidos",
            description: "Optimizamos la estructura de tu sitio, las etiquetas, el contenido y los enlaces internos para mejorar el posicionamiento en Google."
        },
        {
            icon: LineChart,
            title: "SEO Técnico",
            description: "Mejoramos la velocidad de carga (Core Web Vitals), la indexación, la estructura de URLs y otros factores técnicos críticos para el SEO."
        },
        {
            icon: ArrowUpCircle,
            title: "Link Building y SEO Off-Page",
            description: "Desarrollamos estrategias de construcción de enlaces de calidad para aumentar la autoridad de tu dominio y mejorar tu reputación online."
        }
    ]
};

const faqContent = {
  title: "Preguntas Frecuentes",
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
    title: "Planes y Precios",
    subtitle: "Soluciones a la medida de tu negocio. Elige el plan que mejor se adapte a tus necesidades y presupuesto.",
    plans: [
      {
        name: "Básico",
        price: "S/ 1200",
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
        price: "S/ 2200",
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

export default function SeoOptimizationPage() {
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
