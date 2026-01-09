# 🚀 Guía de Deployment a Vercel - DevMark

Esta guía te llevará paso a paso para hacer deploy de tu sitio en Vercel.

---

## ✅ Pre-requisitos

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta en [Vercel](https://vercel.com)
- [ ] Cuenta en [Supabase](https://supabase.com) con proyecto creado
- [ ] Cuenta de email SMTP configurada (Hostinger, Gmail, etc.)
- [ ] API Key de Google Gemini ([obtener aquí](https://aistudio.google.com/app/apikey))
- [ ] Repositorio en GitHub

---

## 📋 Paso 1: Preparar Variables de Entorno

### Variables OBLIGATORIAS que necesitas configurar en Vercel:

| Variable | Descripción | Dónde obtenerla |
|----------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase | [Supabase Dashboard](https://supabase.com/dashboard) > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase | [Supabase Dashboard](https://supabase.com/dashboard) > Settings > API |
| `SMTP_HOST` | Servidor SMTP | Ej: `smtp.hostinger.com`, `smtp.gmail.com` |
| `SMTP_PORT` | Puerto SMTP | Generalmente `587` o `465` |
| `SMTP_EMAIL` | Tu email corporativo | Ej: `contacto@devmarkpe.com` |
| `SMTP_PASSWORD` | Contraseña de email | Tu contraseña SMTP o app password |
| `GOOGLE_GENAI_API_KEY` | API Key de Gemini | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `NEXT_PUBLIC_URL` | URL de tu sitio | Tu dominio o URL de Vercel |

### Variables OPCIONALES:

| Variable | Descripción |
|----------|-------------|
| `OPENAI_API_KEY` | API Key de OpenAI (respaldo) |
| `STRIPE_SECRET_KEY` | Para pagos con Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Publishable key de Stripe |
| `NEXT_PUBLIC_PEN_TO_*_RATE` | Tasas de conversión de moneda |

---

## 🔧 Paso 2: Configurar Supabase

1. **Crear proyecto en Supabase** (si no lo has hecho):
   - Ve a [supabase.com](https://supabase.com)
   - Crea un nuevo proyecto
   - Guarda la URL y la Anon Key

2. **Ejecutar el schema SQL**:
   ```bash
   # El archivo supabase_schema.sql contiene todas las tablas necesarias
   ```
   - Ve a Supabase > SQL Editor
   - Copia el contenido de `supabase_schema.sql`
   - Ejecuta el script

3. **Habilitar Row Level Security (RLS)** (opcional pero recomendado):
   - Las tablas ya vienen con políticas de seguridad configuradas

---

## 📤 Paso 3: Subir a GitHub

1. **Verificar que `.env.local` esté en `.gitignore`**:
   ```bash
   # Ya está configurado en .gitignore
   .env*
   ```

2. **Hacer commit de tus cambios**:
   ```bash
   git add .
   git commit -m "feat: add animations and prepare for deployment"
   git push origin main
   ```

---

## 🌐 Paso 4: Deploy en Vercel

### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. Ve a [vercel.com](https://vercel.com) y haz login
2. Click en **"Add New"** > **"Project"**
3. Importa tu repositorio de GitHub
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (dejar por defecto)
   - **Build Command**: `npm run build` (automático)
   - **Output Directory**: `.next` (automático)

5. **Agregar Variables de Entorno**:
   - Click en **"Environment Variables"**
   - Agrega TODAS las variables obligatorias mencionadas arriba
   - Para `NEXT_PUBLIC_URL`, usa tu dominio de Vercel temporalmente
     - Ejemplo: `https://tu-proyecto.vercel.app`
     - Luego puedes cambiarlo a tu dominio personalizado

6. Click en **"Deploy"**

### Opción B: Desde la CLI de Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

---

## 🔐 Paso 5: Configurar Variables de Entorno en Vercel

### Desde el Dashboard:

1. Ve a tu proyecto en Vercel
2. **Settings** > **Environment Variables**
3. Agrega cada variable:
   - **Name**: Nombre de la variable (ej: `NEXT_PUBLIC_SUPABASE_URL`)
   - **Value**: El valor correspondiente
   - **Environment**: Selecciona `Production`, `Preview`, `Development` según necesites
4. Click **"Save"**

### Ejemplo de configuración:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oijxeztgsemdyoansztg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_EMAIL=contacto@devmarkpe.com
SMTP_PASSWORD=tu_password
GOOGLE_GENAI_API_KEY=AIzaSyC...
NEXT_PUBLIC_URL=https://devmarkpe.com
```

---

## 🎯 Paso 6: Verificar el Deployment

1. **Espera a que termine el build** (1-3 minutos)
2. **Abre tu sitio** usando la URL de Vercel
3. **Verifica que funcione**:
   - [ ] Página principal carga correctamente
   - [ ] Animaciones funcionan
   - [ ] Formulario de contacto envía emails
   - [ ] Chatbot IA responde
   - [ ] Imágenes del portafolio se ven
   - [ ] Sistema de cotización funciona

---

## 🔄 Paso 7: Configurar Dominio Personalizado (Opcional)

1. Ve a **Settings** > **Domains**
2. Click en **"Add"**
3. Ingresa tu dominio (ej: `devmarkpe.com`)
4. Sigue las instrucciones para configurar DNS:
   - **Tipo A**: Apunta a la IP de Vercel
   - **CNAME**: Apunta `www` a `cname.vercel-dns.com`
5. **Actualiza `NEXT_PUBLIC_URL`** con tu dominio real
6. Haz **Redeploy** desde Vercel

---

## 🐛 Troubleshooting (Solución de Problemas)

### Error: "Supabase credentials not found"
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` estén configuradas
- Las variables con `NEXT_PUBLIC_` deben estar en Vercel

### Error: "SMTP credentials not configured"
- Verifica `SMTP_HOST`, `SMTP_PORT`, `SMTP_EMAIL`, `SMTP_PASSWORD`
- Estas NO llevan `NEXT_PUBLIC_`

### Error: "Google AI API key not found"
- Verifica `GOOGLE_GENAI_API_KEY` en variables de entorno
- Obtén una nueva key si es necesario: [AI Studio](https://aistudio.google.com/app/apikey)

### El chatbot no responde
- Verifica que `GOOGLE_GENAI_API_KEY` esté configurada
- Revisa los logs en Vercel > Deployments > Functions

### Las imágenes no cargan
- Verifica que las imágenes estén en `public/`
- Next.js optimiza automáticamente las imágenes

---

## 📝 Checklist Final

Antes de considerar el deployment completo, verifica:

- [ ] ✅ Todas las variables de entorno obligatorias configuradas
- [ ] ✅ Supabase configurado con el schema
- [ ] ✅ SMTP configurado y probado
- [ ] ✅ Google Gemini API key activa
- [ ] ✅ Sitio carga sin errores
- [ ] ✅ Formularios funcionan
- [ ] ✅ Chatbot responde
- [ ] ✅ Imágenes se cargan correctamente
- [ ] ✅ Dominio personalizado configurado (opcional)
- [ ] ✅ SSL/HTTPS activo (automático en Vercel)

---

## 🚀 Deployments Automáticos

Vercel configura automáticamente:

- **Push a `main`** → Deploy a Producción
- **Push a otras ramas** → Preview Deployment
- **Pull Request** → Preview automático

Para hacer cambios:
```bash
# Hacer cambios en tu código
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# Vercel detecta el push y hace deploy automáticamente
```

---

## 📚 Recursos Adicionales

- [Documentación de Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Docs](https://supabase.com/docs)
- [Google AI Studio](https://ai.google.dev/tutorials/setup)

---

## ✨ ¡Listo!

Tu sitio ahora está en producción con deployment automático. Cada vez que hagas push a GitHub, Vercel actualizará tu sitio automáticamente.

**URL de tu sitio**: Puedes encontrarla en el Dashboard de Vercel

¡Felicidades! 🎉
