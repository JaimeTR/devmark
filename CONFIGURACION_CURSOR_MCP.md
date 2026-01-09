# 🎯 Configuración de Cursor IDE con MCP (Model Context Protocol)

Esta guía te ayudará a configurar Cursor IDE con MCP para potenciar tu desarrollo full stack en DevMark.

## ¿Qué es MCP?

**Model Context Protocol (MCP)** es un protocolo que permite a Cursor conectarse con servicios externos para:
- Acceder a bases de datos
- Integrar APIs externas
- Obtener contexto de servicios en la nube
- Mejorar la capacidad de Cursor para entender tu proyecto

## 🚀 Configuración Básica de Cursor

### 1. Instalación de Cursor

Si aún no tienes Cursor:
1. Descarga desde: https://cursor.sh/
2. Instala siguiendo el asistente
3. Abre tu proyecto en Cursor

### 2. Configuración Inicial

Cursor ya está configurado para leer `.cursorrules` automáticamente. Este archivo contiene:
- ✅ Reglas de estilo de código
- ✅ Arquitectura del proyecto
- ✅ Convenciones de desarrollo
- ✅ Patrones específicos de Next.js

**No necesitas configuración adicional** - Cursor lee `.cursorrules` automáticamente.

---

## 🔌 Configuración de MCP (Opcional pero Recomendado)

MCP permite a Cursor acceder a servicios externos. Para proyectos full stack como DevMark, puedes configurar:

### Opción 1: MCP para Supabase

Permite a Cursor consultar tu base de datos directamente.

#### Configuración:

1. Abre Cursor Settings (Ctrl/Cmd + ,)
2. Busca "MCP" o "Model Context Protocol"
3. Agrega un nuevo servidor MCP:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase",
        "--supabase-url",
        "YOUR_SUPABASE_URL",
        "--supabase-key",
        "YOUR_SUPABASE_ANON_KEY"
      ]
    }
  }
}
```

**Reemplaza:**
- `YOUR_SUPABASE_URL` con tu URL de Supabase
- `YOUR_SUPABASE_ANON_KEY` con tu anon key

---

### Opción 2: MCP para GitHub

Permite a Cursor acceder a información de tu repositorio.

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github",
        "--github-token",
        "YOUR_GITHUB_TOKEN"
      ]
    }
  }
}
```

---

### Opción 3: MCP para PostgreSQL (Supabase)

Acceso directo a la base de datos PostgreSQL:

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "--connection-string",
        "postgresql://postgres:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
      ]
    }
  }
}
```

⚠️ **Nota:** Usa la connection string de Supabase (Settings → Database → Connection string)

---

## 📝 Archivo de Configuración de Cursor

Crea o edita `~/.cursor/mcp.json` (o la ubicación de configuración de Cursor en tu sistema):

### Windows:
```
C:\Users\TuUsuario\AppData\Roaming\Cursor\User\mcp.json
```

### macOS:
```
~/Library/Application Support/Cursor/User/mcp.json
```

### Linux:
```
~/.config/Cursor/User/mcp.json
```

### Ejemplo Completo de Configuración:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase",
        "--supabase-url",
        "${NEXT_PUBLIC_SUPABASE_URL}",
        "--supabase-key",
        "${NEXT_PUBLIC_SUPABASE_ANON_KEY}"
      ],
      "env": {
        "NEXT_PUBLIC_SUPABASE_URL": "tu-url-aqui",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY": "tu-key-aqui"
      }
    }
  }
}
```

---

## 🎨 Configuración Avanzada de Cursor

### 1. Extensiones Recomendadas

Abre Cursor y ve a Extensions (Ctrl/Cmd + Shift + X):

**Esenciales:**
- ✅ **ES7+ React/Redux/React-Native snippets**
- ✅ **Tailwind CSS IntelliSense**
- ✅ **TypeScript Vue Plugin (Volar)**
- ✅ **ESLint**
- ✅ **Prettier - Code formatter**

**Útiles:**
- ✅ **GitLens** - Mejor integración con Git
- ✅ **Thunder Client** - Cliente REST API
- ✅ **Error Lens** - Muestra errores inline
- ✅ **Auto Rename Tag** - Renombra tags HTML/JSX automáticamente

### 2. Configuración de TypeScript

Cursor debería detectar automáticamente tu `tsconfig.json`. Si hay problemas:

1. Presiona `Ctrl/Cmd + Shift + P`
2. Escribe "TypeScript: Select TypeScript Version"
3. Selecciona "Use Workspace Version"

### 3. Configuración de Path Aliases

Tu proyecto usa el alias `@/` para imports absolutos. Cursor lo detecta automáticamente desde `tsconfig.json`.

Si no funciona:
- Reinicia Cursor
- Verifica que `tsconfig.json` tiene `"paths": { "@/*": ["./src/*"] }`

---

## 🤖 Uso de Cursor AI con el Proyecto

### Comandos Útiles en Cursor

**Composer (Ctrl/Cmd + I):**
- Escribe instrucciones en lenguaje natural
- Cursor generará código siguiendo las reglas de `.cursorrules`

**Chat (Ctrl/Cmd + L):**
- Haz preguntas sobre el código
- Pide explicaciones de funciones
- Solicita refactorizaciones

### Ejemplos de Prompts Útiles:

```
# Crear un nuevo componente
"Crea un componente Button siguiendo el patrón de shadcn/ui"

# Refactorizar código
"Refactoriza esta función para usar async/await en lugar de promises"

# Explicar código
"Explica cómo funciona este flow de Genkit"

# Generar tests
"Genera tests unitarios para esta función de contacto"
```

---

## 🔧 Solución de Problemas

### MCP no funciona

1. Verifica que los servidores MCP están instalados:
   ```bash
   npm list -g @modelcontextprotocol/server-supabase
   ```

2. Revisa los logs de Cursor:
   - Ve a View → Output
   - Selecciona "MCP" en el dropdown

3. Reinicia Cursor después de cambios en configuración MCP

### Cursor no sigue .cursorrules

1. Verifica que `.cursorrules` está en la raíz del proyecto
2. Reinicia Cursor
3. Asegúrate de que el archivo no está en `.gitignore`

### TypeScript no resuelve paths

1. Verifica `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. Reinicia el servidor de TypeScript:
   - `Ctrl/Cmd + Shift + P`
   - "TypeScript: Restart TS Server"

---

## 📚 Recursos Adicionales

- [Documentación oficial de Cursor](https://cursor.sh/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Cursor Rules Documentation](https://cursor.sh/docs/cursor-rules)

---

## ✅ Checklist de Configuración

- [ ] Cursor IDE instalado
- [ ] Proyecto abierto en Cursor
- [ ] Extensiones recomendadas instaladas
- [ ] `.cursorrules` siendo leído (verificar que Cursor muestra las reglas)
- [ ] TypeScript funcionando correctamente
- [ ] Path aliases (`@/`) funcionando
- [ ] (Opcional) MCP configurado para Supabase
- [ ] (Opcional) MCP configurado para otros servicios

---

## 🎯 Configuración Mínima Recomendada

Para empezar rápidamente, solo necesitas:

1. ✅ Cursor IDE instalado
2. ✅ Proyecto abierto
3. ✅ `.cursorrules` en la raíz (ya está creado)

**Todo lo demás es opcional pero recomendado para desarrollo full stack avanzado.**

---

¡Listo! Con esta configuración, Cursor estará completamente optimizado para trabajar en tu proyecto DevMark como Full Stack Developer. 🚀
