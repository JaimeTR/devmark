'use client';

import { useState } from 'react';

interface Step {
  title: string;
  description: string;
}

interface ServiceMethodologyProps {
  badge?: string;
  title: string;
  subtitle?: string;
  steps: readonly Step[];
}

export function ServiceMethodology({ badge, title, subtitle, steps }: ServiceMethodologyProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="methodology" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          {badge && (
            <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">{badge}</span>
          )}
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy mt-4 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">{subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                aria-label={`${i + 1}. ${step.title}`}
                className={`relative flex flex-col p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-default focus:outline-none ${
                  isActive
                    ? 'bg-brand-blue border-brand-blue shadow-lg shadow-brand-blue/20 -translate-y-1'
                    : 'bg-white border-brand-lavender/60 hover:border-brand-blue/50'
                } ${isActive ? 'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' : 'focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full font-extrabold text-xl sm:text-2xl mb-4 sm:mb-5 shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-brand-blue shadow-md'
                      : 'bg-brand-lavender/60 text-brand-navy'
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className={`font-semibold text-lg sm:text-xl mb-3 transition-colors duration-300 leading-snug ${isActive ? 'text-white' : 'text-brand-navy'}`}>
                  {step.title}
                </h3>
                <p className={`text-sm sm:text-[15px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-slate-600'}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}