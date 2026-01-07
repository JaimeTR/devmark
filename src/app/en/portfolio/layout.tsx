import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - DevMark | Featured Web and Software Development Projects',
  description: 'Discover our best projects in web development, custom software, e-commerce and personalized digital solutions.',
  keywords: 'portfolio, web projects, case studies, web development, custom software, e-commerce, responsive web',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/portfolio',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/portfolio',
    title: 'Portfolio - DevMark | Featured Projects',
    description: 'Discover our best projects in web development, custom software, e-commerce and digital solutions.',
    siteName: 'DevMark',
  },
};

export default function EnPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
