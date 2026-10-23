// Conexion con el ERP DEVMARK, que es el administrador de este sitio (decisiones/0007 del ERP):
// de ahi salen el blog, el portafolio y lo que sabe el asistente, y alla llegan los formularios y
// el chat. Todo pasa por el servidor del sitio: la firma (SITIO_SIGNING_SECRET) nunca llega al
// navegador. Si el ERP no esta configurado o no responde, cada llamada devuelve null y quien la
// usa cae a su respaldo (el contenido del codigo, el correo).

const TIEMPO_MS = 4000;

function config() {
  const url = process.env.ERP_API_URL?.replace(/\/$/, '');
  const firma = process.env.SITIO_SIGNING_SECRET;
  const slug = process.env.SITIO_SLUG || 'devmarkpe';
  if (!url || !firma) return null;
  return { base: `${url}/api/v1/publico/sitios/${slug}`, firma };
}

export function erpConectado(): boolean {
  return config() !== null;
}

/** Lectura con cache (por defecto 5 minutos). null si no hay ERP, no responde o da error. */
export async function erpLeer<T>(ruta: string, { revalidar = 300 }: { revalidar?: number } = {}): Promise<T | null> {
  const c = config();
  if (!c) return null;
  try {
    const res = await fetch(`${c.base}${ruta}`, { headers: { 'x-sitio-signature': c.firma }, next: { revalidate: revalidar }, signal: AbortSignal.timeout(TIEMPO_MS) });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Envio (formularios, chat). Devuelve la respuesta del ERP o null si no hay ERP o no respondio. */
export async function erpEnviar(ruta: string, cuerpo: unknown, opciones: { ip?: string; visitante?: string; metodo?: 'POST' | 'GET' } = {}): Promise<Response | null> {
  const c = config();
  if (!c) return null;
  try {
    return await fetch(`${c.base}${ruta}`, {
      method: opciones.metodo ?? 'POST',
      headers: {
        'x-sitio-signature': c.firma,
        ...(opciones.metodo === 'GET' ? {} : { 'Content-Type': 'application/json' }),
        ...(opciones.ip ? { 'x-cliente-ip': opciones.ip } : {}),
        ...(opciones.visitante ? { 'x-visitante': opciones.visitante } : {}),
      },
      ...(opciones.metodo === 'GET' ? {} : { body: JSON.stringify(cuerpo) }),
      cache: 'no-store',
      signal: AbortSignal.timeout(opciones.metodo === 'GET' ? TIEMPO_MS : 8000),
    });
  } catch {
    return null;
  }
}

export type MensajeSitio = {
  tipo: 'CONTACTO' | 'COTIZACION' | 'LEAD_CHAT';
  nombre: string;
  correo: string;
  telefono?: string;
  empresaCliente?: string;
  servicio?: string;
  asunto?: string;
  mensaje: string;
  idioma?: 'es' | 'en';
  datos?: Record<string, unknown>;
  origen?: string;
};

/** Registra un formulario en el panel del ERP. Nunca lanza: el correo de aviso sale igual. */
export async function registrarMensaje(mensaje: MensajeSitio, ip?: string): Promise<boolean> {
  // El ERP rechaza < y > en los textos cortos (se muestran en el panel): se quitan aqui.
  const limpio = (t?: string) => t?.replace(/[<>]/g, '').trim() || undefined;
  const res = await erpEnviar('/mensajes', {
    ...mensaje,
    nombre: limpio(mensaje.nombre) ?? 'Sin nombre',
    telefono: mensaje.telefono?.replace(/[^0-9+()\s-]/g, '').slice(0, 30) || undefined,
    empresaCliente: limpio(mensaje.empresaCliente)?.slice(0, 160),
    servicio: limpio(mensaje.servicio)?.slice(0, 120),
    asunto: limpio(mensaje.asunto)?.slice(0, 200),
    mensaje: mensaje.mensaje.slice(0, 8000),
    origen: limpio(mensaje.origen)?.slice(0, 300),
  }, { ip });
  if (res && !res.ok) console.error(`El ERP no registro el mensaje (${res.status})`);
  return Boolean(res?.ok);
}
