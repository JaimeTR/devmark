import { Contador } from '@/components/site/contador';
import { cn } from '@/lib/utils';

/**
 * Cifras del estudio. En movil, rejilla de 2 x 2 con lineas finas; en computadora (lg), una sola fila
 * separada por lineas verticales. El numero siempre va arriba y alineado (no depende de cuantas
 * lineas ocupe la etiqueta) y la etiqueta debajo.
 */
export function Cifras({ stats, className }: { stats: readonly { value: string; label: string }[]; className?: string }) {
  return (
    <dl
      className={cn(
        'grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-white',
        'lg:grid-cols-4 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent',
        className,
      )}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'flex flex-col gap-3 p-5 sm:p-7',
            i % 2 === 0 && 'border-r border-ink/10',
            i < stats.length - 2 && 'border-b border-ink/10',
            // Fila unica: sin bordes de la rejilla, linea vertical entre cifras.
            'lg:border-b-0 lg:border-r-0 lg:px-5 lg:py-1 xl:px-7',
            i > 0 && 'lg:border-l lg:border-ink/10',
            i === 0 && 'lg:pl-0',
          )}
        >
          <dd className="headline order-1 whitespace-nowrap text-[clamp(2.4rem,5.5vw,3.75rem)] leading-none tabular-nums text-ink lg:text-[clamp(2.25rem,3.3vw,3.25rem)]">
            <Contador valor={s.value} />
          </dd>
          <dt className="order-2 max-w-[18ch] text-sm leading-snug text-ink/60 sm:text-[15px] lg:text-sm">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
