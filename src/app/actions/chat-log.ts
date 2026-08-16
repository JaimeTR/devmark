'use server';

import { supabase } from '@/lib/supabase';

export async function logChatMessage(params: {
  sessionId: string;
  role: 'user' | 'assistant';
  content: string;
  lang: 'es' | 'en';
}) {
  if (!supabase || !params.sessionId || !params.content.trim()) return;

  try {
    await supabase.from('chat_messages').insert({
      session_id: params.sessionId,
      role: params.role,
      content: params.content,
      language: params.lang,
      source: 'devmark',
    });
  } catch (error) {
    console.error('❌ [chat-log] No se pudo guardar mensaje:', error instanceof Error ? error.message : error);
  }
}
