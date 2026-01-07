
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

  const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Reuni%C3%B3n%20con%20DevMark&details=Hola%2C%20estoy%20interesado%20en%20sus%20servicios.%20Me%20gustar%C3%ADa%20agendar%20una%20reuni%C3%B3n.&add=${encodeURIComponent('jaimetr1309@gmail.com')}&conferenceDataVersion=1&conferenceData.createRequest=1`;

  return (
    <section id="contact" className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="max-w-xl">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-gradient">{props.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{props.description}</p>
          <div className="mt-8 space-y-4">
            <p className="font-bold uppercase tracking-wider text-primary mb-2">{props.contactSubtitle}</p>
            <div className="text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{props.emailLabel}</span>
                  <span>{props.email}</span>
              </div>
              <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{props.phoneLabel}</span>
                  <span>{props.phone}</span>
              </div>
              {time && timeZone && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{props.timeZoneLabel}</span>
                  <span>{time} ({timeZone})</span>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild variant="outline" className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:text-white">
                  <Link href={googleCalendarLink} target="_blank">
                      <Video className="mr-2 h-4 w-4" />
                      {props.scheduleButton}
                  </Link>
              </Button>
              <Button asChild className="w-full sm:w-auto btn-gradient text-white">
                <Link href={quoteLink}>
                  <Bot className="mr-2 h-4 w-4" />
                  {props.quoteButton}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Card className="bg-primary/5 backdrop-blur-sm border-primary/10">
          <CardHeader>
            <CardTitle>{props.formTitle}</CardTitle>
            <CardDescription>{props.formDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
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
                  <Label htmlFor="first-name">{props.firstNameLabel}</Label>
                  <Input id="first-name" name="firstName" placeholder={props.firstNamePlaceholder} className="bg-background/50" required />
                  {state?.errors?.firstName && (
                    <p className="text-sm text-red-600">{state.errors.firstName[0]}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{props.lastNameLabel}</Label>
                  <Input id="last-name" name="lastName" placeholder={props.lastNamePlaceholder} className="bg-background/50" required />
                  {state?.errors?.lastName && (
                    <p className="text-sm text-red-600">{state.errors.lastName[0]}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="email">{props.emailFormLabel}</Label>
                    <Input id="email" name="email" type="email" placeholder={props.emailPlaceholder} className="bg-background/50" required />
                    {state?.errors?.email && (
                      <p className="text-sm text-red-600">{state.errors.email[0]}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{props.phoneFormLabel}</Label>
                    <Input id="phone" name="phone" type="tel" placeholder={props.phonePlaceholder} className="bg-background/50" required />
                    {state?.errors?.phone && (
                      <p className="text-sm text-red-600">{state.errors.phone[0]}</p>
                    )}
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{props.messageLabel}</Label>
                <Textarea id="message" name="message" placeholder={props.messagePlaceholder} rows={5} className="bg-background/50" required />
                {state?.errors?.message && (
                  <p className="text-sm text-red-600">{state.errors.message[0]}</p>
                )}
              </div>
               <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  className={cn("w-full btn-gradient text-white")}
                  disabled={isPending || state?.success}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : state?.success ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      ¡Enviado!
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
