# DEVMARK · devmarkpe.com

Sitio de la agencia de desarrollo web y software DEVMARK (Lima, Perú). Español en `/` e inglés en `/en`.

**El administrador del sitio es el ERP DEVMARK** (`Devmark-PE/ERP-Devmark`): de ahí salen el blog, el
portafolio y lo que sabe el asistente, y allá llegan los formularios, las cotizaciones, el chat y el Libro
de Reclamaciones. Si el ERP no está configurado o no responde, el sitio usa su contenido de respaldo y avisa
por correo.

## Stack

- **Next.js 16** (App Router, Turbopack) con React 19 y TypeScript. Ojo: esta versión de Next cambia APIs;
  ver `AGENTS.md`.
- **Tailwind CSS 3** con los tokens de `tailwind.config.ts` (tinta, índigo, periwinkle). Tipografía:
  Schibsted Grotesk, Instrument Serif y Braze (solo el nombre de la marca).
- **Groq** (`groq-sdk`) para el asistente, el cotizador y la herramienta SEO; **OpenAI** solo como respaldo
  del chat.
- **Supabase** compartido con jaimetr.dev (portafolio de respaldo) y **nodemailer** para los avisos por SMTP.
- **Stripe** opcional; sin claves no se ofrecen pagos.
- Publicado en **Hostinger** como aplicación Node.js: `npm run build` compila en modo standalone (con
  webpack) y `scripts/empaquetar-standalone.mjs` copia los estáticos para que Hostinger ejecute `server.js`.

## Estructura

```
src/
├── app/            Rutas: inicio, servicios, portfolio, blog, hosting, nosotros, contacto, quote,
│                   ai-assistant, libro-de-reclamaciones, gracias, (admin) y sus pares en /en
│   └── api/        chat (asistente), erp (exportar el blog al ERP), reclamaciones
├── ai/             Groq, OpenAI y los flujos (cotizador, SEO)
├── components/     home (cabecera, pie), landing, site, ai, blog, portfolio, libro, ui
├── data/           Respaldo del contenido (artículos, proyectos, servicios)
└── lib/            Conexión con el ERP (erp-sitio.ts, reclamaciones.ts), contacto, utilidades
public/marca/       Logotipos e isotipos (ver public/marca/LEEME.md)
scripts/marca/      Generadores de los logos (Python + fonttools)
```

## Instalar y arrancar

Requisitos: Git y **Node 22** (`.nvmrc`). La guía para instalar los tres proyectos (ERP, web
y tienda) en otra computadora está en el ERP: `docs/instalar-en-otra-computadora.md`.

```bash
npm ci
cp .env.example .env.local      # Windows (PowerShell): Copy-Item .env.example .env.local
npm run dev -- -p 3200          # http://localhost:3200
```

Los valores se copian de la configuración de la aplicación en hPanel (Hostinger). `.env.local` no se sube
nunca.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` / `npm start` | Compilar (standalone para Hostinger) y servir como en producción |
| `npm run lint` | ESLint, sin advertencias permitidas |
| `npm run typecheck` | TypeScript |
| `pip install fonttools && python3 scripts/marca/generar-logo.py public/marca` | Regenerar los logos |

## Variables de entorno

Todas están en `.env.example`, con para qué sirve cada una. Las importantes:

| Grupo | Variables | Sin ellas |
|---|---|---|
| ERP | `ERP_API_URL`, `SITIO_SIGNING_SECRET`, `SITIO_SLUG`, `ERP_EMPRESA_ID` | Contenido de respaldo; formularios solo por correo |
| Correo | `SMTP_HOST`, `SMTP_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD` | No salen los avisos |
| IA | `GROQ_API_KEY` (y opcional `OPENAI_API_KEY`) | El asistente y el cotizador no responden |
| Supabase | `NEXT_PUBLIC_SUPABASE_*`, `NEXT_PUBLIC_PROJECTS_SUPABASE_*` | Sin portafolio de respaldo |
| Sitio | `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CAL_LINK`, analítica | Valores por defecto |

## Dependencias

`npm audit` en 0 al 27 de octubre de 2026. En `package.json`, `overrides` fuerza
`postcss-selector-parser ^7.1.7` porque Tailwind 3 trae una versión con una falla de consumo de CPU (el CSS
generado sale idéntico). Quitarlo al migrar a Tailwind 4. Cómo actualizar sin romper nada: ver la guía del
ERP.

## Más documentación

- `PRODUCT.md` y `DESIGN.md`: para quién es el sitio y su sistema visual.
- `public/marca/LEEME.md`: qué logo va en cada lugar.
- `docs/`: notas de páginas de agradecimiento, testimonios y la configuración histórica de Supabase.
