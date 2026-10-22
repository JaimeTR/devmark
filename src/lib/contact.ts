// Datos de contacto de DEVMARK en un solo lugar.

export const WHATSAPP_NUMBER = '51975646074';
export const PHONE_DISPLAY = '+51 975 646 074';
export const EMAIL = 'contacto@devmarkpe.com';
export const SUPPORT_EMAIL = 'soporte@devmarkpe.com';

/** Horario de atencion (el mismo que figura en Google). */
export const HOURS = { es: 'Lunes a viernes, 9:00 a 18:00 (hora de Lima)', en: 'Monday to Friday, 9:00 to 18:00 (Lima time)' } as const;
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
