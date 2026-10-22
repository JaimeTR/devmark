import { homeContent, clients, type Lang } from '@/content/home';
import { RevealWords } from '@/components/site/reveal-words';

/** Declaracion del estudio (se revela palabra por palabra), cifras reales y clientes. */
export function Intro({ lang }: { lang: Lang }) {
  const t = homeContent[lang].intro;
  const loop = [...clients, ...clients];
  return (
    <section className="panel-paper py-24 sm:py-32">
      <div className="panel-inner">
        <RevealWords parts={t.title} className="headline max-w-[22ch] text-[clamp(2.1rem,4.8vw,4.25rem)]" />
        <div className="reveal mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink/70">{t.text}</p>
          <dl className="grid grid-cols-3 gap-4 sm:gap-8">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm leading-snug text-ink/60">{s.label}</dt>
                <dd className="headline text-[clamp(2.25rem,5vw,4rem)] tabular-nums text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-20">
        <p className="panel-inner text-sm text-ink/60">{t.clientsLabel}</p>
        <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" style={{ ['--marquee-speed' as string]: '50s' }}>
          <ul className="marquee-track items-center">
            {loop.map((c, i) => (
              <li key={i} aria-hidden={i >= clients.length} className="shrink-0 px-8 font-logo text-2xl tracking-wider text-ink/35 transition-colors hover:text-ink sm:px-12 sm:text-3xl">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
