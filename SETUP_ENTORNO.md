# 🚀 Guía Completa de Configuración del Entorno - DevMark

Esta guía te ayudará a configurar todo tu entorno de desarrollo para trabajar como Full Stack Developer en el proyecto DevMark.

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Inicial](#configuración-inicial)
3. [Configuración de Cursor IDE](#configuración-de-cursor-ide)
4. [Variables de Entorno](#variables-de-entorno)
5. [Servicios Externos](#servicios-externos)
6. [Herramientas de Desarrollo](#herramientas-de-desarrollo)
7. [Verificación del Entorno](#verificación-del-entorno)

---

## 🔧 Requisitos Previos

### Software Necesario

1. **Node.js 18+** 
   - Descargar desde: https://nodejs.org/
   - Verificar instalación: `node --version`
   - Recomendado: Node.js 20 LTS

2. **npm o yarn**
   - Viene incluido con Node.js
   - Verificar: `npm --version`

3. **Git**
   - Descargar desde: https://git-scm.com/
   - Verificar: `git --version`

4. **Cursor IDE** (Recomendado)
   - Descargar desde: https://cursor.sh/
   - O usar VS Code con extensión de Cursor

### Cuentas Necesarias

- ✅ Cuenta de **Supabase** (gratis)
- ✅ Cuenta de **Stripe** (modo test)
- ✅ Cuenta de **Google AI Studio** (para Gemini)
- ✅ Cuenta de **OpenAI** (opcional, para GPT)
- ✅ Acceso SMTP de **Hostinger** (o cualquier servicio SMTP)

---

## 🚀 Configuración Inicial

### 1. Clonar e Instalar Dependencias

```bash
# Si aún no has clonado el repositorio
git clone <tu-repositorio>
cd devmark

# Instalar dependencias
npm install
```

### 2. Crear Archivo de Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales
# En Windows puedes usar: notepad .env.local
# En Mac/Linux: nano .env.local
```

---

## 🎨 Configuración de Cursor IDE

### Instalación de Extensiones Recomendadas

Abre Cursor y instala estas extensiones esenciales:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **TypeScript Vue Plugin (Volar)**
4. **ESLint**
5. **Prettier - Code formatter**
6. **GitLens**
7. **Thunder Client** (para probar APIs)

### Configuración de Workspace

El archivo `.cursorrules` ya está configurado. Cursor lo leerá automáticamente para:
- Aplicar reglas de estilo de código
- Entender la arquitectura del proyecto
- Sugerir código siguiendo las convenciones del proyecto

### Configuración de TypeScript

Cursor detectará automáticamente tu `tsconfig.json`. Asegúrate de que:
- ✅ TypeScript está habilitado en Cursor
- ✅ El path alias `@/*` funciona correctamente
- ✅ Las importaciones se resuelven correctamente

**Verificar configuración:**
- Abre cualquier archivo `.ts` o `.tsx`
- Si ves errores de resolución de paths, reinicia Cursor

---

## 🔐 Variables de Entorno

### Crear `.env.local`

Copia `.env.example` a `.env.local` y completa todas las variables:

```bash
cp .env.example .env.local
```

### Variables Requeridas

#### ✅ CRÍTICAS (Proyecto no funcionará sin estas)

```env
NEXT_PUBLIC_URL=http://localhost:9002
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
GOOGLE_GENAI_API_KEY=tu_google_api_key
```

#### ⚠️ IMPORTANTES (Funcionalidades limitadas sin estas)

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
OPENAI_API_KEY=sk-xxxxx
```

#### 📧 OPCIONALES (Solo si usas formularios de contacto)

```env
SMTP_EMAIL=tu-email@devmark.pe
SMTP_PASSWORD=tu_contraseña
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
```

---

## 🌐 Servicios Externos

### 1. Supabase (Base de Datos)

#### Pasos para Configurar:

1. Crear cuenta en: https://supabase.com/
2. Crear nuevo proyecto
3. Ir a **Settings** → **API**
4. Copiar:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### Configurar Base de Datos:

1. Ir a **SQL Editor** en Supabase
2. Abrir el archivo `supabase_schema.sql` de este proyecto
3. Copiar y pegar el contenido completo
4. Ejecutar el script (botón Run)

✅ Verificar: Deberías ver la tabla `quotes` creada en Table Editor

**Documentación completa:** Ver `docs/SUPABASE_SETUP.md`

---

### 2. Stripe (Pagos)

#### Pasos para Configurar:

1. Crear cuenta en: https://stripe.com/
2. Activar modo **Test** (toggle en dashboard)
3. Ir a **Developers** → **API keys**
4. Copiar:
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

⚠️ **Importante:** Usa las keys de **TEST** para desarrollo. Las keys de producción solo para producción.

---

### 3. Google AI Studio (Gemini)

#### Pasos para Configurar:

1. Ir a: https://aistudio.google.com/app/apikey
2. Iniciar sesión con tu cuenta Google
3. Crear nueva API key
4. Copiar la key → `GOOGLE_GENAI_API_KEY`

✅ Gratis hasta cierto límite de requests

---

### 4. OpenAI (Opcional)

#### Pasos para Configurar:

1. Crear cuenta en: https://platform.openai.com/
2. Ir a **API keys**
3. Crear nueva secret key
4. Copiar → `OPENAI_API_KEY`

⚠️ **Importante:** OpenAI cobra por uso. Úsalo solo si necesitas GPT además de Gemini.

---

### 5. SMTP (Email - Hostinger)

#### Pasos para Configurar:

1. Iniciar sesión en tu panel de Hostinger
2. Ir a **Email Accounts**
3. Crear contraseña de aplicación (App Password)
4. Usar:
   - **Email** → `SMTP_EMAIL`
   - **App Password** → `SMTP_PASSWORD`

**Alternativa:** Puedes usar cualquier servicio SMTP (Gmail, SendGrid, Mailgun, etc.)

---

## 🛠️ Herramientas de Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia Next.js en http://localhost:9002
npm run genkit:dev       # Inicia servidor Genkit para IA (en otra terminal)
npm run genkit:watch     # Genkit en modo watch

# Calidad de Código
npm run lint             # Ejecuta ESLint
npm run typecheck        # Verifica tipos TypeScript sin compilar

# Producción
npm run build            # Compila para producción
npm start                # Inicia servidor de producción
```

### Flujo de Desarrollo Recomendado

1. **Terminal 1:** `npm run dev`
   - Next.js corriendo en http://localhost:9002

2. **Terminal 2:** `npm run genkit:dev`
   - Genkit corriendo para funcionalidades de IA

3. **Cursor IDE:** Abierto con el proyecto
   - Auto-completado activo
   - TypeScript verificando tipos
   - ESLint mostrando warnings

---

## ✅ Verificación del Entorno

### Script de Verificación

Ejecuta el script de verificación para asegurarte de que todo está configurado:

```bash
node check-env.js
```

Este script verificará:
- ✅ Variables de entorno configuradas
- ✅ Node.js versión correcta
- ✅ Dependencias instaladas
- ✅ Archivos de configuración presentes

### Verificación Manual

#### 1. Verificar Variables de Entorno

```bash
# En Windows PowerShell
Get-Content .env.local | Select-String "NEXT_PUBLIC"

# En Mac/Linux
grep "NEXT_PUBLIC" .env.local
```

#### 2. Verificar Instalación de Dependencias

```bash
npm list --depth=0
```

#### 3. Verificar TypeScript

```bash
npm run typecheck
```

#### 4. Verificar Build

```bash
npm run build
```

Si el build pasa sin errores, todo está configurado correctamente.

---

## 🐛 Solución de Problemas Comunes

### Error: "Module not found"

```bash
# Limpiar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Environment variable not found"

- Verifica que `.env.local` existe
- Verifica que las variables tienen el prefijo correcto (`NEXT_PUBLIC_` para variables del cliente)
- Reinicia el servidor de desarrollo después de cambiar `.env.local`

### Error: "Supabase not configured"

- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están en `.env.local`
- Verifica que no hay espacios extra en las variables
- Reinicia el servidor

### Error: "Genkit not running"

- Asegúrate de tener `GOOGLE_GENAI_API_KEY` configurada
- Ejecuta `npm run genkit:dev` en una terminal separada
- Verifica que el puerto 3100 (o el que use Genkit) esté disponible

### TypeScript no encuentra tipos

```bash
# Reinstalar tipos
npm install --save-dev @types/node @types/react @types/react-dom
```

---

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Genkit](https://firebase.google.com/docs/genkit)
- [Guía de Supabase Setup](docs/SUPABASE_SETUP.md)

---

## 🎯 Checklist Final

Antes de comenzar a desarrollar, verifica:

- [ ] Node.js 18+ instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] `.env.local` creado y configurado
- [ ] Cuenta de Supabase creada y configurada
- [ ] Base de datos creada (ejecutado `supabase_schema.sql`)
- [ ] Cuenta de Stripe configurada (modo test)
- [ ] API key de Google AI obtenida
- [ ] Cursor IDE configurado con extensiones
- [ ] `npm run dev` funciona sin errores
- [ ] `npm run typecheck` pasa sin errores
- [ ] Script de verificación (`check-env.js`) pasa todos los tests

---

## 🚀 ¡Listo para Desarrollar!

Una vez completado este checklist, estarás listo para trabajar como Full Stack Developer en DevMark.

**Comandos rápidos para empezar:**

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run genkit:dev
```

Abre http://localhost:9002 en tu navegador y ¡a codear! 🎉
