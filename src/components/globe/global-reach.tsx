import { CLIENT_ARCS as ARCS, CLIENT_COUNTRIES, LIMA } from '@/data/client-countries';
import { WorldGlobe } from './world-globe';

// Encuadre entre Sudamerica y el Atlantico para que entren America y parte de Europa.
const ENCUADRE = { lat: 2, lng: -58 };

const copy = {
  es: {
    title: ['Un equipo en Lima,', { em: 'clientes en cualquier lugar.' }] as const,
    text: 'Trabajamos con negocios de 11 países. Reuniones por videollamada, avances que puedes revisar cuando quieras y el mismo equipo de principio a fin, estés donde estés.',
    label: 'Globo con arcos desde Lima hacia ciudades donde trabajamos',
  },
  en: {
    title: ['A team in Lima,', { em: 'clients anywhere.' }] as const,
    text: 'We work with businesses in 11 countries. Video-call meetings, progress you can check whenever you want, and the same team from start to finish, wherever you are.',
    label: 'Globe with arcs from Lima to cities where we work',
  },
} as const;

/** Alcance desde Lima: panel tinta con el globo y los arcos a ciudades con clientes. */
export function GlobalReach({ lang }: { lang: 'es' | 'en' }) {
  const t = copy[lang];

  return (
    <section data-tone="dark" className="panel-ink">
      <div className="panel-inner grid grid-cols-1 items-center gap-6 py-20 lg:grid-cols-2 lg:py-10">
        <div>
          <h2 className="headline reveal text-[clamp(2.2rem,4.6vw,4rem)]">
            {t.title[0]} <em>{t.title[1].em}</em>
          </h2>
          <p className="reveal mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-muted">{t.text}</p>
          <ul className="reveal mt-8 flex max-w-[52ch] flex-wrap gap-2">
            {CLIENT_COUNTRIES.map((c) => (
              <li key={c.code} className="rounded-[7px] border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm">
                {c[lang]}
              </li>
            ))}
          </ul>
        </div>
        <div role="img" aria-label={t.label} className="relative -mx-5 aspect-square lg:mx-0">
          <WorldGlobe arcs={ARCS} focus={LIMA} view={ENCUADRE} tone="dark" interactive className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
