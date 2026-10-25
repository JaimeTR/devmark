'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowUpRight, Bot, Calculator, Check, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { homeContent } from '@/content/home';
import { SERVICE_ICONS } from '@/components/landing/service-band';
import { ServicesMenu } from './services-menu';

/** Etiqueta "Nuevo". `esquina` la cuelga arriba a la derecha del enlace para no ocupar ancho en la barra. */
function NuevoBadge({ label, esquina }: { label: string; esquina?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-[5px] bg-periwinkle px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase leading-none tracking-wide text-ink',
        esquina && 'pointer-events-none absolute -right-2.5 -top-1.5 px-1 text-[8.5px] shadow-[0_4px_10px_-4px_rgba(17,12,41,0.5)]',
      )}
    >
      {label}
    </span>
  );
}

interface NavLink {
  href: string;
  label: string;
  /** Sitio aparte: abre en otra pestana. */
  external?: boolean;
  nuevo?: boolean;
}

const STORE_URL = 'https://devmarkpe.store';

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
// página se quede con un header incompleto o desactualizado.
function buildNavLinks(lang: 'es' | 'en'): NavLink[] {
  if (lang === 'en') {
    return [
      { href: '/en/about', label: 'About' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: STORE_URL, label: 'Store', external: true, nuevo: true },
      { href: '/en/blog', label: 'Blog' },
      { href: '/en/contact', label: 'Contact' },
    ];
  }
  return [
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/hosting', label: 'Hosting' },
    { href: STORE_URL, label: 'Tienda', external: true, nuevo: true },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ];
}

const copy = {
  es: { whatsapp: 'Hablemos por WhatsApp', short: 'WhatsApp', ai: 'Asistente con IA', quote: 'Cotizador con IA', language: 'Idioma', menu: 'Abrir menú', nuevo: 'Nuevo', services: 'Servicios', allServices: 'Ver todos los servicios', skip: 'Saltar al contenido principal', home: 'DEVMARK, inicio' },
  en: { whatsapp: "Let's talk on WhatsApp", short: 'WhatsApp', ai: 'AI assistant', quote: 'AI quoter', language: 'Language', menu: 'Open menu', nuevo: 'New', services: 'Services', allServices: 'See all services', skip: 'Skip to main content', home: 'DEVMARK, home' },
} as const;

/**
 * Barra de vidrio flotante. Cambia de tono según el panel que tiene debajo: los paneles
 * oscuros llevan data-tone="dark"; todo lo demás se considera claro.
 */
export function Header({ lang = 'es', aiAssistant }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tone, setTone] = useState<'dark' | 'light'>('light');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navLinks = useMemo(() => buildNavLinks(lang), [lang]);
  const t = copy[lang];
  const [serviciosAbierto, setServiciosAbierto] = useState(false);
  const servicesHref = lang === 'en' ? '/en/services' : '/servicios';
  const servicios = homeContent[lang].services.items;
  const homeHref = lang === 'en' ? '/en' : '/';
  const aiAssistantLink = lang === 'en' ? '/en/ai-assistant' : '/ai-assistant';
  const aiQuoterLink = lang === 'en' ? '/en/quote' : '/quote';
  const whatsapp = whatsappHref(WHATSAPP_GREETING[lang]);
  const languageOptions = [
    { code: 'es' as const, label: 'Español', href: '/' },
    { code: 'en' as const, label: 'English', href: '/en' },
  ];

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
      // Lo que hay justo debajo de la barra decide su tono.
      const below = document
        .elementsFromPoint(window.innerWidth / 2, 44)
        .find((el) => !el.closest('header'))
        ?.closest('[data-tone]');
      setTone(below?.getAttribute('data-tone') === 'dark' ? 'dark' : 'light');
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const dark = tone === 'dark';
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-white"
      >
        {t.skip}
      </a>
      <div
        className={cn(
          'relative mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-2xl pl-3 pr-2 transition-[background-color,border-color,box-shadow,color] duration-500',
          dark ? 'glass-dark text-white' : 'glass-light text-ink',
          !scrolled && dark && 'bg-transparent',
        )}
      >
        <Link href={homeHref} className="flex min-w-0 shrink-0 items-center gap-2.5" aria-label={t.home}>
          {/* Logotipo nuevo: version clara u oscura segun el panel que hay debajo. */}
          <Image
            src={dark ? '/marca/devmark-logotipo-sin-lema-fondo-oscuro.svg' : '/marca/devmark-logotipo-sin-lema.svg'}
            alt="DEVMARK"
            width={244}
            height={24}
            className="h-[21px] w-auto sm:h-[24px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1" aria-label={lang === 'en' ? 'Main' : 'Principal'}>
          {navLinks.map((link) => {
            const servicios = link.href === servicesHref;
            if (servicios) return <ServicesMenu key={link.href} lang={lang} dark={dark} active={isActive(link.href)} />;
            const clase = cn(
              'flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[15px] font-medium transition-colors xl:px-3',
              isActive(link.href)
                ? dark
                  ? 'bg-white/[0.12] text-white'
                  : 'bg-ink/[0.06] text-ink'
                : dark
                  ? 'text-white/75 hover:text-white'
                  : 'text-ink/70 hover:text-ink',
            );
            return link.external ? (
              <a key={link.href} href={link.href} target="_blank" rel="noopener" className={cn(clase, 'relative')}>
                <span className="title-link pb-0.5">{link.label}</span>
                {link.nuevo && <NuevoBadge label={t.nuevo} esquina />}
              </a>
            ) : (
              <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={clase}>
                <span className="title-link pb-0.5">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                'hidden h-10 w-10 place-items-center rounded-[10px] text-xs font-semibold tracking-wide transition-colors sm:grid',
                dark ? 'bg-white/10 hover:bg-white/[0.16]' : 'bg-ink/[0.06] hover:bg-ink/10',
              )}
              aria-label={t.language}
            >
              {lang.toUpperCase()}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              {languageOptions.map((option) => (
                <DropdownMenuItem key={option.code} asChild className="cursor-pointer rounded-lg">
                  <Link href={option.href} className="flex items-center justify-between gap-3">
                    {option.label}
                    {option.code === lang && <Check className="h-4 w-4 text-primary" />}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn('hidden h-10 w-10 place-items-center rounded-[10px] transition-colors sm:grid', dark ? 'bg-white/10 hover:bg-white/[0.16]' : 'bg-ink/[0.06] hover:bg-ink/10')}
              aria-label={aiAssistant}
            >
              <Bot className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl">
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                <Link href={aiAssistantLink} className="flex items-center justify-between gap-3">
                  {t.ai} <Bot className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer rounded-lg">
                <Link href={aiQuoterLink} className="flex items-center justify-between gap-3">
                  {t.quote} <Calculator className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp}
            className={cn('btn btn-sm hidden md:inline-flex lg:max-xl:pr-1.5', dark ? 'btn-light' : 'btn-ink')}
          >
            <span className="btn-tile">
              <WhatsAppIcon className="h-4 w-4" />
            </span>
            <span className="lg:max-xl:sr-only">{t.whatsapp}</span>
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={cn('grid h-11 w-11 place-items-center rounded-[11px] lg:hidden', dark ? 'bg-white/10' : 'bg-ink/[0.06]')}
              aria-label={t.menu}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[min(88vw,380px)] flex-col gap-0 border-none bg-ink p-0 text-white">
              <SheetTitle className="sr-only">{t.menu}</SheetTitle>
              <div className="flex items-center gap-2.5 px-6 pb-6 pt-7">
                <Image src="/marca/devmark-logotipo-sin-lema-fondo-oscuro.svg" alt="DEVMARK" width={244} height={24} className="h-[24px] w-auto" />
              </div>
              <nav className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3">
                {navLinks.map((link) => {
                  const clase = cn(
                    'headline flex items-center gap-3 rounded-xl px-3 py-1.5 text-[28px] transition-colors',
                    isActive(link.href) ? 'text-white' : 'text-white/60 hover:text-white',
                  );
                  if (link.href === servicesHref) {
                    return (
                      <div key={link.href}>
                        <button type="button" onClick={() => setServiciosAbierto((v) => !v)} aria-expanded={serviciosAbierto} className={cn(clase, 'w-full justify-between')}>
                          {link.label}
                          <ChevronDown className={cn('h-6 w-6 transition-transform duration-300', serviciosAbierto && 'rotate-180')} />
                        </button>
                        {serviciosAbierto && (
                          <ul className="step-in mb-2 grid gap-1 px-2">
                            {servicios.map((item) => {
                              const Icon = SERVICE_ICONS[item.id];
                              return (
                                <li key={item.href}>
                                  <Link href={item.href} onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-2 py-2 text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white">
                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] bg-white/[0.08] text-periwinkle">
                                      <Icon className="h-4 w-4" />
                                    </span>
                                    {item.title}
                                  </Link>
                                </li>
                              );
                            })}
                            <li>
                              <Link href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-periwinkle">
                                {t.allServices}
                                <ArrowUpRight className="h-4 w-4" />
                              </Link>
                            </li>
                          </ul>
                        )}
                      </div>
                    );
                  }
                  return link.external ? (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener" onClick={() => setIsOpen(false)} className={clase}>
                      {link.label}
                      {link.nuevo && <NuevoBadge label={t.nuevo} />}
                    </a>
                  ) : (
                    <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={clase}>
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-4 flex shrink-0 flex-col gap-1 border-t border-white/10 px-6 pt-5 text-[15px]">
                <Link href={aiAssistantLink} onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-white/80 hover:text-white">
                  {t.ai} <Bot className="h-4 w-4" />
                </Link>
                <Link href={aiQuoterLink} onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2 text-white/80 hover:text-white">
                  {t.quote} <Calculator className="h-4 w-4" />
                </Link>
                <div className="flex gap-2 pt-3">
                  {languageOptions.map((option) => (
                    <Link
                      key={option.code}
                      href={option.href}
                      onClick={() => setIsOpen(false)}
                      className={cn('rounded-[7px] px-3 py-1.5 text-sm', option.code === lang ? 'bg-white text-ink' : 'bg-white/10 text-white/80')}
                    >
                      {option.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="shrink-0 p-6">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="btn-light w-full">
                  <span className="btn-tile">
                    <WhatsAppIcon />
                  </span>
                  {t.whatsapp}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
