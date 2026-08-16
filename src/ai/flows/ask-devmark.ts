'use server';

/**
 * @fileOverview Re-exporta el tipo `Message` compartido del chat.
 * El chat de la UI usa /api/chat (streaming) como camino principal;
 * ver src/ai/chat-shared.ts para el prompt/contexto compartido.
 */

import { type Message } from '@/ai/chat-shared';

export type { Message };
