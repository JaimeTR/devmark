
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bot, Phone, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  lang?: 'es' | 'en';
  navLinks: readonly NavLink[];
  contactButton: string;
  aiAssistant: string;
  aiAssistantTooltip: string;
}

export function Header({ lang = 'es', navLinks, contactButton, aiAssistant, aiAssistantTooltip }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const aiAssistantLink = lang === 'en' ? '/en/ai-assistant' : '/ai-assistant';
  const contactLink = lang === 'en' ? '/en/contact' : '/contacto';

  useEffect(() => {
    // Mapear rutas de página a IDs de sección
    const routeToSectionId: Record<string, string> = {
      '/servicios': 'services',
      '/en/services': 'services',
      '/portfolio': 'portfolio',
      '/en/portfolio': 'portfolio',
      '/hosting': 'hosting',
      '/en/hosting': 'hosting',
      '/contacto': 'contact',
      '/en/contact': 'contact',
    };

    let ticking = false;

    const updateScrollState = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navLinks.map(link => {
        // Si el link es a una página, buscar su ID de sección correspondiente
        const sectionId = routeToSectionId[link.href] || link.href.substring(1);
        return document.getElementById(sectionId);
      }).filter(Boolean);

      // Detectar si estamos cerca del final de la página
      const isNearBottom = (window.innerHeight + scrollPosition) >= document.documentElement.scrollHeight - 100;

      let currentSection = 'hero';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          // Para la última sección, activar si estamos cerca del final o dentro de su área
          if (i === sections.length - 1 && isNearBottom) {
            currentSection = section.id;
            break;
          }
          // Para otras secciones, usar el threshold normal
          if (section.offsetTop <= scrollPosition + 150) {
            currentSection = section.id;
            break;
          }
        }
      }
       setActiveSection(currentSection);
       ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollState();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navLinks]);
  
  const navLinkClass = (href: string) => {
    // Mapear rutas de página a IDs de sección
    const routeToSectionId: Record<string, string> = {
      '/servicios': 'services',
      '/en/services': 'services',
      '/portfolio': 'portfolio',
      '/en/portfolio': 'portfolio',
      '/hosting': 'hosting',
      '/en/hosting': 'hosting',
      '/contacto': 'contact',
      '/en/contact': 'contact',
    };
    
    // Detectar si el link es a una página (comienza con /) o a una sección (#)
    const isPageLink = href.startsWith('/') && !href.includes('#');
    
    let isActive = false;
    
    if (isPageLink) {
      // Verificar si estamos en una página separada
      const isOnSeparatePage = pathname !== '/' && pathname !== '/en';
      
      if (isOnSeparatePage) {
        // Estamos en una página separada (/servicios, /portfolio, etc.)
        isActive = pathname === href || pathname?.startsWith(href + '/');
      } else {
        // Estamos en la página de inicio, detectar por scroll de sección
        const sectionId = routeToSectionId[href];
        if (sectionId) {
          isActive = activeSection === sectionId;
        }
      }
    } else {
      // Para secciones (#), usar la lógica de scroll existente
      isActive = activeSection === href.substring(1);
    }
    
    return cn(
      'text-sm font-medium transition-colors hover:text-primary px-3 py-1.5 rounded-full',
      isActive
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:text-primary'
    );
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
      isScrolled ? "top-4" : ""
    )}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-primary focus:text-white focus:rounded">
        Saltar al contenido principal
      </a>
      <TooltipProvider>
        <div className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
          "h-20 px-4 sm:px-6 lg:px-8",
          isScrolled && "h-16 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-auto md:max-w-7xl bg-white/95 backdrop-blur-lg rounded-full border border-slate-100 shadow-lg"
        )}>
          <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-2 shrink-0 whitespace-nowrap min-w-0" aria-label="DEVMARK - Inicio">
            <Image src="/logo-mark.svg" alt="" role="presentation" width={40} height={40} className="w-9 h-9 sm:w-10 sm:h-10 shrink-0" priority />
            <span className="font-logo text-lg sm:text-2xl tracking-wider text-brand-navy">DEVMARK</span>
          </Link>
          
          <nav className="hidden lg:flex gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="group h-11 w-11 text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all" aria-label="Cambiar idioma">
                  <Globe className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/">Español</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/en">English</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild className="group h-11 w-11 text-slate-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all">
                    <Link href={aiAssistantLink}>
                        <Bot className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"/>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{aiAssistantTooltip}</p>
                </TooltipContent>
            </Tooltip>
            
            <Button asChild className="group h-11 px-5 text-sm whitespace-nowrap btn-gradient text-white rounded-full shadow-lg shadow-brand-blue/20 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-0.5 transition-all duration-300">
              <Link href={contactLink}><Phone className="mr-2 h-4 w-4 shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />{contactButton}</Link>
            </Button>
          </div>
          
          <div className="lg:hidden shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-11 w-11" aria-label="Abrir menú de navegación">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
                    <Image src="/logo-mark.svg" alt="" role="presentation" width={36} height={36} className="w-9 h-9" />
                    <span className="font-logo text-2xl tracking-wider text-brand-navy">DEVMARK</span>
                  </Link>
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="py-3 text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                        href={aiAssistantLink}
                        onClick={() => setIsOpen(false)}
                        className="py-3 text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center"
                      >
                        <Bot className="mr-2 h-5 w-5"/> {aiAssistant}
                      </Link>
                  </nav>
                   <div className="mt-4 border-t border-border pt-4">
                     <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Language</h3>
                      <Link href="/" className="flex items-center gap-2 py-3 text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                        <Globe className="mr-2 h-5 w-5" /> Español
                      </Link>
                      <Link href="/en" className="flex items-center gap-2 py-3 text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                        <Globe className="mr-2 h-5 w-5" /> English
                      </Link>
                    </div>

                  <Button asChild className="mt-6 h-12 text-base">
                    <Link href={contactLink} onClick={() => setIsOpen(false)}>{contactButton}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </TooltipProvider>
    </header>
  );
}
