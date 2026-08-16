import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/**
 * Reads Accept-Language in quality order. Spanish wins whenever it appears
 * before English, and wins by default when neither is present or the header
 * is missing/malformed — this site's audience is primarily Spanish-speaking.
 */
function detectPreferredLocale(request: NextRequest): 'es' | 'en' {
  const acceptLanguage = request.headers.get('accept-language') || '';

  const languages = acceptLanguage
    .split(',')
    .map((part) => {
      const [rawLang, rawQ] = part.trim().split(';q=');
      const q = rawQ ? parseFloat(rawQ) : 1;
      return { lang: rawLang?.toLowerCase() || '', q: Number.isFinite(q) ? q : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lang } of languages) {
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
  }

  return 'es';
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isEnPath = pathname === '/en' || pathname.startsWith('/en/');
  const currentLocale: 'es' | 'en' = isEnPath ? 'en' : 'es';
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;

  // Auto-detect only on a fresh landing at the bare Spanish home page with no
  // stored preference yet. Deep links (from search, ads, shares) are never
  // redirected, so SEO and direct navigation stay untouched.
  if (!cookieLocale && pathname === '/') {
    const preferred = detectPreferredLocale(request);
    if (preferred === 'en') {
      const url = request.nextUrl.clone();
      url.pathname = '/en';
      const response = NextResponse.redirect(url);
      response.cookies.set(COOKIE_NAME, 'en', { maxAge: COOKIE_MAX_AGE, path: '/' });
      return response;
    }
  }

  // Keep the cookie in sync with whatever language section the visitor is
  // actually on, so a manual switch (or a direct link) is remembered next time.
  const response = NextResponse.next();
  if (cookieLocale !== currentLocale) {
    response.cookies.set(COOKIE_NAME, currentLocale, { maxAge: COOKIE_MAX_AGE, path: '/' });
  }
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
