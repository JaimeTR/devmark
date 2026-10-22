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
    countries: 'Países con clientes',
    cta: 'Hablemos por WhatsApp',
    proof: 'clientes satisfechos',
    countriesStat: 'países',
    drag: 'Arrastra para girar el mundo',
    globe: 'Globo con arcos desde Lima hacia los 11 países donde DEVMARK tiene clientes',
    clientsLabel: 'Algunos de nuestros clientes',
  },
  en: {
    countries: 'Countries with clients',
    cta: "Let's talk on WhatsApp",
    proof: 'happy clients',
    countriesStat: 'countries',
    drag: 'Drag to spin the world',
    globe: 'Globe with arcs from Lima to the 11 countries where DEVMARK has clients',
    clientsLabel: 'Some of our clients',
  },
} as const;

// Vista inicial: America completa con Europa asomando al este.
const VISTA = { lat: 8, lng: -60 };

/**
 * Clientes: el mundo completo (se puede girar) con arcos desde Lima a los 11 paises,
 * las cifras, los clientes reales y, cuando existan, los testimonios aprobados por servicio.
 */
export function Testimonials({ lang }: { lang: Lang }) {
  const t = homeContent[lang].testimonials;
  const c = copy[lang];
  const items = testimonials[lang];

  return (
    <section id="clientes" className="panel-paper py-20 sm:py-28">
      <div className="panel-inner">
        <h2 className="headline reveal max-w-[18ch] text-[clamp(2.1rem,4.6vw,4rem)]">
          <TitleText parts={t.title} />
        </h2>

        <div className="mt-12 grid gap-3 lg:grid-cols-[1.35fr_1fr]">
          <div data-tone="dark" className="relative aspect-square overflow-hidden rounded-2xl bg-ink sm:aspect-[4/3] lg:aspect-auto lg:min-h-[600px]">
            <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[90px]" />
            <div role="img" aria-label={c.globe} className="absolute inset-0">
              <WorldGlobe arcs={CLIENT_ARCS} focus={LIMA} view={VISTA} tone="dark" interactive className="absolute inset-0" />
            </div>
            <p className="chip glass-dark pointer-events-none absolute bottom-4 left-4 py-1.5 text-xs text-white">
              <span className="chip-tile h-6 w-6 bg-white/10">
                <Hand className="h-3.5 w-3.5" />
              </span>
              {c.drag}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="reveal grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-mist p-6">
                <p className="headline text-[3.25rem] leading-none tabular-nums">100+</p>
                <p className="mt-2 text-sm text-ink/60">{c.proof}</p>
              </div>
              <div className="rounded-2xl bg-mist p-6">
                <p className="headline text-[3.25rem] leading-none tabular-nums">{CLIENT_COUNTRIES.length}</p>
                <p className="mt-2 text-sm text-ink/60">{c.countriesStat}</p>
              </div>
            </div>
            <div className="reveal flex flex-1 flex-col rounded-2xl bg-mist p-6">
              <p className="text-sm text-ink/60">{c.countries}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CLIENT_COUNTRIES.map((k) => (
                  <li key={k.code} className="tag flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[15px]">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {k[lang]}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a href={whatsappHref(WHATSAPP_GREETING[lang])} target="_blank" rel="noopener noreferrer" className="btn-ink btn-sm">
                  <span className="btn-tile">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  {c.cta}
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-sm text-ink/60">{c.clientsLabel}</p>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((name) => (
            <li key={name} className="reveal lift grid min-h-20 place-items-center rounded-2xl bg-mist px-3 py-5 text-center font-logo text-base tracking-wider text-ink/70 hover:bg-white hover:text-ink sm:text-lg">
              {name}
            </li>
          ))}
        </ul>

        {items.length > 0 && (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}
