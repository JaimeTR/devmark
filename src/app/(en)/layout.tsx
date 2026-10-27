import type { Metadata } from 'next';
import '../globals.css';
import { RaizDelSitio } from '@/components/site/raiz-del-sitio';

export const metadata: Metadata = {
  title: {
    default: 'Devmark - Web Development & Software in Peru',
    template: '%s | Devmark',
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
    title: 'Devmark - Web Development in Peru',
    description: 'Custom web development, software and AI chatbots in Lima, Peru.',
    siteName: 'Devmark Peru',
    countryName: 'Peru',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devmark - Web Development & Software in Peru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devmark - Web Development Agency in Peru',
    description: 'Web development, custom software and AI chatbots in Lima, Peru.',
    images: ['/og-image.png'],
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
  other: {
    'geo.region': 'PE-LIM',
    'geo.placename': 'Lima, Peru',
    'geo.position': '-12.0464;-77.0428',
    'ICBM': '-12.0464, -77.0428',
    'language': 'en',
    'target-country': 'PE',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: { 'msvalidate.01': '773910A9874E7034869B2B1C59E62325' },
  },
};

export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RaizDelSitio lang="en">{children}</RaizDelSitio>;
}
