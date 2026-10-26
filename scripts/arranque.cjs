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
// Diagnostico: cuando llegan peticiones y cuanto vive el proceso.
const t0 = Date.now();
const http = require('http');
const emitOriginal = http.Server.prototype.emit;
http.Server.prototype.emit = function (ev, req) {
  if (ev === 'request') log({ peticion: req.method + ' ' + req.url, msDesdeArranque: Date.now() - t0 });
  return emitOriginal.apply(this, arguments);
};
const listenOriginal = http.Server.prototype.listen;
http.Server.prototype.listen = function () { log({ listen: Array.from(arguments).filter((x) => typeof x !== 'function'), msDesdeArranque: Date.now() - t0 }); return listenOriginal.apply(this, arguments); };
let n = 0;
setInterval(() => { n += 1; log({ vivo: n * 250, rss: process.memoryUsage().rss }); }, 250).unref();
