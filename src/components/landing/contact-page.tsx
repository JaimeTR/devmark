import Link from 'next/link';
import { ArrowUpRight, BookOpen, CalendarDays, Clock, Headphones, Mail, Phone, Sparkles, Video } from 'lucide-react';
import { BOOKING_URL, EMAIL, HOURS, PHONE_DISPLAY, SUPPORT_EMAIL, WHATSAPP_GREETING, WHATSAPP_NUMBER, whatsappHref } from '@/lib/contact';
import type { Lang, TitleParts } from '@/content/home';
import { ContactForm, type ContactFormCopy } from '@/components/home/contact-form';
import { PageHero } from '@/components/site/page-hero';
import { OpenStatus } from '@/components/site/open-status';
import { CalInline } from '@/components/site/cal-inline';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { Faq } from './faq';

const copy = {
  es: {
    title: ['Hablemos de', { em: 'tu próximo proyecto.' }] as TitleParts,
    description: 'Escríbenos por WhatsApp, déjanos un mensaje o agenda una videollamada. Te responde quien va a trabajar en tu proyecto.',
    whatsapp: 'Escríbenos',
    whatsappLabel: 'Escríbenos por WhatsApp',
    schedule: 'Agendar videollamada',
    hours: 'Horario de atención',
    formTitle: ['Cuéntanos', { em: 'qué necesitas.' }] as TitleParts,
    formText: 'Déjanos tus datos y te escribimos. Si eliges un servicio, llegamos a la conversación con contexto.',
    channels: 'Otros canales',
    sales: 'Ventas',
    support: 'Soporte a clientes',
    phone: 'Teléfono',
    quote: 'Cotiza con nuestra IA',
    quoteText: 'Una propuesta en PDF al momento, sin esperar.',
    quoteHref: '/quote',
    complaints: 'Libro de Reclamaciones',
    complaintsText: 'Registra un reclamo o una queja, o consulta su estado.',
    agendaTitle: ['Agenda una', { em: 'videollamada de 30 minutos.' }] as TitleParts,
    agendaText: 'Elige el día y la hora que te acomoden. Te llega la invitación con el enlace de la llamada a tu correo.',
    agendaOpen: 'Abrir el calendario en Cal.com',
  },
  en: {
    title: ["Let's talk about", { em: 'your next project.' }] as TitleParts,
    description: 'Message us on WhatsApp, leave us a message or book a video call. You talk to the person who will work on your project.',
    whatsapp: 'Message us',
    whatsappLabel: 'Message us on WhatsApp',
    schedule: 'Book a video call',
    hours: 'Business hours',
    formTitle: ['Tell us', { em: 'what you need.' }] as TitleParts,
    formText: 'Leave your details and we will write to you. If you pick a service, we come to the conversation with context.',
    channels: 'Other channels',
    sales: 'Sales',
    support: 'Client support',
    phone: 'Phone',
    quote: 'Get an AI quote',
    quoteText: 'A PDF proposal right away, no waiting.',
    quoteHref: '/en/quote',
    complaints: 'Complaints Book',
    complaintsText: 'File a complaint (Libro de Reclamaciones) or check its status.',
    agendaTitle: ['Book a', { em: '30-minute video call.' }] as TitleParts,
    agendaText: 'Pick the day and time that suit you. The invitation with the call link arrives in your inbox.',
    agendaOpen: 'Open the calendar on Cal.com',
  },
} as const;

const card = 'lift group flex items-center gap-4 rounded-2xl bg-mist p-4 transition-colors hover:bg-band/60';
const tile = 'grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary';

/**
 * Pagina de contacto completa: cabecera con los canales directos, formulario sobre papel con
 * los demas canales al lado, calendario de Cal.com embebido y preguntas frecuentes.
 */
export function ContactPage({ lang, form }: { lang: Lang; form: ContactFormCopy }) {
  const t = copy[lang];
  return (
    <>
      <PageHero
        title={t.title}
        description={t.description}
        actions={
          <>
            <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-light" aria-label={t.whatsappLabel}>
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {t.whatsapp}
            </a>
            <a href="#agenda" className="btn-glass">
              <span className="btn-tile">
                <Video className="h-5 w-5" />
              </span>
              {t.schedule}
            </a>
          </>
        }
        aside={
          <div className="glass-dark hero-in rounded-2xl p-5 text-white sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-periwinkle">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                  {t.hours}
                  <OpenStatus lang={lang} />
                </p>
                <p className="text-[15px]">{HOURS[lang]}</p>
              </div>
            </div>
            <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-[15px]">
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-periwinkle">
                  <WhatsAppIcon className="h-4 w-4" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 hover:text-periwinkle">
                  <Mail className="h-4 w-4" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        }
      />

      <section className="panel-paper py-16 sm:py-24">
        <div className="panel-inner grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div>
            <h2 className="headline reveal text-[clamp(2rem,3.8vw,3.25rem)]">
              <TitleText parts={t.formTitle} />
            </h2>
            <p className="reveal mt-4 max-w-[52ch] text-[17px] leading-relaxed text-ink/70">{t.formText}</p>
            <ContactForm lang={lang} copy={form} tone="light" className="mt-8" />
          </div>

          <aside className="flex flex-col gap-2.5 lg:pt-2">
            <p className="text-sm text-ink/60">{t.channels}</p>
            <a href={`mailto:${EMAIL}`} className={card}>
              <span className={tile}><Mail className="icon-tilt h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block text-xs text-ink/55">{t.sales}</span>
                <span className="block truncate text-[15px]">{EMAIL}</span>
              </span>
            </a>
            <a href={`mailto:${SUPPORT_EMAIL}`} className={card}>
              <span className={tile}><Headphones className="icon-tilt h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block text-xs text-ink/55">{t.support}</span>
                <span className="block truncate text-[15px]">{SUPPORT_EMAIL}</span>
              </span>
            </a>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className={card}>
              <span className={tile}><Phone className="icon-tilt h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block text-xs text-ink/55">{t.phone}</span>
                <span className="block text-[15px]">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={card}>
              <span className={tile}><CalendarDays className="icon-tilt h-5 w-5" /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-ink/55">Cal.com</span>
                <span className="block text-[15px]">{t.schedule}</span>
              </span>
              <ArrowUpRight className="icon-nudge h-5 w-5 shrink-0 text-ink/50" />
            </a>

            <Link href={t.quoteHref} data-tone="dark" className="lift group relative mt-3 flex items-center gap-4 overflow-hidden rounded-2xl bg-ink p-5 text-white">
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-primary/60 blur-3xl" />
              <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-primary">
                <Sparkles className="icon-tilt h-5 w-5" />
              </span>
              <span className="relative min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{t.quote}</span>
                <span className="block text-sm text-ink-muted">{t.quoteText}</span>
              </span>
              <ArrowUpRight className="icon-nudge relative h-5 w-5 shrink-0" />
            </Link>

            <Link href="/libro-de-reclamaciones" className="lift group mt-3 flex items-center gap-4 rounded-2xl border border-ink/10 p-4 transition-colors hover:border-ink/25">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-mist text-ink">
                <BookOpen className="icon-tilt h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-medium">{t.complaints}</span>
                <span className="block text-sm text-ink/60">{t.complaintsText}</span>
              </span>
              <ArrowUpRight className="icon-nudge h-5 w-5 shrink-0 text-ink/50" />
            </Link>
          </aside>
        </div>
      </section>

      <section id="agenda" className="panel-mist scroll-mt-24 py-16 sm:py-24">
        <div className="panel-inner">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="headline reveal max-w-[18ch] text-[clamp(2rem,3.8vw,3.25rem)]">
              <TitleText parts={t.agendaTitle} />
            </h2>
            <p className="reveal max-w-[44ch] text-[17px] leading-relaxed text-ink/70">{t.agendaText}</p>
          </div>
          <div className="mt-10 h-[720px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_24px_60px_-34px_rgba(17,12,41,0.35)] sm:p-4">
            <CalInline />
          </div>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-primary">
            {t.agendaOpen}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Faq lang={lang} />
    </>
  );
}
