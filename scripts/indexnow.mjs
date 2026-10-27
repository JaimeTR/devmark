// Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver; Bing alimenta a ChatGPT Search y Copilot)
// de todas las URLs del sitemap. Uso, despues de publicar:   node scripts/indexnow.mjs
const SITIO = 'https://devmarkpe.com';
const CLAVE = '78cb9ef454c50a4a820358f0c3153894';

const sitemap = await (await fetch(`${SITIO}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
urlList.push(`${SITIO}/llms.txt`, `${SITIO}/llms-full.txt`);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'devmarkpe.com', key: CLAVE, keyLocation: `${SITIO}/${CLAVE}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs enviadas, respuesta ${res.status} ${res.statusText}`);
