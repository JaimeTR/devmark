
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, Clock, Phone, Video, Bot } from "lucide-react";
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">{props.firstNameLabel}</Label>
                  <Input id="first-name" placeholder={props.firstNamePlaceholder} className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">{props.lastNameLabel}</Label>
                  <Input id="last-name" placeholder={props.lastNamePlaceholder} className="bg-background/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="email">{props.emailFormLabel}</Label>
                    <Input id="email" type="email" placeholder={props.emailPlaceholder} className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{props.phoneFormLabel}</Label>
                    <Input id="phone" type="tel" placeholder={props.phonePlaceholder} className="bg-background/50" />
                  </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{props.messageLabel}</Label>
                <Textarea id="message" placeholder={props.messagePlaceholder} rows={5} className="bg-background/50" />
              </div>
               <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className={cn("w-full btn-gradient text-white")}>{props.submitButton}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
