// Datos de contacto de DEVMARK en un solo lugar.

export const WHATSAPP_NUMBER = '51975646074';
export const PHONE_DISPLAY = '+51 975 646 074';
export const EMAIL = 'contacto@devmarkpe.com';
export const SUPPORT_EMAIL = 'soporte@devmarkpe.com';
/** Agenda de 30 minutos en Cal.com (la misma que usa el modal de reservas). */
export const BOOKING_URL = `https://cal.com/${process.env.NEXT_PUBLIC_CAL_LINK || 'devmark.pe/30min'}`;

/** Enlace de WhatsApp con el mensaje ya escrito, para que la conversacion empiece con contexto. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_GREETING = {
  es: 'Hola DEVMARK, quiero conversar sobre un proyecto.',
  en: 'Hi DEVMARK, I would like to talk about a project.',
} as const;
