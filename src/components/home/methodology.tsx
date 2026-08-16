'use client';

import { useState } from 'react';

interface Phase {
  number: string;
  title: string;
  description: string;
  color?: string;
}

interface MethodologyProps {
  badge?: string;
  title: string;
  subtitle?: string;
  phases: readonly Phase[];
}

export function Methodology({ badge, title, subtitle, phases }: MethodologyProps) {
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-lavender/60 md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {phases.map((phase, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activePhase === i;

              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${isLeft ? '' : 'md:flex-row-reverse'}`}
                  onMouseEnter={() => setActivePhase(i)}
                  onMouseLeave={() => setActivePhase(null)}
                >
                  <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                    <div className="hidden md:block mb-1">
                      <span className="text-xs font-extrabold text-brand-blue/50 tracking-widest">{phase.number}</span>
                    </div>
                    <h3 className={`font-semibold text-lg text-brand-navy mb-2 transition-colors duration-300 ${isActive ? 'text-brand-blue' : ''}`}>
                      {phase.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm border-2 transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-blue border-brand-blue text-white scale-110 shadow-lg shadow-brand-blue/30'
                        : 'bg-white border-brand-lavender text-brand-navy'
                    }`}>
                      {i + 1}
                    </div>
                  </div>

                  <div className="flex-1 md:w-1/2 pl-12 md:pl-0 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
