// Diagnostico temporal: ejecuta server.js como proceso hijo y registra su salida, su codigo/senal de salida y si responde.
const { spawn } = require('child_process');
const http = require('http');
const log = (o) => console.log(JSON.stringify(o));
const t0 = Date.now();
log({ arranque: process.version, cwd: process.cwd() });
const hijo = spawn(process.execPath, ['server.js'], { cwd: __dirname, env: { ...process.env, PORT: '3055', HOSTNAME: '127.0.0.1', NODE_OPTIONS: '' }, stdio: ['ignore', 'pipe', 'pipe'] });
hijo.stdout.on('data', (d) => log({ out: String(d).slice(0, 2000), ms: Date.now() - t0 }));
hijo.stderr.on('data', (d) => log({ err: String(d).slice(0, 3000), ms: Date.now() - t0 }));
hijo.on('exit', (code, senal) => log({ hijoSalio: code, senal, ms: Date.now() - t0 }));
hijo.on('error', (e) => log({ hijoError: String(e) }));
for (const espera of [1500, 4000, 8000]) {
  setTimeout(() => {
    const r = http.get({ host: '127.0.0.1', port: 3055, path: '/robots.txt', timeout: 5000 }, (res) => { log({ prueba: res.statusCode, enMs: Date.now() - t0 }); res.resume(); });
    r.on('error', (e) => log({ pruebaError: String(e.message), enMs: Date.now() - t0 }));
  }, espera);
}
setInterval(() => log({ padreVivo: Date.now() - t0 }), 2000).unref();
setTimeout(() => process.exit(0), 20000);
