import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - DevMark | Proyectos Destacados de Desarrollo Web y Software',
  description: 'Descubre nuestros mejores proyectos en desarrollo web, software a medida, e-commerce y soluciones digitales personalizadas.',
  keywords: 'portfolio, proyectos web, casos de éxito, desarrollo web, software personalizado, e-commerce, web responsive',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/portfolio',
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/portfolio',
    title: 'Portfolio - DevMark | Proyectos Destacados',
    description: 'Descubre nuestros mejores proyectos en desarrollo web, software a medida, e-commerce y soluciones digitales.',
    siteName: 'DevMark',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
