import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Proyectos con Presupuestos Personalizados',
  description: 'Obtén un presupuesto personalizado para tu proyecto de desarrollo web o software en minutos, con nuestro cotizador inteligente impulsado por IA.',
  keywords: 'cotizador, presupuesto, desarrollo web, software, precio, estimación',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/quote',
    languages: {
      es: 'https://devmarkpe.com/quote',
      en: 'https://devmarkpe.com/en/quote',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com/quote',
    title: 'Cotizador de Proyectos - Devmark | Presupuestos Personalizados',
    description: 'Obtén un presupuesto personalizado para tu proyecto de desarrollo web o software con nuestro cotizador inteligente con IA.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Cotizador de proyectos - DEVMARK' }],
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
