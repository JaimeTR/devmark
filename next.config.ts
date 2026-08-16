import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.cal.com https://oijxeztgsemdyoansztg.supabase.co https://epmdauwektgtwujsisdh.supabase.co; frame-src https://app.cal.com;" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        // Shared projects Supabase (jaimetr.dev) storage — project cover images.
        protocol: 'https',
        hostname: 'epmdauwektgtwujsisdh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'genkit': false,
        '@genkit-ai/firebase': false,
        '@genkit-ai/flow': false,
        '@opentelemetry/exporter-jaeger': false,
        '@opentelemetry/sdk-node': false,
        'handlebars': false,
        'dotprompt': false,
        'fs': false,
        'path': false,
        'crypto': false,
        'module': false,
      };
    }
    
    // Don't try to resolve these modules
    config.externals = [...(config.externals || []), 
      '@genkit-ai/firebase',
      '@opentelemetry/exporter-jaeger',
      'dotprompt',
    ];
    
    return config;
  },
  experimental: {
    optimizePackageImports: ['@genkit-ai/googleai', 'genkit'],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
