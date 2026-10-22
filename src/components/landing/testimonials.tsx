import { clients, homeContent, type Lang } from '@/content/home';
import { testimonials } from '@/content/home-data';
import { CLIENT_COUNTRIES } from '@/data/client-countries';
import { WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

const copy = {
  es: { countries: 'Países con clientes', cta: 'Hablemos por WhatsApp', proof: 'clientes satisfechos' },
  en: { countries: 'Countries with clients', cta: "Let's talk on WhatsApp", proof: 'happy clients' },
} as const;

/**
 * Prueba social. Con testimonios reales cargados, los agrupa por servicio; sin ellos muestra
 * los clientes y los paises reales (nunca citas de ejemplo).
 */
export function Testimonials({ lang }: { lang: Lang }) {
  const t = homeContent[lang].testimonials;
  const c = copy[lang];
  const items = testimonials[lang];
  const byService = items.reduce<Record<string, typeof items>>((acc, it) => {
    (acc[it.service] ??= []).push(it);
    return acc;
  }, {});

  return (
    <section className="panel-paper py-20 sm:py-28">
      <div className="panel-inner">
        <h2 className="headline reveal max-w-[18ch] text-[clamp(2.1rem,4.6vw,4rem)]">
          <TitleText parts={t.title} />
        </h2>

        <div className="mt-12 grid gap-3 lg:grid-cols-[1fr_2fr]">
          <div data-tone="dark" className="reveal flex flex-col rounded-2xl bg-ink p-7 text-white">
            <p className="headline text-[3.5rem] leading-none">100+</p>
            <p className="mt-2 text-ink-muted">{c.proof}</p>
            <p className="mt-8 text-sm text-ink-muted">{c.countries}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {CLIENT_COUNTRIES.map((k) => (
                <li key={k.code} className="rounded-md bg-white/10 px-2.5 py-1 text-xs">
                  {k[lang]}
                </li>
              ))}
            </ul>
            <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-light btn-sm mt-8 self-start">
              <span className="btn-tile">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              {c.cta}
            </a>
          </div>

          {items.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(byService).map(([service, list]) =>
                list.map((it) => (
                  <figure key={`${service}-${it.name}`} className="reveal flex flex-col rounded-2xl bg-mist p-6">
                    <span className="self-start rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">{service}</span>
                    <blockquote className="mt-4 text-[15px] leading-relaxed text-ink/80">“{it.quote}”</blockquote>
                    <figcaption className="mt-auto flex items-center gap-3 pt-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink text-xs font-semibold text-white">
                        {it.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold">{it.name}</span>
                        <span className="block text-sm text-ink/55">
                          {it.role}, {it.company} · {it.country}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                )),
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {clients.map((name) => (
                <li key={name} className="reveal grid min-h-24 place-items-center rounded-2xl bg-mist px-4 py-6 text-center font-logo text-lg tracking-wider text-ink/70 sm:text-xl">
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
