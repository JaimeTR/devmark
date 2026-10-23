'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Plus } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { whatsappHref } from '@/lib/contact';
import { cn } from '@/lib/utils';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { SERVICE_ICONS } from './service-band';
import { Live } from '@/components/site/live';
import { ServiceVisual } from './service-visuals';

/**
 * Servicios como columnas que se abren: en escritorio la activa se expande y las demas
 * quedan como lomos con el nombre en vertical; en el celular es un acordeon.
 */
export function ServicesShowcase({ lang }: { lang: Lang }) {
  const t = homeContent[lang].services;
  const [active, setActive] = useState(0);
  const baseId = useId();

  return (
    <section id="services" className="panel-mist py-20 sm:py-28">
      <div className="panel-inner">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <h2 className="headline reveal text-[clamp(2.1rem,4.6vw,4rem)]">
            <TitleText parts={t.title} />
          </h2>
          <div className="reveal flex flex-col items-start gap-5 lg:pb-2">
            <p className="max-w-[44ch] text-[17px] leading-relaxed text-ink/70">{t.text}</p>
            <a href={whatsappHref(t.quoteMessage(t.items[active].title))} target="_blank" rel="noopener noreferrer" className="btn-ink">
              <span className="btn-tile">
                <WhatsAppIcon />
              </span>
              {t.cta}
            </a>
          </div>
        </div>

        {/* Escritorio: columnas que se abren */}
        <div className="mt-14 hidden h-[620px] gap-3 lg:flex">
          {t.items.map((s, i) => {
            const open = i === active;
            const Icon = SERVICE_ICONS[s.id];
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  'relative overflow-hidden rounded-2xl transition-[flex-grow,background-color] duration-700 ease-out-expo',
                  open ? 'grow-[7] bg-white' : 'grow-[1] basis-0 bg-ink text-white hover:bg-ink-soft',
                  !open && i % 2 === 1 && 'bg-[#251E52]',
                )}
                style={{ flexBasis: 0 }}
              >
                {open ? (
                  <div id={`${baseId}-${i}`} className="grid h-full grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 p-6">
                    <Live className="flex items-center rounded-xl bg-ink p-5">
                      <div className="h-[min(100%,420px)] w-full">
                        <ServiceVisual id={s.id} lang={lang} />
                      </div>
                    </Live>
                    <div className="flex flex-col py-2 pr-2">
                      <span className="grid h-11 w-11 place-items-center rounded-lg bg-mist text-ink">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="headline mt-5 text-[2.25rem]">{s.title}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-ink/70">{s.description}</p>
                      <p className="mt-6 text-sm font-medium text-ink/50">{t.includes}</p>
                      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {s.includes.map((inc) => (
                          <li key={inc} className="flex items-center gap-2 text-[15px] text-ink">
                            <span className="grid h-5 w-5 shrink-0 place-items-center rounded border border-ink/15">
                              <Check className="h-3 w-3" />
                            </span>
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-col items-start gap-4 border-t border-ink/10 pt-5">
                        {s.from && (
                          <p className="text-sm text-ink/60">
                            {t.from} <span className="headline block text-3xl tabular-nums text-ink">{s.from}</span>
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          <a href={whatsappHref(t.quoteMessage(s.title))} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                            <span className="btn-tile">
                              <WhatsAppIcon className="h-4 w-4" />
                            </span>
                            {t.ctaShort}
                          </a>
                          <Link href={s.href} className="btn-outline btn-sm">
                            <span className="btn-tile">
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                            {t.details}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-expanded={false}
                    aria-controls={`${baseId}-${i}`}
                    className="flex h-full w-full flex-col items-center justify-between py-5"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-md bg-white/10">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="headline whitespace-nowrap text-[1.75rem] [writing-mode:vertical-rl] rotate-180">{s.short}</span>
                    <span className="grid h-9 w-9 place-items-center rounded-md border border-white/20">
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-5 hidden items-center justify-between lg:flex">
          <div className="flex gap-1.5" aria-hidden>
            {t.items.map((s, i) => (
              <span key={s.id} className={cn('h-1 rounded-full transition-all duration-500', i === active ? 'w-10 bg-ink' : 'w-5 bg-ink/15')} />
            ))}
          </div>
          <p className="text-sm text-ink/50">{t.hint}</p>
        </div>

        {/* Celular y tablet: acordeon */}
        <div className="mt-10 flex flex-col gap-2.5 lg:hidden">
          {t.items.map((s, i) => {
            const open = i === active;
            const Icon = SERVICE_ICONS[s.id];
            return (
              <div key={s.id} className={cn('overflow-hidden rounded-2xl transition-colors', open ? 'bg-white' : 'bg-ink text-white')}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`${baseId}-m-${i}`}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-lg', open ? 'bg-mist' : 'bg-white/10')}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="headline flex-1 text-2xl">{s.title}</span>
                  <Plus className={cn('h-5 w-5 shrink-0 transition-transform duration-300', open && 'rotate-45')} />
                </button>
                {open && (
                  <div id={`${baseId}-m-${i}`} className="px-4 pb-5">
                    <Live className="h-64 rounded-xl bg-ink p-3 sm:h-80">
                      <ServiceVisual id={s.id} lang={lang} />
                    </Live>
                    <p className="mt-5 text-[15px] leading-relaxed text-ink/70">{s.description}</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2">
                      {s.includes.map((inc) => (
                        <li key={inc} className="flex items-center gap-2 text-sm">
                          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                    {s.from && (
                      <p className="mt-5 text-sm text-ink/60">
                        {t.from} <span className="headline text-2xl tabular-nums text-ink">{s.from}</span>
                      </p>
                    )}
                    <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                      <a href={whatsappHref(t.quoteMessage(s.title))} target="_blank" rel="noopener noreferrer" className="btn-ink justify-start">
                        <span className="btn-tile">
                          <WhatsAppIcon />
                        </span>
                        {t.cta}
                      </a>
                      <Link href={s.href} className="btn-outline justify-start">
                        <span className="btn-tile">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                        {t.details}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink/10 pt-6">
          <span className="text-sm text-ink/50">{t.extraTitle}</span>
          {t.extra.map((e) => (
            <Link key={e.href} href={e.href} className="group inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[15px] font-medium text-ink transition-colors hover:bg-white">
              {e.title}
              <ArrowUpRight className="h-4 w-4 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
