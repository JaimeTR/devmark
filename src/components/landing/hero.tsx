import { ArrowDownRight } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { CLIENT_AVATARS } from '@/data/client-logos';
import { whatsappHref } from '@/lib/contact';
import { Btn } from '@/components/site/btn';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { HeroShowcase } from './hero-showcase';

/** Primer pantallazo: panel tinta con el titular, la prueba social y los entregables flotando. */
export function Hero({ lang }: { lang: Lang }) {
  const t = homeContent[lang].hero;

  return (
    <section id="hero" data-tone="dark" className="panel-ink mt-2 sm:mt-3">
      {/* Luz suave detras del globo */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 h-[640px] w-[640px] rounded-full bg-primary/40 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="panel-inner relative grid min-h-[min(100svh,980px)] grid-cols-1 items-center gap-6 pb-12 pt-28 lg:grid-cols-[1.15fr_1fr] lg:pb-16 lg:pt-32">
        <div className="hero-in relative z-10 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {CLIENT_AVATARS.map((c) => (
                <span key={c.nombre} title={c.nombre} className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-white p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- avatar de 40 px ya optimizado */}
                  <img src={c.src} alt={c.nombre} width={28} height={28} className="h-full w-full object-contain" />
                </span>
              ))}
            </div>
            <p className="text-sm font-medium text-ink-muted">{t.proof}</p>
          </div>

          <h1 className="display mt-7 text-[clamp(2.9rem,7.4vw,6rem)]">
            <TitleText parts={t.title} />
          </h1>

          <p className="mt-7 max-w-[54ch] text-[17px] leading-relaxed text-ink-muted">{t.description}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Btn href={whatsappHref(t.whatsappMessage)} icon={<WhatsAppIcon />} variant="light">
              {t.whatsapp}
            </Btn>
            <Btn href={t.secondaryHref} icon={<ArrowDownRight className="h-5 w-5" />} variant="glass">
              {t.secondary}
            </Btn>
          </div>
        </div>

        <div className="relative h-[540px] sm:h-[540px] lg:h-[640px]">
          <HeroShowcase lang={lang} />
        </div>
      </div>
    </section>
  );
}
