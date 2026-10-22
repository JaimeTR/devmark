import type { Metadata } from 'next';
import { ServicesIndex } from '@/components/landing/services-index';

export const metadata: Metadata = {
  title: 'Services | Web Development, Software & Digital Marketing',
  description: 'Discover our wide range of services: custom web development, personalized software, AI chatbots, SEO, digital marketing and more for your business.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services',
    languages: {
      es: 'https://devmarkpe.com/servicios',
      en: 'https://devmarkpe.com/en/services',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services',
    title: 'Services | Devmark - Web Development, Software & Digital Marketing',
    description: 'Discover our services: custom web development, software, AI chatbots, SEO and digital marketing.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'DEVMARK Services' }],
  },
};

export default function Page() {
  return <ServicesIndex lang="en" />;
}
