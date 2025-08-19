
import { AnimatedBackground } from '@/components/landing/animated-background';
import { Footer } from '@/components/landing/footer';
import { Header } from '@/components/landing/header';
import { ProjectQuoter } from '@/components/ai/project-quoter';

const headerContent = {
  lang: 'es' as const,
  navLinks: [],
  contactButton: 'Contactar',
  aiAssistant: 'Asistente IA',
  aiAssistantTooltip: '¡Hola! Soy tu asistente de IA.',
};

const quoterContent = {
  lang: 'es' as const,
  title: 'Cotizador de Proyectos con IA',
  description:
    'Cuéntanos tu idea y nuestra IA generará una propuesta preliminar con alcance, precio estimado y recomendaciones. ¡Construyamos algo increíble juntos!',
  form: {
    projectName: {
      label: '¿Cuál es el nombre de tu proyecto?',
      placeholder: 'Ej: Mi increíble E-commerce',
    },
    projectType: {
      label: '¿Qué tipo de proyecto necesitas?',
      items: [
        { value: 'landing-page', label: 'Landing Page' },
        { value: 'corporate-website', label: 'Sitio Web Corporativo' },
        { value: 'ecommerce', label: 'E-commerce / Tienda Online' },
        { value: 'custom-software', label: 'Software a Medida (CRM, ERP, etc.)' },
        { value: 'pwa', label: 'Aplicación Web Progresiva (PWA)' },
        { value: 'other', label: 'Otro' },
      ],
    },
    features: {
      label: '¿Qué funcionalidades clave debe incluir?',
      description: 'Selecciona todas las que apliquen. Puedes dejarlo en blanco si no aplica.',
      items: [
        { id: 'blog', label: 'Sección de Blog' },
        { id: 'user-accounts', label: 'Cuentas de Usuario y Login' },
        { id: 'online-payments', label: 'Pagos en Línea' },
        { id: 'booking-system', label: 'Sistema de Reservas/Citas' },
        { id: 'admin-dashboard', label: 'Panel de Administración' },
        { id: 'ai-chatbot', label: 'Integración de Chatbot con IA' },
      ],
    },
    design: {
      label: '¿En qué estado se encuentra el diseño?',
      items: [
        { value: 'no-design', label: 'Necesito un diseño completo (UI/UX)' },
        { value: 'have-idea', label: 'Tengo una idea o wireframes básicos' },
        { value: 'have-design', label: 'Tengo un diseño completo listo' },
      ],
    },
    additionalInfo: {
      label: '¿Hay algo más que debamos saber?',
      placeholder:
        'Describe otras funcionalidades, público objetivo, integraciones específicas, etc.',
    },
    contactEmail: {
      label: 'Tu Dirección de Correo',
      placeholder: 'tu@email.com',
    },
    submitButton: 'Cotizar mi Proyecto',
    submitButtonPending: 'Analizando Proyecto...',
  },
  results: {
    title: 'Propuesta para',
    downloadButton: 'Descargar en PDF',
    contactButton: 'Conversar con Asesor',
    summaryLabel: 'Resumen del Proyecto',
    scopeLabel: 'Alcance Propuesto',
    priceLabel: 'Precio Estimado (USD)',
    recommendationsLabel: 'Recomendaciones de la IA',
    paymentMethodsLabel: 'Métodos de Pago',
    placeholder: 'Tu propuesta de proyecto aparecerá aquí...',
  },
};

const footerContent = {
  copyright: 'DevMark. Todos los derechos reservados.',
};

export default function QuotePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <ProjectQuoter content={quoterContent} />
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
