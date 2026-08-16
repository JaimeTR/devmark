import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO y Optimización Web para Posicionar tu Negocio',
  description: 'Aumentamos tu visibilidad en buscadores, atraemos tráfico orgánico de calidad y mejoramos la tasa de conversión de tu sitio web en todo el Perú.',
  alternates: {
    canonical: 'https://devmarkpe.com/servicios/seo-optimizacion',
    languages: {
      es: 'https://devmarkpe.com/servicios/seo-optimizacion',
      en: 'https://devmarkpe.com/en/services/seo-optimization',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/servicios/seo-optimizacion',
    title: 'SEO y Optimización Web | Devmark Perú',
    description: 'Aumentamos tu visibilidad en buscadores y mejoramos la tasa de conversión de tu sitio web.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'SEO y optimización web - DEVMARK' }],
  },
};

export default function SeoOptimizacionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
