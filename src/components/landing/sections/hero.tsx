
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code, Mail, ChevronsDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeroProps {
  badge: string;
  title: string;
  animatedPhrases: readonly string[];
  description: string;
  servicesButton: string;
  contactButton: string;
}

export function Hero({ badge, title, animatedPhrases, description, servicesButton, contactButton }: HeroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const typeSpeed = 150;
    const deleteSpeed = 75;
    const delay = 2000;

    const handleTyping = () => {
      const currentPhrase = animatedPhrases[phraseIndex];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % animatedPhrases.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, animatedPhrases]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-4xl h-96 bg-primary/10 rounded-full filter blur-3xl" />
      
      <div className="max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-white bg-gradient-to-r from-primary/20 via-[#6564f1]/20 to-primary/20 rounded-full">
          {badge}
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-12 h-auto sm:h-32">
          {title} <br/>
          <span
            className='text-gradient relative'
          >
            {text}
            <span className="typing-cursor"></span>
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className="btn-gradient text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Link href="#services">
              <Code className="mr-2 h-5 w-5" />
              {servicesButton}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 hover:border-white/80 hover:text-white transition-all">
            <Link href="#contact">
              {contactButton} <Mail className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 inset-x-0 flex justify-center animate-bounce-slow">
        <ChevronsDown className="h-8 w-8 text-primary" />
      </div>
    </section>
  );
}
