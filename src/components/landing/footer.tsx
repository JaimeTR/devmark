'use client';

import { Code, Github, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';
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
    <footer className="mt-24 sm:mt-32 md:mt-40 border-t border-border/40">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline">DevMark</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {year} {copyright}
          </p>
          <div className="flex gap-4">
            <Link href="https://instagram.com/devmarkpe" target="_blank" rel="noopener noreferrer" aria-label="Instagram - Abre en una nueva ventana">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://facebook.com/devmarkpe" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Abre en una nueva ventana">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://github.com/devmarkpe" target="_blank" rel="noopener noreferrer" aria-label="GitHub - Abre en una nueva ventana">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
            <Link href="https://linkedin.com/company/devmarkpe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn - Abre en una nueva ventana">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
