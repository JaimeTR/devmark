'use client';

import { Sparkles, Github, Linkedin, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FooterProps {
  copyright: string;
}

export function Footer({ copyright }: FooterProps) {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative mt-24 sm:mt-32 md:mt-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-brand-lavender" />
            </div>
            <span className="font-logo text-lg tracking-wider text-brand-navy">DEVMARK</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {year} {copyright}
          </p>
          <div className="flex items-center justify-center gap-1">
            <Link href="https://www.instagram.com/devmark.pe/" target="_blank" rel="noopener noreferrer" aria-label="Instagram - Abre en una nueva ventana" className="flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://www.facebook.com/devmark.pe/" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Abre en una nueva ventana" className="flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://github.com/JaimeTR" target="_blank" rel="noopener noreferrer" aria-label="GitHub - Abre en una nueva ventana" className="flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://www.linkedin.com/company/devmarkpe/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn - Abre en una nueva ventana" className="flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
