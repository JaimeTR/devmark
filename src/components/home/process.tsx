'use client';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessProps {
  badge: string;
  title: string;
  subtitle: string;
  steps: readonly Step[];
}

export function Process({ badge, title, subtitle, steps }: ProcessProps) {
  return (
    <section id="process" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold tracking-widest text-brand-blue uppercase">{badge}</span>
          <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-brand-navy mt-4 mb-4">
            {title}
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.slice(0, 4).map((step, i) => (
            <div key={i} className="group bg-brand-light hover:bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4">
              <span className="text-xs font-extrabold text-brand-blue/60 tracking-widest">{step.number}</span>
              <h3 className="font-semibold text-base text-brand-navy group-hover:text-brand-blue transition-colors">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {steps.slice(4).map((step, i) => (
            <div key={i + 4} className="group bg-brand-light hover:bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-4">
              <span className="text-xs font-extrabold text-brand-blue/60 tracking-widest">{step.number}</span>
              <h3 className="font-semibold text-base text-brand-navy group-hover:text-brand-blue transition-colors">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
