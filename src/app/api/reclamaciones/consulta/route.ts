import { leerJson, reenviar } from '@/lib/reclamaciones';

/** Estado de una hoja por codigo y documento. El documento viaja en el cuerpo, nunca en la URL. */
export async function POST(req: Request) {
  const cuerpo = await leerJson(req, 1024);
  if (cuerpo instanceof Response) return cuerpo;
  const ok = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= 40;
  if (!ok(cuerpo.codigo) || !ok(cuerpo.documento)) return Response.json({ message: 'Código o documento inválido' }, { status: 400 });
  return reenviar(req, '/consulta', { codigo: cuerpo.codigo.trim(), documento: cuerpo.documento.trim() });
}
