'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Bot, X, Calculator, MessageCircle } from 'lucide-react';

// Cargado bajo demanda: el chat solo se monta cuando el usuario abre el
// widget, así su JS no entra en el bundle inicial de cada página (el
// widget flotante vive en el layout raíz y se renderiza en todo el sitio).
const AiChatbot = dynamic(() => import('@/components/ai/ai-chatbot').then((mod) => mod.AiChatbot), {
  ssr: false,
});

const WHATSAPP_NUMBER = '+51975646074';

const copy = {
  es: {
    label: 'DEVMARKAI',
    quoteLink: '/quote',
    quoteLabel: 'Cotiza tu proyecto',
    whatsappLabel: 'Escríbenos por WhatsApp',
    whatsappMessage: 'Hola DEVMARK, me gustaría obtener más información sobre sus servicios.',
    openLabel: 'Abrir asistente',
    closeLabel: 'Cerrar asistente',
    greeting: '¡Hola! Soy tu asistente de IA.',
    dismissGreetingLabel: 'Cerrar mensaje',
    chatbot: {
      badge: 'ASISTENTE VIRTUAL',
      title: 'DEVMARKAI',
      subtitle: 'Chatea con nuestra IA',
      description: 'Hazme cualquier pregunta sobre nuestros servicios, precios o cualquier otra consulta que tengas.',
      inputPlaceholder: 'Escribe tu pregunta aquí...',
      submitButton: 'Enviar',
      loadingMessage: 'Pensando...',
      initialMessage: '¡Hola! Soy DEVMARKAI. Pregúntame sobre servicios, precios o lo que necesites. Si prefieres, también podés cotizar tu proyecto o escribirnos por WhatsApp desde aquí.',
    },
  },
  en: {
    label: 'DEVMARKAI',
    quoteLink: '/en/quote',
    quoteLabel: 'Quote your project',
    whatsappLabel: 'Message us on WhatsApp',
    whatsappMessage: 'Hello DEVMARK, I would like to get more information about your services.',
    openLabel: 'Open assistant',
    closeLabel: 'Close assistant',
    greeting: 'Hello! I am your AI assistant.',
    dismissGreetingLabel: 'Dismiss message',
    chatbot: {
      badge: 'VIRTUAL ASSISTANT',
      title: 'DEVMARKAI',
      subtitle: 'Chat with our AI',
      description: 'Ask me anything about our services, pricing, or anything else you need.',
      inputPlaceholder: 'Type your question here...',
      submitButton: 'Send',
      loadingMessage: 'Thinking...',
      initialMessage: "Hi! I'm DEVMARKAI. Ask me about services, pricing, or anything you need. You can also quote your project or message us on WhatsApp right from here.",
    },
  },
};

export function FloatingAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3"
      style={{ marginBottom: 'env(safe-area-inset-bottom)', marginRight: 'env(safe-area-inset-right)' }}
    >
      {isOpen && (
        <div className="w-[min(92vw,380px)] h-[min(75vh,560px)] bg-gradient-to-br from-white via-brand-light/60 to-brand-lavender/30 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-brand-blue/20 flex flex-col overflow-hidden animate-fade-in-up">
          <div className="flex items-center justify-between px-4 py-3 bg-brand-blue/90 backdrop-blur-md text-white shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <span className="font-semibold text-sm">
                <span className="font-logo tracking-wide">DEVMARK</span>
                AI
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={t.closeLabel}
              className="h-8 w-8 rounded-xl flex items-center justify-center hover:bg-white/15 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <Link
            href={t.quoteLink}
            className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-blue bg-white/50 backdrop-blur-md hover:bg-white/70 px-4 py-2.5 border-b border-white/50 transition-colors shrink-0"
          >
            {t.quoteLabel}
            <Calculator className="h-3.5 w-3.5" />
          </Link>

          <div className="flex-1 min-h-0">
            <AiChatbot
              {...t.chatbot}
              lang={lang}
              compact
              whatsappLink={whatsappLink}
              whatsappLabel={t.whatsappLabel}
            />
          </div>
        </div>
      )}

      {!isOpen && (
        <div
          className="flex items-center gap-3"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`max-w-[200px] bg-white/95 backdrop-blur-md rounded-2xl rounded-br-md border border-white/60 shadow-lg shadow-brand-blue/20 px-4 py-3 text-sm font-medium text-brand-navy transition-all duration-200 ${
              isVisible && isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
            }`}
          >
            {t.greeting}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? t.closeLabel : t.openLabel}
            className={`
              flex items-center justify-center h-14 w-14 min-h-14 min-w-14 rounded-2xl shrink-0
              border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white
              shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40
              hover:-translate-y-1 active:scale-95
              transition-all duration-300 ease-in-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
            `}
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      )}

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label={t.closeLabel}
          className="flex items-center justify-center h-14 w-14 min-h-14 min-w-14 rounded-2xl shrink-0 border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 hover:-translate-y-1 active:scale-95 transition-all duration-300 ease-in-out"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
