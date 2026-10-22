import { Globe2 } from 'lucide-react';
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
    eyebrow: 'Desde Lima',
    title: 'Un equipo en Lima, clientes en cualquier lugar',
    text: 'Trabajamos con negocios de todo el Perú y de fuera del país. Reuniones por videollamada, avances que puedes revisar cuando quieras y el mismo equipo de principio a fin, estés donde estés.',
    stats: [
      { value: '100+', label: 'clientes satisfechos' },
      { value: '6', label: 'marcas colaboradoras' },
    ],
  },
  en: {
    eyebrow: 'From Lima',
    title: 'A team in Lima, clients anywhere',
    text: 'We work with businesses across Peru and abroad. Video-call meetings, progress you can check whenever you want, and the same team from start to finish, wherever you are.',
    stats: [
      { value: '100+', label: 'happy clients' },
      { value: '6', label: 'partner brands' },
    ],
  },
} as const;

export function GlobalReach({ lang }: { lang: 'es' | 'en' }) {
  const t = copy[lang];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 bg-brand-light rounded-3xl border border-slate-100 p-8 md:p-12 overflow-hidden">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand-blue">
              <Globe2 className="w-4 h-4" />
              {t.eyebrow}
            </span>
            <h2 className="mt-4 font-semibold text-3xl sm:text-4xl text-brand-navy">{t.title}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{t.text}</p>
            <dl className="mt-8 grid grid-cols-2 gap-6 max-w-sm">
              {t.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-semibold text-3xl text-brand-navy">{stat.value}</dd>
                  <dd className="mt-1 text-sm text-slate-600">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <WorldGlobe arcs={ARCS} focus={LIMA} view={ENCUADRE} className="relative aspect-square w-full max-w-[520px] mx-auto" />
        </div>
      </div>
    </section>
  );
}
