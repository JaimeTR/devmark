'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Sparkle } from 'lucide-react';
import { hostingContent } from '@/content/home-data';
import type { Lang } from '@/content/home';
import { Btn } from '@/components/site/btn';

/** Hosting de Hostinger con el cupon de DEVMARK, cruzado por una cinta inclinada. */
export function HostingBand({ lang }: { lang: Lang }) {
  const t = hostingContent[lang];
  const [copied, setCopied] = useState(false);
  const ribbon = lang === 'en' ? [t.discountText, 'Free email & SSL setup', t.guaranteeText] : [t.discountText, 'Correos y SSL gratis', t.guaranteeText];
  const loop = [...ribbon, ...ribbon, ...ribbon, ...ribbon];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t.couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="hosting" className="panel bg-band pb-20 pt-24 text-ink sm:pb-24">
      <div aria-hidden className="marquee pointer-events-none absolute -left-4 -right-4 top-6 -rotate-[2.5deg] bg-primary py-3 text-white" style={{ ['--marquee-speed' as string]: '30s' }}>
        <div className="marquee-track items-center">
          {loop.map((r, i) => (
            <span key={i} className="flex shrink-0 items-center gap-5 px-5 text-xl font-medium sm:text-2xl">
              {r}
              <Sparkle className="h-5 w-5 fill-current" />
            </span>
          ))}
        </div>
      </div>

      <div className="panel-inner relative mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
        <div>
          <p className="text-sm font-medium text-ink/60">{lang === 'en' ? 'Direct Hostinger partners' : 'Socios directos de Hostinger'}</p>
          <h2 className="headline reveal mt-3 text-[clamp(2.1rem,4.6vw,4rem)]">
            {lang === 'en' ? (
              <>
                Hosting <em>as dynamic</em> as your business.
              </>
            ) : (
              <>
                Hosting <em>tan dinámico</em> como tu negocio.
              </>
            )}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-ink/70">{t.subtitle}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-[0_24px_60px_-34px_rgba(17,12,41,0.45)] sm:p-8">
          <ul className="space-y-3">
            {t.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px]">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-ink text-white">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-ink/25 bg-mist p-2 pl-4">
            <div>
              <p className="text-xs text-ink/50">{lang === 'en' ? 'Coupon' : 'Cupón'}</p>
              <p className="font-logo text-2xl tracking-wider">{t.couponCode}</p>
            </div>
            <button type="button" onClick={copy} className="btn-outline btn-sm bg-white" aria-live="polite">
              <span className="btn-tile">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</span>
              {copied ? t.copiedButton : t.copyButton}
            </button>
          </div>
          <Btn href={t.referralLink} external icon={<ArrowUpRight className="h-5 w-5" />} variant="ink" className="mt-4 w-full">
            {t.ctaButton}
          </Btn>
        </div>
      </div>
    </section>
  );
}
