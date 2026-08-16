import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import { Services } from '@/components/home/services';
import { AdditionalServices } from '@/components/home/additional-services';
import Link from 'next/link';
import { Layers, Phone, Calculator } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Web Development, Software & Digital Marketing',
  description: 'Discover our wide range of services: custom web development, personalized software, AI chatbots, SEO, digital marketing and more for your business.',
  alternates: {
    canonical: 'https://devmarkpe.com/en/services',
    languages: {
      es: 'https://devmarkpe.com/servicios',
      en: 'https://devmarkpe.com/en/services',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devmarkpe.com/en/services',
    title: 'Services | Devmark - Web Development, Software & Digital Marketing',
    description: 'Discover our services: custom web development, software, AI chatbots, SEO and digital marketing.',
    siteName: 'Devmark',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'DEVMARK Services' }],
  },
};

const content = {
  lang: 'en' as const,
  header: {
    lang: 'en' as const,
    navLinks: [
      { href: '/en#hero', label: 'Home' },
      { href: '/en/services', label: 'Services' },
      { href: '/en/portfolio', label: 'Portfolio' },
      { href: '/en/hosting', label: 'Hosting' },
      { href: '/en#contact', label: 'Contact' },
    ],
    contactButton: 'Contact us',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  services: {
    lang: 'en' as const,
    title: 'Main services',
    subtitle: 'Comprehensive solutions to take your business to the next level.',
    moreInfoButton: 'More info',
    detailsButton: 'View details',
    quoteButton: 'Get a quote',
    fromLabel: 'From',
    items: [
      {
        icon: 'CodeXml',
        title: "Custom web development",
        description: "Custom websites programmed from scratch for corporate sites, landing pages, and PWAs with 100% responsive design.",
        tags: ["Corporate websites", "Landing pages", "PWAs"],
        href: '/en/services/custom-web-development'
      },
      {
        icon: 'Palette',
        title: "CMS and platform development",
        description: "Building websites and online stores with WordPress, Shopify, and other platforms. E-commerce with payment integrations.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/en/services/cms-development'
      },
      {
        icon: 'ServerCog',
        title: "Custom software development",
        description: "Internal systems (ERP, CRM), SaaS, and APIs. Integrations between tools to unify data and processes.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/en/services/custom-software-development'
      },
      {
        icon: 'Zap',
        title: "Process automation",
        description: "Automatic flows with Zapier/Make/APIs for leads, sales, reports, notifications, and back-office tasks.",
        tags: ["Zapier", "Make", "Lead automation"],
        href: '/en/services/process-automation'
      },
      {
        icon: 'Bot',
        title: "AI chatbots",
        description: "Chatbots for web, e-commerce, and social media, trained with your knowledge base for 24/7 support and sales.",
        tags: ["Web chatbots", "Social media", "24/7 support"],
        href: '/en/services/ai-chatbots'
      },
      {
        icon: 'LineChart',
        title: "SEO and web optimization",
        description: "Strategy, technical and content SEO, Core Web Vitals, and e-commerce. Increase organic traffic and conversions.",
        tags: ["SEO strategy", "Core Web Vitals", "Traffic"],
        href: '/en/services/seo-optimization'
      }
    ]
  },
  additionalServices: {
    lang: 'en' as const,
    title: 'Additional services',
    subtitle: '(Services that reinforce the main technological development)',
    moreInfoButton: 'More info',
    detailsButton: 'View details',
    quoteButton: 'Get a quote',
    fromLabel: 'From',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'UI/UX design',
        description: 'User-centered design. Interactive prototyping and wireframes. Modern, clean, and responsive interfaces.',
        href: '/en/services/ui-ux-design'
      },
      {
        icon: 'Megaphone',
        title: 'Digital marketing',
        description: 'Growth and customer acquisition strategies. Advertising campaigns (Google Ads, Meta Ads). Email marketing and sales automation.',
        href: '/en/services/digital-marketing'
      },
      {
        icon: 'Wrench',
        title: 'Support and maintenance',
        description: 'Regular security and plugin updates. Performance monitoring and backups. Incident resolution and continuous technical support.',
        href: '/en/services/support-maintenance'
      },
      {
        icon: 'Lightbulb',
        title: 'Technology consulting',
        description: 'Advice for process digitization. Choosing the right platforms for each business. Scalability and security strategies.',
        href: '/en/services/tech-consulting'
      },
    ],
  },
  footer: {
    copyright: "DEVMARK. All rights reserved."
  }
} as const;

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
                <Layers className="w-4 h-4 text-brand-blue shrink-0" />
                <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Our services</span>
              </div>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-gradient animate-fade-in-up stagger-1">
                Web Development and Software Services
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground animate-fade-in-up stagger-2">
                We offer complete technological solutions to boost your business. From web development to digital marketing, we have everything you need to grow in the digital world.
              </p>
            </header>
          </div>
        </section>

        {/* Services Sections */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 sm:gap-24 md:gap-32 pb-16">
            <Services {...content.services} />
            <AdditionalServices {...content.additionalServices} />
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 mb-5 rounded-2xl bg-brand-lavender/80 backdrop-blur-md text-brand-navy border border-brand-lavender/50 shadow-lg shadow-brand-blue/15 animate-fade-in-up">
              <Calculator className="w-4 h-4 text-brand-blue shrink-0" />
              <span className="font-medium text-[11px] sm:text-sm tracking-wider uppercase">Let&apos;s talk</span>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up stagger-1">
              Ready to start your project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up stagger-2">
              Contact us today and discover how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up stagger-3">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl border-2 border-transparent bg-brand-blue hover:bg-brand-navy-dark text-white font-semibold shadow-xl shadow-brand-blue/30 hover:shadow-brand-blue/40 transition-all duration-300 hover:-translate-y-1"
              >
                Contact now
                <Phone className="h-4 w-4" />
              </Link>
              <Link
                href="/en/quote"
                className="inline-flex items-center justify-center gap-2 h-[52px] px-8 rounded-2xl bg-white border-2 border-brand-blue text-brand-blue hover:bg-transparent font-semibold transition-all duration-300"
              >
                Quote project
                <Calculator className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer lang="en" copyright={content.footer.copyright} />
    </div>
  );
}
