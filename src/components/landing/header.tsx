
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code, Bot, Phone, Globe } from 'lucide-react';
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

    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

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
        ? 'bg-white/10 text-primary'
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
          isScrolled && "h-14 max-w-7xl bg-background/80 backdrop-blur-lg rounded-full border border-border/40 shadow-lg"
        )}>
          <div className={cn(!isScrolled && "bg-background/10 backdrop-blur-sm rounded-full p-2")}>
            <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-2 px-2">
              <div className="p-1 rounded-md bg-gradient-to-br from-primary/30 to-primary/10 backdrop-blur-sm border border-primary/20">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg font-headline text-white">DevMark</span>
            </Link>
          </div>
          
          <nav className={cn("hidden md:flex gap-1", !isScrolled && "bg-background/10 backdrop-blur-sm rounded-full p-1.5")}>
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

          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/80 hover:text-white transition-all">
                  <Globe className="h-5 w-5" />
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
                  <Button variant="outline" size="icon" asChild className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/80 hover:text-white transition-all">
                    <Link href={aiAssistantLink}>
                        <Bot className="h-5 w-5"/>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{aiAssistantTooltip}</p>
                </TooltipContent>
            </Tooltip>
            
            <Button asChild className={cn('btn-gradient text-white', !isScrolled && 'shadow-[0_0_20px_rgba(59,130,246,0.5)]')}>
              <Link href={contactLink}><Phone className="mr-2 h-4 w-4" />{contactButton}</Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                  <Link href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
                    <Code className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg font-headline">DevMark</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                        href={aiAssistantLink}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center"
                      >
                        <Bot className="mr-2 h-5 w-5"/> {aiAssistant}
                      </Link>
                  </nav>
                   <div className="mt-4 border-t border-border pt-4">
                     <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Language</h3>
                      <Link href="/" className="flex items-center gap-2 py-2 text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                        <Globe className="mr-2 h-5 w-5" /> Español
                      </Link>
                      <Link href="/en" className="flex items-center gap-2 py-2 text-lg font-medium text-foreground transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                        <Globe className="mr-2 h-5 w-5" /> English
                      </Link>
                    </div>

                  <Button asChild className="mt-6">
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
