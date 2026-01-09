'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User } from 'lucide-react';
import { askDevMark, type Message } from '@/ai/flows/ask-devmark';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { sendLeadFromChat } from '@/app/actions/chat-lead';


interface AiChatbotProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  inputPlaceholder: string;
  submitButton: string;
  loadingMessage: string;
  initialMessage: string;
}

export function AiChatbot(props: AiChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    setMessages([{ role: 'model', content: props.initialMessage }]);
  }, [props.initialMessage]);

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

    try {
      const botResponse = await askDevMark(newMessages);
      setMessages(prev => [...prev, botResponse]);

      if (botResponse.metadata?.leadCapture) {
        startLeadCapture();
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Te atiendo directo para no perder tiempo. Elige servicio y seguimos.',
        metadata: { source: 'fallback', leadCapture: true },
      };
      setMessages(prev => [...prev, errorMessage]);
      startLeadCapture();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-chatbot" className="py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="outline" className="mb-4 text-primary border-primary/50">{props.badge}</Badge>
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-gradient">{props.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{props.description}</p>
      </div>
      <Card className="max-w-3xl mx-auto bg-primary/5 backdrop-blur-sm border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl tracking-tighter">{props.subtitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto pr-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={cn('flex items-start gap-3', msg.role === 'user' ? 'justify-end' : '')}>
                {msg.role === 'model' && (
                  <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'p-3 rounded-lg max-w-md',
                    msg.role === 'user' ? 'bg-primary/20' : 'bg-muted'
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                 {msg.role === 'user' && (
                  <Avatar>
                    <AvatarFallback><User/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {mode === 'lead' && leadStep === 'service' && (
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map(option => (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    className="border-primary/40 text-sm"
                    onClick={() => handleLeadFlow(option)}
                    disabled={isLoading}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
            {isLoading && (
              <div className="flex items-start gap-3">
                 <Avatar>
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                   <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0s'}}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                </div>
              </div>
            )}
             <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={props.inputPlaceholder}
              disabled={isLoading || leadStep === 'done'}
              className="bg-background/50"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="btn-gradient text-white">
              {props.submitButton}
            </Button>
          </form>
          {leadStatus && (
            <p className="text-xs text-muted-foreground mt-2">{leadStatus}</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
