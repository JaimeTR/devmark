import { Metadata } from 'next';

export function generateJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DevMark',
    url: 'https://devmarkpe.com',
    logo: 'https://devmarkpe.com/logo.png',
    description: 'DevMark - Tu Socio Digital. Agencia de desarrollo web y software a medida',
    sameAs: [
      'https://instagram.com/devmarkpe',
      'https://facebook.com/devmarkpe',
      'https://github.com/devmarkpe',
      'https://linkedin.com/company/devmarkpe',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PE',
      addressLocality: 'Perú',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'contact@devmarkpe.com',
    },
  };
}

export function generateServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DevMark - Desarrollo Web y Software',
    description: 'Agencia especializada en desarrollo web, software a medida, SEO, marketing digital y automatización de procesos',
    url: 'https://devmarkpe.com',
    areaServed: ['PE', 'MX', 'CO', 'CL', 'AR', 'ES'],
    availableLanguage: ['es', 'en'],
    service: [
      {
        '@type': 'Service',
        name: 'Desarrollo Web a Medida',
        description: 'Creación de sitios web personalizados programados desde cero',
        provider: { '@type': 'Organization', name: 'DevMark' },
      },
      {
        '@type': 'Service',
        name: 'Desarrollo de Software',
        description: 'Software personalizado, ERP, CRM y APIs',
        provider: { '@type': 'Organization', name: 'DevMark' },
      },
      {
        '@type': 'Service',
        name: 'Chatbots con IA',
        description: 'Soluciones de soporte 24/7 entrenadas con IA',
        provider: { '@type': 'Organization', name: 'DevMark' },
      },
      {
        '@type': 'Service',
        name: 'SEO y Optimización Web',
        description: 'Estrategia SEO, Core Web Vitals y optimización de conversiones',
        provider: { '@type': 'Organization', name: 'DevMark' },
      },
    ],
  };
}
