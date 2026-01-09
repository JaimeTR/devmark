# 🔧 Solución: Chat de IA No Funciona

Guía para diagnosticar y solucionar el problema del chat de IA.

## 🔍 Diagnóstico Rápido

### 1. Verificar Variables de Entorno

Ejecuta este comando para verificar tu configuración:

```bash
npm run check-env
```

O verifica manualmente si existe `.env.local`:

```powershell
# En Windows PowerShell
Test-Path .env.local
Get-Content .env.local | Select-String "GOOGLE_GENAI_API_KEY|OPENAI_API_KEY"
```

### 2. Ver los Logs en la Consola

Cuando uses el chat, abre la consola del navegador (F12) y revisa la **pestaña Console**. También revisa la **terminal donde corre `npm run dev`** para ver los logs del servidor.

Los logs ahora incluyen `[DEBUG]` para facilitar el diagnóstico. Busca:

- `✅ [DEBUG]` - Indica que algo funcionó
- `❌ [DEBUG]` - Indica un error
- `⚠️ [DEBUG]` - Indica una advertencia

## 🔑 Obtener API Keys Gratuitas

### Opción 1: Google Gemini (Recomendado - Gratis)

**Gemini tiene un tier gratuito generoso:**

1. Ve a: https://aistudio.google.com/app/apikey
2. Inicia sesión con tu cuenta Google
3. Haz clic en **"Create API Key"**
4. Selecciona o crea un proyecto de Google Cloud
5. Copia la API key generada

**Límites gratuitos de Gemini:**
- ✅ 15 RPM (requests por minuto)
- ✅ 1,500 RPD (requests por día)
- ✅ Gratis para siempre (con límites)

**Actualiza en `.env.local`:**
```env
GOOGLE_GENAI_API_KEY=tu_nueva_api_key_aqui
```

### Opción 2: OpenAI (Opcional - Tiene créditos gratuitos)

**OpenAI ofrece créditos al registrarse:**

1. Ve a: https://platform.openai.com/
2. Crea una cuenta o inicia sesión
3. Ve a **API keys** → **Create new secret key**
4. Copia la key (solo se muestra una vez)
5. Verifica tus créditos en **Usage**

**Límites gratuitos de OpenAI:**
- ⚠️ Créditos iniciales al registrarse (suelen ser $5-$18)
- ⚠️ Una vez agotados, necesitas pagar
- ✅ GPT-3.5-turbo es más barato que GPT-4

**Actualiza en `.env.local`:**
```env
OPENAI_API_KEY=sk-tu_nueva_api_key_aqui
```

⚠️ **Nota:** OpenAI cobra por uso después de agotar los créditos gratuitos. Gemini es más recomendado para uso gratuito continuo.

## 🛠️ Pasos para Solucionar

### Paso 1: Verificar que `.env.local` existe y está configurado

```powershell
# Crear desde ejemplo si no existe
Copy-Item .env.example .env.local

# Editar con tus credenciales
notepad .env.local
```

### Paso 2: Configurar al menos una API Key

**Mínimo requerido:**
```env
GOOGLE_GENAI_API_KEY=tu_key_de_google_ai_studio
```

**Recomendado (con fallback):**
```env
GOOGLE_GENAI_API_KEY=tu_key_de_google_ai_studio
OPENAI_API_KEY=sk-tu_key_de_openai
```

### Paso 3: Reiniciar el servidor de desarrollo

```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar
npm run dev
```

### Paso 4: Probar el chat

1. Abre http://localhost:9002/ai-assistant
2. Abre la consola del navegador (F12 → Console)
3. Intenta enviar un mensaje
4. Revisa los logs en:
   - **Consola del navegador** (para errores del cliente)
   - **Terminal del servidor** (para logs `[DEBUG]`)

## 🔍 Tipos de Errores Comunes

### Error: "GOOGLE_GENAI_API_KEY no configurada"

**Solución:**
- Verifica que `.env.local` existe
- Verifica que la variable está escrita correctamente (sin espacios, sin comillas)
- Reinicia el servidor después de cambiar `.env.local`

### Error: "API key invalid" o "Unauthorized"

**Causas posibles:**
- La API key es incorrecta
- La API key fue revocada
- La API key tiene restricciones de IP/proyecto

**Solución:**
- Genera una nueva API key
- Verifica que no tiene restricciones en Google AI Studio
- Asegúrate de copiar la key completa (sin espacios)

### Error: "429" o "Quota exceeded"

**Significa:** Has excedido el límite de requests gratuitos

**Solución:**
- Espera unos minutos (los límites se reinician)
- Para Gemini: 15 requests/minuto, 1,500/día
- Considera agregar OpenAI como fallback

### Error: "Model not found" o "Model unavailable"

**Causa:** El modelo especificado no existe o cambió

**Solución:**
- Ya está corregido en el código (ahora usa `gemini-1.5-flash`)
- Si persiste, verifica los modelos disponibles en Google AI Studio

## 📊 Verificar Estado de las APIs

### Verificar Gemini:

```bash
# Desde la terminal, prueba manualmente (reemplaza YOUR_API_KEY)
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hola"}]}]}'
```

Si funciona, verás una respuesta JSON. Si falla, verás el error específico.

### Verificar OpenAI:

```bash
# Reemplaza YOUR_API_KEY
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 🔄 Cambios Realizados en el Código

He mejorado el código para:

1. ✅ **Mejor logging** - Ahora verás logs detallados con `[DEBUG]`
2. ✅ **Modelo correcto** - Usa `gemini-1.5-flash` (el más reciente y estable)
3. ✅ **Validación de API keys** - Verifica antes de intentar usar
4. ✅ **Mensajes de error específicos** - Te dice exactamente qué está mal
5. ✅ **Manejo de cuotas** - Detecta cuando se excede el límite

## 🎯 Checklist de Verificación

Antes de reportar un problema, verifica:

- [ ] `.env.local` existe en la raíz del proyecto
- [ ] `GOOGLE_GENAI_API_KEY` está configurada (sin espacios, sin comillas)
- [ ] La API key es válida (generada desde Google AI Studio)
- [ ] Reiniciaste el servidor después de cambiar `.env.local`
- [ ] Revisaste los logs en la consola del navegador (F12)
- [ ] Revisaste los logs en la terminal del servidor
- [ ] No has excedido el límite de cuota (15 req/min para Gemini)

## 🆘 Si Nada Funciona

Si después de seguir todos los pasos sigue sin funcionar:

1. **Comparte los logs completos:**
   - De la consola del navegador (F12 → Console)
   - De la terminal donde corre `npm run dev`

2. **Verifica que las variables de entorno se están leyendo:**
   ```bash
   # Temporalmente, agrega esto en ask-devmark.ts para debug
   console.log('GOOGLE_GENAI_API_KEY:', process.env.GOOGLE_GENAI_API_KEY ? 'EXISTS' : 'MISSING');
   ```

3. **Verifica que el servidor está leyendo `.env.local`:**
   - En Next.js, `.env.local` se carga automáticamente
   - Si usas otro entorno, puede que necesites configuración adicional

## 💡 Consejos para Mantener las APIs Gratuitas Funcionando

1. **Gemini es tu mejor opción:**
   - Gratis con límites generosos
   - No requiere tarjeta de crédito
   - Funciona bien para chatbots

2. **OpenAI como backup:**
   - Solo si tienes créditos gratuitos
   - Úsalo como fallback, no como principal

3. **Monitorea tu uso:**
   - Google AI Studio: https://aistudio.google.com/app/apikey
   - OpenAI: https://platform.openai.com/usage

4. **Implementa rate limiting:**
   - Limita las requests por usuario
   - Evita spam que consuma tu cuota

---

## ✅ Después de Configurar

Una vez que todo funcione, deberías ver en los logs:

```
✅ [DEBUG] API Key de Gemini encontrada
🔄 [DEBUG] Enviando mensaje a Gemini...
✅ [DEBUG] Respuesta de Gemini generada exitosamente
```

¡Y el chat debería responder normalmente! 🎉
