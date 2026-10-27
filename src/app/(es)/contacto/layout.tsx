import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Agencia de Desarrollo Web y Software',
  description: 'Contacta con Devmark: agenda una reunión, cotiza tu proyecto o envíanos un mensaje sobre desarrollo web, software a medida o marketing digital.',
  keywords: 'contacto devmark, agencia desarrollo web, cotizar proyecto web, desarrollo software peru',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/contacto',
    languages: {
      es: 'https://devmarkpe.com/contacto',
      en: 'https://devmarkpe.com/en/contact',
    },
  },
  openGraph: {
    title: 'Contacto | Devmark',
    description: 'Agenda una reunion o cotiza tu proyecto con Devmark.',
    url: 'https://devmarkpe.com/contacto',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
