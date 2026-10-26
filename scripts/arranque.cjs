// Diagnostico temporal: Hostinger solo guarda en el log las lineas JSON; aqui se reenvian los errores y la salida de error del proceso.
const log = (o) => console.log(JSON.stringify(o));
const ew = process.stderr.write.bind(process.stderr);
process.stderr.write = (c, ...a) => { log({ stderr: String(c).slice(0, 3000) }); return ew(c, ...a); };
process.on('uncaughtException', (e) => log({ uncaught: String(e && e.stack || e).slice(0, 3000) }));
process.on('unhandledRejection', (e) => log({ unhandled: String(e && e.stack || e).slice(0, 3000) }));
process.on('exit', (c) => log({ exit: c, mem: process.memoryUsage().rss }));
for (const s of ['SIGTERM', 'SIGINT', 'SIGHUP']) process.on(s, () => log({ signal: s }));
log({ arranque: process.version, cwd: process.cwd(), mem: process.memoryUsage().rss });
try { require('./server.js'); } catch (e) { log({ requireError: String(e && e.stack || e).slice(0, 3000) }); }
