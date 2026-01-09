'use server';

import nodemailer from 'nodemailer';
import { z } from 'zod';

const leadSchema = z.object({
  service: z.string().min(2, 'Selecciona un servicio'),
  details: z.string().min(6, 'Describe brevemente tu necesidad'),
  email: z.string().email('Ingresa un email válido'),
  phone: z.string().min(6, 'Ingresa un teléfono válido'),
  name: z.string().min(2, 'Ingresa tu nombre'),
  transcript: z.string().optional(),
});

export type LeadPayload = z.infer<typeof leadSchema>;

export type LeadResult = {
  success: boolean;
  message: string;
};

function buildTransporter() {
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

function leadHtml(payload: LeadPayload) {
  const { service, details, email, phone, name, transcript } = payload;
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#0a0a1a;">
    <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 60%,#0066FF 100%);padding:36px 28px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;letter-spacing:-0.4px;">Nuevo lead desde el chatbot</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">IA no disponible / sin cuota</p>
    </div>
    <div style="background:#14141f;padding:32px 28px;">
      <div style="background:linear-gradient(135deg,#0066FF15 0%,#3b82f615 100%);border-left:4px solid #0066FF;padding:18px;border-radius:10px;margin-bottom:22px;">
        <p style="margin:0;color:#fff;font-size:17px;font-weight:600;">Lead capturado automáticamente</p>
        <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">Responde en menos de 15 minutos para maximizar conversión</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Datos del lead</h2>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:0.3px;">Nombre:</strong> ${name}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:0.3px;">Email:</strong> ${email}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:0.3px;">Teléfono:</strong> ${phone}</p>
        <p style="margin:0;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;font-size:13px;text-transform:uppercase;letter-spacing:0.3px;">Servicio:</strong> ${service}</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Necesidad</h2>
        <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.6;white-space:pre-wrap;">${details}</p>
      </div>
      ${transcript ? `<div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;">
        <h2 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Transcripción completa</h2>
        <p style="margin:0;color:#9ca3af;font-size:14px;line-height:1.5;white-space:pre-wrap;">${transcript}</p>
      </div>` : ''}
    </div>
    <div style="background:#0a0a1a;padding:22px;text-align:center;border-top:1px solid #2a2a3e;">
      <p style="margin:0;color:#6b7280;font-size:12px;">DevMark · Lead generado automáticamente desde devmarkpe.com</p>
    </div>
  </div>
</body>
</html>`;
}

function confirmationHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;">
    <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 60%,#0066FF 100%);padding:42px 28px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:-0.3px;">¡Gracias, ${name}!</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:16px;">Tu consulta quedó registrada</p>
    </div>
    <div style="padding:30px 26px;">
      <p style="margin:0 0 16px;color:#1f2937;font-size:15px;line-height:1.6;">Un asesor te contactará en menos de 24 horas. Si necesitas respuesta inmediata, escríbenos a contacto@devmarkpe.com o al +51 975 646 074.</p>
      <p style="margin:0;color:#4b5563;font-size:14px;">Responde este correo para adjuntar más detalles o archivos.</p>
    </div>
  </div>
</body>
</html>`;
}

export async function sendLeadFromChat(payload: LeadPayload): Promise<LeadResult> {
  const result = leadSchema.safeParse(payload);
  if (!result.success) {
    return { success: false, message: 'Datos incompletos. Verifica email y teléfono.' };
  }

  try {
    const transporter = buildTransporter();
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: 'correo@devmarkpe.com',
      subject: '🤖 Nuevo lead (chat sin IA)',
      html: leadHtml(result.data),
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: result.data.email,
      subject: '✅ Recibimos tu consulta - DevMark',
      html: confirmationHtml(result.data.name),
    });

    return { success: true, message: 'Lead enviado correctamente' };
  } catch (error) {
    console.error('Error enviando lead del chat:', error);
    return { success: false, message: 'No pudimos enviar el lead. Intenta de nuevo.' };
  }
}
