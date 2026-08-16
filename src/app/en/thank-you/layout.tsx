import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Devmark. We have received your message and will get back to you soon.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/thank-you',
    languages: {
      es: 'https://devmarkpe.com/gracias',
      en: 'https://devmarkpe.com/en/thank-you',
    },
  },
  robots: { index: false, follow: true },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
