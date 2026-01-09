import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Services } from '@/components/landing/sections/services';
import { AdditionalServices } from '@/components/landing/sections/additional-services';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios | DevMark - Desarrollo Web, Software y Marketing Digital',
  description: 'Descubre nuestra amplia gama de servicios: desarrollo web a medida, software personalizado, chatbots con IA, SEO, marketing digital y más.',
};

const content = {
  lang: 'es',
  header: {
    navLinks: [
      { href: '/#hero', label: 'Inicio' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/#contact', label: 'Contacto' },
    ],
    contactButton: 'Contactar',
    aiAssistant: 'Asistente IA',
    aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
  },
  services: {
    title: 'Servicios Principales',
    subtitle: 'Soluciones integrales para llevar tu empresa al siguiente nivel.',
    moreInfoButton: 'Más Información',
    items: [
      {
        icon: 'CodeXml',
        title: "Desarrollo Web a Medida",
        description: "Creación de sitios web personalizados programados desde cero para webs corporativas, landing pages y PWAs.",
        tags: ["Webs Corporativas", "Landing Pages", "PWAs"],
        href: '/servicios/desarrollo-web-a-medida'
      },
      {
        icon: 'Palette',
        title: "Desarrollo con CMS y Plataformas",
        description: "Construcción de sitios y tiendas online con WordPress, Shopify y otras plataformas. E-commerce con integraciones de pago.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/servicios/desarrollo-cms'
      },
      {
        icon: 'ServerCog',
        title: "Desarrollo de Software a Medida",
        description: "Sistemas internos (ERP, CRM), SaaS y APIs. Integraciones entre herramientas para unificar datos y procesos.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/servicios/desarrollo-software'
      },
      {
        icon: 'Zap',
        title: "Automatización de Procesos",
        description: "Flujos automáticos con Zapier/Make/APIs para leads, ventas, reportes, notificaciones y tareas de back-office.",
        tags: ["Zapier", "Make", "Automatización de Leads"],
        href: '/servicios/automatizacion-procesos'
      },
      {
        icon: 'Bot',
        title: "Chatbots con IA",
        description: "Chatbots para web, e-commerce y redes sociales, entrenados con tu base de conocimiento para soporte y ventas 24/7.",
        tags: ["Chatbots Web", "Redes Sociales", "Soporte 24/7"],
        href: '/servicios/chatbots-ia'
      },
      {
        icon: 'LineChart',
        title: "SEO y Optimización Web",
        description: "Estrategia, SEO técnico y de contenidos, Core Web Vitals y para e-commerce. Aumenta tráfico orgánico y conversiones.",
        tags: ["Estrategia SEO", "Core Web Vitals", "Trafico"],
        href: '/servicios/seo-optimizacion'
      }
    ]
  },
  additionalServices: {
    title: 'Servicios Complementarios',
    subtitle: '(Servicios que refuerzan el desarrollo tecnológico principal)',
    moreInfoButton: 'Más Información',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'Diseño UI/UX',
        description: 'Diseño centrado en la experiencia del usuario. Prototipado y wireframes interactivos. Interfaces modernas, limpias y responsivas.',
        href: '/servicios/diseno-ui-ux'
      },
      {
        icon: 'Megaphone',
        title: 'Marketing Digital',
        description: 'Estrategias de crecimiento y captación de clientes. Campañas publicitarias (Google Ads, Meta Ads). Email marketing y automatización de ventas.',
        href: '/servicios/marketing-digital'
      },
      {
        icon: 'Wrench',
        title: 'Soporte y Mantenimiento',
        description: 'Actualizaciones periódicas de seguridad y plugins. Monitoreo de rendimiento y copias de seguridad. Resolución de incidencias y soporte técnico continuo.',
        href: '/servicios/soporte-mantenimiento'
      },
      {
        icon: 'Lightbulb',
        title: 'Consultoría Tecnológica',
        description: 'Asesoría para digitalización de procesos. Elección de plataformas adecuadas para cada negocio. Estrategias de escalabilidad y seguridad.',
        href: '/servicios/consultoria-tecnologica'
      },
    ],
  },
  footer: {
    copyright: "DevMark. Todos los derechos reservados."
  }
} as const;

export default function ServiciosPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <Badge variant="outline" className="text-primary border-primary/50 mb-4">Nuestros Servicios</Badge>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">
                Soluciones Tecnológicas
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
                Ofrecemos soluciones tecnológicas completas para impulsar tu negocio. Desde desarrollo web hasta marketing digital, tenemos todo lo que necesitas para crecer en el mundo digital.
              </p>
            </header>
          </div>
        </section>

        {/* Services Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 pb-16">
            <Services {...content.services} />
            <AdditionalServices {...content.additionalServices} />
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-1">
              Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-2">
              <Link 
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
              >
                Contactar ahora
              </Link>
              <Link 
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 font-semibold"
              >
                Cotizar proyecto
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
