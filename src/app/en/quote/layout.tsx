import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Quoter with Personalized Cost Estimates',
  description: 'Get a personalized quote for your web development or software project in just a few minutes with our free, AI-powered smart project quoter tool.',
  keywords: 'quote, budget, web development, software, price, estimation',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/quote',
    languages: {
      es: 'https://devmarkpe.com/quote',
      en: 'https://devmarkpe.com/en/quote',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/quote',
    title: 'Project Quoter - Devmark | Personalized Estimates',
    description: 'Get a personalized quote for your web development or software project with our AI-powered quoter.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'DEVMARK project quoter' }],
  },
};

export default function EnQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
