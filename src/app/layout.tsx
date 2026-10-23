import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ButtonPress } from "@/components/site/button-press"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { Instrument_Serif, Schibsted_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

// Voz del sitio: una grotesca de letras apretadas para titulos y texto, y una serif
// cursiva solo para la frase que se quiere subrayar dentro de un titulo.
const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const serif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: '400',
  style: ['italic', 'normal'],
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
        url: '/og-image.png',
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
    images: ['/og-image.png'],
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
    <html lang="es-PE" className={`${sans.variable} ${serif.variable} ${braze.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased bg-paper text-ink">
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: DEVMARK como estudio que se ve trabajar: paneles enmarcados, titulos grandes con una frase en cursiva y el mundo conectado desde Lima; rechaza la landing SaaS de tarjetas lavanda iguales e ilustraciones de stock.
OWN-WORLD: papel blanco, paneles tinta (#110C29) y niebla lavanda (#EEF0FB) con esquinas de 20px; indigo #3D34BC solo para actuar; banda lavanda #CBD5FA; Schibsted Grotesk apretada + Instrument Serif cursiva; botones rectangulares con baldosa de icono; vidrio suave solo en barra, fichas y burbuja.
STORY: el visitante entiende que hacemos y desde cuanto, ve trabajo y prueba real, y escribe por WhatsApp con el servicio ya elegido.
FIRST VIEWPORT: panel tinta a sangre con barra de vidrio; a la izquierda prueba social, titular de 4 lineas y botones WhatsApp + servicios; a la derecha el globo con arcos desde Lima; abajo la banda lavanda de servicios en movimiento.
FORM: paneles editoriales enmarcados (referencia enrique.lat, efectos de pau.pe), forma 1 de la lista; seed c10e0a07.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`,
          }}
        />
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
              areaServed: ['PE', 'EC', 'BO', 'CL', 'AR', 'CO', 'VE', 'MX', 'US', 'ES', 'IT'],
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
                'https://www.linkedin.com/company/devmark.pe/',
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
        <div className="print:hidden">
          <FloatingAssistant />
        </div>
        <Toaster />
        <ButtonPress />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
