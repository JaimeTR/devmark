import { homeContent, type Lang } from '@/content/home';
import { RevealWords } from '@/components/site/reveal-words';

/** Declaracion del estudio (se revela palabra por palabra) y cifras reales. Los clientes van en Testimonials. */
export function Intro({ lang }: { lang: Lang }) {
  const t = homeContent[lang].intro;
  return (
    <section className="panel-paper py-24 sm:py-32">
      <div className="panel-inner">
        <RevealWords parts={t.title} className="headline max-w-[22ch] text-[clamp(2.1rem,4.8vw,4.25rem)]" />
        <div className="reveal mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink/70">{t.text}</p>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm leading-snug text-ink/60">{s.label}</dt>
                <dd className="headline text-[clamp(2.25rem,5vw,4rem)] tabular-nums text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
}
