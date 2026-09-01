import Script from 'next/script';

// ID real de GA4 como respaldo directo — si NEXT_PUBLIC_GA_MEASUREMENT_ID
// no está configurada en el entorno (ej. no se pudo agregar en Vercel),
// Analytics igual funciona. No es un dato sensible: queda visible en el
// HTML público de cualquier sitio con GA de todas formas.
const FALLBACK_GA_MEASUREMENT_ID = 'G-R0W0S4V4FD';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || FALLBACK_GA_MEASUREMENT_ID;

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
