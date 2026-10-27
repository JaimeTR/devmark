import type { Metadata } from 'next';
import '../globals.css';
import { RaizDelSitio } from '@/components/site/raiz-del-sitio';

export const metadata: Metadata = {
  title: {
    default: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    template: '%s | Devmark',
  },
  description: 'Agencia de desarrollo web en Perú. Creamos páginas web, tiendas online, software a medida, chatbots con IA y SEO en Lima. Soluciones digitales para empresas peruanas.',
  keywords: 'desarrollo web Perú, agencia de desarrollo web en Lima, software a medida Perú, páginas web Perú, tiendas online Lima, chatbots con IA Perú, SEO Lima, marketing digital Perú, automatización de procesos, desarrollo de apps Perú',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com',
    languages: {
      'es-PE': 'https://devmarkpe.com',
      'es': 'https://devmarkpe.com',
      'en': 'https://devmarkpe.com/en',
      'x-default': 'https://devmarkpe.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com',
    title: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    description: 'Agencia de desarrollo web en Lima, Perú. Páginas web, software a medida, chatbots con IA y SEO para empresas peruanas.',
    siteName: 'Devmark Perú',
    countryName: 'Peru',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    description: 'Desarrollo web, software a medida y chatbots con IA en Lima, Perú.',
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
    'language': 'es-PE',
    'target-country': 'PE',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function EsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RaizDelSitio lang="es">{children}</RaizDelSitio>;
}
