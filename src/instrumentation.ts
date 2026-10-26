// Diagnostico temporal del 503 en Hostinger: deja en el log de ejecucion por que se cae el proceso.
export function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  const registrar = (...a: unknown[]) => console.log(JSON.stringify({ diag: a.map(String).join(' ') }));
  registrar('arranque', 'node', process.version, 'mem', JSON.stringify(process.memoryUsage()));
  process.on('exit', (c) => registrar('exit', c, JSON.stringify(process.memoryUsage())));
  process.on('uncaughtException', (e) => registrar('uncaught', (e as Error)?.stack ?? e));
  process.on('unhandledRejection', (e) => registrar('unhandled', (e as Error)?.stack ?? e));
  process.on('SIGTERM', () => registrar('SIGTERM'));
}
