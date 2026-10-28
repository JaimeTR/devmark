'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import { DeviImg } from '@/components/site/devi-img';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { AiChatbot, ChatHeader } from '@/components/ai/ai-chatbot';

const WHATSAPP_NUMBER = '+51975646074';

const copy = {
  es: {
    label: 'Devi',
    quoteLink: '/quote',
    quoteLabel: 'Cotizar con IA',
    status: 'En línea · responde al instante',
    whatsappLabel: 'Escríbenos por WhatsApp',
    bubbleTitle: '¿Hablamos?',
    bubbleStatus: 'En línea · respondemos rápido',
    whatsappMessage: 'Hola DEVMARK, me gustaría obtener más información sobre sus servicios.',
    openLabel: 'Abrir asistente',
    closeLabel: 'Cerrar asistente',
    greeting: '¡Hola! Soy tu asistente de IA.',
    dismissGreetingLabel: 'Cerrar mensaje',
    chatbot: {
      badge: 'ASISTENTE VIRTUAL',
      title: 'Devi',
      subtitle: 'Chatea con nuestra IA',
      description: 'Hazme cualquier pregunta sobre nuestros servicios, precios o cualquier otra consulta que tengas.',
      inputPlaceholder: 'Escribe tu pregunta aquí...',
      submitButton: 'Enviar',
      loadingMessage: 'Pensando...',
      initialMessage: '¡Hola! Soy Devi, el asistente virtual de DEVMARK. Pregúntame sobre servicios, precios o lo que necesites. Si prefieres, también puedes cotizar tu proyecto o escribirnos por WhatsApp desde aquí.',
    },
  },
  en: {
    label: 'Devi',
    quoteLink: '/en/quote',
    quoteLabel: 'Quote with AI',
    status: 'Online · instant answers',
    whatsappLabel: 'Message us on WhatsApp',
    bubbleTitle: "Let's talk?",
    bubbleStatus: 'Online · quick replies',
    whatsappMessage: 'Hello DEVMARK, I would like to get more information about your services.',
    openLabel: 'Open assistant',
    closeLabel: 'Close assistant',
    greeting: 'Hello! I am your AI assistant.',
    dismissGreetingLabel: 'Dismiss message',
    chatbot: {
      badge: 'VIRTUAL ASSISTANT',
      title: 'Devi',
      subtitle: 'Chat with our AI',
      description: 'Ask me anything about our services, pricing, or anything else you need.',
      inputPlaceholder: 'Type your question here...',
      submitButton: 'Send',
      loadingMessage: 'Thinking...',
      initialMessage: "Hi! I'm Devi, DEVMARK's virtual assistant. Ask me about services, pricing, or anything you need. You can also quote your project or message us on WhatsApp right from here.",
    },
  },
};

export function FloatingAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const lang = pathname?.startsWith('/en') ? 'en' : 'es';
  const t = copy[lang];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
      style={{ marginBottom: 'env(safe-area-inset-bottom)', marginRight: 'env(safe-area-inset-right)' }}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label={t.label}
          className="step-in flex h-[min(76vh,600px)] w-[min(calc(100vw-2rem),390px)] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-24px_rgba(17,12,41,0.55)] ring-1 ring-ink/10"
        >
          <ChatHeader title={t.label} status={t.status}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.closeLabel}
              className="relative grid h-9 w-9 place-items-center rounded-[10px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </ChatHeader>

          {/* Atajos: cotizar o pasar a WhatsApp sin salir del chat. */}
          <div className="flex shrink-0 gap-2 border-b border-ink/10 bg-paper px-3 py-2.5">
            <Link href={t.quoteLink} onClick={() => setIsOpen(false)} className="group flex flex-1 items-center gap-2 rounded-[10px] bg-white px-2 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/10 transition-colors hover:text-primary hover:ring-primary/40">
              <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-mist text-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              {t.quoteLabel}
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex flex-1 items-center gap-2 rounded-[10px] bg-white px-2 py-1.5 text-xs font-medium text-ink ring-1 ring-ink/10 transition-colors hover:text-primary hover:ring-primary/40">
              <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#25D366] text-white">
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </span>
              WhatsApp
            </a>
          </div>

          <div className="min-h-0 flex-1">
            <AiChatbot {...t.chatbot} lang={lang} compact />
          </div>
        </div>
      )}

      <div className={`flex items-center gap-2 transition-all duration-700 ease-out-expo ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
        {/* Asistente con IA: boton cuadrado al lado de la burbuja de WhatsApp */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? t.closeLabel : t.openLabel}
          aria-expanded={isOpen}
          title={isOpen ? undefined : t.greeting}
          className={`group relative grid h-14 w-14 shrink-0 place-items-center rounded-[14px] text-white transition-transform duration-300 hover:-translate-y-0.5 ${isOpen ? 'bg-gradient-to-b from-[#4b42d0] to-[#3d34bc] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_30px_-12px_rgba(61,52,188,0.8)]' : 'text-ink'}`}
        >
          {isOpen ? (
            <X className="relative h-5 w-5" />
          ) : (
            // Solo la mascota, sin fondo: la sombra la despega de cualquier seccion (clara u oscura).
            <span className="relative drop-shadow-[0_8px_14px_rgba(17,12,41,0.35)] transition-transform duration-300 group-hover:-rotate-6">
              <DeviImg estado="saludo" tamano={56} />
            </span>
          )}
          {!isOpen && <span className="absolute -right-1 -top-1 rounded-[5px] bg-periwinkle px-1.5 py-0.5 text-[9px] font-semibold leading-none text-ink">IA</span>}
        </button>
        {!isOpen && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-[14px] bg-ink/95 py-2 pl-2 pr-2 text-white shadow-[0_14px_30px_-12px_rgba(17,12,41,0.55)] ring-1 ring-white/10 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 sm:pl-4"
          >
            <span className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold">{t.bubbleTitle}</span>
              <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.bubbleStatus}
              </span>
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#25D366] text-white transition-transform duration-300 group-hover:-rotate-6">
              <WhatsAppIcon />
            </span>
            <span className="sr-only sm:hidden">{t.whatsappLabel}</span>
          </a>
        )}
      </div>
    </div>
  );
}
