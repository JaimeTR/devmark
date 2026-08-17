import nodemailer from 'nodemailer';

// Todas las notificaciones internas (cotizaciones, leads, contacto) van a
// estos dos destinos: el buzón de soporte del equipo y el correo personal
// de Jaime para no perder ningún aviso mientras el negocio es chico.
export const ADMIN_NOTIFICATION_EMAILS = 'soporte@devmarkpe.com,jaimetr1309@gmail.com';

// Nombre de remitente que ve el destinatario — sin esto, nodemailer usa el
// correo pelado (ej. "correo@devmarkpe.com" se mostraba como "correo").
export function getEmailFrom(): string {
  return `"Devmark" <${process.env.SMTP_EMAIL}>`;
}

export function buildTransporter() {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error('Faltan credenciales SMTP');
  }

  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const isSecure = port === 465; // Titan usa 465 con SSL

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2',
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Evita inyección de cabeceras al construir asuntos de correo con datos de
// usuario (CR/LF). nodemailer ya normaliza \r\n en los valores de header
// antes de enviar, pero esto se mantiene como defensa en profundidad y para
// evitar asuntos de correo con saltos de línea "raros".
export function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}
