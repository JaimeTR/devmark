import { homeContent, type Lang } from '@/content/home';
import { RevealWords } from '@/components/site/reveal-words';
import { Cifras } from '@/components/site/cifras';

/** Declaracion del estudio (se revela palabra por palabra) y cifras reales. Los clientes van en Testimonials. */
export function Intro({ lang }: { lang: Lang }) {
  const t = homeContent[lang].intro;
  return (
    <section className="panel-paper py-24 sm:py-32">
      <div className="panel-inner">
        <RevealWords parts={t.title} className="headline max-w-[22ch] text-[clamp(2.1rem,4.8vw,4.25rem)]" />
        <div className="reveal mt-12 grid items-start gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:pt-14">
          <p className="max-w-[46ch] text-lg leading-relaxed text-ink/70 lg:pt-2">{t.text}</p>
          <Cifras stats={t.stats} />
        </div>
      </div>

    </section>
  );
}
