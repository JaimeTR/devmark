# 🚀 DevMark - Tu Socio Digital

Plataforma web de DevMark, una agencia de desarrollo digital que ofrece soluciones tecnológicas integrales para empresas. Desde desarrollo web y software hasta chatbots con IA y automatización de procesos.

## 📋 Características Principales

### 🛠️ Servicios Ofrecidos

- **Desarrollo Web a Medida**: Webs corporativas, landing pages y PWAs personalizadas
- **Desarrollo CMS y E-commerce**: WordPress, Shopify e integraciones de pago
- **Software Personalizado**: ERP, CRM, SaaS y APIs
- **Automatización de Procesos**: Flujos automáticos con Zapier/Make
- **Chatbots con IA**: Soluciones de soporte 24/7 entrenadas con tu base de conocimiento
- **SEO y Optimización Web**: Estrategia SEO, Core Web Vitals y optimización de conversiones
- **Diseño UI/UX**: Prototipado, wireframes y interfaces modernas
- **Marketing Digital**: Estrategias de crecimiento y campañas digitales
- **Consultoría Tecnológica**: Asesoramiento estratégico en transformación digital
- **Soporte y Mantenimiento**: Mantenimiento continuo y soporte técnico

### 🤖 Funcionalidades de IA Integradas

- **Asistente de IA**: Chatbot interactivo en tiempo real
- **Cotizador de Proyectos**: Generación automática de presupuestos con IA
- **Optimizador de SEO**: Herramienta para optimizar contenido
- **Sistema de Flows**: Automatizaciones con Genkit y Google AI

## 🏗️ Stack Tecnológico

### Frontend & Framework
- **Next.js 15** con TypeScript
- **React 19** para componentes UI
- **Tailwind CSS** para estilos
- **Radix UI** para componentes accesibles

### AI & Automación
- **Google Genkit** para orquestación de IA
- **Google AI / OpenAI** para modelos de lenguaje
- **Stripe** para procesamiento de pagos

### Base de Datos & Backend
- **Firebase** para autenticación y hosting
- **Supabase** (opcional) para datos
- **App Hosting de Firebase** para deployment

### Herramientas de Desarrollo
- **Turborepo** para compilación rápida
- **TypeScript** para seguridad de tipos
- **ESLint** para linting

## 📂 Estructura del Proyecto

```
src/
├── app/              # Rutas Next.js (pages & layouts)
├── components/       # Componentes React reutilizables
│   ├── ai/          # Componentes de IA (chatbot, cotizador, SEO)
│   ├── landing/     # Componentes de landing page
│   └── ui/          # Componentes UI base
├── ai/              # Lógica de IA y flows
│   └── flows/       # Flows de Genkit
├── actions/         # Server actions de Next.js
├── hooks/           # Custom React hooks
├── lib/             # Utilidades compartidas
└── data/            # Datos estáticos (posts, proyectos)
```

## 🚀 Comenzar

### Requisitos previos
- Node.js 18+
- npm o yarn

### Instalación

```bash
npm install
```

### Desarrollo

```bash
# Iniciar el servidor de desarrollo
npm run dev

# En otra terminal, iniciar Genkit (para IA)
npm run genkit:dev
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

## 🔄 Scripts Disponibles

- `npm run dev` - Inicia servidor dev con Turbopack
- `npm run genkit:dev` - Inicia Genkit para IA
- `npm run genkit:watch` - Genkit en modo watch
- `npm run build` - Compila para producción
- `npm start` - Inicia servidor de producción
- `npm run lint` - Ejecuta ESLint
- `npm run typecheck` - Verifica tipos TypeScript

## 📱 Idiomas Soportados

- 🇪🇸 Español
- 🇬🇧 Inglés (en/*)

## 🌐 Deployment

El proyecto está configurado para desplegarse en **Firebase App Hosting**:

```yaml
# apphosting.yaml
runConfig:
  maxInstances: 1
```

## 📝 Variables de Entorno

Crea un archivo `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
STRIPE_SECRET_KEY=
GENKIT_GOOGLE_API_KEY=
```

## 📚 Documentación Adicional

- Ver [blueprint.md](docs/blueprint.md) para arquitectura detallada
- Consulta `src/app/page.tsx` para la página principal

## 👨‍💻 Desarrollado por

**DevMark** - Agencia de Desarrollo Digital
- 🌍 Soluciones globales
- 💡 Tecnología de punta
- 🎯 Resultados garantizados
