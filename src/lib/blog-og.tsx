import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPostBySlug } from '@/data/blog-posts';
import { TOPIC_LABEL, topicOf } from '@/data/blog-topics';

// Imagen para redes de cada articulo (1200x630): titulo, tema y marca sobre tinta.
// Sustituye a las ilustraciones SVG genericas, que Facebook, LinkedIn y X no muestran.

export const ogSize = { width: 1200, height: 630 };

export async function blogOgImage(slug: string, lang: 'es' | 'en') {
  const post = await getPostBySlug(slug, lang);
  const [sans, serif, logo] = await Promise.all([
    readFile(join(process.cwd(), 'src/fonts/SchibstedGrotesk-Medium.ttf')),
    readFile(join(process.cwd(), 'src/fonts/InstrumentSerif-Italic.ttf')),
    readFile(join(process.cwd(), 'public/marca/devmark-logotipo-fondo-oscuro-sin-lema.svg')),
  ]);
  const title = post?.title ?? 'DEVMARK';
  const topic = TOPIC_LABEL[post ? topicOf(post) : 'web'][lang];
  const logoSrc = `data:image/svg+xml;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#110C29', color: '#fff', fontFamily: 'Schibsted', position: 'relative' }}>
        <div style={{ position: 'absolute', right: -160, top: -220, width: 720, height: 720, borderRadius: 720, background: 'radial-gradient(circle closest-side, rgba(61,52,188,0.75) 0%, rgba(61,52,188,0) 100%)', display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse solo acepta <img> */}
          <img src={logoSrc} width={305} height={30} alt="" />
          <span style={{ marginLeft: 18, fontSize: 24, padding: '8px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', color: '#CBD5FA' }}>{topic}</span>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 70 ? 54 : 64, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 26, color: '#B4B1D6' }}>
          <span style={{ fontFamily: 'Serif', fontSize: 34, color: '#A9B4FF' }}>{lang === 'en' ? 'DEVMARK blog' : 'Blog de DEVMARK'}</span>
          <span>devmarkpe.com</span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Schibsted', data: sans, style: 'normal', weight: 500 },
        { name: 'Serif', data: serif, style: 'italic', weight: 400 },
      ],
    },
  );
}
