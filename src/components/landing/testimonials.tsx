import { Hand } from 'lucide-react';
import { clients, homeContent, type Lang } from '@/content/home';
import { testimonials } from '@/content/home-data';
import { CLIENT_ARCS, CLIENT_COUNTRIES, LIMA } from '@/data/client-countries';
import { WHATSAPP_GREETING, whatsappHref } from '@/lib/contact';
import { WorldGlobe } from '@/components/globe/world-globe';
import { TitleText } from '@/components/site/title-text';
import { WhatsAppIcon } from '@/components/site/whatsapp-icon';

const copy = {
  es: {
    text: 'Desde Lima trabajamos con negocios de Perú, Latinoamérica, Estados Unidos y Europa. Todo el proyecto es en línea, estés donde estés.',
    countries: 'Países con clientes',
    cta: 'Hablemos por WhatsApp',
    proof: 'clientes satisfechos',
    countriesStat: 'países',
    drag: 'Arrastra para girar',
    globe: 'Globo con arcos desde Lima hacia los 11 países donde DEVMARK tiene clientes',
    clientsLabel: 'Algunos de nuestros clientes',
  },
  en: {
    text: 'From Lima we work with businesses in Peru, Latin America, the United States and Europe. The whole project runs online, wherever you are.',
    countries: 'Countries with clients',
    cta: "Let's talk on WhatsApp",
    proof: 'happy clients',
    countriesStat: 'countries',
    drag: 'Drag to spin',
    globe: 'Globe with arcs from Lima to the 11 countries where DEVMARK has clients',
    clientsLabel: 'Some of our clients',
  },
} as const;

// Vista inicial: America completa con Europa asomando al este.
const VISTA = { lat: 8, lng: -60 };

/**
 * Clientes: texto y cifras a un lado, el mundo (quieto, se gira arrastrando) al otro con los
 * paises como ficha flotante, y debajo los clientes desfilando. Si hay testimonios aprobados,
 * van al final.
 */
export function Testimonials({ lang }: { lang: Lang }) {
  const t = homeContent[lang].testimonials;
  const c = copy[lang];
  const items = testimonials[lang];
  const loop = [...clients, ...clients];

  return (
    <section id="clientes" className="panel-paper py-20 sm:py-24">
      <div className="panel-inner grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <div>
          <h2 className="headline reveal max-w-[16ch] text-[clamp(2.1rem,4.2vw,3.5rem)]">
            <TitleText parts={t.title} />
          </h2>
          <p className="reveal mt-5 max-w-[44ch] text-[17px] leading-relaxed text-ink/70">{c.text}</p>
          <dl className="reveal mt-8 flex gap-10">
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-ink/60">{c.proof}</dt>
              <dd className="headline text-[2.75rem] leading-none tabular-nums">100+</dd>
            </div>
            <div className="flex flex-col-reverse gap-1">
              <dt className="text-sm text-ink/60">{c.countriesStat}</dt>
              <dd className="headline text-[2.75rem] leading-none tabular-nums">{CLIENT_COUNTRIES.length}</dd>
            </div>
          </dl>
          <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm reveal mt-8">
            <span className="btn-tile">
              <WhatsAppIcon className="h-4 w-4" />
            </span>
            {c.cta}
          </a>
        </div>

        <div data-tone="dark" className="relative overflow-hidden rounded-2xl bg-ink">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[90px]" />
          <div role="img" aria-label={c.globe} className="relative aspect-square max-h-[440px] w-full sm:aspect-[4/3]">
            <WorldGlobe arcs={CLIENT_ARCS} focus={LIMA} view={VISTA} tone="dark" interactive autoRotate={false} className="absolute inset-0 sm:left-[16%] sm:-right-[6%]" />
          </div>
          <p className="chip glass-dark pointer-events-none absolute right-3 top-3 py-1 pl-1 pr-3 text-xs text-white">
            <span className="chip-tile h-6 w-6 bg-white/10">
              <Hand className="h-3.5 w-3.5" />
            </span>
            {c.drag}
          </p>
          <div className="glass-dark relative m-3 rounded-xl p-3.5 text-white sm:absolute sm:bottom-0 sm:left-0 sm:max-w-[360px]">
            <p className="text-xs text-ink-muted">{c.countries}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {CLIENT_COUNTRIES.map((k) => (
                <li key={k.code} className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs">
                  <span aria-hidden className="h-1 w-1 rounded-full bg-periwinkle" />
                  {k[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="panel-inner text-sm text-ink/60">{c.clientsLabel}</p>
        <div className="marquee mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" style={{ ['--marquee-speed' as string]: '110s' }}>
          <ul className="marquee-track items-center">
            {loop.map((name, i) => (
              <li
                key={i}
                aria-hidden={i >= clients.length}
                className="mx-1.5 grid h-20 shrink-0 place-items-center rounded-2xl bg-mist px-8 font-logo text-xl tracking-wider text-ink/55 transition-colors duration-300 hover:bg-band hover:text-ink sm:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {items.length > 0 && (
        <div className="panel-inner mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <figure key={`${it.service}-${it.name}`} className="reveal lift flex flex-col rounded-2xl bg-mist p-6">
              <span className="self-start rounded-md bg-white px-2.5 py-1 text-xs text-ink/60">{it.service}</span>
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
          ))}
        </div>
      )}
    </section>
  );
}
