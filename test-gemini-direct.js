#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const https = require('https');

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  console.error('❌ GOOGLE_GENAI_API_KEY no configurada');
  process.exit(1);
}

console.log('🔍 Probando API key de Gemini directamente...\n');
console.log(`API Key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 5)}\n`);

// Probar con lista de modelos primero
const url1 = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log('1️⃣ Listando modelos disponibles...');

https.get(url1, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    if (res.statusCode === 200) {
      const models = JSON.parse(data);
      console.log('✅ API key válida! Modelos disponibles:');
      if (models.models && models.models.length > 0) {
        models.models.slice(0, 5).forEach(m => {
          console.log(`   - ${m.name}`);
        });
        console.log(`   ... y ${models.models.length - 5} más\n`);
        
        // Probar con el primer modelo disponible
        const firstModel = models.models[0].name.replace('models/', '');
        console.log(`2️⃣ Probando generación con: ${firstModel}...`);
        
        const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${models.models[0].name}:generateContent?key=${apiKey}`;
        const postData = JSON.stringify({
          contents: [{
            parts: [{
              text: 'Responde solo con: OK'
            }]
          }]
        });
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
          }
        };
        
        const req = https.request(generateUrl, options, (res2) => {
          let data2 = '';
          res2.on('data', (chunk) => { data2 += chunk; });
          res2.on('end', () => {
            if (res2.statusCode === 200) {
              const response = JSON.parse(data2);
              const text = response.candidates[0]?.content?.parts[0]?.text || 'Sin respuesta';
              console.log(`✅ Generación exitosa! Respuesta: "${text.trim()}"`);
              console.log(`\n🎉 La API key funciona! Usa el modelo: ${firstModel}`);
            } else {
              console.log(`❌ Error en generación (${res2.statusCode}): ${data2.substring(0, 200)}`);
            }
          });
        });
        
        req.on('error', (e) => {
          console.error(`❌ Error de conexión: ${e.message}`);
        });
        
        req.write(postData);
        req.end();
      }
    } else {
      console.log(`❌ Error (${res.statusCode}): ${data.substring(0, 300)}`);
      if (res.statusCode === 400) {
        console.log('\n⚠️  La API key parece ser inválida o no tiene permisos');
      } else if (res.statusCode === 403) {
        console.log('\n⚠️  La API key no tiene permisos para acceder a los modelos');
        console.log('   Verifica en Google Cloud Console que la API Generative Language esté habilitada');
      }
    }
  });
}).on('error', (e) => {
  console.error(`❌ Error de conexión: ${e.message}`);
});
