#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

console.log('🧪 Prueba Final de API Keys\n');

async function testGemini() {
  try {
    console.log('🔄 Probando Gemini 2.0 Flash...');
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const result = await model.generateContent('Hola, responde con un saludo breve');
    const response = await result.response;
    const text = response.text();
    
    console.log(`✅ Gemini funciona perfectamente!`);
    console.log(`   Respuesta: "${text.trim()}"\n`);
    return true;
  } catch (error) {
    console.error(`❌ Error: ${error.message}\n`);
    return false;
  }
}

testGemini().then(success => {
  if (success) {
    console.log('🎉 ¡Todo funciona! Tu chat de IA está listo para usar.');
    console.log('\n💡 Para probar el chat:');
    console.log('   1. Ejecuta: npm run dev');
    console.log('   2. Ve a: http://localhost:9002/ai-assistant');
    console.log('   3. Haz una pregunta en el chat');
  } else {
    console.log('⚠️  Hubo un problema. Revisa los logs arriba.');
  }
});
