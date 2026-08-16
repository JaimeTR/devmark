// This file is machine-generated - edit with care!

'use server';

import { z } from 'zod';
import { quoteProject, type QuoteProjectOutput } from '@/ai/flows/quote-project-flow';
import { supabase, type QuoteRecord, isSupabaseConfigured } from '@/lib/supabase';
import { buildTransporter, escapeHtml, ADMIN_NOTIFICATION_EMAILS } from '@/app/actions/quoter-shared';

const formSchema = z.object({
    responsibleName: z.string().min(2, 'Name must be at least 2 characters.'),
    companyName: z.string().optional(),
    projectName: z.string().min(3, 'Project name must be at least 3 characters.'),
    projectType: z.enum(['landing-page', 'corporate-website', 'ecommerce', 'custom-software', 'pwa', 'other']),
    projectTypeOther: z.string().optional(),
    features: z.array(z.string()),
    design: z.enum(['no-design', 'have-idea', 'have-design']),
    timeline: z.enum(['urgent', '1-2-months', 'flexible']),
    currency: z.enum(['PEN', 'USD', 'other']),
    currencyOther: z.string().optional(),
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

function adminQuoteHtml(q: {
  responsibleName: string;
  companyName?: string;
  projectName: string;
  projectType: string;
  projectTypeOther?: string;
  contactEmail: string;
  features: string[];
  timeline: string;
  currency: string;
  currencyOther?: string;
  output: QuoteProjectOutput;
}) {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;background:#0a0a1a;">
    <div style="background:linear-gradient(135deg,#0066FF 0%,#3b82f6 60%,#0066FF 100%);padding:36px 28px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;letter-spacing:-0.4px;">Nueva cotización solicitada</h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.9);font-size:15px;">Propuesta generada por el cotizador con IA de DEVMARK</p>
    </div>
    <div style="background:#14141f;padding:32px 28px;">
      <div style="background:linear-gradient(135deg,#0066FF15 0%,#3b82f615 100%);border-left:4px solid #0066FF;padding:18px;border-radius:10px;margin-bottom:22px;">
        <p style="margin:0;color:#fff;font-size:17px;font-weight:600;">Nuevo lead capturado</p>
        <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">Contacta al cliente lo antes posible para maximizar conversión</p>
      </div>
      <div style="background:#1a1a2e;border:1px solid #2a2a3e;border-radius:12px;padding:22px;margin-bottom:18px;">
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Datos del lead</h2>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Nombre:</strong> ${escapeHtml(q.responsibleName)}${q.companyName ? ` (${escapeHtml(q.companyName)})` : ''}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Proyecto:</strong> ${escapeHtml(q.projectName)}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Tipo:</strong> ${escapeHtml(q.projectType === 'other' && q.projectTypeOther ? `Otro: ${q.projectTypeOther}` : q.projectType)}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Funcionalidades:</strong> ${q.features.length ? escapeHtml(q.features.join(', ')) : 'Sin especificar'}</p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Email de contacto:</strong> <a href="mailto:${escapeHtml(q.contactEmail)}" style="color:#0066FF;text-decoration:none;">${escapeHtml(q.contactEmail)}</a></p>
        <p style="margin:0 0 8px;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Plazo deseado:</strong> ${escapeHtml(q.timeline)}</p>
        <p style="margin:0;color:#d1d5db;font-size:15px;"><strong style="color:#9ca3af;text-transform:uppercase;font-size:13px;">Moneda:</strong> ${escapeHtml(q.currency === 'other' && q.currencyOther ? `Otra: ${q.currencyOther}` : q.currency)}</p>
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
        <h2 style="margin:0 0 14px;color:#0066FF;font-size:15px;font-weight:700;letter-spacing:0.4px;text-transform:uppercase;">Alcance del proyecto</h2>
        ${q.output.items.map((it) => `<div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #2a2a3e;"><p style="margin:0 0 4px;color:#fff;font-size:14px;font-weight:700;">${escapeHtml(it.title)} <span style="color:#0066FF;font-weight:700;">— ${escapeHtml(it.price)}</span></p><p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">${escapeHtml(it.description)}</p></div>`).join('')}
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
      <p style="margin:0;color:#6b7280;font-size:12px;">DEVMARK · Cotización generada automáticamente desde devmarkpe.com</p>
    </div>
  </div>
</body>
</html>`;
}

function userQuoteHtml(q: { responsibleName: string; projectName: string; contactEmail: string; output: QuoteProjectOutput; lang: string }) {
  const isEs = q.lang === 'es';
  const heading = isEs ? '¡Tu cotización está lista!' : 'Your quote is ready!';
  const est = isEs ? 'Precio estimado' : 'Estimated price';
  const summary = isEs ? 'Resumen' : 'Summary';
  const scope = isEs ? 'Alcance propuesto' : 'Proposed scope';
  const rec = isEs ? 'Recomendaciones' : 'Recommendations';
  const pay = isEs ? 'Métodos de pago' : 'Payment methods';
  const cta = isEs ? 'Conversar con un asesor' : 'Talk to an advisor';
  const msg = isEs
    ? `Hola ${q.responsibleName}, gracias por usar el cotizador de DEVMARK. Aquí tienes el resumen de tu proyecto "${q.projectName}". Un asesor te contactará en menos de 24 horas. Puedes descargar el PDF desde la misma página o responder este correo.`
    : `Hi ${q.responsibleName}, thank you for using the DEVMARK quoter. Here is the summary for your project "${q.projectName}". An advisor will contact you within 24 hours. You can download the PDF from the same page or reply to this email.`;
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
        ${q.output.items.map((it) => `<div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #e5e7eb;"><p style="margin:0 0 4px;color:#1f2937;font-size:15px;font-weight:700;">${escapeHtml(it.title)} <span style="color:#0066FF;">— ${escapeHtml(it.price)}</span></p><p style="margin:0;color:#6b7280;font-size:14px;line-height:1.5;">${escapeHtml(it.description)}</p></div>`).join('')}
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
        <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+51975646074'}?text=${encodeURIComponent(isEs ? 'Hola DEVMARK, soy el cliente que cotizó el proyecto "' + q.projectName + '". Quiero más detalles.' : 'Hi DEVMARK, I am the client who got a quote for "' + q.projectName + '". I want more details.')}" style="display:inline-block;background:#25D366;color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 15px rgba(37,211,102,.3);">${cta} →</a>
      </div>
      <p style="margin:0;color:#6b7280;font-size:14px;">${escapeHtml(reply)}</p>
      <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">DEVMARK · Desarrollo Web & Soluciones Digitales · contacto@devmarkpe.com</p>
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
          responsible_name: validatedFields.data.responsibleName,
          company_name: validatedFields.data.companyName,
          project_name: validatedFields.data.projectName,
          project_type: validatedFields.data.projectType,
          project_type_other: validatedFields.data.projectTypeOther,
          features: validatedFields.data.features,
          design: validatedFields.data.design,
          timeline: validatedFields.data.timeline,
          currency: validatedFields.data.currency,
          currency_other: validatedFields.data.currencyOther,
          additional_info: validatedFields.data.additionalInfo,
          contact_email: validatedFields.data.contactEmail,
          lang: validatedFields.data.lang,
          summary: result.summary,
          items: result.items.map((it) => ({
            title: it.title ?? '',
            description: it.description ?? '',
            price: it.price ?? '',
          })),
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
        to: ADMIN_NOTIFICATION_EMAILS,
        subject: `💰 Nueva cotización - ${validatedFields.data.projectName}`,
        html: adminQuoteHtml({
          responsibleName: validatedFields.data.responsibleName,
          companyName: validatedFields.data.companyName,
          projectName: validatedFields.data.projectName,
          projectType: validatedFields.data.projectType,
          projectTypeOther: validatedFields.data.projectTypeOther,
          contactEmail: quoteEmail,
          features: validatedFields.data.features,
          timeline: validatedFields.data.timeline,
          currency: validatedFields.data.currency,
          currencyOther: validatedFields.data.currencyOther,
          output: result,
        }),
      });

      // Confirmación con la cotización al usuario
      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: quoteEmail,
        subject: validatedFields.data.lang === 'es' ? '📋 Tu cotización de DEVMARK' : '📋 Your DEVMARK quote',
        html: userQuoteHtml({
          responsibleName: validatedFields.data.responsibleName,
          projectName: validatedFields.data.projectName,
          contactEmail: quoteEmail,
          output: result,
          lang: validatedFields.data.lang,
        }),
      });

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

// Aviso interno cuando el cliente descarga el PDF de su propuesta: pasa a
// contacto para que el equipo la revise y confirme/firme manualmente.
export async function notifyProposalDownloaded(
  projectName: string,
  contactEmail: string,
  lang: 'es' | 'en'
): Promise<void> {
  try {
    const transporter = buildTransporter();
    await transporter.verify();

    const isEs = lang === 'es';
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: ADMIN_NOTIFICATION_EMAILS,
      subject: `📄 Propuesta descargada - ${projectName}`,
      html: `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;padding:28px;">
    <p style="margin:0 0 12px;color:#1f2937;font-size:16px;font-weight:700;">${isEs ? 'Cliente descargó su propuesta' : 'Client downloaded their proposal'}</p>
    <p style="margin:0 0 6px;color:#1f2937;font-size:15px;"><strong>${isEs ? 'Proyecto' : 'Project'}:</strong> ${escapeHtml(projectName)}</p>
    <p style="margin:0 0 16px;color:#1f2937;font-size:15px;"><strong>${isEs ? 'Contacto' : 'Contact'}:</strong> <a href="mailto:${escapeHtml(contactEmail)}">${escapeHtml(contactEmail)}</a></p>
    <p style="margin:0;color:#6b7280;font-size:14px;">${isEs ? 'Revisar y confirmar/firmar la propuesta generada por la IA cotizadora.' : 'Review and confirm/sign the AI-generated proposal.'}</p>
  </div>
</body>
</html>`,
    });
  } catch (error) {
    console.error('Error notifying proposal download:', error);
    // No bloqueamos la descarga del PDF si falla el aviso interno
  }
}
