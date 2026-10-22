'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, ArrowUpRight, CheckCircle, Loader2, Lock, Mail, MessageSquare, Phone, User } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/contact';
import { cn } from '@/lib/utils';

export type ContactFormCopy = {
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
};

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

// Dos tonos: sobre tinta (seccion de contacto) y sobre papel (pagina de contacto).
const TONES = {
  dark: {
    card: 'rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8',
    title: '',
    muted: 'text-ink-muted',
    field: 'border-white/10 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-periwinkle/70 focus:bg-white/[0.09]',
    icon: 'text-white/40 peer-focus:text-periwinkle',
    pill: 'border-white/10 bg-white/[0.04] text-white/75 hover:border-white/25 hover:text-white peer-checked:border-periwinkle peer-checked:bg-periwinkle peer-checked:text-ink',
    error: 'text-red-300',
    alert: 'bg-red-500/10 text-red-200',
    ok: 'bg-emerald-500/10 text-emerald-200',
    button: 'btn-light',
  },
  light: {
    card: 'rounded-2xl bg-mist p-5 sm:p-8',
    title: 'text-ink',
    muted: 'text-ink/60',
    field: 'border-ink/10 bg-white text-ink placeholder:text-ink/40 focus:border-primary/60',
    icon: 'text-ink/35 peer-focus:text-primary',
    pill: 'border-ink/10 bg-white text-ink/70 hover:border-ink/25 hover:text-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white',
    error: 'text-red-600',
    alert: 'bg-red-500/10 text-red-700',
    ok: 'bg-emerald-500/10 text-emerald-700',
    button: 'btn-ink',
  },
} as const;

/** Formulario de contacto (servidor: sendContactEmail). Al enviarse bien lleva a la pagina de gracias. */
export function ContactForm({ lang, copy, tone = 'dark', className }: { lang: 'es' | 'en'; copy: ContactFormCopy; tone?: 'dark' | 'light'; className?: string }) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const router = useRouter();
  const es = lang === 'es';
  const t = TONES[tone];
  const field = cn('peer w-full rounded-xl border pl-11 pr-4 text-[15px] transition-colors focus:outline-none', t.field);
  const fieldIcon = cn('pointer-events-none absolute left-4 h-4 w-4 transition-colors', t.icon);

  useEffect(() => {
    if (!state?.success) return;
    const timer = setTimeout(() => router.push(es ? '/gracias?type=contact' : '/en/thank-you?type=contact'), 1800);
    return () => clearTimeout(timer);
  }, [state?.success, es, router]);

  return (
    <div className={cn('flex flex-col', t.card, className)}>
      <h3 className={cn('headline text-2xl', t.title)}>{copy.formTitle}</h3>
      <p className={cn('mt-2 text-[15px]', t.muted)}>{copy.formDescription}</p>
      <form action={formAction} className="relative mt-7 space-y-3">
        {/* Honeypot anti-spam: oculto para personas */}
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <fieldset className="pb-2">
          <legend className={cn('text-sm', t.muted)}>{es ? '¿Qué necesitas?' : 'What do you need?'}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {services[lang].map(([value, label]) => (
              <label key={value} className="cursor-pointer">
                <input type="radio" name="service" value={value} className="peer sr-only" />
                <span className={cn('inline-flex h-9 items-center rounded-lg border px-3.5 text-sm transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-periwinkle', t.pill)}>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="sr-only">{copy.firstNameLabel}</label>
            <div className="relative flex items-center">
              <input id="first-name" name="firstName" placeholder={copy.firstNamePlaceholder} autoComplete="given-name" required className={cn(field, 'h-12')} />
              <User className={fieldIcon} />
            </div>
            {state?.errors?.firstName && <p className={cn('mt-1.5 text-sm', t.error)}>{state.errors.firstName[0]}</p>}
          </div>
          <div>
            <label htmlFor="last-name" className="sr-only">{copy.lastNameLabel}</label>
            <div className="relative flex items-center">
              <input id="last-name" name="lastName" placeholder={copy.lastNamePlaceholder} autoComplete="family-name" required className={cn(field, 'h-12')} />
              <User className={fieldIcon} />
            </div>
            {state?.errors?.lastName && <p className={cn('mt-1.5 text-sm', t.error)}>{state.errors.lastName[0]}</p>}
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="sr-only">{copy.emailFormLabel}</label>
            <div className="relative flex items-center">
              <input id="email" name="email" type="email" placeholder={copy.emailPlaceholder} autoComplete="email" required className={cn(field, 'h-12')} />
              <Mail className={fieldIcon} />
            </div>
            {state?.errors?.email && <p className={cn('mt-1.5 text-sm', t.error)}>{state.errors.email[0]}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="sr-only">{copy.phoneFormLabel}</label>
            <div className="relative flex items-center">
              <input id="phone" name="phone" type="tel" placeholder={copy.phonePlaceholder} autoComplete="tel" required className={cn(field, 'h-12')} />
              <Phone className={fieldIcon} />
            </div>
            {state?.errors?.phone && <p className={cn('mt-1.5 text-sm', t.error)}>{state.errors.phone[0]}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="sr-only">{copy.messageLabel}</label>
          <div className="relative">
            <textarea id="message" name="message" placeholder={copy.messagePlaceholder} rows={5} required className={cn(field, 'resize-none py-3.5')} />
            <MessageSquare className={cn(fieldIcon, 'top-4')} />
          </div>
          {state?.errors?.message && <p className={cn('mt-1.5 text-sm', t.error)}>{state.errors.message[0]}</p>}
        </div>

        {state && !state.success && state.message && (
          <p role="alert" className={cn('flex items-start gap-2 rounded-xl p-3 text-sm', t.alert)}>
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {state.message}
          </p>
        )}
        {state?.success && (
          <p role="status" className={cn('flex items-start gap-2 rounded-xl p-3 text-sm', t.ok)}>
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {state.message}
          </p>
        )}

        <button type="submit" disabled={isPending || state?.success} className={cn(t.button, 'w-full disabled:cursor-not-allowed disabled:opacity-60')}>
          <span className="btn-tile">{isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : state?.success ? <CheckCircle className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}</span>
          {isPending ? (es ? 'Enviando…' : 'Sending…') : state?.success ? (es ? '¡Enviado!' : 'Sent!') : copy.submitButton}
        </button>
        <p className={cn('inline-flex items-center gap-2 pt-2 text-sm', t.muted)}>
          <Lock className="h-3.5 w-3.5" />
          {es ? 'Tus datos solo se usan para responderte.' : 'Your details are only used to reply to you.'}
        </p>
      </form>
    </div>
  );
}
