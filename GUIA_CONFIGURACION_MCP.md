# 🚀 Guía Rápida: Configurar MCP para Supabase en Cursor

Esta guía te ayudará a configurar MCP (Model Context Protocol) para que Cursor IDE pueda acceder directamente a tu base de datos Supabase.

## ⚡ Configuración Automática (Recomendado)

### Paso 1: Crear `.env.local` con tus credenciales

Primero necesitas tener tus credenciales de Supabase. Si aún no las tienes:

1. Ve a https://app.supabase.com/
2. Selecciona tu proyecto (o crea uno nuevo)
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public** key

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
# En Windows PowerShell
Copy-Item .env.example .env.local

# O crea el archivo manualmente y agrega:
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Paso 2: Ejecutar el script de configuración

```bash
npm run setup-mcp
```

Este script:
- ✅ Lee tus credenciales de `.env.local`
- ✅ Crea el archivo `mcp.json` en la configuración de Cursor
- ✅ Configura el servidor MCP de Supabase

### Paso 3: Reiniciar Cursor IDE

1. Cierra completamente Cursor
2. Vuelve a abrir Cursor
3. Abre tu proyecto

### Paso 4: Verificar que funciona

En Cursor, abre el chat (Ctrl/Cmd + L) y pregunta:

```
"¿Cuántas cotizaciones hay en la tabla quotes?"
```

O también puedes preguntar sobre la estructura:

```
"Muéstrame el schema de la tabla quotes en Supabase"
```

Si MCP está funcionando, Cursor podrá consultar directamente tu base de datos.

---

## 🔧 Configuración Manual

Si prefieres configurarlo manualmente:

### 1. Ubicación del archivo de configuración

**Windows:**
```
C:\Users\TuUsuario\AppData\Roaming\Cursor\User\mcp.json
```

**macOS:**
```
~/Library/Application Support/Cursor/User/mcp.json
```

**Linux:**
```
~/.config/Cursor/User/mcp.json
```

### 2. Crear el archivo `mcp.json`

Crea el archivo en la ubicación anterior con este contenido:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase",
        "--supabase-url",
        "TU_SUPABASE_URL_AQUI",
        "--supabase-key",
        "TU_SUPABASE_ANON_KEY_AQUI"
      ]
    }
  }
}
```

**Reemplaza:**
- `TU_SUPABASE_URL_AQUI` con tu URL de Supabase
- `TU_SUPABASE_ANON_KEY_AQUI` con tu anon key

### 3. Reiniciar Cursor

Cierra y vuelve a abrir Cursor IDE.

---

## ✅ Verificación

### Verificar en Cursor Settings

1. Abre Cursor Settings (Ctrl/Cmd + ,)
2. Busca "MCP" o "Model Context Protocol"
3. Deberías ver "supabase" en la lista de servidores MCP

### Verificar en los logs

1. En Cursor, ve a **View** → **Output**
2. En el dropdown, selecciona **MCP**
3. Deberías ver mensajes de conexión exitosa

### Probar con una consulta

Usa el chat de Cursor para hacer consultas sobre tu base de datos:

```
"¿Qué tablas existen en mi base de datos de Supabase?"
```

```
"Muéstrame los últimos 5 registros de la tabla quotes"
```

```
"¿Cuál es la estructura de la tabla quotes?"
```

---

## 🐛 Solución de Problemas

### Error: "MCP server not found"

**Solución:**
```bash
# Verificar que el paquete se puede instalar
npx -y @modelcontextprotocol/server-supabase --version
```

### Error: "Cannot connect to Supabase"

**Verifica:**
1. Que las credenciales en `mcp.json` son correctas
2. Que tu proyecto de Supabase está activo
3. Que la URL y la key no tienen espacios extra

### MCP no aparece en Cursor Settings

**Solución:**
1. Verifica que el archivo `mcp.json` está en la ubicación correcta
2. Verifica que el JSON es válido (usa un validador JSON online)
3. Reinicia Cursor completamente

### "Permission denied" al crear el archivo

**Solución:**
En Windows, ejecuta PowerShell como Administrador:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🎯 ¿Qué puedes hacer con MCP configurado?

Una vez configurado, Cursor puede:

- ✅ Consultar tu base de datos directamente
- ✅ Entender la estructura de tus tablas
- ✅ Generar queries SQL basadas en tu schema
- ✅ Ayudarte con migraciones y cambios de schema
- ✅ Explicar relaciones entre tablas
- ✅ Sugerir mejoras en tu base de datos

### Ejemplos de prompts útiles:

```
"Genera una query para obtener todas las cotizaciones del último mes"
```

```
"¿Cómo puedo agregar un índice para mejorar las búsquedas por email?"
```

```
"Muéstrame cómo crear una vista para reportes de cotizaciones"
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de MCP](https://modelcontextprotocol.io/)
- [Cursor MCP Documentation](https://cursor.sh/docs)
- [Supabase MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/supabase)

---

## 🆘 ¿Necesitas ayuda?

Si tienes problemas:
1. Verifica los logs de MCP en Cursor (View → Output → MCP)
2. Ejecuta `npm run check-env` para verificar tus variables de entorno
3. Verifica que `.env.local` tiene las credenciales correctas
4. Asegúrate de haber reiniciado Cursor después de la configuración

¡Listo! Con MCP configurado, Cursor ahora puede ayudarte mucho más con tu base de datos. 🎉
