// Next.js "standalone" no copia .next/static ni public: sin esto el servidor arranca sin estilos ni imagenes.
// Hostinger copia solo la carpeta donde esta server.js (.next/standalone).
import { cp } from "node:fs/promises";
import { existsSync } from "node:fs";

await cp(".next/static", ".next/standalone/.next/static", { recursive: true });
if (existsSync("public")) await cp("public", ".next/standalone/public", { recursive: true });
await cp("scripts/arranque.cjs", ".next/standalone/arranque.cjs");
console.warn("standalone empaquetado: .next/static y public copiados.");
