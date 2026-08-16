
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, Clock, Phone, Video, Bot, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect, useActionState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sendContactEmail } from '@/app/actions/contact';

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
}

export function Contact(props: ContactProps) {
  const [time, setTime] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [state, formAction, isPending] = useActionState(sendContactEmail, null);
  const router = useRouter();
  const quoteLink = props.lang === 'en' ? '/en/quote' : '/quote';

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    
    try {
      setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch (e) {
      console.error("Could not determine timezone.");
    }

    return () => clearInterval(timer);
  }, []);

  // Redirigir a página de agradecimiento cuando el envío sea exitoso
  useEffect(() => {
    if (state?.success) {
      const thankYouUrl = props.lang === 'en' 
        ? '/en/thank-you?type=contact'
        : '/gracias?type=contact';
      
      const timer = setTimeout(() => {
        router.push(thankYouUrl);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state?.success, props.lang, router]);

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n%20con%20DevMark&details=Hola%2C%20estoy%20interesado%20en%20sus%20servicios.%20Me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n.&add=${encodeURIComponent('contacto@devmarkpe.com')}&conferenceDataVersion=1&conferenceData.createRequest=1`;

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-xl">
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy animate-fade-in-left">{props.title}</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed animate-fade-in-left stagger-1">{props.description}</p>
          <div className="mt-8 space-y-4 animate-fade-in-left stagger-2">
            <p className="font-extrabold uppercase tracking-widest text-xs text-brand-blue mb-2">{props.contactSubtitle}</p>
            <div className="text-slate-600 space-y-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Mail className="h-5 w-5 text-brand-blue shrink-0" />
                  <span className="font-semibold">{props.emailLabel}</span>
                  <span>{props.email}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Phone className="h-5 w-5 text-brand-blue shrink-0" />
                  <span className="font-semibold">{props.phoneLabel}</span>
                  <span>{props.phone}</span>
              </div>
              {time && timeZone && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Clock className="h-5 w-5 text-brand-blue shrink-0" />
                  <span className="font-semibold">{props.timeZoneLabel}</span>
                  <span>{time} ({timeZone})</span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild variant="outline" className="group w-full sm:w-auto h-12 rounded-2xl border-2 border-brand-blue hover:border-brand-blue-darker bg-white text-brand-blue hover:text-brand-blue-darker font-semibold hover:bg-transparent shadow-xl shadow-brand-blue/10 hover:shadow-brand-blue/20 hover:-translate-y-1 transition-all duration-300 focus-ring">
                  <Link href={googleCalendarLink} target="_blank" rel="noopener noreferrer">
                      {props.scheduleButton}
                      <Video className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </Link>
              </Button>
              <Button asChild className="group w-full sm:w-auto h-12 border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white rounded-2xl font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300 focus-ring">
                <Link href={quoteLink}>
                  {props.quoteButton}
                  <Bot className="ml-2 h-4 w-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Card className="bg-brand-light rounded-3xl border border-slate-100 shadow-sm animate-fade-in-right">
          <CardHeader className="animate-fade-in-right stagger-1">
            <CardTitle className="text-brand-navy">{props.formTitle}</CardTitle>
            <CardDescription className="text-slate-600">{props.formDescription}</CardDescription>
          </CardHeader>
          <CardContent className="p-5 sm:p-6">
            <form action={formAction} className="space-y-4">
              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              {state?.success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">{state.message}</p>
                  </div>
                </div>
              )}
              {state?.success === false && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-900">{state.message}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-brand-navy">{props.firstNameLabel}</Label>
                  <Input id="first-name" name="firstName" placeholder={props.firstNamePlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                  {state?.errors?.firstName && (
                    <p className="text-sm text-red-600">{state.errors.firstName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-brand-navy">{props.lastNameLabel}</Label>
                  <Input id="last-name" name="lastName" placeholder={props.lastNamePlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                  {state?.errors?.lastName && (
                    <p className="text-sm text-red-600">{state.errors.lastName[0]}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="email" className="text-brand-navy">{props.emailFormLabel}</Label>
                    <Input id="email" name="email" type="email" placeholder={props.emailPlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                    {state?.errors?.email && (
                      <p className="text-sm text-red-600">{state.errors.email[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-brand-navy">{props.phoneFormLabel}</Label>
                    <Input id="phone" name="phone" type="tel" placeholder={props.phonePlaceholder} className="bg-white border-slate-200 h-11 md:h-10 focus-ring" required />
                    {state?.errors?.phone && (
                      <p className="text-sm text-red-600">{state.errors.phone[0]}</p>
                    )}
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-brand-navy">{props.messageLabel}</Label>
                <Textarea id="message" name="message" placeholder={props.messagePlaceholder} rows={5} className="bg-white border-slate-200 focus-ring" required />
                {state?.errors?.message && (
                  <p className="text-sm text-red-600">{state.errors.message[0]}</p>
                )}
              </div>
               <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <Button 
                  type="submit" 
                  className={cn("w-full h-12 border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white rounded-2xl font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 focus-ring hover:-translate-y-1 active:translate-y-0 transition-all duration-300")}
                  disabled={isPending || state?.success}
                >
                  {isPending ? (
                    <>
                      Enviando...
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : state?.success ? (
                    <>
                      ¡Enviado!
                      <CheckCircle className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    props.submitButton
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
