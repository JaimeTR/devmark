import { Award, Rocket } from 'lucide-react';
import { ServiceVisual } from './service-visuals';

const chipIcons = [Award, Rocket];

/**
 * Lo que hacemos, a la vista: tres entregables dibujados en codigo (web, chatbot y sistema)
 * apilados como ventanas que flotan, con las dos cifras reales encima.
 */
export function HeroShowcase({ lang, chips }: { lang: 'es' | 'en'; chips: readonly string[] }) {
  return (
    <div className="relative h-full w-full" aria-hidden>
      <div className="absolute right-[2%] top-[4%] w-[62%] rotate-[3deg] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-a_9s_ease-in-out_infinite]">
        <div className="h-[220px] sm:h-[260px] lg:h-[300px]">
          <ServiceVisual id="software" lang={lang} />
        </div>
      </div>
      <div className="absolute left-[0%] top-[22%] w-[60%] -rotate-[4deg] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-b_11s_ease-in-out_infinite]">
        <div className="h-[220px] sm:h-[260px] lg:h-[290px]">
          <ServiceVisual id="web" lang={lang} />
        </div>
      </div>
      <div className="absolute bottom-[3%] right-[8%] w-[52%] rotate-[2deg] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-a_10s_ease-in-out_infinite_-3s]">
        <div className="h-[200px] sm:h-[230px] lg:h-[250px]">
          <ServiceVisual id="chatbot" lang={lang} />
        </div>
      </div>
      {chips.map((chip, i) => {
        const Icon = chipIcons[i];
        return (
          <p key={chip} className={`chip glass-dark absolute z-10 text-white ${i === 0 ? 'left-[2%] top-[4%]' : 'bottom-[30%] left-[4%]'}`}>
            <span className="chip-tile bg-white/10">
              <Icon className="h-4 w-4" />
            </span>
            {chip}
          </p>
        );
      })}
    </div>
  );
}
