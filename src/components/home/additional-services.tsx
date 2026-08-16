'use client';

import { DraftingCompass, Megaphone, Wrench, Lightbulb, Calculator } from 'lucide-react';
import Link from "next/link";
import { getStartingPrice, getQuoteHrefForService } from '@/data/services';

interface Service {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface AdditionalServicesProps {
  title: string;
  subtitle: string;
  items: readonly Service[];
  // No se usa (cada card ya tiene sus propias acciones); queda opcional
  // solo para no romper a quien todavía lo pase.
  moreInfoButton?: string;
  lang?: 'es' | 'en';
  detailsButton?: string;
  quoteButton?: string;
  fromLabel?: string;
}

const icons: Record<string, React.ReactNode> = {
  DraftingCompass: <DraftingCompass className="h-5 w-5" />,
  Megaphone: <Megaphone className="h-5 w-5" />,
  Wrench: <Wrench className="h-5 w-5" />,
  Lightbulb: <Lightbulb className="h-5 w-5" />,
};

export function AdditionalServices({
  title,
  subtitle,
  items,
  lang = 'es',
  detailsButton = 'Ver detalles',
  quoteButton = 'Cotizar',
  fromLabel = 'Desde',
}: AdditionalServicesProps) {
  return (
    <section id="additional-services" className="py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy animate-fade-in-up">{title}</h2>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed animate-fade-in-up stagger-1">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((service, index) => {
          const price = getStartingPrice(service.href);
          const quoteHref = getQuoteHrefForService(service.href, lang);

          return (
            <div
              key={index}
              className="group bg-brand-light hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[385px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />

              <Link href={service.href ?? '#'} className="space-y-5 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  {icons[service.icon as keyof typeof icons]}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-xl text-brand-navy group-hover:text-brand-blue transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </Link>

              <div className="relative z-10 border-t border-slate-200/50 pt-5 space-y-4">
                {price && (
                  <div className="flex items-center justify-between gap-2 bg-white/70 rounded-xl px-3.5 py-2.5">
                    <span className="text-xs font-semibold text-slate-500">{fromLabel}</span>
                    <span className="font-bold text-brand-navy">{price}</span>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <Link
                    href={service.href ?? '#'}
                    className="inline-flex items-center justify-center h-11 px-3 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent font-semibold text-xs sm:text-sm transition-all duration-300"
                  >
                    {detailsButton}
                  </Link>
                  <Link
                    href={quoteHref}
                    className="inline-flex items-center justify-center gap-1.5 h-11 px-3 rounded-2xl bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {quoteButton}
                    <Calculator className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
