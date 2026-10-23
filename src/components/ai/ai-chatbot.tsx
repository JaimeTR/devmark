'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Bot, Lightbulb, Loader2, RotateCcw, SendHorizontal } from 'lucide-react';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { whatsappHref } from '@/lib/contact';
import { type Message } from '@/ai/flows/ask-devmark';
import { cn } from '@/lib/utils';
import { sendLeadFromChat } from '@/app/actions/chat-lead';
import { logChatMessage } from '@/app/actions/chat-log';

const CHAT_META_DELIMITER = '__DEVMARK_CHAT_META__';

type ChatMeta = { source: 'groq' | 'openai' | 'fallback'; leadCapture: boolean };

async function streamChatResponse(
  history: Message[],
  onDelta: (delta: string) => void
): Promise<ChatMeta> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Chat API error: ${res.status}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let meta: { source: 'groq' | 'openai' | 'fallback'; leadCapture: boolean } = { source: 'fallback', leadCapture: false };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const metaIndex = buffer.indexOf(CHAT_META_DELIMITER);
    if (metaIndex !== -1) {
      const visible = buffer.slice(0, metaIndex);
      if (visible) onDelta(visible);
      buffer = buffer.slice(metaIndex);
      continue;
    }

    if (buffer) {
      onDelta(buffer);
      buffer = '';
    }
  }

  const metaIndex = buffer.indexOf(CHAT_META_DELIMITER);
  if (metaIndex !== -1) {
    try {
      meta = JSON.parse(buffer.slice(metaIndex + CHAT_META_DELIMITER.length));
    } catch {
      // metadata malformada: seguimos con el default (fallback, sin lead-capture)
    }
  }

  return meta;
}

function AiAvatar() {
  return (
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-ink text-periwinkle">
      <Bot className="h-4 w-4" />
    </span>
  );
}

const UI = {
  es: {
    status: 'En línea · responde al instante',
    reset: 'Nueva conversación',
    suggestions: ['¿Cuánto cuesta una página web?', '¿Cuánto demora una tienda online?', '¿Qué incluye el hosting?'],
    askTitle: 'Preguntas frecuentes',
    more: ['¿Cuánto cuesta una página web?', '¿Cuánto demora una tienda online?', '¿Qué incluye el hosting?', '¿Hacen chatbots con IA para WhatsApp?', '¿Cómo son los pagos?'],
    humanTitle: '¿Prefieres hablar con una persona?',
    humanText: 'Te respondemos por WhatsApp de lunes a viernes, de 9:00 a 18:00.',
    humanCta: 'Escríbenos',
    humanMessage: 'Hola DEVMARK, vengo del asistente con IA y quiero hablar con alguien del equipo.',
  },
  en: {
    status: 'Online · instant answers',
    reset: 'New conversation',
    suggestions: ['How much does a website cost?', 'How long does an online store take?', 'What does hosting include?'],
    askTitle: 'Frequent questions',
    more: ['How much does a website cost?', 'How long does an online store take?', 'What does hosting include?', 'Do you build AI chatbots for WhatsApp?', 'How do payments work?'],
    humanTitle: 'Would you rather talk to a person?',
    humanText: 'We reply on WhatsApp Monday to Friday, 9:00 to 18:00 (Lima time).',
    humanCta: 'Message us',
    humanMessage: 'Hi DEVMARK, I come from the AI assistant and want to talk to someone on the team.',
  },
} as const;

interface AiChatbotProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  inputPlaceholder: string;
  submitButton: string;
  loadingMessage: string;
  initialMessage: string;
  // Compact renders just the message list + input (no page-level header/card
  // chrome) so the same chat logic can live inside the floating widget.
  compact?: boolean;
  whatsappLink?: string;
  whatsappLabel?: string;
  // Widget flotante y página /ai-assistant comparten el mismo historial (por
  // idioma) vía localStorage, para no repetir la conversación en cada lugar.
  lang?: 'es' | 'en';
}

function historyKey(lang: 'es' | 'en') {
  return `devmark_chat_history_${lang}`;
}

function sessionKey(lang: 'es' | 'en') {
  return `devmark_chat_session_${lang}`;
}

// Un session_id estable por idioma/navegador — así todos los turnos de una
// misma conversación quedan agrupados en el admin de jaimetr.dev.
function getOrCreateSessionId(lang: 'es' | 'en'): string {
  if (typeof window === 'undefined') return '';
  let id = window.localStorage.getItem(sessionKey(lang));
  if (!id) {
    id = `devmark-${lang}-${crypto.randomUUID()}`;
    window.localStorage.setItem(sessionKey(lang), id);
  }
  return id;
}

function loadStoredMessages(lang: 'es' | 'en'): Message[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(historyKey(lang));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

export function AiChatbot(props: AiChatbotProps) {
  const lang = props.lang ?? 'es';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [mode, setMode] = useState<'ai' | 'lead'>('ai');
  const [leadStep, setLeadStep] = useState<'service' | 'details' | 'email' | 'phone' | 'name' | 'done'>('service');
  const [leadData, setLeadData] = useState({
    service: '',
    details: '',
    email: '',
    phone: '',
    name: '',
  });
  const [leadStatus, setLeadStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef('');

  useEffect(() => {
    const stored = loadStoredMessages(lang);
    // localStorage solo existe en el navegador: se lee tras hidratar para que el HTML coincida.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(stored ?? [{ role: 'model', content: props.initialMessage }]);
    sessionIdRef.current = getOrCreateSessionId(lang);
    // Solo al montar: no queremos que un re-render por cambio de idioma pise
    // una conversación ya cargada.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir cada cambio para que el widget y la página /ai-assistant
  // retomen la misma conversación en vez de arrancar de cero.
  useEffect(() => {
    if (messages.length === 0 || typeof window === 'undefined') return;
    window.localStorage.setItem(historyKey(lang), JSON.stringify(messages));
  }, [messages, lang]);

  // Mantener el scroll en el último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  const serviceOptions = [
    'Desarrollo web a medida',
    'Tiendas online / e-commerce',
    'Software o automatización',
    'Chatbots con IA',
    'SEO y marketing digital',
    'Diseño UI/UX',
    'Soporte y mantenimiento',
  ];

  const startLeadCapture = () => {
    setMode('lead');
    setLeadStep('service');
    setLeadData({ service: '', details: '', email: '', phone: '', name: '' });
    setLeadStatus(null);
    setMessages(prev => [
      ...prev,
      {
        role: 'model',
        content: 'Te ayudo directo. Elige el servicio que necesitas para avanzar con tu proyecto:',
        metadata: { source: 'fallback', leadCapture: true },
      },
    ]);
  };

  const handleLeadFlow = async (userInput: string) => {
    const trimmed = userInput.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (leadStep === 'service') {
      setLeadData(prev => ({ ...prev, service: trimmed }));
      setLeadStep('details');
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'Anota en 1-2 líneas lo que necesitas. Ej: “Landing para captar leads en 2 semanas”',
          metadata: { source: 'fallback', leadCapture: true },
        },
      ]);
      return;
    }

    if (leadStep === 'details') {
      setLeadData(prev => ({ ...prev, details: trimmed }));
      setLeadStep('email');
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'Perfecto. ¿Cuál es tu correo de contacto?',
          metadata: { source: 'fallback', leadCapture: true },
        },
      ]);
      return;
    }

    if (leadStep === 'email') {
      setLeadData(prev => ({ ...prev, email: trimmed }));
      setLeadStep('phone');
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: '¿Y tu número de WhatsApp o teléfono con código de país?',
          metadata: { source: 'fallback', leadCapture: true },
        },
      ]);
      return;
    }

    if (leadStep === 'phone') {
      setLeadData(prev => ({ ...prev, phone: trimmed }));
      setLeadStep('name');
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: 'Para finalizar, ¿cómo te llamas?',
          metadata: { source: 'fallback', leadCapture: true },
        },
      ]);
      return;
    }

    if (leadStep === 'name') {
      const payload = {
        ...leadData,
        name: trimmed,
        transcript: [...messages, userMessage]
          .map(m => `${m.role === 'user' ? 'Cliente' : 'Bot'}: ${m.content}`)
          .join('\n'),
      };

      setIsLoading(true);
      const result = await sendLeadFromChat(payload);
      setIsLoading(false);
      setLeadStep('done');
      setLeadStatus(result.message);

      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: result.success
            ? '¡Listo! Registré tus datos y un asesor te contactará en breve por email o WhatsApp. ¿Quieres ver nuestros servicios mientras tanto?'
            : 'No pude enviar tus datos ahora. ¿Puedes intentar de nuevo o escribirnos a contacto@devmarkpe.com?',
          metadata: { source: 'fallback', leadCapture: true },
        },
      ]);

      return;
    }
  };

  const enviar = async (texto: string) => {
    if (!texto.trim() || isLoading) return;

    if (mode === 'lead') {
      await handleLeadFlow(texto);
      return;
    }

    const userMessage: Message = { role: 'user', content: texto };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setIsStreaming(true);
    void logChatMessage({ sessionId: sessionIdRef.current, role: 'user', content: userMessage.content, lang });

    // Placeholder vacío que se va llenando token a token.
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    let assistantContent = '';

    try {
      const meta = await streamChatResponse(newMessages, (delta) => {
        assistantContent += delta;
        setMessages(prev => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { role: 'model', content: last.content + delta };
          return copy;
        });
      });

      setMessages(prev => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        copy[copy.length - 1] = { ...last, metadata: { source: meta.source, leadCapture: meta.leadCapture || undefined } };
        return copy;
      });

      void logChatMessage({ sessionId: sessionIdRef.current, role: 'assistant', content: assistantContent, lang });

      if (meta.leadCapture) {
        setTimeout(() => startLeadCapture(), 600);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'model',
          content: 'Te atiendo directo para no perder tiempo. Elige servicio y seguimos.',
          metadata: { source: 'fallback', leadCapture: true },
        };
        return copy;
      });
      startLeadCapture();
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void enviar(input);
  };

  // Empieza de cero: borra el historial guardado y vuelve al saludo.
  const reiniciar = () => {
    window.localStorage.removeItem(historyKey(lang));
    setMode('ai');
    setLeadStep('service');
    setLeadStatus(null);
    setInput('');
    setMessages([{ role: 'model', content: props.initialMessage }]);
  };

  const t = UI[lang];
  const sinConversacion = messages.length <= 1 && mode === 'ai';

  const messageList = (
    <div className={cn('scrollbar-hide flex-1 space-y-4 overflow-y-auto', props.compact ? 'px-4 py-4' : 'px-5 py-6 sm:px-6')} aria-live="polite">
      {messages.map((msg, index) => {
        const isLastModelMessage = msg.role === 'model' && index === messages.length - 1;
        const isCurrentlyStreaming = isLastModelMessage && isStreaming;
        const isPending = isCurrentlyStreaming && msg.content.length === 0;

        return (
          <div key={index} className={cn('step-in flex items-end gap-2', msg.role === 'user' && 'justify-end')}>
            {msg.role === 'model' && <AiAvatar />}
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-4 py-2.5',
                msg.role === 'user' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-mist text-ink'
              )}
            >
              {isPending ? (
                <div className="flex items-center gap-1.5 py-1" aria-label={props.loadingMessage}>
                  {[0, 0.2, 0.4].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary/60" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                  {isCurrentlyStreaming && <span className="ml-0.5 inline-block h-3.5 w-[2px] animate-pulse bg-primary align-middle" />}
                </p>
              )}
            </div>
          </div>
        );
      })}
      {sinConversacion && (
        <div className="flex flex-wrap gap-2 pl-10">
          {t.suggestions.map((q) => (
            <button key={q} type="button" onClick={() => enviar(q)} className="tag rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-left text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white">
              {q}
            </button>
          ))}
        </div>
      )}
      {mode === 'lead' && leadStep === 'service' && (
        <div className="flex flex-wrap gap-2 pl-10">
          {serviceOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleLeadFlow(option)}
              disabled={isLoading}
              className="tag rounded-lg border border-primary/20 bg-white px-3 py-1.5 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:opacity-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );

  const inputForm = (
    <form onSubmit={handleSubmit} className={cn('flex shrink-0 items-center gap-2 border-t border-ink/10 bg-white', props.compact ? 'p-3' : 'p-4 sm:p-5')}>
      <label htmlFor={props.compact ? 'chat-input-widget' : 'chat-input'} className="sr-only">
        {props.inputPlaceholder}
      </label>
      <input
        id={props.compact ? 'chat-input-widget' : 'chat-input'}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={props.inputPlaceholder}
        disabled={isLoading || leadStep === 'done'}
        autoComplete="off"
        maxLength={1000}
        className="field-light h-12 min-w-0 flex-1 bg-paper disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        aria-label={props.submitButton}
        className="grid h-12 w-12 shrink-0 place-items-center rounded-[12px] bg-gradient-to-b from-[#4b42d0] to-[#3d34bc] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-40"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
      </button>
    </form>
  );

  const status = leadStatus && <p className="shrink-0 px-5 pb-2 text-xs text-ink/55">{leadStatus}</p>;

  if (props.compact) {
    return (
      <div className="flex h-full flex-col bg-white">
        {messageList}
        {status}
        {inputForm}
      </div>
    );
  }

  return (
    <section id="ai-chatbot" className="grid gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
      <div className="flex h-[min(78vh,680px)] min-h-[480px] flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-30px_rgba(17,12,41,0.35)]">
        <ChatHeader title={props.title} status={t.status} onReset={reiniciar} resetLabel={t.reset} />
        {messageList}
        {status}
        {inputForm}
      </div>
      <aside className="grid content-start gap-4">
        <div className="rounded-3xl bg-white p-6">
          <h2 className="flex items-center gap-2 font-medium text-ink">
            <Lightbulb className="h-4 w-4 text-primary" />
            {t.askTitle}
          </h2>
          <ul className="mt-4 grid gap-2">
            {t.more.map((q) => (
              <li key={q}>
                <button type="button" onClick={() => enviar(q)} disabled={isLoading} className="group flex w-full items-center justify-between gap-3 rounded-xl bg-mist px-4 py-3 text-left text-sm text-ink transition-colors hover:bg-ink hover:text-white disabled:opacity-60">
                  {q}
                  <ArrowUpRight className="icon-nudge h-4 w-4 shrink-0 text-primary group-hover:text-periwinkle" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white">
          <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-primary/60 blur-[60px]" />
          <p className="relative font-medium">{t.humanTitle}</p>
          <p className="relative mt-1 text-sm text-ink-muted">{t.humanText}</p>
          <a href={whatsappHref(t.humanMessage)} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm relative mt-5">
            <span className="btn-tile">
              <WhatsAppIcon className="h-4 w-4" />
            </span>
            {t.humanCta}
          </a>
        </div>
      </aside>
    </section>
  );
}

/** Cabecera del chat: avatar, estado en linea y boton para empezar de nuevo. */
export function ChatHeader({ title, status, onReset, resetLabel, children }: { title: string; status: string; onReset?: () => void; resetLabel?: string; children?: React.ReactNode }) {
  return (
    <div className="relative flex shrink-0 items-center gap-3 overflow-hidden bg-ink px-4 py-3.5 text-white sm:px-5">
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-16 h-32 w-32 rounded-full bg-primary/50 blur-[50px]" />
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-[11px] bg-gradient-to-b from-[#4b42d0] to-[#3d34bc] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
        <Bot className="h-5 w-5" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink bg-emerald-400" />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block font-logo text-sm tracking-wide">{title}</span>
        <span className="block truncate text-xs text-ink-muted">{status}</span>
      </span>
      {onReset && (
        <button type="button" onClick={onReset} title={resetLabel} aria-label={resetLabel} className="relative grid h-9 w-9 place-items-center rounded-[10px] text-white/70 transition-colors hover:bg-white/10 hover:text-white">
          <RotateCcw className="h-4 w-4" />
        </button>
      )}
      {children}
    </div>
  );
}
