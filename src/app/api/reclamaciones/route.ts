import { erp, getProveedor, leerJson, reenviar } from '@/lib/reclamaciones';
import { registrarPorCorreo } from '@/lib/reclamaciones-correo';
import { visitanteDentroDelLimite } from '@/lib/rate-limit';

/*
 * Registrar una hoja de reclamacion: el navegador llama aqui y el servidor reenvia al ERP con la firma.
 * El honeypot (website) se corta aqui; la validacion completa la hace la API del ERP. Mientras el ERP no
 * esta conectado, la hoja se valida aqui y se registra por correo (reclamaciones-correo.ts).
 */
export async function POST(req: Request) {
  const cuerpo = await leerJson(req, 20_000);
  if (cuerpo instanceof Response) return cuerpo;
  if (typeof cuerpo.website === 'string' && cuerpo.website.trim()) return Response.json({ ok: true });
  // empresaId lo pone el servidor; el visitante no elige a que empresa va la hoja.
  const datos = { ...cuerpo };
  delete datos.website;
  delete datos.empresaId;
  if (erp()) return reenviar(req, '', datos);
  if (!(await visitanteDentroDelLimite('reclamaciones', 5, 10 * 60_000))) return Response.json({ message: 'Demasiadas solicitudes' }, { status: 429 });
  return registrarPorCorreo(datos, await getProveedor());
}
