import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Assistant - DevMark | Project Quoter',
  description: 'Get a personalized quote for your web development or software project. AI-powered quoter.',
  keywords: 'quote, budget, web development, software, price, estimation',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com/en/quote',
  },
};

export default function EnQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
