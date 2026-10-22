import { CodeXml, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { Contact } from '@/components/home/contact';
import { GlobalReach } from '@/components/globe/global-reach';
import { PageHero } from '@/components/site/page-hero';
import { RevealWords } from '@/components/site/reveal-words';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { contactContent } from '@/content/home-data';
import { homeContent, type Lang } from '@/content/home';
import { whatsappHref } from '@/lib/contact';

const icons = [ShieldCheck, CodeXml, Users, TrendingUp];

const copy = {
  es: {
    title: ['Estrategia, diseño y tecnología', { em: 'en una sola mesa' }] as const,
    description: 'DEVMARK es un estudio de desarrollo web y software con base en Lima, Perú. No somos una plantilla con tu logo encima: cada proyecto se piensa desde la estrategia del negocio, no solo desde el código.',
    whatsapp: 'Hablemos por WhatsApp',
    message: 'Hola DEVMARK, quiero conocer más sobre ustedes.',
    storyTitle: ['Cómo', { em: 'empezamos' }] as const,
    story: [
      'DEVMARK nació de una idea simple: la mayoría de negocios peruanos no necesitan más plantillas genéricas, necesitan un equipo que entienda su industria y traduzca eso en una web o software que realmente mueva la aguja. Empezamos trabajando con clínicas, inmobiliarias y estudios legales, y hoy acompañamos empresas de comercio electrónico, salud y tecnología en Perú y fuera del país.',
      'Seguimos siendo un equipo chico a propósito: eso significa que quien diseña tu proyecto es quien también responde tus mensajes, no un ticket perdido en una cola de soporte.',
    ],
    valuesTitle: ['Lo que', { em: 'nos guía' }] as const,
    valuesText: 'Cuatro principios que no negociamos, proyecto tras proyecto.',
    values: [
      { title: 'Transparencia', description: 'Comunicación clara en cada etapa del proyecto, sin letra chica ni sorpresas en la factura.' },
      { title: 'Calidad técnica', description: 'Código limpio y escalable. Construimos pensando en el día 100, no solo en el lanzamiento.' },
      { title: 'Cercanía', description: 'Trabajamos codo a codo contigo, como parte de tu equipo, no como un proveedor externo más.' },
      { title: 'Resultados medibles', description: 'Cada decisión de diseño o desarrollo está respaldada por datos, no por intuición.' },
    ],
    header: { contactButton: 'Contactar', aiAssistant: 'Asistente IA', aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.' },
    copyright: 'DEVMARK. Todos los derechos reservados.',
  },
  en: {
    title: ['Strategy, design and technology', { em: 'at one table' }] as const,
    description: "DEVMARK is a web and software development studio based in Lima, Peru. We're not a template with your logo on top: every project starts from business strategy, not just from code.",
    whatsapp: "Let's talk on WhatsApp",
    message: "Hi DEVMARK, I'd like to know more about you.",
    storyTitle: ['How we', { em: 'started' }] as const,
    story: [
      "DEVMARK started from a simple idea: most Peruvian businesses don't need another generic template, they need a team that understands their industry and turns that into a website or software that actually moves the needle. We started working with clinics, real estate agencies and law firms, and today we support e-commerce, healthcare and tech companies in Peru and abroad.",
      'We stay a small team on purpose: it means whoever designs your project is also the one answering your messages, not a lost ticket in a support queue.',
    ],
    valuesTitle: ['What', { em: 'guides us' }] as const,
    valuesText: "Four principles we don't negotiate on, project after project.",
    values: [
      { title: 'Transparency', description: 'Clear communication at every stage of the project, no fine print and no surprises on the invoice.' },
      { title: 'Technical quality', description: 'Clean, scalable code. We build for day 100, not just for launch day.' },
      { title: 'Closeness', description: 'We work side by side with you, as part of your team, not as just another outside vendor.' },
      { title: 'Measurable results', description: 'Every design or development decision is backed by data, not by intuition.' },
    ],
    header: { contactButton: 'Contact', aiAssistant: 'AI Assistant', aiAssistantTooltip: "Hi! I'm your AI assistant." },
    copyright: 'DEVMARK. All rights reserved.',
  },
} as const;

/** Nosotros / About: historia, alcance desde Lima, principios y contacto. */
export function AboutPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="bg-paper">
      <Header lang={lang} {...t.header} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero
          title={t.title}
          description={t.description}
          actions={
            <a href={whatsappHref(t.message)} target="_blank" rel="noopener noreferrer" className="btn-light">
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {t.whatsapp}
            </a>
          }
        />
        <section className="panel-paper py-20 sm:py-28">
          <div className="panel-inner grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
              {t.storyTitle[0]} <em>{t.storyTitle[1].em}</em>
            </h2>
            <div className="space-y-6">
              <RevealWords as="p" parts={[t.story[0]]} className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug text-ink" />
              <p className="reveal max-w-[60ch] text-[17px] leading-relaxed text-ink/70">{t.story[1]}</p>
              <dl className="reveal grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
                {homeContent[lang].intro.stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse gap-1.5">
                    <dt className="text-sm text-ink/60">{s.label}</dt>
                    <dd className="headline text-[clamp(2rem,4vw,3.25rem)] tabular-nums">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
        <GlobalReach lang={lang} />
        <section className="panel-paper py-20 sm:py-28">
          <div className="panel-inner">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
                {t.valuesTitle[0]} <em>{t.valuesTitle[1].em}</em>
              </h2>
              <p className="reveal max-w-[46ch] text-[17px] text-ink/70">{t.valuesText}</p>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.values.map((v, i) => {
                const Icon = icons[i];
                return (
                  <div key={v.title} className="reveal group rounded-2xl bg-mist p-6 transition-colors duration-500 hover:bg-ink hover:text-white">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-ink transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="headline mt-10 text-2xl">{v.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-ink-muted">{v.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <Contact {...contactContent[lang]} heading={homeContent[lang].contact.title} />
      </main>
      <Footer lang={lang} copyright={t.copyright} />
    </div>
  );
}
