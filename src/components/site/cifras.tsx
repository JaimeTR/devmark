import { Contador } from '@/components/site/contador';
import { cn } from '@/lib/utils';

/**
 * Cifras del estudio en una rejilla de 2 x 2 con lineas finas: el numero siempre arriba y alineado
 * (no depende de cuantas lineas ocupe la etiqueta) y la etiqueta debajo.
 */
export function Cifras({ stats, className }: { stats: readonly { value: string; label: string }[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 overflow-hidden rounded-2xl border border-ink/10 bg-white', className)}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            'group flex flex-col gap-3 p-5 transition-colors duration-300 hover:bg-mist/60 sm:p-7',
            i % 2 === 0 && 'border-r border-ink/10',
            i < stats.length - 2 && 'border-b border-ink/10',
          )}
        >
          <dd className="headline order-1 text-[clamp(2.4rem,5.5vw,3.75rem)] leading-none tabular-nums text-ink">
            <Contador valor={s.value} />
          </dd>
          <dt className="order-2 max-w-[18ch] text-sm leading-snug text-ink/60 sm:text-[15px]">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}
