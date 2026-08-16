import type { CSSProperties } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface ClientLogosProps {
  stats: readonly Stat[];
  clients: readonly string[];
}

// Same accent rotation the service grid uses, so this section reads as one system, not a second palette.
const accentVars = ['--primary', '--chart-4', '--chart-2', '--chart-5', '--chart-6', '--chart-3'];

export function ClientLogos({ stats, clients }: ClientLogosProps) {
  // Duplicated so the marquee loop is seamless (translateX(-50%) lands exactly on the copy).
  const loop = [...clients, ...clients];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Soft color glows, echoing the hero's illustration backdrop */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-brand-blue/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-brand-lavender/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="rounded-3xl bg-white border border-slate-100 shadow-xl shadow-brand-blue/10 flex flex-col md:flex-row items-center gap-8 md:gap-12 p-8 md:p-10">
          {/* Stats, moved down from the hero */}
          <div className="flex items-center gap-5 sm:gap-10 shrink-0">
            {stats.map((stat, i) => (
              <div key={i} className={`text-center w-20 sm:w-auto ${i > 0 ? 'pl-5 sm:pl-10 border-l border-primary/15' : ''}`}>
                <h3 className="font-semibold text-3xl sm:text-4xl text-brand-navy leading-none tabular-nums">
                  {stat.value}
                </h3>
                <p className="text-[9px] sm:text-xs text-slate-500 uppercase tracking-wide font-normal mt-1.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Sliding client wordmarks */}
          <div className="marquee-pause relative w-full overflow-hidden md:border-l md:border-primary/15 md:pl-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent z-10" />
            <div className="flex w-max animate-marquee">
              {loop.map((client, i) => {
                const accentVar = accentVars[i % accentVars.length];
                return (
                  <span
                    key={i}
                    style={{ '--accent': `var(${accentVar})` } as CSSProperties}
                    className="shrink-0 px-8 font-logo text-lg sm:text-xl tracking-wider text-brand-navy/60 border-b-2 border-transparent hover:border-[hsl(var(--accent))] hover:text-brand-navy transition-all duration-300 whitespace-nowrap"
                  >
                    {client}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
