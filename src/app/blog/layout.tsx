import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - DevMark | Artículos de Desarrollo Web y Software',
  description: 'Lee nuestros artículos y guías sobre desarrollo web, software a medida, SEO, tecnología y transformación digital para tu negocio.',
  keywords: 'blog de desarrollo, guías técnicas, SEO, desarrollo web, software, tutoriales, tecnología',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/blog',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/blog',
    title: 'Blog - DevMark | Artículos de Desarrollo Web y Software',
    description: 'Lee nuestros artículos y guías sobre desarrollo web, software a medida, SEO, tecnología y transformación digital.',
    siteName: 'DevMark',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
