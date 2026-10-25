'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Sparkles } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { SERVICE_ICONS } from '@/components/landing/service-band';
import { cn } from '@/lib/utils';

const copy = {
  es: { label: 'Servicios', all: 'Ver todos los servicios', extra: 'También hacemos', quote: 'Cotiza con IA', quoteText: 'Propuesta con alcance y precio en 2 minutos.', from: 'Desde' },
  en: { label: 'Services', all: 'See all services', extra: 'We also do', quote: 'Quote with AI', quoteText: 'A proposal with scope and price in 2 minutes.', from: 'From' },
} as const;

/** Submenu de servicios del encabezado: se abre al pasar el cursor, al hacer clic o con el teclado. */
export function ServicesMenu({ lang, dark, active }: { lang: Lang; dark: boolean; active: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const cierre = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = copy[lang];
  const s = homeContent[lang].services;
  const allHref = lang === 'en' ? '/en/services' : '/servicios';
  const quoteHref = lang === 'en' ? '/en/quote' : '/quote';

  // Al cambiar de pagina se cierra.
  const [ruta, setRuta] = useState(pathname);
  if (ruta !== pathname) {
    setRuta(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const fuera = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('pointerdown', fuera);
    document.addEventListener('keydown', tecla);
    return () => {
      document.removeEventListener('pointerdown', fuera);
      document.removeEventListener('keydown', tecla);
    };
  }, [open]);

  const abrir = () => {
    if (cierre.current) clearTimeout(cierre.current);
    setOpen(true);
  };
  const cerrarLuego = () => {
    cierre.current = setTimeout(() => setOpen(false), 160);
  };

  return (
    <div ref={ref} onPointerEnter={(e) => e.pointerType === 'mouse' && abrir()} onPointerLeave={(e) => e.pointerType === 'mouse' && cerrarLuego()}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="menu-servicios"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1 rounded-lg px-2 py-2 text-[14px] font-medium transition-colors xl:px-3 xl:text-[15px]',
          active || open ? (dark ? 'bg-white/[0.12] text-white' : 'bg-ink/[0.06] text-ink') : dark ? 'text-white/75 hover:text-white' : 'text-ink/70 hover:text-ink',
        )}
      >
        {t.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
      </button>

      <div
        id="menu-servicios"
        className={cn(
          'absolute left-1/2 top-full w-[min(860px,calc(100vw-2.5rem))] -translate-x-1/2 pt-4 transition-[opacity,transform] duration-300 ease-out-expo',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <div className="grid grid-cols-[1fr_250px] gap-2 rounded-2xl bg-white p-2 text-ink shadow-[0_30px_70px_-24px_rgba(17,12,41,0.45)] ring-1 ring-ink/10">
          <ul className="grid grid-cols-2 gap-1">
            {s.items.map((item) => {
              const Icon = SERVICE_ICONS[item.id];
              return (
                <li key={item.href}>
                  <Link href={item.href} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-mist">
                    <span className="icon-tilt grid h-10 w-10 shrink-0 place-items-center rounded-[10px] bg-mist text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[15px] font-medium">{item.title}</span>
                      </span>
                      <span className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink/60">{item.description}</span>
                      {item.from && (
                        <span className="mt-1.5 block text-xs text-primary">
                          {t.from} {item.from}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col rounded-xl bg-mist p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{t.extra}</p>
            <ul className="mt-2 space-y-0.5">
              {s.extra.map((e) => (
                <li key={e.href}>
                  <Link href={e.href} className="group flex items-center justify-between rounded-[7px] px-2 py-1.5 text-sm text-ink/80 transition-colors hover:bg-white hover:text-ink">
                    {e.title}
                    <ArrowUpRight className="icon-nudge h-3.5 w-3.5 text-ink/40 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={quoteHref} className="group relative mt-auto overflow-hidden rounded-xl bg-ink p-4 text-white">
              <span aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/70 blur-[30px]" />
              <span className="relative flex items-center gap-2 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-periwinkle" />
                {t.quote}
              </span>
              <span className="relative mt-1 block text-xs text-ink-muted">{t.quoteText}</span>
            </Link>
            <Link href={allHref} className="mt-2 flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-primary hover:bg-white">
              {t.all}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
