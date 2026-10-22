'use client';

import { WorldGlobe, type GlobeArc } from '@/components/globe/world-globe';

const LIMA = { lat: -12.0464, lng: -77.0428 };
const ENCUADRE = { lat: 0, lng: -66 };

// Ciudades a las que sale un arco desde Lima (mismas que en Nosotros).
const DESTINOS = [
  { lat: -16.409, lng: -71.5375, alt: 0.08 },
  { lat: -8.1116, lng: -79.0288, alt: 0.06 },
  { lat: -13.5319, lng: -71.9675, alt: 0.07 },
  { lat: -5.1945, lng: -80.6328, alt: 0.08 },
  { lat: -33.4489, lng: -70.6693, alt: 0.2 },
  { lat: 4.711, lng: -74.0721, alt: 0.15 },
  { lat: 19.4326, lng: -99.1332, alt: 0.3 },
  { lat: 25.7617, lng: -80.1918, alt: 0.35 },
  { lat: 40.4168, lng: -3.7038, alt: 0.32 },
];

const ARCS: GlobeArc[] = DESTINOS.map(({ lat, lng, alt }) => ({ startLat: LIMA.lat, startLng: LIMA.lng, endLat: lat, endLng: lng, alt }));

export function HeroGlobe({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="absolute inset-0">
      <WorldGlobe arcs={ARCS} focus={LIMA} view={ENCUADRE} tone="dark" className="absolute inset-0" />
    </div>
  );
}
