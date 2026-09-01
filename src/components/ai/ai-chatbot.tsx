'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User } from 'lucide-react';
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
    <div className="h-8 w-8 shrink-0 rounded-xl bg-brand-blue flex items-center justify-center shadow-md shadow-brand-blue/30">
      <Bot className="h-4 w-4 text-white" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="h-8 w-8 shrink-0 rounded-xl bg-brand-navy flex items-center justify-center shadow-md shadow-brand-navy/30">
      <User className="h-4 w-4 text-white" />
    </div>
  );
}


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (mode === 'lead') {
      await handleLeadFlow(input);
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
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

  const messageList = (
    <div className={cn('overflow-y-auto scrollbar-hide space-y-4', props.compact ? 'flex-1 px-4 py-3' : 'h-96 pr-4')}>
      {messages.map((msg, index) => {
        const isLastModelMessage = msg.role === 'model' && index === messages.length - 1;
        const isCurrentlyStreaming = isLastModelMessage && isStreaming;
        const isPending = isCurrentlyStreaming && msg.content.length === 0;

        return (
          <div key={index} className={cn('flex items-end gap-1.5', msg.role === 'user' ? 'justify-end' : '')}>
            {msg.role === 'model' && <AiAvatar />}
            <div
              className={cn(
                'px-4 py-2.5 rounded-2xl max-w-[85%] shadow-sm backdrop-blur-md min-w-0',
                msg.role === 'user'
                  ? 'bg-brand-blue/85 text-white rounded-br-md border border-white/10'
                  : 'bg-white/60 border border-white/60 text-foreground rounded-bl-md'
              )}
            >
              {isPending ? (
                <div className="flex items-center gap-1.5 py-0.5">
                  <span className="w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 bg-brand-blue/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                  {msg.content}
                  {isCurrentlyStreaming && (
                    <span className="inline-block w-[2px] h-3.5 bg-brand-blue ml-0.5 align-middle animate-pulse" />
                  )}
                </p>
              )}
            </div>
            {msg.role === 'user' && <UserAvatar />}
          </div>
        );
      })}
      {mode === 'lead' && leadStep === 'service' && (
        <div className="flex flex-wrap gap-2 pl-[42px]">
          {serviceOptions.map(option => (
            <Button
              key={option}
              type="button"
              variant="outline"
              className="rounded-xl border-brand-blue/30 bg-white/50 backdrop-blur-md text-brand-blue hover:bg-white/80 hover:border-brand-blue/50 shadow-sm text-sm transition-all"
              onClick={() => handleLeadFlow(option)}
              disabled={isLoading}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
       <div ref={messagesEndRef} />
    </div>
  );

  const inputForm = (
    <form onSubmit={handleSubmit} className={cn('flex gap-2', props.compact ? 'p-3 border-t border-white/40 backdrop-blur-md' : 'mt-4')}>
      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={props.inputPlaceholder}
        disabled={isLoading || leadStep === 'done'}
        className={cn(props.compact ? 'bg-white/50 backdrop-blur-md border-white/60 focus-visible:ring-brand-blue/30' : 'bg-background/50')}
      />
      <Button type="submit" disabled={isLoading || !input.trim()} className="border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white rounded-2xl shadow-md shadow-brand-blue/20 transition-all duration-300 shrink-0">
        {props.submitButton}
      </Button>
    </form>
  );

  if (props.compact) {
    return (
      <div className="flex flex-col h-full">
        {messageList}
        {leadStatus && (
          <p className="text-xs text-muted-foreground px-4">{leadStatus}</p>
        )}
        {props.whatsappLink && (
          <a
            href={props.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3 mb-2 flex items-center justify-center gap-2 text-xs font-medium text-[#25D366] bg-white/40 backdrop-blur-md border border-[#25D366]/30 hover:bg-[#25D366]/10 rounded-xl py-2 transition-colors"
          >
            {props.whatsappLabel}
          </a>
        )}
        {inputForm}
      </div>
    );
  }

  return (
    <section id="ai-chatbot" className="relative py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
          <Bot className="w-4 h-4 text-brand-blue shrink-0" />
          <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">{props.badge}</span>
        </div>
        <h2 className="font-logo text-4xl sm:text-5xl md:text-6xl tracking-wide text-brand-navy animate-fade-in-up stagger-1">
          {props.title}
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-lg mx-auto animate-fade-in-up stagger-2">{props.description}</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-brand-lavender/40 rounded-full blur-[90px] pointer-events-none" />

        <Card className="relative bg-gradient-to-br from-white via-brand-light/60 to-brand-lavender/30 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl shadow-brand-blue/15 overflow-hidden">
          <CardHeader className="flex-row items-center gap-3 border-b border-white/50 bg-brand-blue/90 backdrop-blur-md text-white space-y-0 py-4">
            <AiAvatar />
            <CardTitle className="font-headline text-lg tracking-tight text-white">{props.subtitle}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {messageList}
            {inputForm}
            {leadStatus && (
              <p className="text-xs text-muted-foreground mt-2">{leadStatus}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
