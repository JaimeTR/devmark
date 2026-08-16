import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FloatingAssistant } from "@/components/floating-assistant"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800'],
});

// Logo-only wordmark typeface — used exclusively where "DEVMARK" is set as the brand mark
// (header, footer), never as a body/heading font.
const braze = localFont({
  src: '../fonts/Braze.otf',
  display: 'swap',
  variable: '--font-braze',
});


export const metadata: Metadata = {
  title: {
    default: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    template: '%s | Devmark',
  },
  description: 'Agencia de desarrollo web en Peru. Creamos paginas web, tiendas online, software a medida, chatbots con IA y SEO en Lima. Soluciones digitales para empresas peruanas.',
  keywords: 'desarrollo web peru, agencia desarrollo web lima, software a medida peru, paginas web peru, tiendas online lima, chatbots IA peru, SEO lima, marketing digital peru, automatizacion procesos, desarrollo apps peru',
  metadataBase: new URL('https://devmarkpe.com'),
  alternates: {
    canonical: 'https://devmarkpe.com',
    languages: {
      'es-PE': 'https://devmarkpe.com',
      'es': 'https://devmarkpe.com',
      'en': 'https://devmarkpe.com/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://devmarkpe.com',
    title: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    description: 'Agencia de desarrollo web en Lima, Peru. Paginas web, software a medida, chatbots IA y SEO para empresas peruanas.',
    siteName: 'Devmark Perú',
    countryName: 'Peru',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devmark - Agencia de desarrollo web y software en Lima, Perú',
    description: 'Desarrollo web, software a medida y chatbots IA en Lima, Peru.',
    images: ['/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'PE-LIM',
    'geo.placename': 'Lima, Peru',
    'geo.position': '-12.0464;-77.0428',
    'ICBM': '-12.0464, -77.0428',
    'language': 'es-PE',
    'target-country': 'PE',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={`${poppins.variable} ${braze.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Devmark',
              description: 'Agencia de desarrollo web y software a medida en Lima, Peru',
              url: 'https://devmarkpe.com',
              email: 'contacto@devmarkpe.com',
              telephone: '+51975646074',
              priceRange: '$$',
              areaServed: ['PE', 'ES', 'AR', 'CO'],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Lima',
                addressRegion: 'Lima',
                addressCountry: 'PE',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '-12.0464',
                longitude: '-77.0428',
              },
              sameAs: [
                'https://www.instagram.com/devmark.pe/',
                'https://www.facebook.com/devmark.pe/',
                'https://www.linkedin.com/company/devmarkpe/',
                'https://github.com/JaimeTR',
              ],
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
            }),
          }}
        />
        {children}
        <FloatingAssistant />
        <Toaster />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
