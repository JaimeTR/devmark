
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Bot, Phone, Globe, Calculator, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavLink {
  href: string;
  label: string;
}

interface HeaderProps {
  lang?: 'es' | 'en';
  // Deprecado: el header arma su propio menú (ver buildNavLinks) para que
  // todas las páginas muestren siempre el mismo set de links, completo y
  // sincronizado. Ya no se usa aunque una página lo pase.
  navLinks?: readonly NavLink[];
  contactButton: string;
  aiAssistant: string;
  aiAssistantTooltip: string;
}

// Menú canónico del sitio — una sola fuente de verdad para que ninguna
// página se quede con un header incompleto o desactualizado. "Inicio"/"Home"
// apunta a la sección hero: hash simple si ya estás en la home, con el path
// completo si estás en otra página (para navegar y luego hacer scroll).
function buildNavLinks(lang: 'es' | 'en', pathname: string | null): NavLink[] {
  const home = lang === 'en' ? '/en' : '/';
  const isHome = pathname === home;
  const heroHref = isHome ? '#hero' : `${home}#hero`;

  if (lang === 'en') {
    return [
      { href: heroHref, label: 'Home' },
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en/blog', label: 'Blog' },
      { href: '/en/contact', label: 'Contact' },
    ];
  }

  return [
    { href: heroHref, label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/hosting', label: 'Hosting' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ];
}

export function Header({ lang = 'es', contactButton, aiAssistant, aiAssistantTooltip }: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();
  const navLinks = useMemo(() => buildNavLinks(lang, pathname), [lang, pathname]);
  const aiAssistantLink = lang === 'en' ? '/en/ai-assistant' : '/ai-assistant';
  const aiQuoterLink = lang === 'en' ? '/en/quote' : '/quote';
  const contactLink = lang === 'en' ? '/en/contact' : '/contacto';
  const aiChooserLabels = lang === 'en'
    ? { open: 'AI Assistant', quote: 'AI Quoter' }
    : { open: 'Asistente con IA', quote: 'Cotizador con IA' };
  const languageOptions = [
    { code: 'es' as const, label: 'Español', href: '/' },
    { code: 'en' as const, label: 'English', href: '/en' },
  ];

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
          // getBoundingClientRect en vez de offsetTop: offsetTop se rompe cuando un
          // ancestro (p.ej. ScrollReveal) usa transform, porque eso lo convierte en
          // el offsetParent — getBoundingClientRect siempre es relativo al viewport real.
          const docTop = section.getBoundingClientRect().top + window.scrollY;
          if (docTop <= scrollPosition + 150) {
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
      'text-sm font-medium transition-colors hover:text-primary px-3 py-1.5 rounded-xl',
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
        <div className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-300 ease-in-out",
          "h-20 px-4 sm:px-6 lg:px-8",
          isScrolled && "h-16 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] md:w-auto md:max-w-7xl bg-white/95 backdrop-blur-lg rounded-3xl border border-slate-100 shadow-lg"
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
                <Button variant="ghost" size="icon" className="group h-11 w-11 rounded-xl bg-brand-light text-brand-navy hover:text-brand-blue hover:bg-brand-blue/10 transition-all font-bold text-xs tracking-wide" aria-label="Cambiar idioma">
                  {lang.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                {languageOptions.map((option) => (
                  <DropdownMenuItem key={option.code} asChild className="rounded-xl cursor-pointer">
                    <Link href={option.href} className="flex items-center justify-between gap-3">
                      {option.label}
                      {option.code === lang && <Check className="h-4 w-4 text-brand-blue" />}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="group h-11 w-11 rounded-xl bg-brand-light text-brand-navy hover:text-brand-blue hover:bg-brand-blue/10 transition-all" aria-label={aiAssistant}>
                  <Bot className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-2xl">
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link href={aiAssistantLink}>
                    {aiChooserLabels.open} <Bot className="ml-2 h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                  <Link href={aiQuoterLink}>
                    {aiChooserLabels.quote} <Calculator className="ml-2 h-4 w-4" />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button asChild className="group h-11 px-5 text-sm whitespace-nowrap border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white rounded-2xl shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300">
              <Link href={contactLink}>{contactButton}<Phone className="ml-2 h-4 w-4 shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" /></Link>
            </Button>
          </div>
          
          <div className="lg:hidden shrink-0">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl" aria-label="Abrir menú de navegación">
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
                        {aiAssistant} <Bot className="ml-2 h-5 w-5"/>
                      </Link>
                      <Link
                        href={aiQuoterLink}
                        onClick={() => setIsOpen(false)}
                        className="py-3 text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center"
                      >
                        {aiChooserLabels.quote} <Calculator className="ml-2 h-5 w-5"/>
                      </Link>
                  </nav>
                   <div className="mt-4 border-t border-border pt-4">
                      <p className="flex items-center gap-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <Globe className="h-4 w-4" /> {lang === 'en' ? 'Language' : 'Idioma'}
                      </p>
                      {languageOptions.map((option) => (
                        <Link
                          key={option.code}
                          href={option.href}
                          className="flex items-center justify-between gap-2 py-3 text-lg font-medium text-foreground transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {option.label}
                          {option.code === lang && <Check className="h-5 w-5 text-brand-blue" />}
                        </Link>
                      ))}
                    </div>

                  <Button asChild className="mt-6 h-[52px] rounded-2xl text-base bg-brand-blue hover:bg-brand-navy-dark text-white">
                    <Link href={contactLink} onClick={() => setIsOpen(false)}>{contactButton}</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
    </header>
  );
}
