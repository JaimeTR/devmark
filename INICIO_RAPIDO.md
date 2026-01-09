# ⚡ Inicio Rápido - DevMark

Guía rápida para empezar a desarrollar en 5 minutos.

## 🚀 Pasos Rápidos

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env.local

# Editar .env.local con tus credenciales
# En Windows: notepad .env.local
# En Mac/Linux: nano .env.local
```

### 3. Verificar Configuración
```bash
npm run check-env
```

### 4. Iniciar Desarrollo

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run genkit:dev
```

### 5. Abrir en Navegador
```
http://localhost:9002
```

---

## ✅ Variables Mínimas Requeridas

Para que el proyecto funcione básicamente, configura al menos estas en `.env.local`:

```env
NEXT_PUBLIC_URL=http://localhost:9002
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_aqui
GOOGLE_GENAI_API_KEY=tu_key_aqui
```

---

## 📚 Documentación Completa

- **Configuración completa:** Ver [SETUP_ENTORNO.md](./SETUP_ENTORNO.md)
- **Configuración de Cursor/MCP:** Ver [CONFIGURACION_CURSOR_MCP.md](./CONFIGURACION_CURSOR_MCP.md)
- **Supabase:** Ver [docs/SUPABASE_SETUP.md](./docs/SUPABASE_SETUP.md)

---

## 🆘 Problemas Comunes

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Error: Variables de entorno no encontradas**
- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo

**Error: Puerto 9002 en uso**
```bash
# Cambiar puerto en package.json o matar proceso:
# Windows: netstat -ano | findstr :9002
# Mac/Linux: lsof -ti:9002 | xargs kill
```

---

¡Listo para desarrollar! 🎉
