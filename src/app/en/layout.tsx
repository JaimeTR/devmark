import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'DevMark - Web Development & Software in Peru',
    template: '%s | DevMark',
  },
  description: 'Web development agency in Peru. Custom websites, e-commerce, software development, AI chatbots and SEO in Lima. Digital solutions for Peruvian businesses.',
  keywords: 'web development peru, software development lima, custom websites peru, ecommerce peru, AI chatbots lima, SEO peru, digital agency peru',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en',
    languages: {
      'es-PE': 'https://devmarkpe.com',
      'es': 'https://devmarkpe.com',
      'en': 'https://devmarkpe.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en',
    title: 'DevMark - Web Development in Peru',
    description: 'Custom web development, software and AI chatbots in Lima, Peru.',
    siteName: 'DevMark Peru',
    countryName: 'Peru',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'DevMark - Web Development & Software in Peru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevMark - Web Development Agency in Peru',
    description: 'Web development, custom software and AI chatbots in Lima, Peru.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
