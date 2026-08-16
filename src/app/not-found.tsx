'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { AnimatedBackground } from '@/components/home/animated-background';

const copy = {
  es: {
    header: {
      lang: 'es' as const,
      navLinks: [
        { href: '/#hero', label: 'Inicio' },
        { href: '/#services', label: 'Servicios' },
        { href: '/portfolio', label: 'Portafolio' },
        { href: '/blog', label: 'Blog' },
        { href: '/#contact', label: 'Contacto' },
      ],
      contactButton: 'Contactar',
      aiAssistant: 'Asistente IA',
      aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
    },
    footer: {
      lang: 'es' as const,
      companyName: 'DEVMARK',
      companyDescription: 'Soluciones digitales innovadoras',
      quickLinksTitle: 'Enlaces Rápidos',
      servicesTitle: 'Servicios',
      contactTitle: 'Contacto',
      copyright: '© 2026 DEVMARK. Todos los derechos reservados.',
    },
    eyebrow: 'Error 404',
    title: 'Esta página no existe',
    subtitle: 'Puede que el enlace esté roto o que la página se haya movido. Volvamos a un lugar seguro.',
    back: 'Página anterior',
    home: 'Volver al inicio',
    homeHref: '/',
  },
  en: {
    header: {
      lang: 'en' as const,
      navLinks: [
        { href: '/en#hero', label: 'Home' },
        { href: '/en#services', label: 'Services' },
        { href: '/en/portfolio', label: 'Portfolio' },
        { href: '/en/blog', label: 'Blog' },
        { href: '/en#contact', label: 'Contact' },
      ],
      contactButton: 'Contact',
      aiAssistant: 'AI Assistant',
      aiAssistantTooltip: 'Hello! I am your AI assistant.',
    },
    footer: {
      lang: 'en' as const,
      companyName: 'DEVMARK',
      companyDescription: 'Innovative digital solutions',
      quickLinksTitle: 'Quick Links',
      servicesTitle: 'Services',
      contactTitle: 'Contact',
      copyright: '© 2026 DEVMARK. All rights reserved.',
    },
    eyebrow: '404 Error',
    title: "This page doesn't exist",
    subtitle: 'The link might be broken or the page may have moved. Let\'s get you back somewhere safe.',
    back: 'Go back',
    home: 'Back to home',
    homeHref: '/en',
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  const lang = pathname?.startsWith('/en') ? 'en' : 'es';
  const t = copy[lang];

  useEffect(() => {
    // window.history.length > 1 no garantiza que la página anterior sea de
    // este mismo sitio, pero evita mostrar "Página anterior" cuando el 404
    // fue la primera carga (llegada directa/enlace externo roto).
    setCanGoBack(window.history.length > 1);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-background min-h-screen">
      <AnimatedBackground />
      <Header {...t.header} />

      <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-32 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-6 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15">
            <Compass className="w-4 h-4 text-brand-blue shrink-0" />
            <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">{t.eyebrow}</span>
          </div>

          <h1 className="font-headline text-6xl sm:text-8xl font-medium tracking-tight text-gradient">404</h1>
          <p className="mt-4 text-2xl sm:text-3xl font-semibold text-brand-navy">{t.title}</p>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-md mx-auto">{t.subtitle}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="h-[52px] px-8 rounded-2xl font-semibold text-sm border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 hover:-translate-y-1 transition-all duration-300"
            >
              <Link href={t.homeHref}>
                {t.home}
                <Home className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            {canGoBack && (
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="h-[52px] px-8 rounded-2xl font-semibold text-sm bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent transition-all duration-300"
              >
                {t.back}
                <ArrowLeft className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>

      <Footer {...t.footer} />
    </div>
  );
}
