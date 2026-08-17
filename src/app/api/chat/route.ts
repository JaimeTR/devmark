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
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const encoder = new TextEncoder();

// Límites anti-abuso: este endpoint consume cuota real de Groq/OpenAI por
// request, así que se protege con un límite simple por IP y topes de tamaño
// de payload (sin agregar dependencias nuevas).
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60_000; // 15 requests/minuto por IP
const MAX_HISTORY_LENGTH = 40;
const MAX_MESSAGE_LENGTH = 4000;

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

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (isRateLimited(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return new Response('Too many requests. Please try again in a minute.', { status: 429 });
  }

  let body: { history?: Message[] };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400 });
  }

  const history = Array.isArray(body.history) ? body.history : [];
  if (
    history.length === 0 ||
    history.length > MAX_HISTORY_LENGTH ||
    history.some(m => typeof m?.content !== 'string' || m.content.length > MAX_MESSAGE_LENGTH)
  ) {
    return new Response('Invalid request payload', { status: 400 });
  }

  const lastUserMessage = history.filter(m => m.role === 'user').pop()?.content || '';
  const lang = detectLang(lastUserMessage);
  const knowledge = await fetchKnowledgeContext(lastUserMessage, lang);
  const messages = buildMessages(history, lang, knowledge);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let sawContent = false;
      let source: 'groq' | 'openai' | 'fallback' = 'fallback';
      let leadCapture = false;

      const filter = createMarkerFilter(LEAD_CAPTURE_MARKER, (text) => {
        if (text) {
          sawContent = true;
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
              controller.enqueue(encoder.encode(text));
            }
          });

          const completion = await openaiClient.chat.completions.create({
            model: 'gpt-3.5-turbo',
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
          controller.enqueue(encoder.encode(fallbackText));
        }
      }

      controller.enqueue(encoder.encode(`${META_DELIMITER}${JSON.stringify({ source, leadCapture })}`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
