'use client';

import { WorldGlobe } from '@/components/globe/world-globe';
import { CLIENT_ARCS, LIMA } from '@/data/client-countries';

// Encuadre entre Sudamerica y el Atlantico para que entren America y parte de Europa.
const ENCUADRE = { lat: 2, lng: -58 };

export function HeroGlobe({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="absolute inset-0">
      <WorldGlobe arcs={CLIENT_ARCS} focus={LIMA} view={ENCUADRE} tone="dark" className="absolute inset-0" />
    </div>
  );
}
