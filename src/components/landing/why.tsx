import { BadgeCheck, Code2, FileText, LifeBuoy, MailCheck, MessagesSquare } from 'lucide-react';
import { homeContent, type Lang } from '@/content/home';
import { TitleText } from '@/components/site/title-text';

const icons = [MessagesSquare, BadgeCheck, FileText, Code2, LifeBuoy, MailCheck];
// Posiciones de las fichas alrededor del titular (escritorio). En el celular van en lista.
const spots = [
  'lg:left-[6%] lg:top-[16%]',
  'lg:right-[8%] lg:top-[12%]',
  'lg:left-[2%] lg:top-[52%]',
  'lg:right-[3%] lg:top-[48%]',
  'lg:left-[14%] lg:bottom-[12%]',
  'lg:right-[14%] lg:bottom-[10%]',
];

/** Por que DEVMARK: titular al centro de anillos y fichas de vidrio que llegan al hacer scroll. */
export function Why({ lang }: { lang: Lang }) {
  const t = homeContent[lang].why;
  return (
    <section data-tone="dark" className="panel-ink py-24 sm:py-32 lg:py-0">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2">
        {[1, 0.78, 0.56, 0.34].map((scale, i) => (
          <span
            key={scale}
            className="absolute inset-0 rounded-full border border-white/[0.07]"
            style={{ transform: `scale(${scale})`, borderStyle: i % 2 ? 'dashed' : 'solid' }}
          />
        ))}
        <span className="absolute inset-[30%] rounded-full bg-primary/30 blur-[90px]" />
      </div>

      <div className="panel-inner relative lg:h-[760px]">
        <div className="relative z-10 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
          <h2 className="headline reveal mx-auto max-w-[14ch] text-center text-[clamp(2.4rem,5.4vw,4.75rem)]">
            <TitleText parts={t.title} />
          </h2>
        </div>
        <ul className="relative mt-12 flex flex-col items-center gap-3 lg:static lg:mt-0">
          {t.chips.map((chip, i) => {
            const Icon = icons[i];
            return (
              <li key={chip} className={`reveal lift group chip glass-dark text-[15px] text-white lg:absolute ${spots[i]}`}>
                <span className="chip-tile bg-white/10 text-periwinkle">
                  <Icon className="icon-tilt h-4 w-4" />
                </span>
                {chip}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
