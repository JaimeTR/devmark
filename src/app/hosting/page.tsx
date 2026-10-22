import type { Metadata } from 'next';
import { HostingPage } from '@/components/landing/hosting-page';

export const metadata: Metadata = {
  title: 'Hosting y Dominios: Partner Oficial de Hostinger',
  description: 'Hosting profesional, dominios, correos corporativos y certificados SSL. Como partners oficiales de Hostinger, te damos 20% de descuento adicional.',
  alternates: {
    canonical: 'https://devmarkpe.com/hosting',
    languages: {
      es: 'https://devmarkpe.com/hosting',
      en: 'https://devmarkpe.com/en/hosting',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/hosting',
    title: 'Hosting y Dominios | Devmark - Partner Oficial de Hostinger',
    description: 'Hosting profesional, dominios, correos corporativos y SSL con 20% de descuento adicional.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hosting y dominios - DEVMARK' }],
  },
};

export default function Page() {
  return <HostingPage lang="es" />;
}
