import { ArrowDownRight, Award, Rocket } from 'lucide-react';
import { homeContent, clients, type Lang } from '@/content/home';
import { whatsappHref } from '@/lib/contact';
import { Btn } from '@/components/site/btn';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';
import { HeroGlobe } from './hero-globe';

const chipIcons = [Award, Rocket];

/** Primer pantallazo: panel tinta con el titular, la prueba social y el globo con arcos desde Lima. */
export function Hero({ lang }: { lang: Lang }) {
  const t = homeContent[lang].hero;
  const initials = clients.slice(0, 5).map((c) => c.split(' ').map((w) => w[0]).join('').slice(0, 2));

  return (
    <section id="hero" data-tone="dark" className="panel-ink mt-2 sm:mt-3">
      {/* Luz suave detras del globo */}
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/4 h-[640px] w-[640px] rounded-full bg-primary/40 blur-[140px]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_55%)]" />

      <div className="panel-inner relative grid min-h-[min(100svh,980px)] grid-cols-1 items-center gap-6 pb-12 pt-28 lg:grid-cols-[1.15fr_1fr] lg:pb-16 lg:pt-32">
        <div className="hero-in relative z-10 flex flex-col">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {initials.map((ini, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-ink bg-band text-[11px] font-semibold tracking-wide text-ink"
                  style={{ backgroundColor: ['#CBD5FA', '#A9B4FF', '#E1E5F8', '#B8C2F8', '#DDE2FB'][i] }}
                >
                  {ini}
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

        <div className="relative -mx-5 h-[380px] sm:h-[480px] lg:mx-0 lg:h-[640px]">
          <HeroGlobe label={t.globeLabel} />
          <ul className="pointer-events-none absolute inset-0">
            {t.chips.map((chip, i) => {
              const Icon = chipIcons[i];
              return (
                <li
                  key={chip}
                  className={`chip glass-dark absolute text-white ${i === 0 ? 'left-4 top-[14%] sm:left-6' : 'bottom-[16%] right-4 sm:right-6'}`}
                >
                  <span className="chip-tile bg-white/10">
                    <Icon className="h-4 w-4" />
                  </span>
                  {chip}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
