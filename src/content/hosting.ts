// Contenido de la pagina de hosting (Hostinger partner).

export const hostingFeatures = {
  es: [
  {
    icon: 'server',
    title: 'Hosting web profesional',
    description: 'Servidores optimizados para WordPress, aplicaciones web y más, con alta disponibilidad.',
    features: ['SSD NVMe ultra rápidos', 'Backups automáticos diarios', 'CDN gratuito incluido', 'Certificado SSL gratis']
  },
  {
    icon: 'globe',
    title: 'Dominios',
    description: 'Registro y gestión de dominios con las mejores extensiones del mercado.',
    features: ['.com, .pe, .net, .org', 'Protección de privacidad', 'DNS administrado', 'Transferencia gratuita']
  },
  {
    icon: 'mail',
    title: 'Correos corporativos',
    description: 'Emails profesionales con tu dominio. Configuración incluida sin costo adicional.',
    features: ['tu@tuempresa.com', 'Webmail moderno', 'Protección anti-spam', 'Soporte IMAP/SMTP']
  },
  {
    icon: 'lock',
    title: 'Seguridad SSL',
    description: 'Certificados SSL gratuitos para proteger tu sitio web y la información de tus clientes.',
    features: ['Certificado SSL Let\'s Encrypt', 'Instalación automática', 'Renovación automática', 'HTTPS garantizado']
  },
  {
    icon: 'zap',
    title: 'Alto rendimiento',
    description: 'Tecnología de última generación para que tu sitio cargue rápido.',
    features: ['LiteSpeed Cache', 'HTTP/3 habilitado', 'Optimización de imágenes', 'Compresión Gzip/Brotli']
  },
  {
    icon: 'server',
    title: 'Servidores VPS',
    description: 'Recursos dedicados y acceso root para aplicaciones, tiendas grandes y sistemas como un ERP. También con descuento usando el código DEVMARKPE.',
    features: ['Acceso root completo', 'CPU y RAM dedicadas', 'Ideal para apps, tiendas y ERP', 'Descuento con el código DEVMARKPE']
  }
],
  en: [
  {
    icon: 'server',
    title: 'Professional web hosting',
    description: 'Optimized servers for WordPress, web apps and more, with high availability.',
    features: ['Ultra-fast NVMe SSD', 'Automatic daily backups', 'Free CDN included', 'Free SSL certificate']
  },
  {
    icon: 'globe',
    title: 'Domains',
    description: 'Domain registration and management with the best TLDs.',
    features: ['.com, .pe, .net, .org', 'Privacy protection', 'Managed DNS', 'Free transfer']
  },
  {
    icon: 'mail',
    title: 'Corporate emails',
    description: 'Professional emails with your domain. Setup included at no extra cost.',
    features: ['you@yourcompany.com', 'Modern webmail', 'Anti-spam protection', 'IMAP/SMTP support']
  },
  {
    icon: 'lock',
    title: 'SSL security',
    description: 'Free SSL certificates to protect your website and customer data.',
    features: ["Let's Encrypt SSL", 'Automatic installation', 'Auto renewal', 'HTTPS guaranteed']
  },
  {
    icon: 'zap',
    title: 'High performance',
    description: 'Top technology so your site loads fast.',
    features: ['LiteSpeed Cache', 'HTTP/3 enabled', 'Image optimization', 'Gzip/Brotli compression']
  },
  {
    icon: 'server',
    title: 'VPS servers',
    description: 'Dedicated resources and root access for apps, large stores and systems like an ERP. Also discounted with the DEVMARKPE code.',
    features: ['Full root access', 'Dedicated CPU and RAM', 'Great for apps, stores and ERP', 'Discount with the DEVMARKPE code']
  }
],
} as const;

export const hostingPlans = {
  es: [
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
],
  en: [
  {
    name: 'Single',
    price: 'From S/20/mo',
    description: 'Perfect for personal websites and blogs',
    features: [
      '1 website',
      '50 GB SSD storage',
      '~10,000 monthly visits',
      '1 corporate email included',
      'Free SSL',
      'Free .com domain for 1 year',
    ],
    cta: {
      label: 'Get 20% extra off',
      href: 'https://partner-hostinger.example',
    },
  },
  {
    name: 'Premium',
    price: 'From S/39/mo',
    description: 'Ideal for business websites and small stores',
    features: [
      '100 websites',
      '100 GB SSD storage',
      '~25,000 monthly visits',
      '10 corporate emails included',
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
    price: 'From S/79/mo',
    description: 'For high-traffic and high-performance websites',
    features: [
      '100 websites',
      '200 GB NVMe SSD',
      '~100,000 monthly visits',
      '25 corporate emails included',
      'Priority support',
      'Daily backups',
      'Advanced security',
    ],
    cta: {
      label: 'Get 20% extra off',
      href: 'https://partner-hostinger.example',
    },
  },
],
} as const;
