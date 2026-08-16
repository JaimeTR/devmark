import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Proyectos Destacados de Desarrollo Web',
  description: 'Descubre nuestros mejores proyectos en desarrollo web, software a medida, e-commerce y soluciones digitales personalizadas para empresas peruanas.',
  keywords: 'portfolio, proyectos web, casos de éxito, desarrollo web, software personalizado, e-commerce, web responsive',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/portfolio',
    languages: {
      es: 'https://devmarkpe.com/portfolio',
      en: 'https://devmarkpe.com/en/portfolio',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/portfolio',
    title: 'Portfolio - Devmark | Proyectos Destacados',
    description: 'Descubre nuestros mejores proyectos en desarrollo web, software a medida, e-commerce y soluciones digitales.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Portafolio DEVMARK' }],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
