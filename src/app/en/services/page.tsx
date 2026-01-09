import { AnimatedBackground } from '@/components/landing/animated-background';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { Services } from '@/components/landing/sections/services';
import { AdditionalServices } from '@/components/landing/sections/additional-services';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | DevMark - Web Development, Software & Digital Marketing',
  description: 'Discover our wide range of services: custom web development, personalized software, AI chatbots, SEO, digital marketing and more.',
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
    contactButton: 'Contact Us',
    aiAssistant: 'AI Assistant',
    aiAssistantTooltip: 'Hello! I am your AI assistant.',
  },
  services: {
    title: 'Main Services',
    subtitle: 'Comprehensive solutions to take your business to the next level.',
    moreInfoButton: 'More Info',
    items: [
      {
        icon: 'CodeXml',
        title: "Custom Web Development",
        description: "Custom websites programmed from scratch for corporate sites, landing pages, and PWAs with 100% responsive design.",
        tags: ["Corporate Websites", "Landing Pages", "PWAs"],
        href: '/en/services/custom-web-development'
      },
      {
        icon: 'Palette',
        title: "CMS and Platform Development",
        description: "Building websites and online stores with WordPress, Shopify, and other platforms. E-commerce with payment integrations.",
        tags: ["WordPress", "Shopify", "E-commerce"],
        href: '/en/services/cms-development'
      },
      {
        icon: 'ServerCog',
        title: "Custom Software Development",
        description: "Internal systems (ERP, CRM), SaaS, and APIs. Integrations between tools to unify data and processes.",
        tags: ["ERP/CRM", "SaaS", "APIs"],
        href: '/en/services/custom-software-development'
      },
      {
        icon: 'Zap',
        title: "Process Automation",
        description: "Automatic flows with Zapier/Make/APIs for leads, sales, reports, notifications, and back-office tasks.",
        tags: ["Zapier", "Make", "Lead Automation"],
        href: '/en/services/process-automation'
      },
      {
        icon: 'Bot',
        title: "AI Chatbots",
        description: "Chatbots for web, e-commerce, and social media, trained with your knowledge base for 24/7 support and sales.",
        tags: ["Web Chatbots", "Social Media", "24/7 Support"],
        href: '/en/services/ai-chatbots'
      },
      {
        icon: 'LineChart',
        title: "SEO and Web Optimization",
        description: "Strategy, technical and content SEO, Core Web Vitals, and e-commerce. Increase organic traffic and conversions.",
        tags: ["SEO Strategy", "Core Web Vitals", "Traffic"],
        href: '/en/services/seo-optimization'
      }
    ]
  },
  additionalServices: {
    title: 'Additional Services',
    subtitle: '(Services that reinforce the main technological development)',
    moreInfoButton: 'More Info',
    items: [
      {
        icon: 'DraftingCompass',
        title: 'UI/UX Design',
        description: 'User-centered design. Interactive prototyping and wireframes. Modern, clean, and responsive interfaces.',
        href: '/en/services/ui-ux-design'
      },
      {
        icon: 'Megaphone',
        title: 'Digital Marketing',
        description: 'Growth and customer acquisition strategies. Advertising campaigns (Google Ads, Meta Ads). Email marketing and sales automation.',
        href: '/en/services/digital-marketing'
      },
      {
        icon: 'Wrench',
        title: 'Support and Maintenance',
        description: 'Regular security and plugin updates. Performance monitoring and backups. Incident resolution and continuous technical support.',
        href: '/en/services/support-maintenance'
      },
      {
        icon: 'Lightbulb',
        title: 'Technology Consulting',
        description: 'Advice for process digitization. Choosing the right platforms for each business. Scalability and security strategies.',
        href: '/en/services/tech-consulting'
      },
    ],
  },
  footer: {
    copyright: "DevMark. All rights reserved."
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
              <Badge variant="outline" className="text-primary border-primary/50 mb-4">Our Services</Badge>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-gradient">
                Technological Solutions
              </h1>
              <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
              Ready to start your project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today and discover how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/en/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
              >
                Contact now
              </Link>
              <Link 
                href="/en/quote"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 font-semibold"
              >
                Quote project
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
