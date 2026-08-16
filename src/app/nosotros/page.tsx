import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import Link from 'next/link';
import { CodeXml, ShieldCheck, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nosotros | Agencia de Desarrollo Web y Software en Perú',
  description: 'Conoce a Devmark: un estudio en Lima, Perú que fusiona estrategia, diseño y tecnología para ayudar a los negocios a crecer con claridad y resultados.',
  alternates: {
    canonical: 'https://devmarkpe.com/nosotros',
    languages: {
      es: 'https://devmarkpe.com/nosotros',
      en: 'https://devmarkpe.com/en/about',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/nosotros',
    title: 'Nosotros | Devmark - Agencia de Desarrollo Web y Software en Perú',
    description: 'Conoce a Devmark: un estudio en Lima, Perú que fusiona estrategia, diseño y tecnología.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Nosotros - DEVMARK' }],
  },
};

const content = {
  lang: 'es',
  header: {
    navLinks: [
      { href: '/#hero', label: 'Inicio' },
      { href: '/nosotros', label: 'Nosotros' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/#contact', label: 'Contacto' },
    ],
    contactButton: 'Contactar',
    aiAssistant: 'Asistente IA',
    aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
  },
  footer: {
    copyright: 'DEVMARK. Todos los derechos reservados.',
  },
} as const;

const values = [
  {
    icon: ShieldCheck,
    accentVar: '--primary',
    title: 'Transparencia',
    description: 'Comunicación clara en cada etapa del proyecto, sin letra chica ni sorpresas en la factura.',
  },
  {
    icon: CodeXml,
    accentVar: '--chart-4',
    title: 'Calidad técnica',
    description: 'Código limpio y escalable. Construimos pensando en el día 100, no solo en el lanzamiento.',
  },
  {
    icon: Users,
    accentVar: '--chart-2',
    title: 'Cercanía',
    description: 'Trabajamos codo a codo contigo, como parte de tu equipo, no como un proveedor externo más.',
  },
  {
    icon: TrendingUp,
    accentVar: '--chart-5',
    title: 'Resultados medibles',
    description: 'Cada decisión de diseño o desarrollo está respaldada por datos, no por intuición.',
  },
];

export default function NosotrosPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      <main>
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-lavender/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-brand-blue/90 backdrop-blur-md text-white border border-white/20 shadow-lg shadow-brand-blue/25">
              <CodeXml className="w-5 h-5 text-brand-lavender" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Sobre DEVMARK</span>
            </div>

            <h1 className="mt-6 font-medium text-4xl sm:text-5xl lg:text-6xl text-slate-950 leading-tight">
              Estrategia, diseño y tecnología en una sola mesa
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
              DEVMARK es un estudio de desarrollo web y software con base en Lima, Perú. No somos una plantilla con
              tu logo encima: cada proyecto se piensa desde la estrategia del negocio, no solo desde el código.
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl shadow-brand-blue/10 p-8 md:p-10 space-y-4">
              <h2 className="font-semibold text-2xl text-brand-navy">Cómo empezamos</h2>
              <p className="text-slate-600 leading-relaxed">
                DEVMARK nació de una idea simple: la mayoría de negocios peruanos no necesitan más plantillas
                genéricas, necesitan un equipo que entienda su industria y traduzca eso en una web o software que
                realmente mueva la aguja. Empezamos trabajando con clínicas, inmobiliarias y estudios legales, y
                hoy acompañamos empresas de comercio electrónico, salud y tecnología en Perú y fuera del país.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Seguimos siendo un equipo chico a propósito: eso significa que quien diseña tu proyecto es quien
                también responde tus mensajes, no un ticket perdido en una cola de soporte.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="font-semibold text-3xl sm:text-4xl text-brand-navy">Lo que nos guía</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Cuatro principios que no negociamos, proyecto tras proyecto.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    style={{ '--accent': `var(${value.accentVar})` } as React.CSSProperties}
                    className="flex items-start gap-4 bg-brand-light p-6 rounded-2xl border border-slate-100"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center text-[hsl(var(--accent))] shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-brand-navy">{value.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-semibold text-3xl sm:text-4xl text-brand-navy">¿Hablamos de tu proyecto?</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Cuéntanos qué necesitas y te decimos, sin rodeos, si podemos ayudarte.
            </p>
            <div className="mt-8">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2.5 h-[52px] px-8 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                Contáctanos
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang="es" copyright={content.footer.copyright} />
    </div>
  );
}
