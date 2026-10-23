import { timingSafeEqual } from 'node:crypto';
import { paresDelCodigo } from '@/data/blog-posts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function firmaValida(firma: string | null): boolean {
  const secreto = process.env.SITIO_SIGNING_SECRET;
  if (!secreto || !firma) return false;
  const a = Buffer.from(firma);
  const b = Buffer.from(secreto);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Entrega los articulos del blog que viven en el codigo, para que el ERP los copie a su base
 * (scripts/importar-sitios.mjs del ERP). Solo con la firma del sitio: no es una ruta publica.
 */
export async function GET(req: Request) {
  if (!firmaValida(req.headers.get('x-sitio-signature'))) return Response.json({ error: 'Firma invalida' }, { status: 401 });
  return Response.json({ pares: paresDelCodigo() }, { headers: { 'Cache-Control': 'no-store' } });
}
