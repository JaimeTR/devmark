#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const https = require('https');

const apiKey = process.env.GOOGLE_GENAI_API_KEY;

console.log('🔍 Probando todos los modelos de Gemini disponibles...\n');

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const models = JSON.parse(data);
    const generativeModels = models.models.filter(m => 
      m.name.includes('gemini') && 
      !m.name.includes('embedding') &&
      !m.name.includes('embed')
    );
    
    console.log(`Modelos Gemini encontrados: ${generativeModels.length}\n`);
    
    // Probar los modelos más antiguos primero (pueden tener diferente cuota)
    const modelsToTest = [
      'models/gemini-1.0-pro',
      'models/gemini-1.5-flash',
      'models/gemini-1.5-pro',
      'models/gemini-2.0-flash-exp',
    ];
    
    async function testModel(modelName) {
      return new Promise((resolve) => {
        const generateUrl = `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`;
        const postData = JSON.stringify({
          contents: [{
            parts: [{
              text: 'OK'
            }]
          }]
        });
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        };
        
        const req = https.request(generateUrl, options, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            if (res.statusCode === 200) {
              console.log(`✅ ${modelName}: FUNCIONA`);
              resolve(true);
            } else if (res.statusCode === 429) {
              console.log(`⏸️  ${modelName}: Cuota excedida (esperar unos minutos)`);
              resolve(false);
            } else {
              const error = JSON.parse(data);
              console.log(`❌ ${modelName}: ${error.error?.message || res.statusCode}`);
              resolve(false);
            }
          });
        });
        
        req.on('error', (e) => {
          console.log(`❌ ${modelName}: Error de conexión`);
          resolve(false);
        });
        
        req.write(postData);
        req.end();
      });
    }
    
    async function testAll() {
      for (const model of modelsToTest) {
        await testModel(model);
        await new Promise(r => setTimeout(r, 1000));
      }
    }
    
    testAll().then(() => {
      console.log('\n💡 Si todos dan error 429, espera unos minutos y prueba de nuevo.');
      console.log('   O verifica tu cuota en: https://ai.dev/rate-limit');
    });
  });
}).on('error', console.error);
