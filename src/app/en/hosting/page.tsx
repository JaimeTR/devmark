import type { Metadata } from 'next';
import { HostingPage } from '@/components/landing/hosting-page';

export const metadata: Metadata = {
  title: 'Hosting & Domains: Official Hostinger Partner in Peru',
  description: 'Professional hosting, domains, corporate email, and SSL certificates. As official Hostinger partners, we offer an extra 20% discount on every plan.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/hosting',
    languages: {
      es: 'https://devmarkpe.com/hosting',
      en: 'https://devmarkpe.com/en/hosting',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/hosting',
    title: 'Hosting & Domains | Devmark - Official Hostinger Partner',
    description: 'Professional hosting, domains, corporate emails and SSL with an additional 20% discount.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hosting and domains - DEVMARK' }],
  },
};

export default function Page() {
  return <HostingPage lang="en" />;
}
