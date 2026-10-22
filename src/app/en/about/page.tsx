import type { Metadata } from 'next';
import { AboutPage } from '@/components/landing/about-page';

export const metadata: Metadata = {
  title: 'About Us | Web & Software Development Agency in Peru',
  description: 'Meet Devmark: a studio in Lima, Peru that fuses strategy, design, and technology to help businesses grow with clarity, focus, and confidence.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/about',
    languages: {
      es: 'https://devmarkpe.com/nosotros',
      en: 'https://devmarkpe.com/en/about',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/about',
    title: 'About Us | Devmark - Web & Software Development Agency in Peru',
    description: 'Meet Devmark: a studio in Lima, Peru that fuses strategy, design, and technology.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About DEVMARK' }],
  },
};

export default function Page() {
  return <AboutPage lang="en" />;
}
