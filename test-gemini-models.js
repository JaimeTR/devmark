#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  console.error('❌ GOOGLE_GENAI_API_KEY no configurada');
  process.exit(1);
}

console.log('🔍 Probando diferentes modelos de Gemini...\n');

const models = [
  'gemini-1.5-flash',
  'gemini-1.5-flash-001',
  'gemini-1.5-pro',
  'gemini-pro',
  'gemini-1.0-pro',
  'models/gemini-pro',
  'models/gemini-1.5-flash',
];

async function testModel(modelName) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });
    
    const result = await model.generateContent('Responde solo con: OK');
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ ${modelName}: FUNCIONA - "${text.trim()}"`);
    return true;
  } catch (error) {
    console.log(`❌ ${modelName}: ${error.message.split('\n')[0]}`);
    return false;
  }
}

async function testAll() {
  for (const model of models) {
    await testModel(model);
    await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 500ms entre requests
  }
}

testAll().catch(console.error);
