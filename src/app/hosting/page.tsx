import { AnimatedBackground } from '@/components/home/animated-background';
import { Header } from '@/components/home/header';
import { Footer } from '@/components/home/footer';
import Link from 'next/link';
import { ArrowLeft, Check, Server, Mail, Lock, Zap, Globe, HardDrive } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Hosting y Dominios | DevMark - Partner Oficial de Hostinger',
  description: 'Servicios de hosting profesional, dominios, correos corporativos y SSL. Como partners de Hostinger, te ofrecemos 20% de descuento adicional.',
};

const content = {
  lang: 'es',
  header: {
    navLinks: [
      { href: '/#hero', label: 'Inicio' },
      { href: '/servicios', label: 'Servicios' },
      { href: '/portfolio', label: 'Portafolio' },
      { href: '/hosting', label: 'Hosting' },
      { href: '/#contact', label: 'Contacto' },
    ],
    contactButton: 'Contactar',
    aiAssistant: 'Asistente IA',
    aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
  },
  footer: {
    copyright: "DevMark. Todos los derechos reservados."
  }
} as const;

const hostingFeatures = [
  {
    icon: Server,
    title: 'Hosting Web Profesional',
    description: 'Servidores optimizados para WordPress, aplicaciones web y más. 99.9% de uptime garantizado.',
    features: ['SSD NVMe ultra rápidos', 'Backups automáticos diarios', 'CDN gratuito incluido', 'Certificado SSL gratis']
  },
  {
    icon: Globe,
    title: 'Dominios',
    description: 'Registro y gestión de dominios con las mejores extensiones del mercado.',
    features: ['.com, .pe, .net, .org', 'Protección de privacidad', 'DNS administrado', 'Transferencia gratuita']
  },
  {
    icon: Mail,
    title: 'Correos Corporativos',
    description: 'Emails profesionales con tu dominio. Configuración incluida sin costo adicional.',
    features: ['tu@tuempresa.com', 'Webmail moderno', 'Protección anti-spam', 'Soporte IMAP/SMTP']
  },
  {
    icon: Lock,
    title: 'Seguridad SSL',
    description: 'Certificados SSL gratuitos para proteger tu sitio web y la información de tus clientes.',
    features: ['Certificado SSL Let\'s Encrypt', 'Instalación automática', 'Renovación automática', 'HTTPS garantizado']
  },
  {
    icon: Zap,
    title: 'Alto Rendimiento',
    description: 'Tecnología de última generación para que tu sitio cargue en menos de 1 segundo.',
    features: ['LiteSpeed Cache', 'HTTP/3 habilitado', 'Optimización de imágenes', 'Compresión Gzip/Brotli']
  },
  {
    icon: HardDrive,
    title: 'Almacenamiento y Bases de Datos',
    description: 'Espacio ilimitado en planes premium y bases de datos MySQL/MariaDB optimizadas.',
    features: ['Almacenamiento SSD', 'Bases de datos MySQL', 'phpMyAdmin incluido', 'Gestión sencilla']
  }
];

const plans = [
  {
    name: 'Single',
    price: 'Desde S/20/mes',
    description: 'Perfecto para sitios web personales y blogs',
    features: [
      '1 sitio web',
      '50 GB almacenamiento SSD',
      '~10,000 visitas mensuales',
      '1 correo corporativo incluido',
      'SSL gratuito',
      'Dominio .com gratis el primer año'
    ],
    recommended: false
  },
  {
    name: 'Premium',
    price: 'Desde S/39/mes',
    description: 'Ideal para negocios y e-commerce',
    features: [
      '100 sitios web',
      '100 GB almacenamiento SSD',
      '~25,000 visitas mensuales',
      '10 correos corporativos incluidos',
      'SSL gratuito',
      'Dominio .com gratis',
      'Backups automáticos semanales'
    ],
    recommended: true
  },
  {
    name: 'Business',
    price: 'Desde S/79/mes',
    description: 'Para proyectos de alto tráfico',
    features: [
      '100 sitios web',
      '200 GB almacenamiento SSD',
      '~100,000 visitas mensuales',
      '25 correos corporativos incluidos',
      'SSL gratuito',
      'Dominio .com gratis',
      'Backups automáticos diarios',
      'CDN gratuito',
      'Soporte prioritario'
    ],
    recommended: false
  }
];

export default function HostingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...content.header} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 animate-fade-in-up">
                <span className="text-primary font-semibold">PARTNER OFICIAL DE HOSTINGER</span>
              </div>
              
              <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-6 animate-fade-in-up stagger-1">
                Hosting Profesional para tu Negocio
              </h1>
              <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up stagger-2">
                Como partners oficiales de Hostinger, te ofrecemos la mejor tecnología de alojamiento web con <span className="text-primary font-semibold">20% de descuento adicional</span> sobre sus promociones. Además, configuramos tus correos profesionales y certificado SSL de forma gratuita.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up stagger-3">
                <a 
                  href="https://hostinger.com?REFERRALCODE=JAIMETRDEV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
                >
                  Obtener 20% de descuento
                </a>
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-primary/30 rounded-lg">
                  <span className="text-sm font-medium">Código:</span>
                  <code className="px-3 py-1 bg-primary/10 rounded text-primary font-mono font-bold">DEVMARK</code>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                🎁 Migración de dominio y sitio web <span className="font-semibold">GRATIS</span> · Soporte 24/7 en español · Garantía de reembolso de 30 días
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
              Todo lo que necesitas para tu presencia online
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hostingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-background rounded-lg p-6 border border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-3 bg-primary/10 rounded-lg mb-4 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-4">
              Planes de Hosting
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Todos los planes incluyen configuración gratuita de correos corporativos y certificado SSL por parte de nuestro equipo
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative rounded-lg p-8 border ${
                    plan.recommended 
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5' 
                      : 'border-border/40 bg-background'
                  } hover:shadow-xl transition-all duration-300`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Más popular
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="https://hostinger.com?REFERRALCODE=JAIMETRDEV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.recommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'border border-primary/30 text-primary hover:bg-primary/10'
                    }`}
                  >
                    Contratar ahora
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
                Servicios adicionales incluidos
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Configuración de correos corporativos
                  </h3>
                  <p className="text-muted-foreground">
                    Configuramos tus cuentas de correo profesionales (contacto@tuempresa.com, ventas@tuempresa.com, etc.) sin costo adicional.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Instalación de certificado SSL
                  </h3>
                  <p className="text-muted-foreground">
                    Instalamos y configuramos tu certificado SSL gratuito para que tu sitio sea seguro (HTTPS) desde el primer día.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Migración gratuita
                  </h3>
                  <p className="text-muted-foreground">
                    Migramos tu sitio web y dominio desde tu proveedor actual sin costo y sin tiempo de inactividad.
                  </p>
                </div>
                
                <div className="bg-background rounded-lg p-6 border border-border/40">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Optimización de rendimiento
                  </h3>
                  <p className="text-muted-foreground">
                    Configuramos caché, compresión y otras optimizaciones para que tu sitio cargue lo más rápido posible.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Domains & Email Plans */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
                Dominios y correos corporativos
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative rounded-lg p-8 border border-border/40 bg-background hover:shadow-xl transition-all duration-300`}>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Registro de Dominio
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">Desde S/120/año</div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Registra tu dominio .com, .pe o .net con gestión y renovación automática.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '.com, .pe, .net, .org',
                      'Protección de privacidad incluida',
                      'DNS administrado',
                      'Al comprar un dominio recibes 10 correos corporativos de 1 GB gratis'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative rounded-lg p-8 border border-border/40 bg-background hover:shadow-xl transition-all duration-300`}>
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Correos Corporativos
                  </h3>
                  <div className="text-3xl font-bold text-primary mb-2">S/60/año · 1 GB</div>
                  <p className="text-sm text-muted-foreground mb-6">
                    Cada correo incluye 1 GB de espacio. Contrata a tu medida, sin mínimos.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '1 GB de espacio por cuenta',
                      'tu@tuempresa.com profesional',
                      'Webmail y soporte IMAP/SMTP',
                      'Protección anti-spam',
                      '10 correos gratis de 1 GB al comprar un dominio'
                    ].map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-6">
              ¿Necesitas ayuda para elegir tu plan?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para asesorarte y ayudarte a encontrar la solución de hosting perfecta para tu proyecto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contacto"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-semibold"
              >
                Contactar ahora
              </Link>
              <a 
                href="https://hostinger.com?REFERRALCODE=JAIMETRDEV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-all duration-300 font-semibold"
              >
                Ver planes en Hostinger
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer copyright={content.footer.copyright} />
    </div>
  );
}
