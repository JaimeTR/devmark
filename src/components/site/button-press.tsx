'use client';

import { useEffect } from 'react';

/**
 * Efecto de clic de todos los botones (.btn): marca el boton con .btn-press y su ancho real en
 * --btn-w; el despliegue lo hace globals.css. Un solo listener para todo el sitio.
 */
export function ButtonPress() {
  useEffect(() => {
    const timers = new WeakMap<HTMLElement, number>();
    const alPresionar = (e: PointerEvent) => {
      const btn = (e.target as Element | null)?.closest<HTMLElement>('.btn, .btn-light, .btn-ink, .btn-glass, .btn-outline');
      if (!btn || !btn.querySelector('.btn-tile') || (btn as HTMLButtonElement).disabled) return;
      btn.style.setProperty('--btn-w', `${btn.offsetWidth}px`);
      btn.classList.remove('btn-press');
      void btn.offsetWidth; // reinicia la animacion si se presiona seguido
      btn.classList.add('btn-press');
      window.clearTimeout(timers.get(btn));
      timers.set(btn, window.setTimeout(() => btn.classList.remove('btn-press'), 1650));
    };
    document.addEventListener('pointerdown', alPresionar);
    return () => document.removeEventListener('pointerdown', alPresionar);
  }, []);
  return null;
}
