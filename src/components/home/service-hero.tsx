
'use client';

import { useActionState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { sendContactEmail } from '@/app/actions/contact';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export function ServiceHero({ badge, title, description, lang, form }: ServiceHeroProps) {
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const isEs = lang === 'es';

  return (
    <section id="service-hero" className="relative py-12 md:py-20 overflow-hidden">
      {/* Soft corner ornament — decorative only, never behind real text */}
      <Image
        src="/illustrations/coding.svg"
        alt=""
        role="presentation"
        width={878}
        height={496}
        className="hidden md:block absolute -top-10 -right-24 w-[520px] h-auto opacity-[0.07] pointer-events-none select-none"
        priority={false}
      />
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="text-center lg:text-left">
          <Badge
            variant="outline"
            className={
              isEs
                ? 'mb-4 text-brand-navy border-brand-lavender bg-brand-lavender/50 text-xs font-extrabold tracking-widest uppercase'
                : 'mb-4 text-primary border-primary/50'
            }
          >
            {badge}
          </Badge>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gradient">{title}</h1>
          <p className="max-w-2xl mx-auto lg:mx-0 mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-500" />
              {isEs ? 'Respuesta en menos de 24h' : 'Replies within 24h'}
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-blue" />
              {isEs ? 'Asesoría 100% personalizada' : 'Fully personalized advice'}
            </span>
          </div>
        </div>

        <Card className={cn(
          isEs ? 'bg-brand-light rounded-3xl border border-slate-100 shadow-sm' : 'bg-primary/5 backdrop-blur-sm border-primary/10',
          'shadow-xl shadow-brand-blue/5'
        )}>
          <CardContent className="p-5 sm:p-6 md:p-8">
            <h2 className="font-headline text-xl font-bold text-brand-navy dark:text-white mb-1">{form.title}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{isEs ? 'Cuéntanos tu proyecto y te respondemos a la brevedad.' : 'Tell us about your project and we will get back to you shortly.'}</p>
            <form action={formAction} className="space-y-4">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {state?.success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-green-900">{form.successMessage}</p>
                </div>
              )}
              {state?.success === false && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-red-900">{form.errorMessage}</p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="service-first-name" className="text-brand-navy dark:text-slate-200">{form.firstNameLabel}</Label>
                  <Input id="service-first-name" name="firstName" placeholder={form.firstNamePlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="service-email" className="text-brand-navy dark:text-slate-200">{form.emailLabel}</Label>
                  <Input id="service-email" name="email" type="email" placeholder={form.emailPlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-phone" className="text-brand-navy dark:text-slate-200">{form.phoneLabel}</Label>
                <Input id="service-phone" name="phone" type="tel" placeholder={form.phonePlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-message" className="text-brand-navy dark:text-slate-200">{form.messageLabel}</Label>
                <Textarea id="service-message" name="message" placeholder={form.messagePlaceholder} rows={3} className="bg-white border-slate-200 resize-none focus-ring" required />
              </div>
              <Button
                type="submit"
                className="group w-full h-12 btn-gradient text-white rounded-full font-semibold shadow-lg shadow-brand-blue/20 focus-ring hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                disabled={isPending || state?.success}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEs ? 'Enviando...' : 'Sending...'}
                  </>
                ) : state?.success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {isEs ? '¡Enviado!' : 'Sent!'}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    {form.submitButton}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
