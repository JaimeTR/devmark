// Paises donde DEVMARK tiene clientes (confirmado por Jaime, 22 oct 2026). Una ciudad
// representativa por pais para dibujar los arcos del globo desde Lima.

export const LIMA = { lat: -12.0464, lng: -77.0428 };

export const CLIENT_COUNTRIES = [
  { es: 'Perú', en: 'Peru', code: 'PE', lat: -12.0464, lng: -77.0428 },
  { es: 'Ecuador', en: 'Ecuador', code: 'EC', lat: -0.1807, lng: -78.4678 },
  { es: 'Bolivia', en: 'Bolivia', code: 'BO', lat: -16.4897, lng: -68.1193 },
  { es: 'Chile', en: 'Chile', code: 'CL', lat: -33.4489, lng: -70.6693 },
  { es: 'Argentina', en: 'Argentina', code: 'AR', lat: -34.6037, lng: -58.3816 },
  { es: 'Colombia', en: 'Colombia', code: 'CO', lat: 4.711, lng: -74.0721 },
  { es: 'Venezuela', en: 'Venezuela', code: 'VE', lat: 10.4806, lng: -66.9036 },
  { es: 'México', en: 'Mexico', code: 'MX', lat: 19.4326, lng: -99.1332 },
  { es: 'Estados Unidos', en: 'United States', code: 'US', lat: 25.7617, lng: -80.1918 },
  { es: 'España', en: 'Spain', code: 'ES', lat: 40.4168, lng: -3.7038 },
  { es: 'Italia', en: 'Italy', code: 'IT', lat: 41.9028, lng: 12.4964 },
] as const;

/** Altura del arco segun la distancia: los cercanos bajos, los de Europa altos. */
function altitud(lat: number, lng: number) {
  const d = Math.hypot(lat - LIMA.lat, lng - LIMA.lng);
  return Math.min(0.5, 0.05 + d / 220);
}

export const CLIENT_ARCS = CLIENT_COUNTRIES.filter((c) => c.code !== 'PE').map((c) => ({
  startLat: LIMA.lat,
  startLng: LIMA.lng,
  endLat: c.lat,
  endLng: c.lng,
  alt: altitud(c.lat, c.lng),
}));
