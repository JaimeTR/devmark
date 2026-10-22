import Link from 'next/link';
import { ArrowUpRight, Compass, Lightbulb, Megaphone, Wrench } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { PageHero } from '@/components/site/page-hero';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { getStartingPrice } from '@/data/services';
import { whatsappHref } from '@/lib/contact';
import type { Lang } from '@/content/home';
import { ServicesShowcase } from './services-showcase';
import { Process } from './process';
import { Faq } from './faq';
import { ClientPortal } from './client-portal';
import { Products } from './products';

const icons = [Compass, Megaphone, Wrench, Lightbulb];

const copy = {
  es: {
    title: ['Servicios de desarrollo', { em: 'web y software' }] as const,
    description: 'Soluciones completas para que tu negocio crezca en internet: webs, tiendas, sistemas, automatizaciones, IA y SEO. Todos los planes tienen precio publicado.',
    whatsapp: 'Cotizar por WhatsApp',
    message: 'Hola DEVMARK, quiero cotizar un servicio.',
    quote: 'Cotizar con IA',
    quoteHref: '/quote',
    extraTitle: ['Servicios', { em: 'complementarios' }] as const,
    extraText: 'Refuerzan el desarrollo principal: diseño, marketing, soporte y consultoría.',
    from: 'Desde',
    more: 'Ver servicio',
    extra: [
      { title: 'Diseño UI/UX', description: 'Diseño centrado en la experiencia del usuario, prototipos y wireframes interactivos. Interfaces modernas, limpias y responsivas.', href: '/servicios/diseno-ui-ux' },
      { title: 'Marketing digital', description: 'Estrategias de crecimiento y captación de clientes, campañas en Google Ads y Meta Ads, email marketing y automatización de ventas.', href: '/servicios/marketing-digital' },
      { title: 'Soporte y mantenimiento', description: 'Actualizaciones de seguridad y plugins, monitoreo de rendimiento, copias de seguridad y resolución de incidencias.', href: '/servicios/soporte-mantenimiento' },
      { title: 'Consultoría tecnológica', description: 'Asesoría para digitalizar procesos, elegir las plataformas adecuadas y planear escalabilidad y seguridad.', href: '/servicios/consultoria-tecnologica' },
    ],
    header: { contactButton: 'Contactar', aiAssistant: 'Asistente IA', aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.' },
    copyright: 'DEVMARK. Todos los derechos reservados.',
  },
  en: {
    title: ['Web and software', { em: 'development services' }] as const,
    description: 'Complete solutions for your business to grow online: websites, stores, systems, automations, AI and SEO. Every plan has a published price.',
    whatsapp: 'Get a quote on WhatsApp',
    message: "Hi DEVMARK, I'd like a quote for a service.",
    quote: 'Quote with AI',
    quoteHref: '/en/quote',
    extraTitle: ['Additional', { em: 'services' }] as const,
    extraText: 'They reinforce the main development: design, marketing, support and consulting.',
    from: 'From',
    more: 'View service',
    extra: [
      { title: 'UI/UX design', description: 'User-centered design, interactive prototypes and wireframes. Modern, clean and responsive interfaces.', href: '/en/services/ui-ux-design' },
      { title: 'Digital marketing', description: 'Growth and customer acquisition strategies, Google Ads and Meta Ads campaigns, email marketing and sales automation.', href: '/en/services/digital-marketing' },
      { title: 'Support & maintenance', description: 'Security and plugin updates, performance monitoring, backups and incident resolution.', href: '/en/services/support-maintenance' },
      { title: 'Technology consulting', description: 'Advice to digitize processes, choose the right platforms and plan for scalability and security.', href: '/en/services/tech-consulting' },
    ],
    header: { contactButton: 'Contact', aiAssistant: 'AI Assistant', aiAssistantTooltip: "Hi! I'm your AI assistant." },
    copyright: 'DEVMARK. All rights reserved.',
  },
} as const;

/** Indice de servicios: cabecera, columnas de servicios, complementarios, proceso y preguntas. */
export function ServicesIndex({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="bg-paper">
      <Header lang={lang} {...t.header} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <PageHero
          title={t.title}
          description={t.description}
          actions={
            <>
              <a href={whatsappHref(t.message)} target="_blank" rel="noopener noreferrer" className="btn-light">
                <span className="btn-tile">
                  <WhatsAppIcon />
                </span>
                {t.whatsapp}
              </a>
              <Link href={t.quoteHref} className="btn-glass">
                <span className="btn-tile">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                {t.quote}
              </Link>
            </>
          }
        />
        <ServicesShowcase lang={lang} />
        <section className="panel-paper py-20 sm:py-28">
          <div className="panel-inner">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
              <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">
                {t.extraTitle[0]} <em>{t.extraTitle[1].em}</em>
              </h2>
              <p className="reveal max-w-[46ch] text-[17px] text-ink/70">{t.extraText}</p>
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.extra.map((s, i) => {
                const Icon = icons[i];
                const from = getStartingPrice(s.href, lang);
                return (
                  <Link key={s.href} href={s.href} className="reveal group flex flex-col rounded-2xl bg-mist p-6 transition-colors duration-500 hover:bg-ink hover:text-white">
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-white text-ink transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="headline mt-8 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-ink-muted">{s.description}</p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-8">
                      {from && (
                        <p className="text-sm text-ink/55 group-hover:text-ink-muted">
                          {t.from} <span className="headline block text-2xl text-ink group-hover:text-white">{from}</span>
                        </p>
                      )}
                      <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-white transition-colors group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRight className="h-4 w-4" />
                        <span className="sr-only">{t.more}</span>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <Process lang={lang} />
        <ClientPortal lang={lang} />
        <Products lang={lang} />
        <Faq lang={lang} />
      </main>
      <Footer lang={lang} copyright={t.copyright} />
    </div>
  );
}
