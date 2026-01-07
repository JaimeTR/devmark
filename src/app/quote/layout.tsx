import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cotizador de Proyectos - DevMark | Presupuestos Personalizados',
  description: 'Obtén un presupuesto personalizado para tu proyecto de desarrollo web o software. Cotizador inteligente con IA.',
  keywords: 'cotizador, presupuesto, desarrollo web, software, precio, estimación',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/quote',
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
