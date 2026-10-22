import type { Metadata } from 'next';
import { AboutPage } from '@/components/landing/about-page';

export const metadata: Metadata = {
  title: 'Nosotros | Agencia de Desarrollo Web y Software en Perú',
  description: 'Conoce a Devmark: un estudio en Lima, Perú que fusiona estrategia, diseño y tecnología para ayudar a los negocios a crecer con claridad y resultados.',
  alternates: {
    canonical: 'https://devmarkpe.com/nosotros',
    languages: {
      es: 'https://devmarkpe.com/nosotros',
      en: 'https://devmarkpe.com/en/about',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/nosotros',
    title: 'Nosotros | Devmark - Agencia de Desarrollo Web y Software en Perú',
    description: 'Conoce a Devmark: un estudio en Lima, Perú que fusiona estrategia, diseño y tecnología.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Nosotros - DEVMARK' }],
  },
};

export default function Page() {
  return <AboutPage lang="es" />;
}
