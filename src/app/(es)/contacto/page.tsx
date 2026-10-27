import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { ContactPage } from '@/components/landing/contact-page';

const headerContent = {
  lang: 'es' as const,
  navLinks: [
    { href: '/#hero', label: 'Inicio' },
    { href: '/#services', label: 'Servicios' },
    { href: '/portfolio', label: 'Portafolio' },
    { href: '/hosting', label: 'Hosting' },
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
    '¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo se pondrá en contacto contigo.',
  contactSubtitle: 'Contáctanos ahora',
  emailLabel: 'Email:',
  email: 'contacto@devmarkpe.com',
  phoneLabel: 'Teléfono:',
  phone: '+51 975 646 074',
  timeZoneLabel: 'Hora Local:',
  formTitle: 'Formulario de contacto',
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
  scheduleButton: 'Agendar videollamada',
  quoteButton: 'Cotizar Proyecto',
};

const footerContent = {
  copyright: 'DEVMARK. Todos los derechos reservados.',
};

export default function ContactoPage() {
  return (
    <div className="bg-paper">
      <Header {...headerContent} />
      <main id="main-content" className="flex flex-col gap-2 sm:gap-3">
        <ContactPage lang="es" form={contactContent} />
      </main>
      <Footer lang="es" copyright={footerContent.copyright} />
    </div>
  );
}

