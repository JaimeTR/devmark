import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import Link from 'next/link';
import { Server, Mail, Lock, Zap, Globe, HardDrive } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hosting & Domains | DevMark - Official Hostinger Partner',
  description: 'Professional hosting, domains, corporate emails and SSL. As Hostinger partners, we offer an additional 20% discount.',
};

const content = {
  lang: 'en' as const,
  header: {
    navLinks: [
      { href: '/en#hero', label: 'Home' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en#contact', label: 'Contact' },
    ],
    contactButton: 'Contact',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  footer: {
    copyright: 'DevMark. All rights reserved.'
  }
} as const;

const hostingFeatures = [
  {
    icon: Server,
    title: 'Professional Web Hosting',
    description: 'Optimized servers for WordPress, web apps and more. Guaranteed 99.9% uptime.',
    features: ['Ultra-fast NVMe SSD', 'Automatic daily backups', 'Free CDN included', 'Free SSL certificate']
  },
  {
    icon: Globe,
    title: 'Domains',
    description: 'Domain registration and management with the best TLDs.',
    features: ['.com, .pe, .net, .org', 'Privacy protection', 'Managed DNS', 'Free transfer']
  },
  {
    icon: Mail,
    title: 'Corporate Emails',
    description: 'Professional emails with your domain. Setup included at no extra cost.',
    features: ['you@yourcompany.com', 'Modern webmail', 'Anti-spam protection', 'IMAP/SMTP support']
  },
  {
    icon: Lock,
    title: 'SSL Security',
    description: 'Free SSL certificates to protect your website and customer data.',
    features: ["Let's Encrypt SSL", 'Automatic installation', 'Auto renewal', 'HTTPS guaranteed']
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Top technology to make your site load in under 1 second.',
    features: ['LiteSpeed Cache', 'HTTP/3 enabled', 'Image optimization', 'Gzip/Brotli compression']
  },
  {
    icon: HardDrive,
    title: 'Storage & Databases',
    description: 'Unlimited space on premium plans and optimized MySQL/MariaDB databases.',
    features: ['SSD storage', 'MySQL databases', 'phpMyAdmin included', 'Simple management']
  }
];

const plans = [
  {
    name: 'Single',
    price: 'From $2.99/mo',
    description: 'Perfect for personal websites and blogs',
    features: [
      '1 website',
      '50 GB SSD storage',
      '~10,000 monthly visits',
      'Free SSL',
      'Weekly backups',
    ],
    cta: {
      label: 'Get 20% extra off',
      href: 'https://partner-hostinger.example',
    },
  },
  {
    name: 'Premium',
    price: 'From $4.99/mo',
    description: 'Ideal for business websites and small stores',
    features: [
      '100 websites',
      '100 GB SSD storage',
      '~25,000 monthly visits',
      'Free domain for 1 year',
      'Daily backups',
      'Staging & Git',
    ],
    cta: {
      label: 'Get 20% extra off',
      href: 'https://partner-hostinger.example',
    },
  },
  {
    name: 'Business',
    price: 'From $8.99/mo',
    description: 'For high-traffic and high-performance websites',
    features: [
      'Unlimited websites',
      '200 GB NVMe SSD',
      '~50,000 monthly visits',
      'Priority support',
      'Daily backups',
      'Advanced security',
    ],
    cta: {
      label: 'Get 20% extra off',
      href: 'https://partner-hostinger.example',
    },
  },
];

export default function HostingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />

      <main className="pt-20">
        {/* Hero Section with Partner banner */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-primary font-semibold">OFFICIAL HOSTINGER PARTNER</span>
              </div>

              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6">Professional Hosting for Your Business</h1>
              <p className="text-xl text-muted-foreground mb-8">
                As official Hostinger partners, we offer top-tier web hosting technology with an <span className="text-primary font-semibold">additional 20% discount</span> on their promotions. We also set up your corporate emails and SSL certificate for free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <a 
                  href="https://hostinger.com?REFERRALCODE=JAIMETRDEV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
                >
                  Get 20% discount
                </a>
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 rounded-lg">
                  <span className="text-sm font-medium">Code:</span>
                  <code className="px-3 py-1 bg-primary/10 rounded text-primary font-mono font-bold">DEVMARK</code>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                🎁 FREE domain and website migration · 24/7 support in Spanish · 30-day money-back guarantee
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostingFeatures.map((feature, index) => (
                <div key={index} className="p-6 rounded-lg bg-primary/5 border border-primary/10">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-headline text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((f, i) => (
                      <li key={i} className="text-sm">• {f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-center">Plans & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <div key={idx} className="rounded-lg border border-primary/10 bg-background p-6">
                  <h3 className="font-headline text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-primary text-3xl font-bold mb-2">{plan.price}</p>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-sm">• {f}</li>
                    ))}
                  </ul>
                  <Link href={plan.cta.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
                    {plan.cta.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
