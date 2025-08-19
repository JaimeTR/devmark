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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
