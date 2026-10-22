'use client';

import { useState } from 'react';
import { CalendarDays, Check, Globe2, Target } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { processSteps } from '@/content/home-data';
import { cn } from '@/lib/utils';
import { TitleText } from '@/components/site/title-text';

/** La web "creciendo" dentro de una ventana: cada paso del proceso agrega lo que entrega. */
function StepVisual({ step, lang }: { step: number; lang: Lang }) {
  const es = lang === 'es';
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_60px_-30px_rgba(17,12,41,0.35)]">
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 flex items-center gap-1.5 rounded-md bg-mist px-2.5 py-1 text-xs text-ink/60">
          {step === 6 && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
          tunegocio.pe
        </span>
      </div>
      <div className="relative flex-1 p-6">
        {step === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-mist text-primary">
              <CalendarDays className="h-6 w-6" />
            </span>
            <p className="headline text-2xl">{es ? 'Reunión de inicio' : 'Kick-off meeting'}</p>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className={cn('h-7 w-7 rounded-md text-[11px] leading-7', i === 9 ? 'bg-primary text-white' : 'bg-mist text-ink/40')}>
                  {i + 10}
                </span>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex h-full flex-col justify-center gap-3">
            {(es ? ['Más contactos por WhatsApp', 'Mostrar servicios y precios', 'Llegar a clientes de provincia'] : ['More WhatsApp leads', 'Show services and prices', 'Reach clients outside Lima']).map((g) => (
              <div key={g} className="flex items-center gap-3 rounded-lg bg-mist p-3.5">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-[15px]">{g}</span>
              </div>
            ))}
          </div>
        )}
        {step >= 2 && step <= 4 && (
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className={cn('h-3 w-20 rounded', step >= 3 ? 'bg-ink' : 'border border-dashed border-ink/30')} />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={cn('h-2 w-8 rounded-full', step >= 3 ? 'bg-ink/20' : 'border border-dashed border-ink/25')} />
                ))}
              </div>
            </div>
            <div className={cn('flex flex-1 flex-col justify-center gap-2.5 rounded-lg p-5', step >= 3 ? 'bg-ink' : 'border border-dashed border-ink/30')}>
              <span className={cn('h-4 w-3/4 rounded', step >= 3 ? 'bg-white' : 'bg-ink/10')} />
              <span className={cn('h-4 w-1/2 rounded', step >= 3 ? 'bg-periwinkle' : 'bg-ink/10')} />
              <span className={cn('mt-2 h-2 w-2/3 rounded-full', step >= 3 ? 'bg-white/30' : 'bg-ink/10')} />
              <div className="mt-3 flex gap-2">
                <span className={cn('h-8 w-24 rounded-md', step >= 4 ? 'bg-white' : step >= 3 ? 'bg-white/60' : 'border border-dashed border-ink/30')} />
                {step >= 4 && <span className="h-8 w-8 rounded-md bg-primary" />}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn('h-16 rounded-lg', step >= 3 ? (i === 1 ? 'bg-band' : 'bg-mist') : 'border border-dashed border-ink/30')} />
              ))}
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="flex h-full flex-col justify-center gap-2.5">
            {(es ? ['Velocidad de carga', 'Se ve bien en celular', 'Formularios y WhatsApp', 'SEO básico y metadatos'] : ['Load speed', 'Looks right on mobile', 'Forms and WhatsApp', 'Basic SEO and metadata']).map((c) => (
              <div key={c} className="flex items-center gap-3 rounded-lg border border-ink/10 p-3.5">
                <span className="grid h-6 w-6 place-items-center rounded-md bg-primary text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-[15px]">{c}</span>
              </div>
            ))}
          </div>
        )}
        {step === 6 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-white">
              <Globe2 className="h-6 w-6" />
            </span>
            <p className="headline text-3xl">{es ? 'Tu web está en línea' : 'Your site is live'}</p>
            <p className="max-w-[30ch] text-[15px] text-ink/60">{es ? 'Lista para recibir visitas y mensajes de clientes.' : 'Ready to receive visitors and client messages.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Process({ lang }: { lang: Lang }) {
  const t = homeContent[lang].process;
  const steps = processSteps[lang];
  const [active, setActive] = useState(0);

  return (
    <section className="panel-mist py-20 sm:py-28">
      <div className="panel-inner grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h2 className="headline reveal text-[clamp(2.1rem,4.4vw,3.75rem)]">
            <TitleText parts={t.title} />
          </h2>
          <p className="reveal mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{t.text}</p>
          <ol className="mt-10 border-t border-ink/10">
            {steps.map((s, i) => {
              const open = i === active;
              return (
                <li key={s.number} className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        'grid h-8 w-8 shrink-0 place-items-center rounded-md text-xs font-semibold tabular-nums transition-colors',
                        open ? 'bg-ink text-white' : 'border border-ink/15 text-ink/40 group-hover:text-ink',
                      )}
                    >
                      {s.number}
                    </span>
                    <span className={cn('headline text-[1.4rem] transition-colors sm:text-2xl', open ? 'text-ink' : 'text-ink/40 group-hover:text-ink/70')}>{s.title}</span>
                  </button>
                  <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out-expo', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                    <p className="overflow-hidden pl-12 text-[15px] leading-relaxed text-ink/70">
                      <span className="block pb-5">{s.description}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="lg:sticky lg:top-28 lg:h-[560px] lg:self-start">
          <div className="h-[420px] sm:h-[480px] lg:h-full">
            <StepVisual step={active} lang={lang} />
          </div>
          <div className="mt-4 flex gap-1.5" aria-hidden>
            {steps.map((s, i) => (
              <span key={s.number} className={cn('h-1 flex-1 rounded-full transition-colors duration-500', i <= active ? 'bg-ink' : 'bg-ink/15')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
