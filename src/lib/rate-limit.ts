// Rate limiting simple en memoria, sin dependencias externas.
//
// Este proyecto se despliega en Vercel (funciones serverless), NO como
// proceso Node.js persistente — por eso este límite NO es global: cada
// instancia/lambda fría tiene su propio contador en memoria, y Vercel
// puede levantar varias instancias en paralelo bajo tráfico. Sirve como
// mitigación de bajo costo contra abuso básico/secuencial (mismo cliente
// pegándole rápido a una instancia ya tibia), pero un atacante distribuido
// o con suficiente tráfico paralelo puede evadirlo. Para un límite real y
// global hace falta un store compartido (ej. Vercel KV / Upstash Redis).
// Aun así vale la pena: sube el costo de abusar del endpoint de chat
// (consume cuota real de Groq/OpenAI) a cambio de cero dependencias nuevas.

const buckets = new Map<string, number[]>();

// Limpieza periódica para no acumular IPs viejas indefinidamente en memoria.
const CLEANUP_INTERVAL_MS = 5 * 60_000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer(windowMs: number) {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const cutoff = Date.now() - windowMs;
    for (const [key, timestamps] of buckets) {
      const kept = timestamps.filter((t) => t > cutoff);
      if (kept.length === 0) buckets.delete(key);
      else buckets.set(key, kept);
    }
  }, CLEANUP_INTERVAL_MS);
  // No debe mantener el proceso vivo solo por este timer.
  cleanupTimer.unref?.();
}

/**
 * Ventana deslizante simple: permite `max` requests cada `windowMs` por clave
 * (normalmente la IP del cliente). Devuelve true si la request debe
 * bloquearse.
 */
export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  ensureCleanupTimer(windowMs);

  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (buckets.get(key) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= max) {
    buckets.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return false;
}

/** Extrae la IP del cliente a partir de headers estándar de proxy/hosting. */
export function getClientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}
