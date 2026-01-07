import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
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
