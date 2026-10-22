import { EMAIL } from './contact';

// Conexion con el Libro de Reclamaciones del ERP DEVMARK. Todo pasa por el servidor del sitio:
// la firma (SITIO_SIGNING_SECRET) nunca llega al navegador.

export type Proveedor = { razonSocial: string | null; ruc: string | null; nombreComercial: string; direccion: string | null; correo: string | null };

const RESPALDO: Proveedor = { razonSocial: null, ruc: null, nombreComercial: 'DEVMARK', direccion: null, correo: EMAIL };

export function erp() {
  const url = process.env.ERP_API_URL?.replace(/\/$/, '');
  const empresaId = process.env.ERP_EMPRESA_ID;
  const firma = process.env.SITIO_SIGNING_SECRET;
  if (!url || !empresaId || !firma) return null;
  return { base: `${url}/api/v1/publico/reclamaciones`, empresaId, firma };
}

/** Datos del proveedor para la hoja: del ERP (cache 1 h), con respaldo si no responde. */
export async function getProveedor(): Promise<Proveedor> {
  const c = erp();
  if (!c) return RESPALDO;
  try {
    const res = await fetch(`${c.base}/proveedor/${c.empresaId}`, { headers: { 'x-sitio-signature': c.firma }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return RESPALDO;
    const d = (await res.json()) as Partial<Proveedor>;
    return { ...RESPALDO, ...Object.fromEntries(Object.entries(d).filter(([, v]) => v)) };
  } catch {
    return RESPALDO;
  }
}

/** Reenvia al ERP con la firma, la empresa y la IP del visitante (para el limite por IP). */
export async function reenviar(req: Request, ruta: '' | '/consulta', cuerpo: Record<string, unknown>) {
  const c = erp();
  if (!c) return Response.json({ message: 'Libro de reclamaciones no configurado' }, { status: 503 });
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  try {
    const res = await fetch(`${c.base}${ruta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-sitio-signature': c.firma, 'x-cliente-ip': ip },
      body: JSON.stringify({ ...cuerpo, empresaId: c.empresaId }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });
    return new Response(await res.text(), { status: res.status, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return Response.json({ message: 'No pudimos conectarnos. Intenta de nuevo.' }, { status: 502 });
  }
}

/** Lee el JSON del visitante con tope de tamano. */
export async function leerJson(req: Request, max: number): Promise<Record<string, unknown> | Response> {
  const raw = await req.text();
  if (raw.length > max) return Response.json({ message: 'Solicitud demasiado grande' }, { status: 413 });
  try {
    const j = JSON.parse(raw);
    if (!j || typeof j !== 'object' || Array.isArray(j)) throw new Error();
    return j as Record<string, unknown>;
  } catch {
    return Response.json({ message: 'Solicitud no valida' }, { status: 400 });
  }
}
