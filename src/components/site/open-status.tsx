'use client';

import { useEffect, useState } from 'react';
import { abiertoEnLima } from '@/lib/contact';
import { cn } from '@/lib/utils';

/**
 * "Abierto ahora" o "Cerrado ahora" segun la hora de Lima. Se calcula en el navegador (y cada minuto)
 * para no desfasar el HTML del servidor con la hora real; hasta entonces no muestra nada.
 */
export function OpenStatus({ lang, tone = 'dark', className }: { lang: 'es' | 'en'; tone?: 'dark' | 'light'; className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);
  useEffect(() => {
    const tick = () => setOpen(abiertoEnLima());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (open === null) return null;
  const es = lang === 'es';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[5px] px-1.5 py-0.5 text-xs',
        open ? (tone === 'dark' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-emerald-500/10 text-emerald-700') : tone === 'dark' ? 'bg-white/10 text-ink-muted' : 'bg-ink/5 text-ink/55',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', open ? 'si-ring bg-emerald-500' : tone === 'dark' ? 'bg-ink-muted' : 'bg-ink/40')} />
      {open ? (es ? 'Abierto ahora' : 'Open now') : es ? 'Cerrado ahora' : 'Closed now'}
    </span>
  );
}
