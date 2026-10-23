import { z } from 'zod';
import { getGroqClient, GROQ_MODEL } from '@/ai/groq';
import { getOpenAIClient } from '@/ai/openai';
import {
  type Message,
  detectLang,
  buildMessages,
  fetchKnowledgeContext,
  getFallbackResponse,
  LEAD_CAPTURE_MARKER,
} from '@/ai/chat-shared';
import { dentroDelLimite, ipDelVisitante } from '@/lib/rate-limit';
import { erpConectado, erpEnviar } from '@/lib/erp-sitio';

export const runtime = 'nodejs';

const encoder = new TextEncoder();

// Delimitador que separa el texto visible del chunk final de metadata
// (origen de la respuesta + si se debe disparar captura de lead).
const META_DELIMITER = '__DEVMARK_CHAT_META__';

// El modelo puede emitir el marcador de lead-capture en cualquier chunk, o
// partido entre dos chunks. Este filtro retiene una cola del tamaño del
// marcador para nunca dejarlo escapar visible al usuario mientras streamea.
function createMarkerFilter(marker: string, onToken: (text: string) => void) {
  let tail = '';
  let found = false;

  return {
    push(delta: string) {
      tail += delta;
      if (tail.includes(marker)) {
        found = true;
        tail = tail.split(marker).join('');
      }
      // Conserva las últimas (marker.length - 1) posiciones por si el
      // marcador quedó cortado a la mitad entre este chunk y el siguiente.
      const safeLength = Math.max(0, tail.length - (marker.length - 1));
      if (safeLength > 0) {
        onToken(tail.slice(0, safeLength));
        tail = tail.slice(safeLength);
      }
    },
    flush() {
      if (tail.includes(marker)) {
        found = true;
        tail = tail.split(marker).join('');
      }
      if (tail) onToken(tail);
      tail = '';
      return found;
    },
  };
}

function groqKeyConfigured() {
  const key = process.env.GROQ_API_KEY;
  return Boolean(key && key.trim() !== '' && key.includes('gsk_') && !key.includes('xxxxx'));
}

function openaiKeyConfigured() {
  const key = process.env.OPENAI_API_KEY;
  return Boolean(key && key.trim() !== '' && key.startsWith('sk-') && !key.includes('xxxxx'));
}

// Lo que llega del navegador se valida: roles conocidos, historial acotado y
// mensajes de largo razonable. Sin esto cualquiera podia mandar historiales
// enormes y gastar tokens de Groq/OpenAI a costa de DEVMARK.
const chatBodySchema = z.object({
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        content: z.string().max(4000),
      }),
    )
    .min(1)
    .max(200),
  // Conversacion en el ERP (decisiones/0008): el token del visitante (vive en su navegador) y el id
  // que devolvio el ERP en el primer mensaje.
  visitante: z.string().regex(/^[A-Za-z0-9_-]{20,100}$/).optional(),
  conversacionId: z.string().uuid().optional(),
  pagina: z.string().max(300).optional(),
});

type Registro = { conversacionId?: string; estado: string };

/**
 * Registra el mensaje del visitante en el ERP. Devuelve en que estado esta la conversacion: si la
 * atiende un asesor, la web no genera respuesta. Sin ERP (o si no responde), sigue la IA como siempre.
 */
async function registrarEnErp(datos: { visitante?: string; conversacionId?: string; pagina?: string }, texto: string, idioma: 'es' | 'en', ip: string): Promise<Registro> {
  if (!datos.visitante || !erpConectado()) return { estado: 'IA' };
  const enviar = (conversacionId?: string) =>
    erpEnviar('/conversaciones/mensajes', { visitante: datos.visitante, conversacionId, texto: texto.slice(0, 2000), idioma, pagina: datos.pagina?.replace(/[<>]/g, ''), responder: false }, { ip });
  let res = await enviar(datos.conversacionId);
  // Una conversacion que ya no existe (o de otro navegador) se reemplaza por una nueva.
  if (res?.status === 404 && datos.conversacionId) res = await enviar();
  if (!res?.ok) return { conversacionId: datos.conversacionId, estado: 'IA' };
  const d = (await res.json()) as { conversacionId: string; estado: string };
  return { conversacionId: d.conversacionId, estado: d.estado };
}

// 20 mensajes por minuto por visitante: holgado para una persona, corto para un bot.
const CHAT_LIMITE = 20;
const CHAT_VENTANA_MS = 60_000;

export async function POST(req: Request) {
  const ip = await ipDelVisitante();
  if (!dentroDelLimite(`chat:${ip}`, CHAT_LIMITE, CHAT_VENTANA_MS)) {
    return Response.json({ error: 'Demasiados mensajes. Espera un minuto e intenta de nuevo.' }, { status: 429 });
  }

  const parsed = chatBodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: 'Mensaje no valido.' }, { status: 400 });
  }
  // Solo los ultimos 12 turnos viajan al modelo: suficiente contexto y costo acotado.
  const history = parsed.data.history.slice(-12) as Message[];

  const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
  const lang = detectLang(lastUserMessage);
  const registro = await registrarEnErp(parsed.data, lastUserMessage, lang, ip);

  // Con un asesor (o esperandolo), la IA no responde: el widget pasa a leer los mensajes del asesor.
  if (registro.estado !== 'IA') {
    return new Response(`${META_DELIMITER}${JSON.stringify({ source: 'asesor', leadCapture: false, ...registro })}`, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);
  const messages = buildMessages(history, lang, knowledge);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let respuesta = '';
      let sawContent = false;
      let source: 'groq' | 'openai' | 'fallback' = 'fallback';
      let leadCapture = false;

      const filter = createMarkerFilter(LEAD_CAPTURE_MARKER, (text) => {
        if (text) {
          sawContent = true;
          respuesta += text;
          controller.enqueue(encoder.encode(text));
        }
      });

      try {
        const groqClient = getGroqClient();
        if (!groqKeyConfigured() || !groqClient) throw new Error('GROQ_API_KEY no configurada');

        const completion = await groqClient.chat.completions.create({
          model: GROQ_MODEL,
          messages,
          temperature: 0.7,
          max_tokens: 512,
          stream: true,
        });

        source = 'groq';
        for await (const chunk of completion) {
          const delta = chunk.choices?.[0]?.delta?.content;
          if (delta) filter.push(delta);
        }
        leadCapture = filter.flush();

        if (!sawContent) throw new Error('Groq devolvió una respuesta vacía');
      } catch (groqError) {
        console.error('❌ [chat] Groq streaming falló:', groqError instanceof Error ? groqError.message : groqError);

        try {
          const openaiClient = getOpenAIClient();
          if (!openaiKeyConfigured() || !openaiClient) throw new Error('OPENAI_API_KEY no configurada');

          sawContent = false;
          const openaiFilter = createMarkerFilter(LEAD_CAPTURE_MARKER, (text) => {
            if (text) {
              sawContent = true;
              respuesta += text;
              controller.enqueue(encoder.encode(text));
            }
          });

          const completion = await openaiClient.chat.completions.create({
            model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
            messages,
            max_tokens: 512,
            temperature: 0.7,
            stream: true,
          });

          source = 'openai';
          for await (const chunk of completion) {
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) openaiFilter.push(delta);
          }
          leadCapture = openaiFilter.flush();

          if (!sawContent) throw new Error('OpenAI devolvió una respuesta vacía');
        } catch (openaiError) {
          console.error('❌ [chat] OpenAI fallback falló:', openaiError instanceof Error ? openaiError.message : openaiError);

          const fallbackText = getFallbackResponse(lastUserMessage, lang);
          source = 'fallback';
          leadCapture = true;
          respuesta = fallbackText;
          controller.enqueue(encoder.encode(fallbackText));
        }
      }

      // La respuesta queda en la conversacion del ERP (la ve el asesor en la bandeja).
      if (registro.conversacionId && respuesta.trim() && parsed.data.visitante) {
        await erpEnviar(`/conversaciones/${registro.conversacionId}/ia`, { visitante: parsed.data.visitante, texto: respuesta.slice(0, 4000) }, { ip });
      }
      controller.enqueue(encoder.encode(`${META_DELIMITER}${JSON.stringify({ source, leadCapture, ...registro })}`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
