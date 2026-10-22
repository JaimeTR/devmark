import { WorldGlobe, type GlobeArc } from './world-globe';

const LIMA = { lat: -12.0464, lng: -77.0428 };
// Encuadre entre Lima, Mexico y Madrid para que se vean todos los arcos.
const ENCUADRE = { lat: 2, lng: -62 };

// Ciudades a las que sale un arco desde Lima. Ajustar a donde de verdad hay clientes.
const DESTINOS = [
  { lat: -16.409, lng: -71.5375, alt: 0.08 }, // Arequipa
  { lat: -8.1116, lng: -79.0288, alt: 0.06 }, // Trujillo
  { lat: -13.5319, lng: -71.9675, alt: 0.07 }, // Cusco
  { lat: -5.1945, lng: -80.6328, alt: 0.08 }, // Piura
  { lat: -33.4489, lng: -70.6693, alt: 0.2 }, // Santiago
  { lat: 4.711, lng: -74.0721, alt: 0.15 }, // Bogota
  { lat: 19.4326, lng: -99.1332, alt: 0.3 }, // Ciudad de Mexico
  { lat: 25.7617, lng: -80.1918, alt: 0.35 }, // Miami
  { lat: 40.4168, lng: -3.7038, alt: 0.32 }, // Madrid
];

const ARCS: GlobeArc[] = DESTINOS.map(({ lat, lng, alt }) => ({
  startLat: LIMA.lat,
  startLng: LIMA.lng,
  endLat: lat,
  endLng: lng,
  alt,
}));

const copy = {
  es: {
    title: ['Un equipo en Lima,', { em: 'clientes en cualquier lugar.' }] as const,
    text: 'Trabajamos con negocios de todo el Perú y de fuera del país. Reuniones por videollamada, avances que puedes revisar cuando quieras y el mismo equipo de principio a fin, estés donde estés.',
    label: 'Globo con arcos desde Lima hacia ciudades donde trabajamos',
  },
  en: {
    title: ['A team in Lima,', { em: 'clients anywhere.' }] as const,
    text: 'We work with businesses across Peru and abroad. Video-call meetings, progress you can check whenever you want, and the same team from start to finish, wherever you are.',
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
        </div>
        <div role="img" aria-label={t.label} className="relative -mx-5 aspect-square lg:mx-0">
          <WorldGlobe arcs={ARCS} focus={LIMA} view={ENCUADRE} tone="dark" className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}
