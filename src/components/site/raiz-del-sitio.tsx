import { Toaster } from "@/components/ui/toaster"
import { FloatingAssistant } from "@/components/floating-assistant"
import { ButtonPress } from "@/components/site/button-press"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { grafoSitio } from '@/lib/seo';
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
  src: '../../fonts/Braze.otf',
  display: 'swap',
  variable: '--font-braze',
});

/**
 * El <html> y el <body> del sitio. Hay un layout raiz por idioma ((es) y (en)) para que cada pagina declare su
 * idioma de verdad en <html lang>, y los datos estructurados salgan en el mismo idioma que el contenido.
 */
export function RaizDelSitio({ lang, children }: { lang: 'es' | 'en'; children: React.ReactNode }) {
  return (
    <html lang={lang === 'en' ? 'en' : 'es-PE'} className={`${sans.variable} ${serif.variable} ${braze.variable}`} suppressHydrationWarning>
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
              dangerouslySetInnerHTML={{ __html: JSON.stringify(grafoSitio(lang)) }}
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
