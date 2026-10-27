/** Recorta un texto en un limite de caracteres, sin partir palabras, para titulos y descripciones de buscadores. */
export function recortar(texto: string, max: number): string {
  const limpio = texto.replace(/\s+/g, ' ').trim();
  if (limpio.length <= max) return limpio;
  const corte = limpio.slice(0, max - 1);
  const ultimoEspacio = corte.lastIndexOf(' ');
  const base = ultimoEspacio > max * 0.6 ? corte.slice(0, ultimoEspacio) : corte;
  return `${base.replace(/[\s,.;:¿¡-]+$/, '')}…`;
}

/** Titulo para <title>: el plantilla del sitio suma " | Devmark" (9), asi que se queda en 50 para no pasar de 60. */
export function tituloSeo(titulo: string, max = 50): string {
  if (titulo.length <= max) return titulo;
  const primeraParte = titulo.split(/\s*[:—–]\s*/)[0] ?? titulo;
  return primeraParte.length >= 18 && primeraParte.length <= max ? primeraParte : recortar(titulo, max);
}

/** Descripcion para meta description: hasta 157 para que Google no la corte. */
export function descripcionSeo(descripcion: string, max = 157): string {
  return recortar(descripcion, max);
}

export const SITIO = 'https://devmarkpe.com';

/** Autor de los articulos del blog: JaimeTR. La foto es la de su portafolio (jaimetr.dev). */
export const AUTOR = {
  id: `${SITIO}/#jaimetr`,
  nombre: 'JaimeTR',
  nombreCompleto: 'Jaime Tarazona',
  url: 'https://jaimetr.dev',
  foto: '/autor/jaimetr.webp',
  fotoAbsoluta: `${SITIO}/autor/jaimetr.webp`,
  redes: ['https://jaimetr.dev', 'https://github.com/JaimeTR'],
  cargo: {
    es: 'Desarrollador de software en Lima, Perú, y responsable de DEVMARK',
    en: 'Software developer in Lima, Peru, and head of DEVMARK',
  },
  bio: {
    es: 'Desarrolla sitios web, software a medida y automatizaciones con IA para negocios de Perú y Latinoamérica. Escribe en este blog lo que aprende construyendo proyectos reales.',
    en: 'Builds websites, custom software and AI automations for businesses in Peru and Latin America. He writes on this blog what he learns building real projects.',
  },
} as const;

/** Persona autora, para los datos estructurados (la misma entidad en todo el sitio). */
export const autorJsonLd = {
  '@type': 'Person',
  '@id': AUTOR.id,
  name: AUTOR.nombre,
  alternateName: AUTOR.nombreCompleto,
  url: AUTOR.url,
  image: AUTOR.fotoAbsoluta,
  jobTitle: 'Software developer',
  worksFor: { '@id': `${SITIO}/#organizacion` },
  sameAs: AUTOR.redes,
};

/** Articulo del blog: BlogPosting + migas de pan, con el autor y la organizacion como entidades enlazadas. */
export function articuloJsonLd(args: {
  lang: 'es' | 'en';
  titulo: string;
  descripcion: string;
  fecha: string;
  url: string;
  imagen: string;
  etiquetas?: readonly string[];
}) {
  const es = args.lang === 'es';
  const base = es ? `${SITIO}/blog` : `${SITIO}/en/blog`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${args.url}#articulo`,
        headline: args.titulo,
        description: args.descripcion,
        image: [args.imagen],
        datePublished: args.fecha,
        dateModified: args.fecha,
        inLanguage: es ? 'es-PE' : 'en',
        keywords: args.etiquetas?.join(', '),
        mainEntityOfPage: { '@type': 'WebPage', '@id': args.url },
        author: { '@id': AUTOR.id },
        publisher: { '@id': `${SITIO}/#organizacion` },
        isPartOf: { '@id': `${SITIO}/#sitio` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: es ? 'Inicio' : 'Home', item: es ? SITIO : `${SITIO}/en` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: base },
          { '@type': 'ListItem', position: 3, name: args.titulo, item: args.url },
        ],
      },
    ],
  };
}

/** Cuerpo de un articulo: si usa <h3> sin ningun <h2> (el titulo ya es el <h1>), sube un nivel los subtitulos. */
export function normalizarEncabezados(html: string): string {
  if (/<h2[\s>]/i.test(html) || !/<h3[\s>]/i.test(html)) return html;
  return html
    .replace(/<(\/?)h3(?=[\s>])/gi, '<$1h2')
    .replace(/<(\/?)h4(?=[\s>])/gi, '<$1h3')
    .replace(/<(\/?)h5(?=[\s>])/gi, '<$1h4');
}

const REDES = [
  'https://www.instagram.com/devmark.pe/',
  'https://www.facebook.com/devmark.pe/',
  'https://www.linkedin.com/company/devmark.pe/',
  'https://github.com/JaimeTR',
];
const PAISES = ['PE', 'EC', 'BO', 'CL', 'AR', 'CO', 'VE', 'MX', 'US', 'ES', 'IT'];

/**
 * Datos estructurados del sitio, uno por idioma de pagina: la misma entidad de organizacion (mismo @id) a la que
 * se enlazan el negocio local, el sitio web, el autor, los servicios y los articulos; solo cambian los textos.
 */
export function grafoSitio(lang: 'es' | 'en') {
  const es = lang === 'es';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITIO}/#organizacion`,
        name: 'DEVMARK',
        alternateName: ['Devmark', 'Devmark Perú', 'DEVMARKPE'],
        url: es ? SITIO : `${SITIO}/en`,
        logo: { '@type': 'ImageObject', url: `${SITIO}/marca/devmark-isotipo-512.png`, width: 512, height: 512 },
        image: `${SITIO}/og-image.png`,
        email: 'contacto@devmarkpe.com',
        telephone: '+51975646074',
        sameAs: REDES,
        slogan: es
          ? 'Desarrollo web, software a medida e inteligencia artificial desde Lima, Perú'
          : 'Web development, custom software and artificial intelligence from Lima, Peru',
        knowsAbout: es
          ? ['Desarrollo web a medida', 'Software a medida y ERP', 'Chatbots con inteligencia artificial', 'SEO y GEO (optimización para buscadores y para IA)', 'Automatización de procesos', 'Marketing digital', 'Tiendas online']
          : ['Custom web development', 'Custom software and ERP', 'AI chatbots', 'SEO and GEO (search engine and AI optimization)', 'Process automation', 'Digital marketing', 'Online stores'],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: es ? 'ventas' : 'sales',
            telephone: '+51975646074',
            email: 'contacto@devmarkpe.com',
            availableLanguage: ['es', 'en'],
            areaServed: PAISES,
          },
        ],
      },
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${SITIO}/#negocio`,
        name: 'Devmark',
        description: es
          ? 'Agencia de desarrollo web y software a medida en Lima, Perú'
          : 'Web development and custom software agency in Lima, Peru',
        url: es ? SITIO : `${SITIO}/en`,
        image: `${SITIO}/og-image.png`,
        email: 'contacto@devmarkpe.com',
        telephone: '+51975646074',
        priceRange: '$$',
        parentOrganization: { '@id': `${SITIO}/#organizacion` },
        areaServed: PAISES,
        address: { '@type': 'PostalAddress', addressLocality: 'Lima', addressRegion: 'Lima', addressCountry: 'PE' },
        geo: { '@type': 'GeoCoordinates', latitude: '-12.0464', longitude: '-77.0428' },
        sameAs: REDES,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITIO}/#sitio`,
        url: SITIO,
        name: 'DEVMARK',
        inLanguage: ['es-PE', 'en'],
        publisher: { '@id': `${SITIO}/#organizacion` },
      },
      autorJsonLd,
    ],
  };
}
