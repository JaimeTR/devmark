import type { Metadata } from 'next';
import { ServicesIndex } from '@/components/landing/services-index';

export const metadata: Metadata = {
  title: 'Servicios | Desarrollo Web, Software y Marketing Digital',
  description: 'Descubre nuestra amplia gama de servicios: desarrollo web a medida, software personalizado, chatbots con IA, SEO, marketing digital y más para tu negocio.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios',
    languages: {
      es: 'https://devmarkpe.com/servicios',
      en: 'https://devmarkpe.com/en/services',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios',
    title: 'Servicios | Devmark - Desarrollo Web, Software y Marketing Digital',
    description: 'Descubre nuestra amplia gama de servicios: desarrollo web, software, chatbots IA, SEO y marketing digital.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Servicios DEVMARK' }],
  },
};

export default function Page() {
  return <ServicesIndex lang="es" />;
}
