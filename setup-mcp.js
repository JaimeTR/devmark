#!/usr/bin/env node

/**
 * Script para configurar MCP de Cursor con Supabase
 * Lee las variables de entorno de .env.local y crea/actualiza mcp.json
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🔧 Configurando MCP para Cursor IDE...\n');

// Determinar la ruta de configuración de Cursor según el SO
function getCursorConfigPath() {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Roaming', 'Cursor', 'User', 'mcp.json');
  } else if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Application Support', 'Cursor', 'User', 'mcp.json');
  } else {
    return path.join(os.homedir(), '.config', 'Cursor', 'User', 'mcp.json');
  }
}

// Leer variables de entorno de .env.local
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ Error: No se encontró el archivo .env.local');
    console.log('\n📝 Por favor crea el archivo .env.local con tus credenciales:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui\n');
    return null;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^["']|["']$/g, ''); // Remove quotes
        envVars[key] = value;
      }
    }
  });
  
  return envVars;
}

// Crear configuración MCP
function createMcpConfig(envVars) {
  const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Faltan credenciales de Supabase en .env.local');
    console.log('\n📋 Variables requeridas:');
    console.log('   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co');
    console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui\n');
    return null;
  }
  
  // Verificar que no sean valores placeholder
  if (supabaseUrl.includes('tu-proyecto') || supabaseKey.includes('tu') || supabaseKey.includes('xxxxx')) {
    console.error('❌ Error: Las credenciales en .env.local parecen ser placeholders');
    console.log('   Por favor actualiza con tus credenciales reales de Supabase\n');
    return null;
  }
  
  const config = {
    mcpServers: {
      supabase: {
        command: "npx",
        args: [
          "-y",
          "@modelcontextprotocol/server-supabase",
          "--supabase-url",
          supabaseUrl,
          "--supabase-key",
          supabaseKey
        ]
      }
    }
  };
  
  return config;
}

// Función principal
function main() {
  // Cargar variables de entorno
  const envVars = loadEnvFile();
  if (!envVars) {
    process.exit(1);
  }
  
  // Crear configuración
  const mcpConfig = createMcpConfig(envVars);
  if (!mcpConfig) {
    process.exit(1);
  }
  
  // Obtener ruta de configuración
  const mcpPath = getCursorConfigPath();
  const mcpDir = path.dirname(mcpPath);
  
  // Crear directorio si no existe
  if (!fs.existsSync(mcpDir)) {
    fs.mkdirSync(mcpDir, { recursive: true });
    console.log(`✅ Directorio de Cursor creado: ${mcpDir}`);
  }
  
  // Verificar si ya existe configuración
  let existingConfig = {};
  if (fs.existsSync(mcpPath)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
      console.log('⚠️  Archivo mcp.json ya existe, se actualizará con la configuración de Supabase');
    } catch (error) {
      console.log('⚠️  El archivo mcp.json existe pero tiene errores, se recreará');
    }
  }
  
  // Fusionar configuraciones (preservar otras configuraciones MCP si existen)
  if (existingConfig.mcpServers) {
    mcpConfig.mcpServers = {
      ...existingConfig.mcpServers,
      ...mcpConfig.mcpServers
    };
  }
  
  // Guardar configuración
  try {
    fs.writeFileSync(mcpPath, JSON.stringify(mcpConfig, null, 2), 'utf8');
    console.log(`\n✅ Configuración MCP guardada en: ${mcpPath}`);
    console.log('\n📋 Configuración creada:');
    console.log(`   - Servidor: supabase`);
    console.log(`   - URL: ${envVars.NEXT_PUBLIC_SUPABASE_URL.substring(0, 40)}...`);
    console.log(`   - Key: ${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`);
    
    console.log('\n🔄 Próximos pasos:');
    console.log('   1. Reinicia Cursor IDE para que los cambios surtan efecto');
    console.log('   2. Verifica en Cursor Settings → MCP que aparece "supabase"');
    console.log('   3. Prueba hacer una consulta usando el chat de Cursor:\n');
    console.log('      "¿Cuántas cotizaciones hay en la base de datos?"\n');
    console.log('✨ ¡MCP configurado exitosamente!\n');
    
  } catch (error) {
    console.error(`❌ Error al guardar configuración: ${error.message}`);
    console.log(`\n💡 Intenta crear el archivo manualmente en: ${mcpPath}\n`);
    process.exit(1);
  }
}

main();
