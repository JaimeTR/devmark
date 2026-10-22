import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
import { Contact } from '@/components/home/contact';
import { Faq } from '@/components/landing/faq';
import { homeContent } from '@/content/home';

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
    '¿Listo para llevar tu negocio al siguiente nivel? Completa el formulario o agenda una reunión y nuestro equipo global se pondrá en contacto contigo.',
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
  scheduleButton: 'Agendar Reunión',
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
        <Contact {...contactContent} heading={homeContent.es.contact.title} first />
        <Faq lang="es" />
      </main>
      <Footer lang="es" copyright={footerContent.copyright} />
    </div>
  );
}

