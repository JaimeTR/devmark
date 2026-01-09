#!/usr/bin/env node

/**
 * Script para probar las API keys de Gemini y OpenAI
 */

require('dotenv').config({ path: '.env.local' });

const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

console.log('🧪 Probando API Keys...\n');

// Verificar variables de entorno
const geminiKey = process.env.GOOGLE_GENAI_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

console.log('📋 Configuración detectada:');
console.log(`   GOOGLE_GENAI_API_KEY: ${geminiKey ? `✅ Configurada (${geminiKey.length} caracteres)` : '❌ No configurada'}`);
console.log(`   OPENAI_API_KEY: ${openaiKey ? `✅ Configurada (${openaiKey.length} caracteres)` : '❌ No configurada'}\n`);

// Probar Gemini
async function testGemini() {
  if (!geminiKey) {
    console.log('⏭️  Saltando prueba de Gemini (no configurada)');
    return false;
  }

  try {
    console.log('🔄 Probando Google Gemini...');
    const genAI = new GoogleGenerativeAI(geminiKey);
    // Usar gemini-pro que es el modelo más compatible
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent('Responde solo con: OK');
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ Gemini funciona correctamente! Respuesta: "${text.trim()}"\n`);
    return true;
  } catch (error) {
    console.error(`❌ Error con Gemini: ${error.message}\n`);
    return false;
  }
}

// Probar OpenAI
async function testOpenAI() {
  if (!openaiKey) {
    console.log('⏭️  Saltando prueba de OpenAI (no configurada)');
    return false;
  }

  try {
    console.log('🔄 Probando OpenAI...');
    const openai = new OpenAI({ apiKey: openaiKey });
    
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Responde solo con: OK' }],
      max_tokens: 10,
    });
    
    const response = completion.choices[0]?.message?.content?.trim();
    console.log(`✅ OpenAI funciona correctamente! Respuesta: "${response}"\n`);
    return true;
  } catch (error) {
    console.error(`❌ Error con OpenAI: ${error.message}\n`);
    if (error.status === 401) {
      console.error('   ⚠️  La API key parece ser inválida o expirada');
    } else if (error.status === 429) {
      console.error('   ⚠️  Límite de cuota excedido');
    }
    return false;
  }
}

// Ejecutar pruebas
async function runTests() {
  const geminiOk = await testGemini();
  const openaiOk = await testOpenAI();
  
  console.log('📊 Resultado Final:');
  console.log(`   Gemini: ${geminiOk ? '✅ Funciona' : '❌ No funciona'}`);
  console.log(`   OpenAI: ${openaiOk ? '✅ Funciona' : '❌ No funciona'}\n`);
  
  if (geminiOk || openaiOk) {
    console.log('🎉 ¡Al menos una API funciona! Tu chat de IA debería funcionar correctamente.');
  } else {
    console.log('⚠️  Ninguna API funciona. Verifica tus API keys en .env.local');
  }
}

runTests().catch(console.error);
