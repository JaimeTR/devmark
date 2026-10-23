// Logos de clientes (descargados de la web oficial de cada marca, oct 2026). Los que aun no tienen
// archivo se muestran con su nombre. `oscuro`: el logo es claro y necesita fondo tinta.

export type ClientLogo = { nombre: string; src?: string; oscuro?: boolean; icono?: boolean };

export const CLIENT_LOGOS: ClientLogo[] = [
  { nombre: 'ADLIM', src: '/clientes/adlim.webp' },
  { nombre: 'Off Road Perú', src: '/clientes/offroadperu.webp', oscuro: true },
  { nombre: 'JOPCO', src: '/clientes/jopco.webp' },
  { nombre: 'Breeze Lingo', src: '/clientes/breezelingo.webp' },
  { nombre: 'Memorándum Tecnología', src: '/clientes/memorandum.webp', oscuro: true },
  { nombre: 'DentalLife', src: '/clientes/dentallife.webp' },
  { nombre: 'Segittur', src: '/clientes/segittur.webp' },
  { nombre: 'TAK lab', src: '/clientes/taklab.webp' },
  { nombre: 'Geoparque Maestrazgo', src: '/clientes/geoparque.webp', oscuro: true },
  { nombre: 'Dorthon Clínica Dental', src: '/clientes/dorthon.webp' },
  { nombre: 'España Abogados', src: '/clientes/espanaabogados.webp' },
  { nombre: 'Visual Medica', src: '/clientes/visualmedica.webp', oscuro: true },
  { nombre: 'Amysa Shop', src: '/clientes/amysa.webp' },
  { nombre: 'Matarraña Aventura', src: '/clientes/matarrana.webp' },
  { nombre: 'Urbanz', src: '/clientes/urbanz.webp' },
  { nombre: 'Superprof', src: '/clientes/superprofe.svg', icono: true },
  { nombre: 'NEWDENIM' },
  { nombre: 'AS Abogados' },
  { nombre: 'Zona Dental' },
  { nombre: 'Enova' },
  { nombre: 'LUCE Inmobiliaria' },
  { nombre: 'MM TECH' },
  { nombre: 'DETALZONE' },
];

/** Marcas de los avatares de "+100 clientes satisfechos" en el inicio. */
export const CLIENT_AVATARS = [
  { nombre: 'ADLIM', src: '/clientes/av-adlim.webp' },
  { nombre: 'JOPCO', src: '/clientes/av-jopco.webp' },
  { nombre: 'Memorándum', src: '/clientes/av-memorandum.webp' },
  { nombre: 'DentalLife', src: '/clientes/av-dentallife.webp' },
  { nombre: 'Urbanz', src: '/clientes/av-urbanz.webp' },
];
