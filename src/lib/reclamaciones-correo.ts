import { z } from 'zod';
import { ADMIN_NOTIFICATION_EMAILS, buildTransporter, escapeHtml } from '@/app/actions/quoter-shared';
import type { Proveedor } from './reclamaciones';

// Respaldo mientras el ERP no esta conectado: la hoja se valida aqui con las mismas reglas que la API
// del ERP y se envia por correo al equipo y al consumidor. Asi el libro funciona desde el primer dia.

const TEXTO = /^[^<>]*$/;
const DOC: Record<string, RegExp> = { DNI: /^\d{8}$/, RUC: /^\d{11}$/, PASAPORTE: /^[A-Za-z0-9]{6,15}$/, CE: /^[A-Za-z0-9]{9,12}$/ };
const t = (min: number, max: number) => z.string().trim().min(min).max(max).regex(TEXTO);

const esquema = z
  .object({
    nombres: t(2, 80),
    apellidos: t(2, 80),
    tipoDocumento: z.enum(['DNI', 'CE', 'PASAPORTE', 'RUC']),
    nroDocumento: z.string().trim().max(20),
    domicilio: t(5, 200),
    telefono: z.string().trim().regex(/^[0-9+()\s-]{6,20}$/),
    correo: z.string().trim().email().max(120),
    menorEdad: z.boolean(),
    repNombres: t(2, 120).optional(),
    repTipoDocumento: z.enum(['DNI', 'CE', 'PASAPORTE']).optional(),
    repNroDocumento: z.string().trim().max(20).optional(),
    tipoBien: z.enum(['PRODUCTO', 'SERVICIO']),
    montoReclamado: z.number().min(0).max(100_000_000).optional(),
    moneda: z.enum(['PEN', 'USD']),
    descripcionBien: t(3, 300),
    nroPedido: z.string().trim().max(60).regex(TEXTO).optional(),
    tipo: z.enum(['RECLAMO', 'QUEJA']),
    detalle: t(10, 2000),
    pedidoConsumidor: t(5, 1000),
    medioRespuesta: z.enum(['CORREO', 'CARTA']),
    aceptaVeracidad: z.literal(true),
  })
  .superRefine((d, ctx) => {
    if (!DOC[d.tipoDocumento].test(d.nroDocumento)) ctx.addIssue({ code: 'custom', message: 'El número de documento no corresponde al tipo elegido' });
    if (d.menorEdad && (!d.repNombres || !d.repTipoDocumento || !d.repNroDocumento || !DOC[d.repTipoDocumento].test(d.repNroDocumento)))
      ctx.addIssue({ code: 'custom', message: 'Indica los datos del padre, madre o apoderado' });
  });

const LIMA_MS = 5 * 3_600_000;
function sumarDiasHabiles(desde: Date, dias: number): Date {
  const d = new Date(desde.getTime() - LIMA_MS);
  for (let restan = dias; restan > 0; ) {
    d.setUTCDate(d.getUTCDate() + 1);
    if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) restan--;
  }
  return new Date(d.getTime() + LIMA_MS);
}
const fecha = (d: Date) => d.toLocaleDateString('es-PE', { timeZone: 'America/Lima', day: '2-digit', month: '2-digit', year: 'numeric' });

/** Registra la hoja por correo. Devuelve lo mismo que la API del ERP (codigo, fecha, fechaLimite). */
export async function registrarPorCorreo(cuerpo: Record<string, unknown>, proveedor: Proveedor): Promise<Response> {
  const r = esquema.safeParse(cuerpo);
  if (!r.success) return Response.json({ message: r.error.issues.map((i) => i.message).join('. ') }, { status: 400 });
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) return Response.json({ message: 'Libro de reclamaciones no configurado' }, { status: 503 });
  const h = r.data;
  const ahora = new Date();
  const limite = sumarDiasHabiles(ahora, 15);
  // Sin numeracion central: el codigo sale del momento (hora de Lima) y queda en los dos correos.
  const lima = new Date(ahora.getTime() - LIMA_MS).toISOString().replace(/\D/g, '').slice(0, 14);
  const codigo = `LR-WEB-${lima}`;
  const monto = h.montoReclamado !== undefined ? `${h.moneda === 'USD' ? 'US$' : 'S/'} ${h.montoReclamado.toFixed(2)}` : null;
  const filas: [string, string | null | undefined][] = [
    ['Código', codigo],
    ['Fecha', fecha(ahora)],
    ['Proveedor', `${proveedor.razonSocial ?? proveedor.nombreComercial}${proveedor.ruc ? ` · RUC ${proveedor.ruc}` : ''}`],
    ['Consumidor', `${h.nombres} ${h.apellidos}`],
    [h.tipoDocumento, h.nroDocumento],
    ['Domicilio', h.domicilio],
    ['Teléfono', h.telefono],
    ['Correo', h.correo],
    ['Padre, madre o apoderado', h.menorEdad ? `${h.repNombres} (${h.repTipoDocumento} ${h.repNroDocumento})` : null],
    ['Bien contratado', h.tipoBien === 'PRODUCTO' ? 'Producto' : 'Servicio'],
    ['Monto reclamado', monto],
    ['Descripción', h.descripcionBien],
    ['N.º de pedido', h.nroPedido],
    ['Tipo', h.tipo === 'RECLAMO' ? 'Reclamo' : 'Queja'],
    ['Detalle', h.detalle],
    ['Pedido del consumidor', h.pedidoConsumidor],
    ['Medio de respuesta', h.medioRespuesta === 'CORREO' ? 'Correo electrónico' : 'Carta al domicilio'],
  ];
  const tabla = `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">${filas
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#6b7280;vertical-align:top;">${escapeHtml(k)}</td><td style="padding:4px 0;white-space:pre-wrap;">${escapeHtml(String(v))}</td></tr>`)
    .join('')}</table>`;
  const pie = '<p style="font-family:Arial,sans-serif;font-size:12px;color:#9ca3af;">Libro de Reclamaciones · Ley 29571, Código de Protección y Defensa del Consumidor.</p>';

  try {
    const transporte = buildTransporter();
    await transporte.sendMail({
      from: process.env.SMTP_EMAIL,
      to: ADMIN_NOTIFICATION_EMAILS,
      replyTo: h.correo,
      subject: `Nueva hoja de reclamación ${codigo}`,
      html: `<p style="font-family:Arial,sans-serif;">Plazo de respuesta: <strong>${fecha(limite)}</strong> (15 días hábiles).</p>${tabla}${pie}`,
    });
    // La constancia al consumidor no debe tumbar el registro si falla.
    await transporte
      .sendMail({
        from: process.env.SMTP_EMAIL,
        to: h.correo,
        subject: `Tu hoja de reclamación ${codigo}`,
        html: `<p style="font-family:Arial,sans-serif;">Esta es la copia de tu hoja de reclamación. Te responderemos a más tardar el <strong>${fecha(limite)}</strong> (15 días hábiles). Presentar un reclamo no impide acudir a Indecopi.</p>${tabla}${pie}`,
      })
      .catch((e) => console.error('No salio la constancia de la hoja', codigo, e instanceof Error ? e.message : e));
  } catch (e) {
    console.error('No se pudo registrar la hoja por correo', e instanceof Error ? e.message : e);
    return Response.json({ message: 'No pudimos registrar la hoja' }, { status: 502 });
  }
  return Response.json({ codigo, fecha: ahora.toISOString(), fechaLimite: limite.toISOString() }, { status: 201 });
}
