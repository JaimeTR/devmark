
import { Suspense } from 'react';
import { AnimatedBackground } from '@/components/home/animated-background';
import { Footer } from '@/components/home/footer';
import { Header } from '@/components/home/header';
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
  badgeLabel: 'Cotizador DEVMARKAI',
  title: 'Cotizador de proyectos con IA',
  description:
    'Cuéntanos tu idea y nuestra IA generará una propuesta preliminar con alcance, precio estimado y recomendaciones. ¡Construyamos algo increíble juntos!',
  form: {
    responsibleName: {
      label: '¿Cuál es tu nombre?',
      placeholder: 'Ej: María Torres',
    },
    companyName: {
      label: '¿Tienes una empresa? (opcional)',
      placeholder: 'Ej: Torres Studio',
    },
    projectName: {
      label: '¿Cuál es el nombre de tu proyecto?',
      placeholder: 'Ej: Mi increíble e-commerce',
    },
    projectType: {
      label: '¿Qué tipo de proyecto necesitas?',
      items: [
        { value: 'landing-page', label: 'Landing page' },
        { value: 'corporate-website', label: 'Sitio web corporativo' },
        { value: 'ecommerce', label: 'E-commerce / tienda online' },
        { value: 'custom-software', label: 'Software a medida (CRM, ERP, etc.)' },
        { value: 'pwa', label: 'Aplicación web progresiva (PWA)' },
        { value: 'other', label: 'Otro' },
      ],
      otherLabel: 'Cuéntanos qué tipo de proyecto necesitas',
      otherPlaceholder: 'Ej: Aplicación móvil, sistema de reservas, integración a medida...',
    },
    features: {
      label: '¿Qué funcionalidades clave debe incluir?',
      description: 'Selecciona todas las que apliquen. Puedes dejarlo en blanco si no aplica.',
      items: [
        { id: 'blog', label: 'Sección de blog' },
        { id: 'user-accounts', label: 'Cuentas de usuario y login' },
        { id: 'online-payments', label: 'Pagos en línea' },
        { id: 'booking-system', label: 'Sistema de reservas/citas' },
        { id: 'admin-dashboard', label: 'Panel de administración' },
        { id: 'ai-chatbot', label: 'Integración de chatbot con IA' },
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
    timeline: {
      label: '¿Para cuándo necesitas el proyecto?',
      items: [
        { value: 'urgent', label: 'Lo antes posible (urgente)' },
        { value: '1-2-months', label: 'En 1 a 2 meses' },
        { value: 'flexible', label: 'Sin apuro, soy flexible' },
      ],
    },
    currency: {
      label: '¿En qué moneda quieres tu cotización?',
      items: [
        { value: 'PEN', label: 'Soles (S/)' },
        { value: 'USD', label: 'Dólares ($)' },
        { value: 'other', label: 'Otra moneda' },
      ],
      otherLabel: '¿En qué moneda?',
      otherPlaceholder: 'Ej: Euros, pesos mexicanos...',
    },
    additionalInfo: {
      label: '¿Hay algo más que debamos saber?',
      placeholder:
        'Describe otras funcionalidades, público objetivo, integraciones específicas, etc.',
    },
    contactEmail: {
      label: 'Tu dirección de correo',
      placeholder: 'tu@email.com',
    },
    nextButton: 'Siguiente',
    backButton: 'Atrás',
    editStepButton: 'Editar',
    editButton: 'Editar respuestas',
    submitButton: 'Cotizar mi proyecto',
    submitButtonPending: 'Analizando proyecto...',
  },
  results: {
    title: 'Propuesta para',
    downloadButton: 'Descargar en PDF',
    contactButton: 'Conversar con asesor',
    whatsappButton: 'Validar por WhatsApp',
    disclaimer: 'Este precio es aproximado. Para confirmarlo, envíanos tu propuesta o ficha por correo o WhatsApp y lo validamos contigo ahora.',
    summaryLabel: 'Resumen del proyecto',
    scopeLabel: 'Detalle y alcance del proyecto',
    priceLabel: 'Precio estimado',
    recommendationsLabel: 'Recomendaciones de la IA',
    paymentMethodsLabel: 'Métodos de pago',
    qrCaption: 'Escanea para pagar con Yape / Plin',
    placeholder: 'Tu propuesta de proyecto aparecerá aquí...',
    generatedLabel: 'Generado el',
    validUntilLabel: 'Válido hasta',
    documentTitle: 'Propuesta de proyecto',
    projectLabel: 'Proyecto',
    contactLabel: 'Contacto',
    preparedForLabel: 'Preparado para',
    totalLabel: 'Total estimado',
    signatureRepName: 'Jaime Tarazona',
    signatureRepRole: 'Fundador · DEVMARK',
    signatureAiRole: 'DEVMARK AI · Cotizador',
    signatureNote: 'Propuesta generada automáticamente por DEVMARK AI, pendiente de confirmación por el equipo.',
  },
};

const footerContent = {
  copyright: 'DEVMARK. Todos los derechos reservados.',
};

export default function QuotePage() {
  return (
    <div className="relative overflow-x-hidden bg-background">
      <AnimatedBackground />
      <Header {...headerContent} />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32">
          <Suspense fallback={null}>
            <ProjectQuoter content={quoterContent} />
          </Suspense>
        </div>
      </main>
      <Footer copyright={footerContent.copyright} />
    </div>
  );
}
