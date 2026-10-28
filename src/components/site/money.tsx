'use client';

import { convertPenToCurrency, formatCurrency, roundPrice, SELECTABLE_CURRENCIES, type CurrencyCode } from '@/lib/currency';
import { setCurrency, useCurrency } from '@/hooks/use-currency';
import { cn } from '@/lib/utils';

type Lang = 'es' | 'en';

/** "S/ 800/mes" (precio base en soles) -> el mismo precio en la moneda elegida: "US$ 235/mes". */
export function Money({ text, lang }: { text: string; lang: Lang }) {
  const currency = useCurrency(lang);
  const match = text.match(/^S\/\s*(\d[\d,]*)(\/\S+)?$/);
  if (!match) return <>{text}</>;
  const pen = parseInt(match[1].replace(/,/g, ''), 10);
  return <>{formatCurrency(roundPrice(convertPenToCurrency(pen, currency)), currency)}{match[2] ?? ''}</>;
}

const LABEL: Partial<Record<CurrencyCode, string>> = { PEN: 'S/', USD: 'US$' };

/** Selector S/ | US$. Lo que elige el visitante manda sobre la deteccion y se recuerda. */
export function CurrencyToggle({ lang, className }: { lang: Lang; className?: string }) {
  const current = useCurrency(lang);
  return (
    <div role="group" aria-label={lang === 'es' ? 'Moneda de los precios' : 'Price currency'} className={cn('inline-flex rounded-full bg-ink/5 p-0.5 text-sm', className)}>
      {SELECTABLE_CURRENCIES.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={current === code}
          onClick={() => setCurrency(code)}
          className={cn('rounded-full px-3 py-1 font-medium tabular-nums transition-colors', current === code ? 'bg-ink text-white' : 'text-ink/60 hover:text-ink')}
        >
          {LABEL[code]}
        </button>
      ))}
    </div>
  );
}
