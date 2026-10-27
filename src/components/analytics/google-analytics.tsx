'use client';

import { useEffect } from 'react';

const ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const EVENTOS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

/** Carga Google Analytics en la primera interaccion (o a los 10 s) para que no compita con la carga inicial. */
export function GoogleAnalytics() {
  useEffect(() => {
    if (!ID) return;
    let hecho = false;
    const cargar = () => {
      if (hecho) return;
      hecho = true;
      limpiar();
      const w = window as unknown as { dataLayer: unknown[] };
      w.dataLayer = w.dataLayer || [];
      // gtag.js espera el objeto `arguments`, no un arreglo.
      const gtag = function (this: unknown, ...a: unknown[]) {
        void a;
        // eslint-disable-next-line prefer-rest-params
        w.dataLayer.push(arguments);
      } as (...a: unknown[]) => void;
      gtag('js', new Date());
      gtag('config', ID);
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
      document.head.appendChild(s);
    };
    const espera = setTimeout(cargar, 10000);
    function limpiar() {
      EVENTOS.forEach((e) => window.removeEventListener(e, cargar));
      clearTimeout(espera);
    }
    EVENTOS.forEach((e) => window.addEventListener(e, cargar, { passive: true }));
    return limpiar;
  }, []);

  return null;
}
