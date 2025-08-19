'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User } from 'lucide-react';
import { askDevMark, type Message } from '@/ai/flows/ask-devmark';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';


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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: 'model', content: props.initialMessage }]);
  }, [props.initialMessage]);

  // Eliminado scroll automático completamente

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await askDevMark(newMessages);
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage: Message = { role: 'model', content: 'Lo siento, algo salió mal. Por favor, intenta de nuevo.' };
      setMessages(prev => [...prev, errorMessage]);
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
              disabled={isLoading}
              className="bg-background/50"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="btn-gradient text-white">
              {props.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
