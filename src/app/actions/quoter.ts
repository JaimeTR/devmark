// This file is machine-generated - edit with care!

'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';
import { quoteProject, type QuoteProjectOutput } from '@/ai/flows/quote-project-flow';
import { supabase, type QuoteRecord, isSupabaseConfigured } from '@/lib/supabase';

const formSchema = z.object({
    projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
    projectType: z.enum(['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other']),
    features: z.array(z.string()),
    design: z.enum(['no-design', 'have-idea', 'have-design']),
    additionalInfo: z.string().optional(),
    contactEmail: z.string().email('Please enter a valid email address.'),
    lang: z.enum(['es', 'en']),
    // Honeypot anti-spam: si viene relleno, descartar el flujo.
    company: z.string().optional(),
});

export type FormState = {
  message: string | null;
  data?: QuoteProjectOutput | null;
  errors?: z.ZodIssue[] | null;
  projectName?: string | null;
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function adminQuoteHtml(q: {
  projectName: string;
  projectType: string;
  contactEmail: string;
  features: string[];
  output: QuoteProjectOutput;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#0a0a1a;">
    <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 60%,#0066FF 100%);padding:36px 28px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;letter-spacing:-0.4px;">Nueva cotización solicitada</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Propuesta generada por el cotizador con IA de DevMark</p>
    </div>
    <div style="background:#14141f;padding:32px 28px;">
      <div style="background:linear-gradient(135deg,#0066FF15 0%,#3b82f615 100%);border-left:4px solid #0066FF;padding:18px;border-radius:10px;margin-bottom:22px;">
        <p style="margin:0;color:#fff;font-size:17px;font-weight:600;">Nuevo lead capturado</p>
        <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">Contacta al cliente lo antes posible para maximizar conversión</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Datos del lead</h2>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Proyecto:</strong> ${escapeHtml(q.projectName)}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Tipo:</strong> ${escapeHtml(q.projectType)}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Funcionalidades:</strong> ${q.features.length ? escapeHtml(q.features.join(', ')) : 'Sin especificar'}</p>
        <p style="margin:0;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Email de contacto:</strong> <a href="mailto:${escapeHtml(q.contactEmail)}" style="color:#0066FF;text-decoration:none;">${escapeHtml(q.contactEmail)}</a></p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Precio estimado</h2>
        <p style="margin:0;color:#fff;font-size:22px;font-weight:700;">${escapeHtml(q.output.price)}</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Resumen</h2>
        <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.6;">${escapeHtml(q.output.summary)}</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Alcance</h2>
        <ul style="margin:0;padding-left:18px;color:#d1d5db;font-size:14px;line-height:1.7;">${q.output.scope.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Recomendaciones</h2>
        <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.6;">${escapeHtml(q.output.recommendations)}</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Métodos de pago</h2>
        <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.6;">${escapeHtml(q.output.paymentMethods)}</p>
      </div>
      <div style="margin-top:30px;text-align:center;">
        <a href="mailto:${escapeHtml(q.contactEmail)}" style="display:inline-block;background:linear-gradient(135deg,#0066FF 0%,#3b82f6 100%);color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;box-shadow:0 4px 15px rgba(0,102,255,.3);">Contactar al cliente →</a>
      </div>
    </div>
    <div style="background:#0a0a1a;padding:22px;text-align:center;border-top:1px solid #2a2a3e;">
      <p style="margin:0;color:#6b7280;font-size:12px;">DevMark · Cotización generada automáticamente desde devmarkpe.com</p>
    </div>
  </div>
</body>
</html>`;
}

function userQuoteHtml(q: { projectName: string; contactEmail: string; output: QuoteProjectOutput; lang: string }) {
  const isEs = q.lang === 'es';
  const heading = isEs ? '¡Tu cotización está lista!' : 'Your quote is ready!';
  const est = isEs ? 'Precio estimado' : 'Estimated price';
  const summary = isEs ? 'Resumen' : 'Summary';
  const scope = isEs ? 'Alcance propuesto' : 'Proposed scope';
  const rec = isEs ? 'Recomendaciones' : 'Recommendations';
  const pay = isEs ? 'Métodos de pago' : 'Payment methods';
  const cta = isEs ? 'Conversar con un asesor' : 'Talk to an advisor';
  const msg = isEs
    ? `Gracias por usar el cotizador de DevMark. Aquí tienes el resumen de tu proyecto "${q.projectName}". Un asesor te contactará en menos de 24 horas. Puedes descargar el PDF desde la misma página o responder este correo.`
    : `Thank you for using the DevMark quoter. Here is the summary for your project "${q.projectName}". An advisor will contact you within 24 hours. You can download the PDF from the same page or reply to this email.`;
  const reply = isEs
    ? 'Responde este correo para ajustar los detalles o adjuntar archivos.'
    : 'Reply to this email to adjust details or attach files.';

  return `<!DOCTYPE html>
<html lang="${q.lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#fff;">
    <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 60%,#0066FF 100%);padding:42px 28px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:28px;font-weight:700;letter-spacing:-.3px;">${heading}</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:16px;">${escapeHtml(q.projectName)}</p>
    </div>
    <div style="padding:30px 26px;">
      <p style="margin:0 0 20px;color:#1f2937;font-size:15px;line-height:1.6;">${escapeHtml(msg)}</p>
      <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 100%);border-radius:16px;padding:26px;margin:24px 0;text-align:center;box-shadow:0 10px 30px rgba(0,102,255,.2);">
        <p style="margin:0 0 6px;color:rgba(255,255,255,0.85);font-size:13px;text-transform:uppercase;letter-spacing:.5px;">${est}</p>
        <p style="margin:0;color:#fff;font-size:30px;font-weight:800;">${escapeHtml(q.output.price)}</p>
      </div>
      <div style="background:#f9fafb;border:2px solid #e5e7eb;border-radius:12px;padding:24px;margin:22px 0;">
        <h3 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;text-transform:uppercase;">${summary}</h3>
        <p style="margin:0;color:#1f2937;font-size:15px;line-height:1.6;">${escapeHtml(q.output.summary)}</p>
      </div>
      <div style="background:#f9fafb;border:2px solid #e5e7eb;border-radius:12px;padding:24px;margin:22px 0;">
        <h3 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;text-transform:uppercase;">${scope}</h3>
        <ul style="margin:0;padding-left:18px;color:#1f2937;font-size:15px;line-height:1.7;">${q.output.scope.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul>
      </div>
      <div style="background:#f9fafb;border:2px solid #e5e7eb;border-radius:12px;padding:24px;margin:22px 0;">
        <h3 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;text-transform:uppercase;">${rec}</h3>
        <p style="margin:0;color:#1f2937;font-size:15px;line-height:1.6;">${escapeHtml(q.output.recommendations)}</p>
      </div>
      <div style="background:#f9fafb;border:2px solid #e5e7eb;border-radius:12px;padding:24px;margin:22px 0;">
        <h3 style="margin:0 0 12px;color:#0066FF;font-size:15px;font-weight:700;text-transform:uppercase;">${pay}</h3>
        <p style="margin:0;color:#1f2937;font-size:15px;line-height:1.6;">${escapeHtml(q.output.paymentMethods)}</p>
      </div>
      <div style="text-align:center;margin:28px 0;">
        <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+51975646074'}?text=${encodeURIComponent(isEs ? 'Hola DevMark, soy el cliente que cotizó el proyecto "' + q.projectName + '". Quiero más detalles.' : 'Hi DevMark, I am the client who got a quote for "' + q.projectName + '". I want more details.')}" style="display:inline-block;background:#25D366;color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 15px rgba(37,211,102,.3);">${cta} →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:14px;">${escapeHtml(reply)}</p>
      <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">DevMark · Desarrollo Web & Soluciones Digitales · contacto@devmarkpe.com</p>
    </div>
  </div>
</body>
</html>`;
}

export async function quoteProjectAction(
  prevState: FormState,
  formData: z.infer<typeof formSchema>
): Promise<FormState> {
  const validatedFields = formSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.issues,
      message: 'Validation error. Please check the fields.',
      data: null,
      projectName: null,
    };
  }

  // Honeypot anti-spam: si el campo oculto viene relleno, descartar sin procesar.
  if (validatedFields.data.company && validatedFields.data.company.trim().length > 0) {
    return {
      message: 'Project quoted successfully!',
      data: null,
      errors: null,
      projectName: validatedFields.data.projectName,
    };
  }
  
  try {
    const result = await quoteProject(validatedFields.data);

    // Guardar en Supabase si está configurado
    if (isSupabaseConfigured() && supabase) {
      try {
        const quoteRecord: QuoteRecord = {
          project_name: validatedFields.data.projectName,
          project_type: validatedFields.data.projectType,
          features: validatedFields.data.features,
          design: validatedFields.data.design,
          additional_info: validatedFields.data.additionalInfo,
          contact_email: validatedFields.data.contactEmail,
          lang: validatedFields.data.lang,
          summary: result.summary,
          scope: result.scope,
          price: result.price,
          recommendations: result.recommendations,
          payment_methods: result.paymentMethods,
        };

        const { error } = await supabase
          .from('quotes')
          .insert([quoteRecord]);

        if (error) {
          console.error('Error saving to Supabase:', error);
          // No bloqueamos el flujo si falla el guardado en BD
        } else {
          console.log('✅ Quote saved to Supabase successfully');
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continuamos aunque falle el guardado
      }
    } else {
      console.warn('⚠️ Supabase not configured. Quote not saved to database.');
    }

    // Enviar cotización por email: al usuario y reporte del lead al soporte
    try {
      const transporter = buildTransporter();
      await transporter.verify();

      const quoteEmail = validatedFields.data.contactEmail;

      // Reporte al soporte / panel de leads
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: 'correo@devmarkpe.com',
        subject: `💰 Nueva cotización - ${validatedFields.data.projectName}`,
        html: adminQuoteHtml({
          projectName: validatedFields.data.projectName,
          projectType: validatedFields.data.projectType,
          contactEmail: quoteEmail,
          features: validatedFields.data.features,
          output: result,
        }),
      });

      // Confirmación con la cotización al usuario
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: quoteEmail,
        subject: validatedFields.data.lang === 'es' ? '📋 Tu cotización de DevMark' : '📋 Your DevMark quote',
        html: userQuoteHtml({
          projectName: validatedFields.data.projectName,
          contactEmail: quoteEmail,
          output: result,
          lang: validatedFields.data.lang,
        }),
      });

      console.log('✅ Quote emails sent successfully');
    } catch (emailError) {
      console.error('Error sending quote emails:', emailError);
      // No bloqueamos el flujo si falla el envío de correo
    }

    return {
      message: 'Project quoted successfully!',
      data: result,
      errors: null,
      projectName: validatedFields.data.projectName,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred during quoting. Please try again.',
      data: null,
      errors: null,
      projectName: null,
    };
  }
}
