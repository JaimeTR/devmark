'use client';

import { useClientValue } from '@/hooks/use-client-value';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { DeviImg } from '@/components/site/devi-img';

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

export default function Pagina404() {
  const pathname = usePathname();
  const router = useRouter();
  // window.history.length > 1 no garantiza que la página anterior sea de
  // este mismo sitio, pero evita mostrar "Página anterior" cuando el 404
  // fue la primera carga (llegada directa/enlace externo roto).
  const canGoBack = useClientValue(() => window.history.length > 1, false);

  const lang = pathname?.startsWith('/en') ? 'en' : 'es';
  const t = copy[lang];

  return (
    <div className="bg-paper">
      <Header {...t.header} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <section data-tone="dark" className="panel-ink mt-2 sm:mt-3">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/35 blur-[130px]" />
          <div className="panel-inner relative flex min-h-[78svh] flex-col items-center justify-center pb-16 pt-32 text-center">
            <p className="display text-[clamp(7rem,22vw,15rem)] leading-none text-white/90">
              4<em>0</em>4
            </p>
            <DeviImg version="patitas" estado="buscando" tamano={150} alt={lang === 'es' ? 'Devi, la mascota de DEVMARK, buscando la página' : 'Devi, the DEVMARK mascot, looking for the page'} className="mt-4" />
            <h1 className="headline mt-4 text-[clamp(1.75rem,3.4vw,2.75rem)]">{t.title}</h1>
            <p className="mt-4 max-w-[46ch] text-[17px] text-ink-muted">{t.subtitle}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={t.homeHref} className="btn-light">
                <span className="btn-tile">
                  <Home className="h-5 w-5" />
                </span>
                {t.home}
              </Link>
              {canGoBack && (
                <button type="button" onClick={() => router.back()} className="btn-glass">
                  <span className="btn-tile">
                    <ArrowLeft className="h-5 w-5" />
                  </span>
                  {t.back}
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer {...t.footer} />
    </div>
  );
}
