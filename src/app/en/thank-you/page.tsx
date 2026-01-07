'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, MessageCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { AnimatedBackground } from '@/components/landing/animated-background';

const headerData = {
  lang: 'en' as const,
  navLinks: [
    { href: '/en#hero', label: 'Home' },
    { href: '/en#services', label: 'Services' },
    { href: '/en/portfolio', label: 'Portfolio' },
    { href: '/en/blog', label: 'Blog' },
    { href: '/en#contact', label: 'Contact' },
  ],
  contactButton: 'Contact',
  aiAssistant: 'AI Assistant',
  aiAssistantTooltip: 'Hello! I am your AI assistant.',
};

const footerData = {
  lang: 'en' as const,
  companyName: 'DevMark',
  companyDescription: 'Innovative digital solutions',
  quickLinksTitle: 'Quick Links',
  servicesTitle: 'Services',
  contactTitle: 'Contact',
  copyright: '© 2025 DevMark. All rights reserved.',
};

type MessageType = 'contact' | 'meeting' | 'quote' | 'default';

interface MessageConfig {
  icon: React.ReactNode;
  title: string;
  description: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const messages: Record<MessageType, MessageConfig> = {
  contact: {
    icon: <MessageCircle className="w-16 h-16" />,
    title: 'Thank you for contacting us! 🎉',
    description: 'We have successfully received your message',
    subtitle: 'Our team is reviewing it and will respond to you within the next 24 hours. Check your email for more details.',
    ctaText: 'Back to Home',
    ctaLink: '/en',
  },
  meeting: {
    icon: <Calendar className="w-16 h-16" />,
    title: 'Meeting scheduled! 📅',
    description: 'Your meeting has been successfully scheduled',
    subtitle: 'You will receive a confirmation email with the meeting details and the Google Meet link. We look forward to seeing you.',
    ctaText: 'View Services',
    ctaLink: '/en#services',
  },
  quote: {
    icon: <Sparkles className="w-16 h-16" />,
    title: 'Quote sent! ✨',
    description: 'We have processed your quote request',
    subtitle: 'Our team is preparing a personalized proposal for you. We will contact you soon with the details.',
    ctaText: 'Explore Portfolio',
    ctaLink: '/en/portfolio',
  },
  default: {
    icon: <CheckCircle className="w-16 h-16" />,
    title: 'Action completed! ✅',
    description: 'Your request has been successfully processed',
    subtitle: 'Thank you for trusting DevMark. We are here to help you achieve your digital goals.',
    ctaText: 'Back to Home',
    ctaLink: '/en',
  },
};

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(10);

  const type = (searchParams.get('type') as MessageType) || 'default';
  const customTitle = searchParams.get('title');
  const customMessage = searchParams.get('message');
  
  const config = messages[type] || messages.default;
  const displayTitle = customTitle || config.title;
  const displaySubtitle = customMessage || config.subtitle;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push(config.ctaLink);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted, config.ctaLink, router]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10">
        <Header {...headerData} />
        
        <main className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Animated icon */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-primary/10 p-6 rounded-full border-2 border-primary/30 animate-bounce">
                      <div className="text-primary">
                        {config.icon}
                      </div>
                    </div>
                  </div>

                  {/* Main title */}
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
                      {displayTitle}
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                      {config.description}
                    </p>
                  </div>

                  {/* Decorative divider */}
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>

                  {/* Secondary message */}
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    {displaySubtitle}
                  </p>

                  {/* Additional information cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-8">
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-sm font-medium text-foreground">Quick Response</div>
                      <div className="text-xs text-muted-foreground">Within 24 hours</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-sm font-medium text-foreground">Personalized Attention</div>
                      <div className="text-xs text-muted-foreground">Dedicated team</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">💡</div>
                      <div className="text-sm font-medium text-foreground">Innovative Solutions</div>
                      <div className="text-xs text-muted-foreground">Cutting-edge technology</div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-8 md:p-12 space-y-6">
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto btn-gradient group">
                    <Link href={config.ctaLink}>
                      <Home className="mr-2 h-5 w-5" />
                      {config.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 hover:bg-primary/10">
                    <Link href="/en/ai-assistant">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Talk to AI
                    </Link>
                  </Button>
                </div>

                {/* Redirect countdown */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected automatically in{' '}
                    <span className="font-bold text-primary text-lg">{countdown}</span>{' '}
                    seconds
                  </p>
                  <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Additional message */}
                <div className="text-center pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Have any questions? Contact us at{' '}
                    <a 
                      href="mailto:correo@devmarkpe.com" 
                      className="text-primary hover:underline font-medium"
                    >
                      correo@devmarkpe.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next steps section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Explore our services</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Discover how we can help you transform your digital business
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/en#services">
                          View services <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">See our work</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Check out the successful projects we have developed
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/en/portfolio">
                          View portfolio <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer {...footerData} />
      </div>
    </div>
  );
}
