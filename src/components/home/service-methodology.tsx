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

/** Metodologia del servicio: pasos numerados en fila, sobre niebla. */
export function ServiceMethodology({ title, subtitle, steps }: ServiceMethodologyProps) {
  return (
    <section id="methodology" className="panel-mist py-20 sm:py-28">
      <div className="panel-inner">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="headline reveal text-[clamp(2rem,4.2vw,3.5rem)]">{title}</h2>
          {subtitle && <p className="reveal max-w-[46ch] text-[17px] leading-relaxed text-ink/70">{subtitle}</p>}
        </div>
        <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="reveal group flex flex-col rounded-2xl bg-white p-6 transition-colors duration-500 hover:bg-ink hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-mist text-sm font-semibold tabular-nums text-ink transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="headline mt-8 text-2xl">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-ink-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
