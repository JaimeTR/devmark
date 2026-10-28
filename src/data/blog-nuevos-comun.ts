import { whatsappHref } from '@/lib/contact';
import { ctaButtonLinks, ctaContent } from './blog-cta';

type Idioma = 'es' | 'en';
type Servicio = Exclude<keyof typeof ctaContent.es, 'contactButton'>;

/** Aclaracion de precio referencial (excepcion a "sin letra chica" de PRODUCT.md): visible, corta y junto a la tabla. */
export function nota(lang: Idioma, conDolares = false): string {
  if (lang === 'es') {
    return '<p><em>Los precios de DEVMARK son «desde» y referenciales: el monto final depende del alcance, la complejidad y los plazos. Los rangos de mercado son orientativos, según lo que se ve en el mercado peruano, y no una tarifa oficial.</em></p>';
  }
  const usd = conDolares ? ' Dollar figures use a reference rate of about S/ 3.4 per US$ and are rounded.' : '';
  return `<p><em>DEVMARK prices are “starting from” and for reference only: the final amount depends on scope, complexity and deadlines. Market ranges are indicative, based on what is seen in the Peruvian market, not an official rate.${usd}</em></p>`;
}

/** Cierre de cada articulo: cotizador con IA, WhatsApp y bloque de llamada a la accion del servicio. */
export function cierre(lang: Idioma, servicio: Servicio, mensajeWhatsapp: string, enlace: keyof typeof ctaButtonLinks.es = servicio): string {
  const c = ctaContent[lang];
  const aviso =
    lang === 'es'
      ? `<p>¿Quieres saber cuánto costaría tu caso? <a href="/quote">Pide una cotización con IA</a> y recibes la propuesta en PDF al momento, o <a href="${whatsappHref(mensajeWhatsapp)}">escríbenos por WhatsApp</a>.</p>`
      : `<p>Want to know what your case would cost? <a href="/en/quote">Get an AI quote</a> and receive the proposal as a PDF right away, or <a href="${whatsappHref(mensajeWhatsapp)}">message us on WhatsApp</a>.</p>`;
  return `${aviso}<div class="cta-block"><h3>${c[servicio].title}</h3><p>${c[servicio].text}</p><a href="${ctaButtonLinks[lang][enlace]}" class="cta-button">${c.contactButton}</a></div>`;
}
