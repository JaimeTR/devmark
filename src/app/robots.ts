import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api'] },
      { userAgent: 'Googlebot', allow: '/', disallow: ['/admin', '/api'] },
      // Buscadores y asistentes de IA: se permiten de forma explicita para que puedan citar el sitio.
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended'],
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: ['https://devmarkpe.com/sitemap.xml'],
    host: 'https://devmarkpe.com',
  };
}
