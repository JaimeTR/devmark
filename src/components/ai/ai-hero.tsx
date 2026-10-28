import Link from 'next/link';
import { Bot, Clock, FileText, MessageSquare, Sparkles, Wallet } from 'lucide-react';
import { PageHero } from '@/components/site/page-hero';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { DeviImg } from '@/components/site/devi-img';
import { whatsappHref } from '@/lib/contact';

type Lang = 'es' | 'en';

const copy = {
  es: {
    quote: {
      title: ['Cotiza tu proyecto', { em: 'con IA' }] as const,
      text: 'Responde 9 preguntas rápidas y nuestra IA arma una propuesta preliminar con alcance, precio estimado y recomendaciones. La validamos contigo por WhatsApp.',
      perks: [
        { icon: Clock, title: 'En 2 minutos', text: 'Sin llamadas ni formularios largos.' },
        { icon: Wallet, title: 'Precio estimado', text: 'Desglosado por partes del proyecto.' },
        { icon: FileText, title: 'Propuesta en PDF', text: 'Lista para compartir con tu equipo.' },
      ],
      alt: { href: '/ai-assistant', label: 'Prefiero preguntar al asistente', icon: Bot },
    },
    assistant: {
      title: ['Pregúntale', { em: 'a nuestra IA' }] as const,
      text: 'DEVMARKAI conoce nuestros servicios, planes y precios. Resuelve tus dudas al instante, de día o de noche, y si quieres te conecta con el equipo.',
      perks: [
        { icon: MessageSquare, title: 'Responde al instante', text: 'Servicios, planes, plazos y precios.' },
        { icon: Sparkles, title: 'Te orienta', text: 'Te dice qué solución encaja con tu negocio.' },
        { icon: WhatsAppIcon, title: 'Te pasa con el equipo', text: 'Cuando quieras hablar con una persona.' },
      ],
      alt: { href: '/quote', label: 'Cotizar mi proyecto con IA', icon: Sparkles },
    },
    whatsapp: 'WhatsApp',
    message: 'Hola DEVMARK, quiero cotizar un proyecto.',
  },
  en: {
    quote: {
      title: ['Quote your project', { em: 'with AI' }] as const,
      text: 'Answer 9 quick questions and our AI builds a preliminary proposal with scope, estimated price and recommendations. We validate it with you on WhatsApp.',
      perks: [
        { icon: Clock, title: 'In 2 minutes', text: 'No calls or long forms.' },
        { icon: Wallet, title: 'Estimated price', text: 'Broken down by project part.' },
        { icon: FileText, title: 'PDF proposal', text: 'Ready to share with your team.' },
      ],
      alt: { href: '/en/ai-assistant', label: 'I would rather ask the assistant', icon: Bot },
    },
    assistant: {
      title: ['Ask', { em: 'our AI' }] as const,
      text: 'DEVMARKAI knows our services, plans and prices. It answers instantly, day or night, and connects you with the team whenever you want.',
      perks: [
        { icon: MessageSquare, title: 'Instant answers', text: 'Services, plans, timelines and prices.' },
        { icon: Sparkles, title: 'Guides you', text: 'Tells you which solution fits your business.' },
        { icon: WhatsAppIcon, title: 'Hands you to the team', text: 'Whenever you want to talk to a person.' },
      ],
      alt: { href: '/en/quote', label: 'Quote my project with AI', icon: Sparkles },
    },
    whatsapp: 'WhatsApp',
    message: 'Hi DEVMARK, I want to quote a project.',
  },
} as const;

/** Cabecera de las paginas con IA (cotizador y asistente): titular, ventajas y salidas. */
export function AiHero({ lang, kind }: { lang: Lang; kind: 'quote' | 'assistant' }) {
  const t = copy[lang];
  const c = t[kind];
  const Alt = c.alt.icon;
  return (
    <PageHero
      title={c.title}
      description={c.text}
      actions={
        <>
          <Link href={c.alt.href} className="btn-light">
            <span className="btn-tile">
              <Alt className="h-5 w-5" />
            </span>
            {c.alt.label}
          </Link>
          <a href={whatsappHref(t.message)} target="_blank" rel="noopener noreferrer" className="btn-glass">
            <span className="btn-tile">
              <WhatsAppIcon className="h-5 w-5" />
            </span>
            {t.whatsapp}
          </a>
        </>
      }
      aside={
        <div className="hero-in grid gap-3">
          <DeviImg version="completo" estado="saludo" tamano={170} alt={lang === 'es' ? 'Devi, la mascota de DEVMARK, saluda' : 'Devi, the DEVMARK mascot, waves hello'} className="mx-auto hidden md:block" />
          <ul className="grid gap-3">
            {c.perks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="lift flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                <span className="icon-tilt grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-periwinkle">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-medium text-white">{title}</span>
                  <span className="block text-sm text-ink-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
