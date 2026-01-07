import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { Contact } from '@/components/landing/sections/contact';

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/#hero', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/blog', label: 'Blog' },
    { href: '/contacto', label: 'Contacto' },
  ],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const contactContent = {
  lang: 'es' as const,
  title: 'Contáctanos',
  description:
    '¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo global se pondrá en contacto contigo.',
  contactSubtitle: 'Contáctanos ahora',
  emailLabel: 'Email:',
  email: 'contacto@devmarkpe.com',
  phoneLabel: 'Teléfono:',
  phone: '+51 930 414 494',
  timeZoneLabel: 'Hora Local:',
  formTitle: 'Formulario de Contacto',
  formDescription: 'Completa el formulario y nos pondremos en contacto contigo.',
  firstNameLabel: 'Nombre',
  firstNamePlaceholder: 'Juan',
  lastNameLabel: 'Apellido',
  lastNamePlaceholder: 'Pérez',
  emailFormLabel: 'Email',
  emailPlaceholder: 'tu@email.com',
  phoneFormLabel: 'Teléfono',
  phonePlaceholder: '+51 999 999 999',
  messageLabel: 'Mensaje',
  messagePlaceholder: 'Cuéntanos sobre tu proyecto...',
  submitButton: 'Enviar Mensaje',
  scheduleButton: 'Agendar Reunión',
  quoteButton: 'Cotizar Proyecto',
};

const footerContent = {
  copyright: 'DevMark. Todos los derechos reservados.',
};

export default function ContactoPage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main id="main-content">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <Contact {...contactContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
