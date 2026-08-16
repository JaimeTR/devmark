import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Featured Web and Software Projects',
  description: 'Discover our best projects in web development, custom software, e-commerce, and personalized digital solutions for businesses across Peru and beyond.',
  keywords: 'portfolio, web projects, case studies, web development, custom software, e-commerce, responsive web',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/portfolio',
    languages: {
      es: 'https://devmarkpe.com/portfolio',
      en: 'https://devmarkpe.com/en/portfolio',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/portfolio',
    title: 'Portfolio - Devmark | Featured Projects',
    description: 'Discover our best projects in web development, custom software, e-commerce and digital solutions.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'DEVMARK Portfolio' }],
  },
};

export default function EnPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
