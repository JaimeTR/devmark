import { homeContent, type Lang } from '@/content/home';
import { testimonials } from '@/content/home-data';
import { WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

/** Testimonios en columnas; las iniciales reemplazan a las fotos de stock. */
export function Testimonials({ lang }: { lang: Lang }) {
  const t = homeContent[lang].testimonials;
  const items = testimonials[lang];
  const cta = lang === 'en' ? "Let's talk on WhatsApp" : 'Hablemos por WhatsApp';

  return (
    <section className="panel-paper py-20 sm:py-28">
      <div className="panel-inner">
        <h2 className="headline reveal max-w-[18ch] text-[clamp(2.1rem,4.6vw,4rem)]">
          <TitleText parts={t.title} />
        </h2>
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <div className="reveal mb-4 break-inside-avoid rounded-2xl bg-ink p-7 text-white">
            <p className="headline text-[3.5rem] leading-none">100+</p>
            <p className="mt-2 text-ink-muted">{t.proof}</p>
            <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm mt-7">
              <span className="btn-tile">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              {cta}
            </a>
          </div>
          {items.map((it) => (
            <figure key={it.name} className="reveal mb-4 break-inside-avoid rounded-2xl bg-mist p-6">
              <blockquote className="text-[15px] leading-relaxed text-ink/80">“{it.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-xs font-semibold text-white">{it.avatar}</span>
                <span>
                  <span className="block text-sm font-semibold">{it.name}</span>
                  <span className="block text-sm text-ink/55">{it.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
