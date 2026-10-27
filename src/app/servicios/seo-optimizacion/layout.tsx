import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO y GEO: aparece en Google y en la IA',
  description: 'Posicionamos tu web en Google (SEO) y en ChatGPT, Gemini y Perplexity (GEO) para atraer más clientes en todo el Perú.',
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
    title: 'SEO y GEO | DEVMARK Perú',
    description: 'Te encuentran en Google y te recomiendan en ChatGPT, Gemini y Perplexity.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SEO y GEO - DEVMARK' }],
  },
};

export default function SeoOptimizacionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
