'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cifra que cuenta desde 0 hasta su valor la primera vez que entra en pantalla ("100+", "91%", "11").
 * El HTML del servidor ya trae el valor final (buscadores y sin JavaScript); con movimiento reducido
 * no se anima.
 */
export function Contador({ valor, duracion = 1400 }: { valor: string; duracion?: number }) {
  const m = /^(\D*)(\d+)(.*)$/.exec(valor);
  const prefijo = m?.[1] ?? '';
  const final = m ? Number(m[2]) : 0;
  const sufijo = m?.[3] ?? '';
  const [actual, setActual] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!m || !el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let marco = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const inicio = performance.now();
        const paso = (ahora: number) => {
          const t = Math.min(1, (ahora - inicio) / duracion);
          setActual(Math.round(final * (1 - Math.pow(1 - t, 3))));
          if (t < 1) marco = requestAnimationFrame(paso);
        };
        setActual(0);
        marco = requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(marco);
    };
    // El valor de una cifra no cambia en vida del componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!m) return <span>{valor}</span>;
  return (
    <span ref={ref} role="img" aria-label={valor}>
      <span aria-hidden="true">
        {prefijo}
        {actual ?? final}
        {sufijo && <span className="text-primary">{sufijo}</span>}
      </span>
    </span>
  );
}
