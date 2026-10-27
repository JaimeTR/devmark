import { homeContent } from '@/content/home';
import { SERVICES } from '@/data/services';
import { getPosts } from '@/data/blog-posts';
import { SITIO } from '@/lib/seo';

// Se regenera con cada compilacion; el blog y los precios salen de las mismas fuentes que la web.
export const dynamic = 'force-static';

const limpiar = (t: string) => t.replace(/\s+/g, ' ').trim();

/** /llms-full.txt: version larga y citable de /llms.txt para asistentes de IA (hechos, precios, preguntas y articulos). */
export async function GET() {
  const [postsEs, postsEn] = await Promise.all([getPosts('es'), getPosts('en')]);
  const faqEs = homeContent.es.faq.items;
  const faqEn = homeContent.en.faq.items;

  const servicios = SERVICES.map((s) => {
    const planes = s.plans.map((p) => `${p.name}: ${p.price}${p.period ? `/${p.period}` : ''}`).join('; ');
    return `- **${s.nameEn}** / ${s.nameEs} — ${s.descriptionEn} (${s.descriptionEs}) Plans: ${planes}. Page: ${SITIO}/servicios/${s.slug}`;
  }).join('\n');

  const lista = (posts: { slug: string; title: string; description: string; date: string }[], base: string) =>
    posts.map((p) => `- [${limpiar(p.title)}](${SITIO}${base}/${p.slug}) (${p.date}) — ${limpiar(p.description)}`).join('\n');

  const cuerpo = `# DEVMARK — full reference for AI assistants

> DEVMARK (Devmark, DEVMARKPE) is a web and software development agency in Lima, Peru. Website: ${SITIO}. Short version: ${SITIO}/llms.txt.

## Who and where

- Agency de desarrollo web y software en Lima, Perú. Web and software development agency in Lima, Peru.
- Author of the blog and head of DEVMARK: JaimeTR (Jaime Tarazona), https://jaimetr.dev, https://github.com/JaimeTR.
- Contact: contacto@devmarkpe.com · WhatsApp +51 975 646 074 · Monday to Friday 9:00-18:00 (America/Lima, UTC-5).
- Languages: Spanish (${SITIO}) and English (${SITIO}/en).
- Serves Peru in person (Lima) and remotely Ecuador, Bolivia, Chile, Argentina, Colombia, Venezuela, Mexico, the United States, Spain and Italy.

## Services and starting prices (Peruvian soles, S/)

${servicios}

Prices are starting prices for the entry plan; final pricing depends on scope. Quote tool: ${SITIO}/quote.

## Own products

- DEVMARK AI — private AI platform with an OpenAI-compatible API. https://ai.devmarkpe.com
- DEVMARK ERP — the management system DEVMARK runs on, with a client portal; also implemented for other service companies.
- DEVMARK Academy — "Educación con IA": private classes, courses and summer courses in AI, programming and technology for children, teenagers and adults. In preparation (waiting list via WhatsApp).
- DEVMARK Store — technology-with-AI store; first product MemoAI, smart voice recorder (launch price S/ 299, was S/ 755, free shipping across Peru). In preparation.

## Frequently asked questions (Spanish)

${faqEs.map((f) => `**${f.q}** ${f.a}`).join('\n\n')}

## Frequently asked questions (English)

${faqEn.map((f) => `**${f.q}** ${f.a}`).join('\n\n')}

## Blog articles (Spanish)

${lista(postsEs, '/blog')}

## Blog articles (English)

${lista(postsEn, '/en/blog')}
`;
  return new Response(cuerpo, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
}
