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
