'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, MessageCircle, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Header } from '@/components/landing/header';
import { Footer } from '@/components/landing/footer';
import { AnimatedBackground } from '@/components/landing/animated-background';

const headerData = {
  lang: 'es' as const,
  navLinks: [
    { href: '/#hero', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const footerData = {
  lang: 'es' as const,
  companyName: 'DevMark',
  companyDescription: 'Soluciones digitales innovadoras',
  quickLinksTitle: 'Enlaces Rápidos',
  servicesTitle: 'Servicios',
  contactTitle: 'Contacto',
  copyright: '© 2025 DevMark. Todos los derechos reservados.',
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
    title: '¡Gracias por contactarnos! 🎉',
    description: 'Hemos recibido tu mensaje exitosamente',
    subtitle: 'Nuestro equipo lo está revisando y te responderemos en las próximas 24 horas. Revisa tu correo electrónico para más detalles.',
    ctaText: 'Volver al Inicio',
    ctaLink: '/',
  },
  meeting: {
    icon: <Calendar className="w-16 h-16" />,
    title: '¡Reunión agendada! 📅',
    description: 'Tu reunión ha sido programada con éxito',
    subtitle: 'Recibirás un correo de confirmación con los detalles de la reunión y el enlace de Google Meet. Te esperamos.',
    ctaText: 'Ver Servicios',
    ctaLink: '/#services',
  },
  quote: {
    icon: <Sparkles className="w-16 h-16" />,
    title: '¡Cotización enviada! ✨',
    description: 'Hemos procesado tu solicitud de cotización',
    subtitle: 'Nuestro equipo está preparando una propuesta personalizada para ti. Te contactaremos pronto con los detalles.',
    ctaText: 'Explorar Portafolio',
    ctaLink: '/portfolio',
  },
  default: {
    icon: <CheckCircle className="w-16 h-16" />,
    title: '¡Acción completada! ✅',
    description: 'Tu solicitud ha sido procesada exitosamente',
    subtitle: 'Gracias por confiar en DevMark. Estamos aquí para ayudarte a alcanzar tus objetivos digitales.',
    ctaText: 'Volver al Inicio',
    ctaLink: '/',
  },
};

function GraciasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const type = (searchParams.get('type') as MessageType) || 'default';
  const customTitle = searchParams.get('title');
  const customMessage = searchParams.get('message');
  
  const config = messages[type] || messages.default;
  const displayTitle = customTitle || config.title;
  const displaySubtitle = customMessage || config.subtitle;

  useEffect(() => {
    setMounted(true);
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        <main className="container mx-auto px-4 py-20 md:py-32 min-h-[calc(100vh-300px)]">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-xl border-primary/20 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Icono animado */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="relative bg-primary/10 p-6 rounded-full border-2 border-primary/30 animate-bounce">
                      <div className="text-primary">
                        {config.icon}
                      </div>
                    </div>
                  </div>

                  {/* Título principal */}
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gradient">
                      {displayTitle}
                    </h1>
                    <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                      {config.description}
                    </p>
                  </div>

                  {/* Divider decorativo */}
                  <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>

                  {/* Mensaje secundario */}
                  <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    {displaySubtitle}
                  </p>

                  {/* Información adicional en tarjetas */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-8">
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">⚡</div>
                      <div className="text-sm font-medium text-foreground">Respuesta Rápida</div>
                      <div className="text-xs text-muted-foreground">En 24 horas</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">🎯</div>
                      <div className="text-sm font-medium text-foreground">Atención Personalizada</div>
                      <div className="text-xs text-muted-foreground">Equipo dedicado</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                      <div className="text-3xl mb-2">💡</div>
                      <div className="text-sm font-medium text-foreground">Soluciones Innovadoras</div>
                      <div className="text-xs text-muted-foreground">Tecnología de punta</div>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-8 md:p-12 space-y-6">
                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <Button asChild size="lg" className="w-full sm:w-auto btn-gradient group">
                    <Link href={config.ctaLink}>
                      <Home className="mr-2 h-5 w-5" />
                      {config.ctaText}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary/50 hover:bg-primary/10">
                    <Link href="/ai-assistant">
                      <Sparkles className="mr-2 h-5 w-5" />
                      Hablar con asistenteIA
                    </Link>
                  </Button>
                </div>

                {/* Contador de redirección */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Serás redirigido automáticamente en{' '}
                    <span className="font-bold text-primary text-lg">{countdown}</span>{' '}
                    segundos
                  </p>
                  <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden max-w-xs mx-auto">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-1000 ease-linear rounded-full"
                      style={{ width: `${((60 - countdown) / 60) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Mensaje adicional */}
                <div className="text-center pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    ¿Tienes alguna pregunta? Contáctanos en{' '}
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

            {/* Sección de próximos pasos */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/30 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">Explora nuestros servicios</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Descubre cómo podemos ayudarte a transformar tu negocio digital
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/#services">
                          Ver servicios <ArrowRight className="ml-1 h-4 w-4" />
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
                      <h3 className="font-semibold text-lg mb-2">Mira nuestro trabajo</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Conoce los proyectos exitosos que hemos desarrollado
                      </p>
                      <Button asChild variant="link" className="p-0 h-auto text-primary">
                        <Link href="/portfolio">
                          Ver portafolio <ArrowRight className="ml-1 h-4 w-4" />
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

export default function GraciasPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <GraciasContent />
    </Suspense>
  );
}
