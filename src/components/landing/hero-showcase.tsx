import { Live } from '@/components/site/live';
import { ServiceVisual } from './service-visuals';

/**
 * Lo que hacemos, a la vista: tres entregables dibujados en codigo (web, chatbot y sistema)
 * apilados como ventanas que flotan y se arman en bucle.
 */
export function HeroShowcase({ lang }: { lang: 'es' | 'en' }) {
  return (
    <Live className="relative h-full w-full">
      <div aria-hidden className="contents">
      <div className="absolute right-0 top-0 w-[80%] rotate-[3deg] sm:right-[2%] sm:top-[4%] sm:w-[62%] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-a_9s_ease-in-out_infinite]">
        <div className="h-[190px] sm:h-[260px] lg:h-[300px]">
          <ServiceVisual id="software" lang={lang} />
        </div>
      </div>
      <div style={{ '--lv-offset': '-3s' } as React.CSSProperties} className="absolute left-0 top-[24%] w-[76%] -rotate-[4deg] sm:top-[22%] sm:w-[60%] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-b_11s_ease-in-out_infinite]">
        <div className="h-[190px] sm:h-[260px] lg:h-[290px]">
          <ServiceVisual id="web" lang={lang} />
        </div>
      </div>
      <div style={{ '--lv-offset': '-6s' } as React.CSSProperties} className="absolute bottom-0 right-0 w-[84%] rotate-[2deg] sm:bottom-[3%] sm:right-[8%] sm:w-[52%] lg:w-[56%] xl:w-[52%] rounded-2xl border border-white/10 bg-ink-soft/80 p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-md motion-safe:animate-[float-a_10s_ease-in-out_infinite_-3s]">
        <div className="h-[250px] sm:h-[230px] lg:h-[250px]">
          <ServiceVisual id="chatbot" lang={lang} />
        </div>
      </div>
      </div>
    </Live>
  );
}
