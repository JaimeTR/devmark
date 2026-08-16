import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { Services } from '@/components/home/services';
import { AdditionalServices } from '@/components/home/additional-services';
import Link from 'next/link';
import { Layers, Phone, Calculator } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Servicios | Desarrollo Web, Software y Marketing Digital',
  description: 'Descubre nuestra amplia gama de servicios: desarrollo web a medida, software personalizado, chatbots con IA, SEO, marketing digital y más para tu negocio.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios',
    languages: {
      es: 'https://devmarkpe.com/servicios',
      en: 'https://devmarkpe.com/en/services',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios',
    title: 'Servicios | Devmark - Desarrollo Web, Software y Marketing Digital',
    description: 'Descubre nuestra amplia gama de servicios: desarrollo web, software, chatbots IA, SEO y marketing digital.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Servicios DEVMARK' }],
  },
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
    lang: 'es' as const,
    title: 'Servicios principales',
    subtitle: 'Soluciones integrales para llevar tu empresa al siguiente nivel.',
    moreInfoButton: 'Más información',
    items: [
      {
        icon: 'CodeXml',
        title: "Desarrollo web a medida",
        description: "Creación de sitios web personalizados programados desde cero para webs corporativas, landing pages y PWAs.",
        tags: ["Webs corporativas", "Landing pages", "PWAs"],
        href: '/servicios/desarrollo-web-a-medida'
      },
      {
        icon: 'Palette',
        title: "Desarrollo con CMS y plataformas",
        description: "Construcción de sitios y tiendas online con WordPress, Shopify y otras plataformas. E-commerce con integraciones de pago.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/servicios/desarrollo-cms'
      },
      {
        icon: 'ServerCog',
        title: "Desarrollo de software a medida",
        description: "Sistemas internos (ERP, CRM), SaaS y APIs. Integraciones entre herramientas para unificar datos y procesos.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/servicios/desarrollo-software'
      },
      {
        icon: 'Zap',
        title: "Automatización de procesos",
        description: "Flujos automáticos con Zapier/Make/APIs para leads, ventas, reportes, notificaciones y tareas de back-office.",
        tags: ["Zapier", "Make", "Automatización de leads"],
        href: '/servicios/automatizacion-procesos'
      },
      {
        icon: 'Bot',
        title: "Chatbots con IA",
        description: "Chatbots para web, e-commerce y redes sociales, entrenados con tu base de conocimiento para soporte y ventas 24/7.",
        tags: ["Chatbots web", "Redes sociales", "Soporte 24/7"],
        href: '/servicios/chatbots-ia'
      },
      {
        icon: 'LineChart',
        title: "SEO y optimización web",
        description: "Estrategia, SEO técnico y de contenidos, Core Web Vitals y para e-commerce. Aumenta tráfico orgánico y conversiones.",
        tags: ["Estrategia SEO", "Core Web Vitals", "Tráfico"],
        href: '/servicios/seo-optimizacion'
      }
    ]
  },
  additionalServices: {
    lang: 'es' as const,
    title: 'Servicios complementarios',
    subtitle: '(Servicios que refuerzan el desarrollo tecnológico principal)',
    moreInfoButton: 'Más información',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'Diseño UI/UX',
        description: 'Diseño centrado en la experiencia del usuario. Prototipado y wireframes interactivos. Interfaces modernas, limpias y responsivas.',
        href: '/servicios/diseno-ui-ux'
      },
      {
        icon: 'Megaphone',
        title: 'Marketing digital',
        description: 'Estrategias de crecimiento y captación de clientes. Campañas publicitarias (Google Ads, Meta Ads). Email marketing y automatización de ventas.',
        href: '/servicios/marketing-digital'
      },
      {
        icon: 'Wrench',
        title: 'Soporte y mantenimiento',
        description: 'Actualizaciones periódicas de seguridad y plugins. Monitoreo de rendimiento y copias de seguridad. Resolución de incidencias y soporte técnico continuo.',
        href: '/servicios/soporte-mantenimiento'
      },
      {
        icon: 'Lightbulb',
        title: 'Consultoría tecnológica',
        description: 'Asesoría para digitalización de procesos. Elección de plataformas adecuadas para cada negocio. Estrategias de escalabilidad y seguridad.',
        href: '/servicios/consultoria-tecnologica'
      },
    ],
  },
  footer: {
    copyright: "DEVMARK. Todos los derechos reservados."
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
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
                <Layers className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Nuestros servicios</span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gradient animate-fade-in-up stagger-1">
                Servicios de desarrollo web y software
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground animate-fade-in-up stagger-2">
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
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
              <Calculator className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Hablemos</span>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up stagger-1">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 transition-all duration-300 hover:-translate-y-1"
              >
                Contactar ahora
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent font-semibold transition-all duration-300"
              >
                Cotizar proyecto
                <Calculator className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
