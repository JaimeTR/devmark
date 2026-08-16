'use server';

import { z } from 'zod';
import { buildTransporter, escapeHtml, sanitizeHeader, getEmailFrom, ADMIN_NOTIFICATION_EMAILS } from '@/app/actions/quoter-shared';

const contactSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').trim(),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres').trim(),
  email: z.string().email('Por favor ingresa un email válido').trim(),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 caracteres').trim(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').trim(),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
};

export async function sendContactEmail(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  // Honeypot anti-spam: si el campo oculto viene relleno, cortar.
  const botField = (formData.get('company') || '').toString().trim();
  if (botField.length > 0) {
    return {
      success: false,
      message: 'Hubo un problema al enviar el mensaje. Por favor inténtalo de nuevo.',
    };
  }

  const validatedFields = contactSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor verifica los datos ingresados',
      errors: validatedFields.error.flatten().fieldErrors as any,
    };
  }

  try {
    // Validar que las variables de entorno existan
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error('Variables de entorno SMTP no configuradas');
      return {
        success: false,
        message: 'Error en la configuración del servidor. Por favor contacta al administrador.',
      };
    }

    // Configurar transporte SMTP (Titan/Hostinger)
    const transporter = buildTransporter();

    // Verificar la conexión con mejor manejo de errores
    try {
      await transporter.verify();
    } catch (verifyError: any) {
      console.error('Error al verificar conexión SMTP:', verifyError.message);
      throw new Error(`Error de conexión SMTP: ${verifyError.message}`);
    }

    const { firstName, lastName, email, phone, message } = validatedFields.data;

    // Email al administrador
    await transporter.sendMail({
      from: getEmailFrom(),
      to: ADMIN_NOTIFICATION_EMAILS,
      subject: `🔔 Nuevo mensaje de contacto - ${sanitizeHeader(firstName)} ${sanitizeHeader(lastName)}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a1a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0a0a1a;">
            <!-- Header con gradiente -->
            <div style="background: linear-gradient(135deg, #0066FF 0%, #3b82f6 50%, #0066FF 100%); padding: 40px 30px; text-align: center; border-radius: 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">DEVMARK</h1>
              <p style="margin: 10px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Nuevo Mensaje de Contacto</p>
            </div>
            
            <!-- Contenido principal -->
            <div style="background-color: #14141f; padding: 40px 30px;">
              <!-- Alerta destacada -->
              <div style="background: linear-gradient(135deg, #0066FF15 0%, #3b82f615 100%); border-left: 4px solid #0066FF; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">💬 Nuevo lead recibido</p>
                <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 14px;">Responde lo antes posible para no perder la oportunidad</p>
              </div>
              
              <!-- Información del contacto -->
              <div style="background-color: #1a1a2e; border: 1px solid #2a2a3e; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                <h2 style="margin: 0 0 20px 0; color: #0066FF; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📋 Datos del Cliente</h2>
                
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 5px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nombre Completo</p>
                  <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 500;">${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
                </div>
                
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 5px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                  <p style="margin: 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0066FF; font-size: 16px; font-weight: 500; text-decoration: none;">${escapeHtml(email)}</a></p>
                </div>
                
                <div style="margin-bottom: 0;">
                  <p style="margin: 0 0 5px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</p>
                  <p style="margin: 0;"><a href="tel:${escapeHtml(phone)}" style="color: #0066FF; font-size: 16px; font-weight: 500; text-decoration: none;">${escapeHtml(phone)}</a></p>
                </div>
              </div>
              
              <!-- Mensaje -->
              <div style="background-color: #1a1a2e; border: 1px solid #2a2a3e; border-radius: 12px; padding: 25px;">
                <h2 style="margin: 0 0 15px 0; color: #0066FF; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">💬 Mensaje</h2>
                <p style="margin: 0; color: #d1d5db; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>
              
              <!-- Botón de acción -->
              <div style="margin-top: 30px; text-align: center;">
                <a href="mailto:${escapeHtml(email)}" style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #3b82f6 100%); color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);">Responder ahora →</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #0a0a1a; padding: 30px; text-align: center; border-top: 1px solid #2a2a3e;">
              <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 13px;">DEVMARK - Desarrollo Web & Soluciones Digitales</p>
              <p style="margin: 0; color: #4b5563; font-size: 12px;">Este correo fue generado automáticamente desde devmarkpe.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Email de confirmación al usuario
    await transporter.sendMail({
      from: getEmailFrom(),
      to: email,
      subject: '✅ ¡Hemos recibido tu mensaje! - DEVMARK',
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header con gradiente -->
            <div style="background: linear-gradient(135deg, #0066FF 0%, #3b82f6 50%, #0066FF 100%); padding: 50px 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; padding: 15px; margin-bottom: 15px;">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">¡Gracias, ${escapeHtml(firstName)}! 🎉</h1>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 18px; font-weight: 500;">Hemos recibido tu mensaje</p>
            </div>
            
            <!-- Contenido principal -->
            <div style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; color: #1f2937; font-size: 16px; line-height: 1.6;">
                Hola <strong style="color: #0066FF;">${escapeHtml(firstName)}</strong>,
              </p>
              
              <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Gracias por ponerte en contacto con <strong style="color: #0066FF;">DEVMARK</strong>. Tu mensaje es muy importante para nosotros y ya hemos comenzado a revisarlo.
              </p>
              
              <!-- Tarjeta destacada -->
              <div style="background: linear-gradient(135deg, #0066FF 0%, #3b82f6 100%); border-radius: 16px; padding: 30px; margin: 30px 0; box-shadow: 0 10px 30px rgba(0, 102, 255, 0.2);">
                <div style="text-align: center;">
                  <div style="margin-bottom: 15px;">
                    <span style="font-size: 48px;">⏱️</span>
                  </div>
                  <h2 style="margin: 0 0 10px 0; color: #ffffff; font-size: 22px; font-weight: 700;">¡Un asesor se contactará contigo pronto!</h2>
                  <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 15px;">Te responderemos dentro de las próximas <strong>24 horas</strong></p>
                </div>
              </div>
              
              <!-- Resumen del contacto -->
              <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 30px 0;">
                <h3 style="margin: 0 0 20px 0; color: #0066FF; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📋 Resumen de tu contacto</h3>
                
                <div style="margin-bottom: 12px;">
                  <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px; font-weight: 500;">Email de contacto</p>
                  <p style="margin: 0; color: #1f2937; font-size: 15px; font-weight: 500;">${escapeHtml(email)}</p>
                </div>
                
                <div>
                  <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 13px; font-weight: 500;">Teléfono</p>
                  <p style="margin: 0; color: #1f2937; font-size: 15px; font-weight: 500;">${escapeHtml(phone)}</p>
                </div>
              </div>
              
              <!-- Información adicional -->
              <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-left: 4px solid #0066FF; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; color: #1f2937; font-size: 15px; font-weight: 600;">💡 ¿Tienes más preguntas?</p>
                <p style="margin: 0; color: #4b5563; font-size: 14px; line-height: 1.5;">
                  No dudes en responder este correo o escribirnos directamente a <strong style="color: #0066FF;">correo@devmarkpe.com</strong>
                </p>
              </div>
              
              <!-- Beneficios -->
              <div style="margin: 30px 0;">
                <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: 600; text-align: center;">¿Por qué elegirnos? 🚀</h3>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px; text-align: center; width: 33.33%;">
                      <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
                      <p style="margin: 0; color: #4b5563; font-size: 13px; font-weight: 500;">Respuesta rápida</p>
                    </td>
                    <td style="padding: 12px; text-align: center; width: 33.33%;">
                      <div style="font-size: 32px; margin-bottom: 8px;">🎯</div>
                      <p style="margin: 0; color: #4b5563; font-size: 13px; font-weight: 500;">Soluciones personalizadas</p>
                    </td>
                    <td style="padding: 12px; text-align: center; width: 33.33%;">
                      <div style="font-size: 32px; margin-bottom: 8px;">💼</div>
                      <p style="margin: 0; color: #4b5563; font-size: 13px; font-weight: 500;">Expertos certificados</p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://devmarkpe.com" style="display: inline-block; background: linear-gradient(135deg, #0066FF 0%, #3b82f6 100%); color: #ffffff; padding: 16px 40px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 102, 255, 0.3);">Visita nuestro sitio web →</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <h2 style="margin: 0 0 15px 0; color: #0066FF; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">DEVMARK</h2>
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                Desarrollo Web & Soluciones Digitales<br>
                Transformamos ideas en experiencias digitales excepcionales
              </p>
              <div style="margin: 20px 0;">
                <a href="https://devmarkpe.com" style="color: #0066FF; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 500;">Inicio</a>
                <a href="https://devmarkpe.com/servicios" style="color: #0066FF; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 500;">Servicios</a>
                <a href="https://devmarkpe.com/portfolio" style="color: #0066FF; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 500;">Portfolio</a>
              </div>
              <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 12px;">
                © 2026 DEVMARK. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return {
      success: true,
      message: '¡Mensaje enviado exitosamente! Un asesor personalizado se pondrá en contacto contigo pronto.',
    };
  } catch (error: any) {
    console.error('Error completo al enviar email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack,
    });
    
    // Mensajes de error más específicos
    let errorMessage = 'Hubo un error al enviar el mensaje. Por favor intenta más tarde o contacta directamente a correo@devmarkpe.com';
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Error de conexión con el servidor de correo. Por favor verifica tu conexión a internet e intenta nuevamente.';
    } else if (error.code === 'EAUTH') {
      errorMessage = 'Error de autenticación del servidor. Por favor contacta al administrador.';
    } else if (error.message?.includes('SMTP')) {
      errorMessage = 'Error en el servicio de correo. Por favor contacta directamente a correo@devmarkpe.com';
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
}
