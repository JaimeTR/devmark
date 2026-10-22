'use client';

import { useActionState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle, Loader2 } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/contact';
import { whatsappHref } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

interface ServiceHeroProps {
  badge: string;
  title: string;
  description: string;
  lang: 'es' | 'en';
  form: {
    title: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
  };
}

/** Cabecera de cada servicio: panel tinta con el titular y un formulario corto de vidrio. */
export function ServiceHero({ title, description, lang, form }: ServiceHeroProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const es = lang === 'es';
  const message = es ? `Hola DEVMARK, quiero información sobre ${title}.` : `Hi DEVMARK, I'd like information about ${title}.`;
  const errors = state?.errors;

  return (
    <section id="service-hero" data-tone="dark" className="panel-ink mt-2 sm:mt-3">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-primary/35 blur-[130px]" />
      <div className="panel-inner relative grid grid-cols-1 items-center gap-12 pb-14 pt-28 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-20 lg:pt-36">
        <div className="hero-in">
          <h1 className="display text-[clamp(2.75rem,6.4vw,5.25rem)]">{title}</h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-relaxed text-ink-muted">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappHref(message)} target="_blank" rel="noopener noreferrer" className="btn-light">
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {es ? 'Hablemos por WhatsApp' : "Let's talk on WhatsApp"}
            </a>
            <a href="#pricing" className="btn-glass">
              <span className="btn-tile">
                <ArrowUpRight className="h-5 w-5 rotate-90" />
              </span>
              {es ? 'Ver planes y precios' : 'See plans and pricing'}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {es ? 'Respuesta en menos de 24h' : 'Replies within 24h'}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-periwinkle" />
              {es ? 'Asesoría 100% personalizada' : 'Fully personalized advice'}
            </li>
          </ul>
        </div>

        <div className="glass-dark rounded-2xl p-5 sm:p-7">
          <h2 className="headline text-2xl">{form.title}</h2>
          <p className="mt-1.5 text-[15px] text-ink-muted">{es ? 'Cuéntanos tu proyecto y te respondemos a la brevedad.' : 'Tell us about your project and we will get back to you shortly.'}</p>
          <form action={formAction} className="mt-6 space-y-3">
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="service-company">Company</label>
              <input id="service-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="service-first-name" className="sr-only">{form.firstNameLabel}</label>
                <input id="service-first-name" name="firstName" placeholder={form.firstNamePlaceholder} autoComplete="given-name" required className="field-dark h-12" />
                {errors?.firstName && <p className="mt-1.5 text-sm text-red-300">{errors.firstName[0]}</p>}
              </div>
              <div>
                <label htmlFor="service-last-name" className="sr-only">{es ? 'Apellidos' : 'Last name'}</label>
                <input id="service-last-name" name="lastName" placeholder={es ? 'Tus apellidos' : 'Your last name'} autoComplete="family-name" required className="field-dark h-12" />
                {errors?.lastName && <p className="mt-1.5 text-sm text-red-300">{errors.lastName[0]}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="service-email" className="sr-only">{form.emailLabel}</label>
                <input id="service-email" name="email" type="email" placeholder={form.emailPlaceholder} autoComplete="email" required className="field-dark h-12" />
                {errors?.email && <p className="mt-1.5 text-sm text-red-300">{errors.email[0]}</p>}
              </div>
              <div>
                <label htmlFor="service-phone" className="sr-only">{form.phoneLabel}</label>
                <input id="service-phone" name="phone" type="tel" placeholder={form.phonePlaceholder} autoComplete="tel" required className="field-dark h-12" />
                {errors?.phone && <p className="mt-1.5 text-sm text-red-300">{errors.phone[0]}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="service-message" className="sr-only">{form.messageLabel}</label>
              <textarea id="service-message" name="message" placeholder={form.messagePlaceholder} rows={3} required className="field-dark resize-none py-3.5" />
              {errors?.message && <p className="mt-1.5 text-sm text-red-300">{errors.message[0]}</p>}
            </div>
            {state?.success && (
              <p role="status" className="flex items-start gap-2 rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-200">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {form.successMessage}
              </p>
            )}
            {state?.success === false && (
              <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {errors ? state.message : form.errorMessage}
              </p>
            )}
            <button type="submit" disabled={isPending || state?.success} className="btn-light w-full disabled:cursor-not-allowed disabled:opacity-60">
              <span className="btn-tile">{isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : state?.success ? <CheckCircle className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}</span>
              {isPending ? (es ? 'Enviando…' : 'Sending…') : state?.success ? (es ? '¡Enviado!' : 'Sent!') : form.submitButton}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
