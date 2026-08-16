# DevMark

Sitio web de DevMark, una agencia de desarrollo web/software en Lima, Perú. Construido con Next.js 15 (App Router) y TypeScript. Incluye un cotizador de proyectos y un asistente de chat impulsados por IA, blog, portafolio y un sitio completamente bilingüe (español/inglés).

## Stack tecnológico

- **Next.js 15** (App Router) + **TypeScript**
- **React 18**
- **Tailwind CSS** + **shadcn/ui** (componentes sobre Radix UI)
- **Supabase** (Postgres) — persistencia de cotizaciones, historial de chat y lectura del portafolio
- **Groq** (`llama-3.3-70b-versatile`) como motor de IA principal, con **OpenAI** como fallback si Groq falla
- **Nodemailer** sobre SMTP (Titan/Hostinger) para el envío de correos transaccionales
- **Vercel** para hosting y deploy

> Nota: el proyecto usó **Genkit/Firebase** en una etapa anterior; ya no forman parte del stack. Toda la lógica de IA vive en `src/ai/groq.ts` y `src/ai/openai.ts`, sin capa de orquestación de Genkit.

## Features principales

- **Sitio bilingüe ES/EN**: rutas espejo (`/` y `/en/...`), hreflang y sitemap dinámico que cubre ambos idiomas.
- **Cotizador de proyectos con IA**: wizard progresivo que genera una propuesta con desglose de ítems y precio, exporta un PDF con la marca de DevMark y guarda cada cotización en Supabase (tabla `quotes`).
- **Asistente de chat con IA**: mismo motor Groq/OpenAI, respuesta en streaming, captura de leads cuando la IA no puede resolver la consulta, e historial persistido en Supabase (tabla `chat_messages`, compartida con el proyecto Supabase de jaimetr.dev bajo una columna `source`).
- **Blog**: ~26 posts bilingües con contenido estático en `src/data/blog-posts.ts`. No hay CMS ni panel admin — se decidió explícitamente no construir uno por ahora.
- **Portafolio**: se lee desde una tabla `projects` en Supabase, compartida (solo lectura) con el proyecto personal jaimetr.dev.
- **SEO**: metadata por página, JSON-LD (`LocalBusiness`, `Service`, `FAQPage`, `BlogPosting`), `sitemap.xml` dinámico y `robots.txt`.
- **GEO** (optimización para motores de IA): `public/llms.txt`.
- **Analytics**: Google Analytics (GA4) y Google Search Console ya conectados.
- **Correos transaccionales**: cotizaciones, leads de chat y formulario de contacto notifican por SMTP a soporte@devmarkpe.com y jaimetr1309@gmail.com.
- **Página 404 personalizada** con detección de idioma.

## Estructura del proyecto

```
src/
├── app/                    # Rutas Next.js (App Router)
│   ├── (rutas ES)/         # page.tsx, blog/, portfolio/, quote/, contacto/,
│   │                       # servicios/, ai-assistant/, hosting/, nosotros/, gracias/
│   ├── en/                 # Rutas espejo en inglés
│   ├── api/                # Route handlers (chat, projects)
│   ├── actions/            # Server actions (cotizador, chat, contacto)
│   ├── sitemap.ts          # Sitemap dinámico
│   └── robots.ts
├── ai/                     # Lógica de IA
│   ├── groq.ts             # Cliente Groq (motor principal)
│   ├── openai.ts           # Cliente OpenAI (fallback)
│   └── flows/              # Flows: cotizador, asistente, SEO, checkout
├── components/
│   ├── ai/                 # Chat, cotizador, widgets de IA
│   ├── home/                # Secciones de la landing
│   ├── portfolio/           # Carrusel/grid de proyectos
│   └── ui/                  # Componentes base (shadcn/ui)
├── lib/                    # Supabase clients, utilidades, monedas
└── data/                   # Datos estáticos (posts del blog, servicios, proyectos de fallback)
```

## Cómo correr en local

Requisitos: Node.js 18+.

```bash
npm install
cp .env.example .env.local   # completar con tus valores (ver sección de abajo)
npm run dev
```

Abre [http://localhost:9002](http://localhost:9002).

### Scripts disponibles

- `npm run dev` — servidor de desarrollo con Turbopack
- `npm run build` — build de producción
- `npm start` — sirve el build de producción
- `npm run lint` — ESLint
- `npm run typecheck` — chequeo de tipos con `tsc --noEmit`

## Variables de entorno

Todas las variables están documentadas con comentarios en **`.env.example`** — cópialo a `.env.local` y completa los valores reales (nunca subas `.env.local` ni pongas secretos en este README).

Resumen de lo obligatorio para que el sitio funcione:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — proyecto Supabase (compartido con jaimetr.dev)
- `NEXT_PUBLIC_PROJECTS_SUPABASE_URL` / `NEXT_PUBLIC_PROJECTS_SUPABASE_KEY` — mismo proyecto, usado para leer el portafolio
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD` — envío de correos (contacto, cotizador, leads de chat)
- `GROQ_API_KEY` — motor de IA real del chat, cotizador y optimizador de SEO
- `NEXT_PUBLIC_URL` — URL base del sitio

Opcionales: `OPENAI_API_KEY` (fallback si Groq falla), `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, tasas de conversión de moneda, y `STRIPE_SECRET_KEY`/`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` si se activa checkout.

## Base de datos (Supabase)

DevMark usa el **mismo proyecto Supabase** que jaimetr.dev (unificado para compartir el portafolio y el historial de chat bajo una columna `source`). Para levantar el esquema:

1. Entra al SQL Editor del proyecto Supabase en [supabase.com/dashboard](https://supabase.com/dashboard).
2. Copia y ejecuta el contenido completo de **`supabase_schema.sql`** (raíz del repo). Es idempotente: se puede correr tanto en un proyecto nuevo como sobre uno que ya tenga las tablas, sin borrar datos existentes ni tocar las tablas propias de jaimetr.dev.
3. Detalle adicional del flujo de cotizaciones en [`docs/SUPABASE_SETUP.md`](docs/SUPABASE_SETUP.md).

Otros scripts SQL en la raíz (`supabase_migrate_quotes_items.sql`, `supabase_knowledge_docs.sql`, `supabase_update_project_descriptions.sql`, `supabase_test.sql`) son migraciones puntuales/utilidades — revisa su cabecera antes de correrlos.

## Deployment

El deploy es automático vía **Vercel**: cada push a `main` dispara un build y deploy en producción.

1. Conecta el repositorio de GitHub en Vercel (si aún no está conectado).
2. En Vercel → Settings → Environment Variables, agrega todas las variables obligatorias listadas en `.env.example` (usa la URL de producción real en `NEXT_PUBLIC_URL`).
3. Verifica que el esquema de Supabase esté aplicado (ver sección anterior) antes de probar el cotizador o el chat en producción.
4. Push a `main` → Vercel construye y despliega automáticamente.

## Idiomas soportados

- Español (rutas por defecto)
- Inglés (`/en/...`)
