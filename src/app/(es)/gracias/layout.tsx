import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gracias',
  description: 'Gracias por contactar con Devmark. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.',
  alternates: {
    canonical: 'https://devmarkpe.com/gracias',
    languages: {
      es: 'https://devmarkpe.com/gracias',
      en: 'https://devmarkpe.com/en/thank-you',
    },
  },
  robots: { index: false, follow: true },
};

export default function GraciasLayout({ children }: { children: React.ReactNode }) {
  return children;
}
