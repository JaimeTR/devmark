'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type OpcionMenu = {
  href: string;
  titulo: string;
  texto?: string;
  /** Contenido del cuadro de la izquierda: un icono o un codigo corto como "ES". */
  marca: React.ReactNode;
  activa?: boolean;
};

/**
 * Menu desplegable pequeno del encabezado (idioma, asistente con IA).
 * Mismo lenguaje visual que ServicesMenu: tarjeta blanca, cuadros con icono y fondo mist al pasar el cursor.
 */
export function MenuCabecera({
  etiqueta,
  disparador,
  opciones,
  ancho = 280,
  dark,
}: {
  etiqueta: string;
  disparador: React.ReactNode;
  opciones: OpcionMenu[];
  ancho?: number;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const cierre = useRef<ReturnType<typeof setTimeout> | null>(null);
  const puntero = useRef('mouse');

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
    <div
      ref={ref}
      className="relative hidden sm:block"
      onPointerEnter={(e) => e.pointerType === 'mouse' && abrir()}
      onPointerLeave={(e) => e.pointerType === 'mouse' && cerrarLuego()}
    >
      <button
        type="button"
        aria-label={etiqueta}
        aria-expanded={open}
        aria-haspopup="true"
        onPointerDown={(e) => (puntero.current = e.pointerType)}
        // Con raton el cursor ya lo abrio al pasar: el clic no debe cerrarlo.
        onClick={() => setOpen((v) => (puntero.current === 'mouse' ? true : !v))}
        className={cn(
          'flex h-10 items-center gap-1.5 rounded-[10px] px-2.5 text-[13px] font-semibold tracking-wide transition-colors',
          dark ? 'bg-white/10 hover:bg-white/[0.16]' : 'bg-ink/[0.06] hover:bg-ink/10',
          open && (dark ? 'bg-white/[0.16]' : 'bg-ink/10'),
        )}
      >
        {disparador}
        <ChevronDown className={cn('h-3.5 w-3.5 opacity-60 transition-transform duration-300', open && 'rotate-180')} />
      </button>

      <div
        style={{ width: ancho }}
        className={cn(
          'absolute right-0 top-full max-w-[calc(100vw-2rem)] pt-4 transition-[opacity,transform] duration-300 ease-out-expo',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
        )}
      >
        <ul className="rounded-2xl bg-white p-2 text-ink shadow-[0_30px_70px_-24px_rgba(17,12,41,0.45)] ring-1 ring-ink/10">
          {opciones.map((o) => (
            <li key={o.href}>
              <Link
                href={o.href}
                aria-current={o.activa ? 'true' : undefined}
                className={cn('group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-mist', o.activa && 'bg-mist')}
              >
                <span
                  className={cn(
                    'icon-tilt grid h-10 w-10 shrink-0 place-items-center rounded-[10px] text-sm font-semibold transition-colors',
                    o.activa ? 'bg-primary text-white' : 'bg-mist text-primary group-hover:bg-primary group-hover:text-white',
                  )}
                >
                  {o.marca}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium">{o.titulo}</span>
                  {o.texto && <span className="mt-0.5 block text-[13px] leading-snug text-ink/60">{o.texto}</span>}
                </span>
                {o.activa && <Check className="h-4 w-4 shrink-0 text-primary" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
