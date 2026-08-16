import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | DevMark - Agencia de desarrollo web y software',
  description: 'Contacta con DevMark. Agenda una reunion, cotiza tu proyecto o envianos un mensaje. Desarrollo web, software a medida, chatbots IA y marketing digital.',
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
    title: 'Contacto | DevMark',
    description: 'Agenda una reunion o cotiza tu proyecto con DevMark.',
    url: 'https://devmarkpe.com/contacto',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
