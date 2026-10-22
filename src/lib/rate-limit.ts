import { headers } from 'next/headers';

// Limite de peticiones por visitante, en memoria del proceso. La web corre en
// una sola instancia (apphosting.yaml: maxInstances 1), asi que basta para
// frenar a quien abuse del chat, la IA o los formularios que envian correos;
// cada uno de esos gasta dinero (Groq/OpenAI) o reputacion del dominio (SMTP).

type Ventana = { inicio: number; usadas: number };

const ventanas = new Map<string, Ventana>();
const MAX_CLAVES = 10_000;

/** IP del visitante segun el proxy de delante; "desconocida" si no llega. */
export async function ipDelVisitante(): Promise<string> {
  const h = await headers();
  const reenviada = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return reenviada || h.get('x-real-ip') || 'desconocida';
}

/**
 * Devuelve true si la peticion entra en el limite y la cuenta; false si lo pasa.
 * `limite` peticiones cada `ventanaMs` por cada `clave` (p. ej. "chat:1.2.3.4").
 */
export function dentroDelLimite(clave: string, limite: number, ventanaMs: number): boolean {
  const ahora = Date.now();
  const actual = ventanas.get(clave);

  if (!actual || ahora - actual.inicio >= ventanaMs) {
    if (ventanas.size >= MAX_CLAVES) limpiar(ahora, ventanaMs);
    ventanas.set(clave, { inicio: ahora, usadas: 1 });
    return true;
  }

  if (actual.usadas >= limite) return false;
  actual.usadas += 1;
  return true;
}

/** Atajo para acciones de servidor: limita por IP del visitante. */
export async function visitanteDentroDelLimite(accion: string, limite: number, ventanaMs: number) {
  return dentroDelLimite(`${accion}:${await ipDelVisitante()}`, limite, ventanaMs);
}

function limpiar(ahora: number, ventanaMs: number) {
  for (const [clave, v] of ventanas) {
    if (ahora - v.inicio >= ventanaMs) ventanas.delete(clave);
  }
  // Si aun asi no hay sitio, se descarta lo mas viejo para no crecer sin fin.
  if (ventanas.size >= MAX_CLAVES) {
    const sobrantes = ventanas.size - MAX_CLAVES + 1;
    let i = 0;
    for (const clave of ventanas.keys()) {
      if (i++ >= sobrantes) break;
      ventanas.delete(clave);
    }
  }
}
