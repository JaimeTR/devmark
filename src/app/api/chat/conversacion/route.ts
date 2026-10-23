import { dentroDelLimite, ipDelVisitante } from '@/lib/rate-limit';
import { erpEnviar } from '@/lib/erp-sitio';

export const runtime = 'nodejs';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TOKEN = /^[A-Za-z0-9_-]{20,100}$/;

/**
 * Mensajes nuevos de la conversacion con un asesor. El widget pregunta cada pocos segundos mientras
 * un asesor la atiende (Hostinger y Vercel no mantienen WebSockets propios: se consulta).
 */
export async function GET(req: Request) {
  const ip = await ipDelVisitante();
  if (!dentroDelLimite(`chat-leer:${ip}`, 60, 60_000)) return Response.json({ error: 'Demasiadas consultas' }, { status: 429 });
  const url = new URL(req.url);
  const id = url.searchParams.get('id') ?? '';
  const visitante = url.searchParams.get('visitante') ?? '';
  const despues = url.searchParams.get('despues');
  if (!UUID.test(id) || !TOKEN.test(visitante)) return Response.json({ error: 'Datos no validos' }, { status: 400 });
  const filtro = despues && !Number.isNaN(Date.parse(despues)) ? `?despues=${encodeURIComponent(despues)}` : '';
  const res = await erpEnviar(`/conversaciones/${id}${filtro}`, null, { metodo: 'GET', visitante, ip });
  if (!res) return Response.json({ error: 'No disponible' }, { status: 503 });
  return new Response(await res.text(), { status: res.status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
}
