'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, Globe2, Target, Video } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { processSteps } from '@/content/home-data';
import { cn } from '@/lib/utils';
import { BOOKING_URL, whatsappHref } from '@/lib/contact';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { TitleText } from '@/components/site/title-text';

type CSSVars = React.CSSProperties & { '--i'?: number };
const at = (i: number): CSSVars => ({ '--i': i });

/**
 * La web "creciendo" dentro de una ventana: cada paso agrega lo que entrega. Al cambiar de paso
 * el contenido se monta de nuevo y sus piezas (.si) entran escalonadas.
 */
function StepVisual({ step, lang }: { step: number; lang: Lang }) {
  const es = lang === 'es';
  const dashed = 'border border-dashed border-ink/30';
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_24px_60px_-30px_rgba(17,12,41,0.35)]">
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 flex items-center gap-1.5 rounded-[7px] bg-mist px-2.5 py-1 text-xs text-ink/60">
          {step === 6 && <span className="si-ring h-1.5 w-1.5 rounded-full bg-emerald-500" />}
          tunegocio.pe
        </span>
      </div>
      <div className="relative flex-1 p-6">
        {step === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="si grid h-14 w-14 place-items-center rounded-xl bg-mist text-primary">
              <CalendarDays className="h-6 w-6" />
            </span>
            <p className="si headline text-2xl" style={at(1)}>
              {es ? 'Reunión de inicio' : 'Kick-off meeting'}
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className={cn('si h-7 w-7 rounded-md text-[11px] leading-7', i === 9 ? 'si-ring bg-primary text-white' : 'bg-mist text-ink/40')}
                  style={at(2 + (i % 7) * 0.4)}
                >
                  {i + 10}
                </span>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="flex h-full flex-col justify-center gap-3">
            {(es ? ['Más contactos por WhatsApp', 'Mostrar servicios y precios', 'Llegar a clientes de provincia'] : ['More WhatsApp leads', 'Show services and prices', 'Reach clients outside Lima']).map((g, i) => (
              <div key={g} className="si flex items-center gap-3 rounded-lg bg-mist p-3.5" style={at(i * 1.5)}>
                <Target className="h-4 w-4 text-primary" />
                <span className="text-[15px]">{g}</span>
                <span className="si ml-auto grid h-5 w-5 place-items-center rounded-md bg-primary text-white" style={at(i * 1.5 + 3)}>
                  <Check className="h-3 w-3" />
                </span>
              </div>
            ))}
          </div>
        )}
        {step >= 2 && step <= 4 && (
          <div className="flex h-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className={cn('si si-grow h-3 w-20 rounded', step >= 3 ? 'bg-ink' : dashed)} />
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={cn('si h-2 w-8 rounded-full', step >= 3 ? 'bg-ink/20' : 'border border-dashed border-ink/25')} style={at(i + 1)} />
                ))}
              </div>
            </div>
            <div className={cn('si flex flex-1 flex-col justify-center gap-2.5 rounded-lg p-5', step >= 3 ? 'bg-ink' : dashed)} style={at(2)}>
              <span className={cn('si si-grow h-4 w-3/4 rounded', step >= 3 ? 'bg-white' : 'bg-ink/10')} style={at(4)} />
              <span className={cn('si si-grow h-4 w-1/2 rounded', step >= 3 ? 'bg-periwinkle' : 'bg-ink/10')} style={at(5)} />
              <span className={cn('si si-grow mt-2 h-2 w-2/3 rounded-full', step >= 3 ? 'bg-white/30' : 'bg-ink/10')} style={at(6)} />
              <div className="mt-3 flex gap-2">
                <span className={cn('si h-8 w-24 rounded-md', step >= 4 ? 'bg-white' : step >= 3 ? 'bg-white/60' : dashed)} style={at(7)} />
                {step >= 4 && <span className="si si-ring h-8 w-8 rounded-md bg-primary" style={at(8)} />}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <span key={i} className={cn('si h-16 rounded-lg', step >= 3 ? (i === 1 ? 'bg-band' : 'bg-mist') : dashed)} style={at(8 + i)} />
              ))}
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="flex h-full flex-col justify-center gap-2.5">
            {(es ? ['Velocidad de carga', 'Se ve bien en celular', 'Formularios y WhatsApp', 'SEO básico y metadatos'] : ['Load speed', 'Looks right on mobile', 'Forms and WhatsApp', 'Basic SEO and metadata']).map((c, i) => (
              <div key={c} className="si flex items-center gap-3 rounded-lg border border-ink/10 p-3.5" style={at(i * 1.5)}>
                <span className="si grid h-6 w-6 place-items-center rounded-md bg-primary text-white" style={at(i * 1.5 + 2)}>
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-[15px]">{c}</span>
                <span className="si si-grow ml-auto h-1.5 w-16 rounded-full bg-emerald-500/70" style={at(i * 1.5 + 3)} />
              </div>
            ))}
          </div>
        )}
        {step === 6 && (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <span className="si si-ring grid h-14 w-14 place-items-center rounded-xl bg-primary text-white">
              <Globe2 className="h-6 w-6" />
            </span>
            <p className="si headline text-3xl" style={at(1)}>
              {es ? 'Tu web está en línea' : 'Your site is live'}
            </p>
            <p className="si max-w-[30ch] text-[15px] text-ink/60" style={at(2)}>
              {es ? 'Lista para recibir visitas y mensajes de clientes.' : 'Ready to receive visitors and client messages.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const cardCopy = {
  es: {
    step: 'Paso',
    of: 'de',
    get: 'Qué recibes',
    book: 'Agendar reunión',
    whatsappLabel: 'Escribir por WhatsApp',
    message: (step: string) => `Hola DEVMARK, vi su proceso de trabajo ("${step}") y quiero empezar mi web.`,
  },
  en: {
    step: 'Step',
    of: 'of',
    get: 'What you get',
    book: 'Book a meeting',
    whatsappLabel: 'Message us on WhatsApp',
    message: (step: string) => `Hi DEVMARK, I saw your process ("${step}") and want to start my website.`,
  },
} as const;

export function Process({ lang }: { lang: Lang }) {
  const t = homeContent[lang].process;
  const steps = processSteps[lang];
  const c = cardCopy[lang];
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // En escritorio el scroll maneja los pasos: la seccion mide un tramo de pantalla por paso
  // y lo de adentro queda fijo (sticky) mientras se recorre. En celular se toca cada paso.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = trackRef.current;
      if (!el || !desktop.matches) return;
      const rect = el.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      const progress = run > 0 ? Math.min(1, Math.max(0, -rect.top / run)) : 0;
      barRef.current?.style.setProperty('--p', String(progress));
      setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [steps.length]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (el && window.matchMedia('(min-width: 1024px)').matches) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const run = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + ((i + 0.5) / steps.length) * run, behavior: 'smooth' });
    } else {
      setActive(i);
    }
  };

  return (
    <section
      ref={trackRef}
      className="panel-mist py-20 sm:py-28 lg:h-[var(--track)] lg:py-0"
      style={{ ['--track' as string]: `${steps.length * 70 + 30}svh` }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
        <div className="panel-inner grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16 lg:pt-16">
          <div>
            <h2 className="headline reveal text-[clamp(2.1rem,4vw,3.5rem)]">
              <TitleText parts={t.title} />
            </h2>
            <p className="reveal mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{t.text}</p>
            <ol className="mt-8 border-t border-ink/10">
              {steps.map((s, i) => {
                const open = i === active;
                return (
                  <li key={s.number} className="border-b border-ink/10">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={open ? 'step' : undefined}
                      className="group flex w-full items-center gap-4 py-3 text-left"
                    >
                      <span
                        className={cn(
                          'grid h-8 w-8 shrink-0 place-items-center rounded-md text-xs font-semibold tabular-nums transition-colors duration-500',
                          open ? 'bg-ink text-white' : i < active ? 'bg-ink/10 text-ink' : 'border border-ink/15 text-ink/40 group-hover:text-ink',
                        )}
                      >
                        {s.number}
                      </span>
                      <span className={cn('headline text-[1.35rem] transition-colors duration-500 sm:text-[1.6rem]', open ? 'text-ink' : 'text-ink/35 group-hover:text-ink/70')}>{s.title}</span>
                    </button>
                    <div className={cn('grid transition-[grid-template-rows] duration-500 ease-out-expo', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                      <p className="overflow-hidden pl-12 text-[15px] leading-relaxed text-ink/70">
                        <span className="block pb-4">{s.description}</span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div>
            <div key={active} className="step-in h-[360px] sm:h-[400px] lg:h-[min(420px,46svh)]">
              <StepVisual step={active} lang={lang} />
            </div>
            <div ref={barRef} className="mt-4 hidden h-1 overflow-hidden rounded-full bg-ink/10 lg:block" style={{ ['--p' as string]: 0 }} aria-hidden>
              <div className="h-full origin-left rounded-full bg-ink" style={{ transform: 'scaleX(var(--p))' }} />
            </div>
            <div className="mt-4 flex gap-1.5 lg:hidden" aria-hidden>
              {steps.map((s, i) => (
                <span key={s.number} className={cn('h-1 flex-1 rounded-full transition-colors duration-500', i <= active ? 'bg-ink' : 'bg-ink/15')} />
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-white p-5 sm:p-6" aria-live="polite">
              <div key={active} className="step-in flex flex-col gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-ink/55">
                    {c.step} {steps[active].number} {c.of} {String(steps.length).padStart(2, '0')} · {c.get}
                  </p>
                  <p className="mt-1.5 text-[17px] leading-snug text-ink">{steps[active].deliverable}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                    <span className="btn-tile">
                      <Video className="h-4 w-4" />
                    </span>
                    {c.book}
                  </a>
                  <a href={whatsappHref(c.message(steps[active].title))} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm bg-white" aria-label={c.whatsappLabel}>
                    <span className="btn-tile">
                      <WhatsAppIcon className="h-4 w-4" />
                    </span>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
