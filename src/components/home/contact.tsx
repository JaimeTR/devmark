'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowUpRight, Calculator, CheckCircle, Clock, Loader2, Lock, Mail, MessageSquare, Phone, User, Video } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/contact';
import { BOOKING_URL, HOURS, WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { cn } from '@/lib/utils';
import type { TitleParts } from '@/content/home';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

interface ContactProps {
  lang: 'es' | 'en';
  title: string;
  description: string;
  contactSubtitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  timeZoneLabel: string;
  formTitle: string;
  formDescription: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  emailFormLabel: string;
  emailPlaceholder: string;
  phoneFormLabel: string;
  phonePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitButton: string;
  scheduleButton: string;
  quoteButton: string;
  /** Titular con la frase en cursiva; si falta se usa `title`. */
  heading?: TitleParts;
  /** Es el primer panel de la pagina: deja sitio a la barra fija. */
  first?: boolean;
}

const field =
  'peer w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 pr-4 text-[15px] text-white placeholder:text-white/40 transition-colors focus:border-periwinkle/70 focus:bg-white/[0.09] focus:outline-none';
// Icono dentro del campo: se aclara cuando el campo tiene el foco.
const fieldIcon = 'pointer-events-none absolute left-4 h-4 w-4 text-white/40 transition-colors peer-focus:text-periwinkle';

const services = {
  es: [
    ['web', 'Página web'],
    ['tienda', 'Tienda online'],
    ['software', 'Software'],
    ['automatizacion', 'Automatización'],
    ['chatbot', 'Chatbot con IA'],
    ['seo', 'SEO y GEO'],
    ['otro', 'Otro'],
  ],
  en: [
    ['web', 'Website'],
    ['tienda', 'Online store'],
    ['software', 'Software'],
    ['automatizacion', 'Automation'],
    ['chatbot', 'AI chatbot'],
    ['seo', 'SEO & GEO'],
    ['otro', 'Other'],
  ],
} as const;

/** Panel oscuro de contacto: WhatsApp primero, formulario al lado. */
export function Contact(props: ContactProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const router = useRouter();
  const es = props.lang === 'es';
  const quoteLink = es ? '/quote' : '/en/quote';

  // Redirigir a la página de agradecimiento cuando el envío sea exitoso.
  useEffect(() => {
    if (!state?.success) return;
    const timer = setTimeout(() => router.push(es ? '/gracias?type=contact' : '/en/thank-you?type=contact'), 1800);
    return () => clearTimeout(timer);
  }, [state?.success, es, router]);

  return (
    <section id="contact" data-tone="dark" className={cn('panel-ink py-20 sm:py-28', props.first && 'mt-2 pt-32 sm:mt-3 sm:pt-40')}>
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="panel-inner relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col">
          {(() => {
            const Tag = props.first ? 'h1' : 'h2';
            return <Tag className={cn('headline text-[clamp(2.2rem,4.6vw,4rem)]', !props.first && 'reveal')}>{props.heading ? <TitleText parts={props.heading} /> : props.title}</Tag>;
          })()}
          <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-muted">{props.description}</p>

          <div className="mt-9 grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <a href={whatsappHref(WHATSAPP_GREETING[props.lang])} target="_blank" rel="noopener noreferrer" className="btn-light" aria-label={es ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}>
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {es ? 'Escríbenos' : 'Message us'}
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-glass">
              <span className="btn-tile">
                <Video className="h-5 w-5" />
              </span>
              <span className="sm:hidden">{es ? 'Agendar' : 'Book'}</span>
              <span className="hidden sm:inline">{props.scheduleButton}</span>
            </a>
          </div>

          <dl className="mt-auto grid gap-5 pt-12 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-ink-muted">{props.emailLabel.replace(':', '')}</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${props.email}`} className="inline-flex items-center gap-2 text-[17px] hover:text-periwinkle">
                  <Mail className="h-4 w-4" />
                  {props.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-ink-muted">{props.phoneLabel.replace(':', '')}</dt>
              <dd className="mt-1.5">
                <a href={`tel:${props.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-[17px] hover:text-periwinkle">
                  <Phone className="h-4 w-4" />
                  {props.phone}
                </a>
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-ink-muted">{es ? 'Horario' : 'Hours'}</dt>
              <dd className="mt-1.5 inline-flex items-center gap-2 text-[17px]">
                <Clock className="h-4 w-4" />
                {HOURS[props.lang]}
              </dd>
            </div>
          </dl>
          <a href={quoteLink} className="mt-6 inline-flex items-center gap-2 text-[15px] text-ink-muted hover:text-white">
            <Calculator className="h-4 w-4" />
            {props.quoteButton}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <h3 className="headline text-2xl">{props.formTitle}</h3>
          <p className="mt-2 text-[15px] text-ink-muted">{props.formDescription}</p>
          <form action={formAction} className="mt-7 space-y-3">
            {/* Honeypot anti-spam: oculto para personas */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <fieldset className="pb-2">
              <legend className="text-sm text-ink-muted">{es ? '¿Qué necesitas?' : 'What do you need?'}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {services[props.lang].map(([value, label]) => (
                  <label key={value} className="cursor-pointer">
                    <input type="radio" name="service" value={value} className="peer sr-only" />
                    <span className="inline-flex h-9 items-center rounded-lg border border-white/10 bg-white/[0.04] px-3.5 text-sm text-white/75 transition-colors hover:border-white/25 hover:text-white peer-checked:border-periwinkle peer-checked:bg-periwinkle peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-periwinkle">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="sr-only">{props.firstNameLabel}</label>
                <div className="relative flex items-center">
                  <input id="first-name" name="firstName" placeholder={props.firstNamePlaceholder} autoComplete="given-name" required className={cn(field, 'h-12')} />
                  <User className={fieldIcon} />
                </div>
                {state?.errors?.firstName && <p className="mt-1.5 text-sm text-red-300">{state.errors.firstName[0]}</p>}
              </div>
              <div>
                <label htmlFor="last-name" className="sr-only">{props.lastNameLabel}</label>
                <div className="relative flex items-center">
                  <input id="last-name" name="lastName" placeholder={props.lastNamePlaceholder} autoComplete="family-name" required className={cn(field, 'h-12')} />
                  <User className={fieldIcon} />
                </div>
                {state?.errors?.lastName && <p className="mt-1.5 text-sm text-red-300">{state.errors.lastName[0]}</p>}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="sr-only">{props.emailFormLabel}</label>
                <div className="relative flex items-center">
                  <input id="email" name="email" type="email" placeholder={props.emailPlaceholder} autoComplete="email" required className={cn(field, 'h-12')} />
                  <Mail className={fieldIcon} />
                </div>
                {state?.errors?.email && <p className="mt-1.5 text-sm text-red-300">{state.errors.email[0]}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">{props.phoneFormLabel}</label>
                <div className="relative flex items-center">
                  <input id="phone" name="phone" type="tel" placeholder={props.phonePlaceholder} autoComplete="tel" required className={cn(field, 'h-12')} />
                  <Phone className={fieldIcon} />
                </div>
                {state?.errors?.phone && <p className="mt-1.5 text-sm text-red-300">{state.errors.phone[0]}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="sr-only">{props.messageLabel}</label>
              <div className="relative">
                <textarea id="message" name="message" placeholder={props.messagePlaceholder} rows={5} required className={cn(field, 'resize-none py-3.5')} />
                <MessageSquare className={cn(fieldIcon, 'top-4')} />
              </div>
              {state?.errors?.message && <p className="mt-1.5 text-sm text-red-300">{state.errors.message[0]}</p>}
            </div>

            {state && !state.success && state.message && (
              <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {state.message}
              </p>
            )}
            {state?.success && (
              <p role="status" className="flex items-start gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {state.message}
              </p>
            )}

            <button type="submit" disabled={isPending || state?.success} className="btn-light w-full disabled:cursor-not-allowed disabled:opacity-60">
              <span className="btn-tile">{isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : state?.success ? <CheckCircle className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}</span>
              {isPending ? (es ? 'Enviando…' : 'Sending…') : state?.success ? (es ? '¡Enviado!' : 'Sent!') : props.submitButton}
            </button>
            <p className="inline-flex items-center gap-2 pt-2 text-sm text-ink-muted">
              <Lock className="h-3.5 w-3.5" />
              {es ? 'Tus datos solo se usan para responderte.' : 'Your details are only used to reply to you.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
