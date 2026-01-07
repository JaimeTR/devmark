import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});


export const metadata: Metadata = {
  title: 'Devmark - Agencia de Desarrollo Web y Software',
  description: 'Potencia tu negocio con DevMark, agencia líder en desarrollo web y software a medida. Ofrecemos soluciones innovadoras en SEO, marketing digital, chatbots con IA y automatización de procesos para garantizar tu éxito digital a nivel global.',
  keywords: 'desarrollo web, software a medida, agencia de desarrollo, SEO, marketing digital, chatbots con IA, automatización de procesos, desarrollo de software, landing pages, e-commerce',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com',
    languages: {
      'es': 'https://devmarkpe.com',
      'en': 'https://devmarkpe.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com',
    title: 'Devmark - Agencia de Desarrollo Web y Software',
    description: 'Potencia tu negocio con DevMark, agencia líder en desarrollo web y software a medida.',
    siteName: 'DevMark',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devmark - Agencia de Desarrollo Web y Software',
    description: 'Potencia tu negocio con DevMark, agencia líder en desarrollo web y software a medida.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
