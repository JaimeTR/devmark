import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Web Development & Software Agency',
  description: 'Get in touch with Devmark: schedule a meeting, request a quote, or send us a message about web development, software, or digital marketing today.',
  keywords: 'contact devmark, web development agency, project quote, custom software development',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/contact',
    languages: {
      es: 'https://devmarkpe.com/contacto',
      en: 'https://devmarkpe.com/en/contact',
    },
  },
  openGraph: {
    title: 'Contact | Devmark',
    description: 'Schedule a meeting or request a quote with Devmark.',
    url: 'https://devmarkpe.com/en/contact',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function EnContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
