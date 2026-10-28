import type { Post } from './blog-posts';
import { postsNuevosEn } from './blog-nuevos-en';
import { postsNuevosEs } from './blog-nuevos-es';

// Articulos de precios, SEO y GEO. Pares es/en en el mismo orden: el blog los empareja por posicion
// (ver getTranslatedSlug en blog-posts.ts). Si agregas uno, agrega su par en la misma posicion.
export const postsNuevos: Record<'es' | 'en', Post[]> = {
  es: postsNuevosEs,
  en: postsNuevosEn,
};
