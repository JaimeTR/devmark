'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/** Cupon con boton de copiar, sobre tinta. */
export function CouponCopy({ code, label, copyLabel, copiedLabel }: { code: string; label: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="glass-dark flex items-center gap-4 rounded-[10px] py-1.5 pl-4 pr-1.5">
      <div>
        <p className="text-xs text-ink-muted">{label}</p>
        <p className="font-logo text-lg tracking-wider">{code}</p>
      </div>
      <button type="button" onClick={copy} aria-live="polite" className="grid h-10 min-w-10 place-items-center rounded-[7px] bg-white/10 px-3 text-sm transition-colors hover:bg-white/20">
        <span className="flex items-center gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only sm:not-sr-only">{copied ? copiedLabel : copyLabel}</span>
        </span>
      </button>
    </div>
  );
}
