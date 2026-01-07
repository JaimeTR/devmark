import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DevMark - Web Development and Software Agency',
  description: 'Empower your business with DevMark, a leading agency in custom web and software development. We offer innovative solutions in SEO, digital marketing, AI chatbots and process automation to guarantee your digital success globally.',
  keywords: 'web development, custom software, development agency, SEO, digital marketing, AI chatbots, process automation, software development, landing pages, e-commerce',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en',
    languages: {
      'es': 'https://devmarkpe.com',
      'en': 'https://devmarkpe.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en',
    title: 'DevMark - Web Development and Software Agency',
    description: 'Empower your business with DevMark, a leading agency in custom web and software development.',
    siteName: 'DevMark',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevMark - Web Development and Software Agency',
    description: 'Empower your business with DevMark, a leading agency in custom web and software development.',
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
