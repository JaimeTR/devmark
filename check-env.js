#!/usr/bin/env node

/**
 * Script de Verificación de Entorno - DevMark
 * Verifica que todas las configuraciones necesarias estén correctas
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración del entorno DevMark...\n');

let errors = [];
let warnings = [];
let success = [];

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[36m',
};

function log(type, message) {
  const color = colors[type] || colors.reset;
  console.log(`${color}${message}${colors.reset}`);
}

// 1. Verificar Node.js version
function checkNodeVersion() {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion >= 18) {
    success.push(`✅ Node.js ${nodeVersion} (requerido: 18+)`);
    return true;
  } else {
    errors.push(`❌ Node.js ${nodeVersion} es demasiado antiguo. Requerido: 18+`);
    return false;
  }
}

// 2. Verificar archivo .env.local
function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    errors.push('❌ Archivo .env.local no encontrado. Copia .env.example a .env.local');
    return false;
  }
  
  success.push('✅ Archivo .env.local encontrado');
  
  // Leer y verificar variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  // Variables críticas
  const criticalVars = [
    'NEXT_PUBLIC_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GOOGLE_GENAI_API_KEY',
  ];
  
  // Variables importantes
  const importantVars = [
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  ];
  
  // Variables opcionales
  const optionalVars = [
    'OPENAI_API_KEY',
    'SMTP_EMAIL',
    'SMTP_PASSWORD',
  ];
  
  // Verificar críticas
  criticalVars.forEach(varName => {
    if (!envVars[varName] || envVars[varName] === '' || envVars[varName].includes('tu-') || envVars[varName].includes('xxxxx')) {
      errors.push(`❌ Variable crítica no configurada: ${varName}`);
    } else {
      success.push(`✅ ${varName} configurada`);
    }
  });
  
  // Verificar importantes
  importantVars.forEach(varName => {
    if (!envVars[varName] || envVars[varName] === '' || envVars[varName].includes('xxxxx')) {
      warnings.push(`⚠️  Variable importante no configurada: ${varName} (funcionalidades limitadas)`);
    } else {
      success.push(`✅ ${varName} configurada`);
    }
  });
  
  // Verificar opcionales
  optionalVars.forEach(varName => {
    if (!envVars[varName] || envVars[varName] === '' || envVars[varName].includes('xxxxx')) {
      warnings.push(`⚠️  Variable opcional no configurada: ${varName}`);
    } else {
      success.push(`✅ ${varName} configurada`);
    }
  });
  
  return true;
}

// 3. Verificar node_modules
function checkNodeModules() {
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  
  if (!fs.existsSync(nodeModulesPath)) {
    errors.push('❌ node_modules no encontrado. Ejecuta: npm install');
    return false;
  }
  
  success.push('✅ node_modules encontrado');
  
  // Verificar algunas dependencias críticas
  const criticalDeps = [
    'next',
    'react',
    'typescript',
    '@supabase/supabase-js',
    'genkit',
  ];
  
  criticalDeps.forEach(dep => {
    const depPath = path.join(nodeModulesPath, dep);
    if (!fs.existsSync(depPath)) {
      errors.push(`❌ Dependencia crítica no instalada: ${dep}`);
    }
  });
  
  return true;
}

// 4. Verificar archivos de configuración
function checkConfigFiles() {
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'next.config.ts',
    'tailwind.config.ts',
    '.cursorrules',
  ];
  
  requiredFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      success.push(`✅ ${file} encontrado`);
    } else {
      warnings.push(`⚠️  ${file} no encontrado`);
    }
  });
}

// 5. Verificar .gitignore
function checkGitignore() {
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  
  if (!fs.existsSync(gitignorePath)) {
    warnings.push('⚠️  .gitignore no encontrado');
    return;
  }
  
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  
  if (gitignoreContent.includes('.env')) {
    success.push('✅ .env.local está protegido en .gitignore');
  } else {
    warnings.push('⚠️  .env.local podría no estar en .gitignore');
  }
}

// Ejecutar verificaciones
log('blue', '📦 Verificando Node.js...');
checkNodeVersion();

log('blue', '\n📁 Verificando archivos de configuración...');
checkConfigFiles();

log('blue', '\n📦 Verificando dependencias...');
checkNodeModules();

log('blue', '\n🔐 Verificando variables de entorno...');
checkEnvFile();

log('blue', '\n🔒 Verificando seguridad...');
checkGitignore();

// Mostrar resultados
console.log('\n' + '='.repeat(50));
log('green', '\n✅ ÉXITOS:');
success.forEach(msg => log('green', `  ${msg}`));

if (warnings.length > 0) {
  log('yellow', '\n⚠️  ADVERTENCIAS:');
  warnings.forEach(msg => log('yellow', `  ${msg}`));
}

if (errors.length > 0) {
  log('red', '\n❌ ERRORES:');
  errors.forEach(msg => log('red', `  ${msg}`));
  console.log('\n');
  log('red', '⚠️  Por favor, corrige los errores antes de continuar.');
  process.exit(1);
}

console.log('\n' + '='.repeat(50));
if (warnings.length === 0) {
  log('green', '\n🎉 ¡Todo está configurado correctamente!');
  log('blue', '\nPuedes ejecutar: npm run dev');
} else {
  log('yellow', '\n✅ Configuración básica completa, pero hay advertencias.');
  log('blue', '\nPuedes ejecutar: npm run dev');
  log('yellow', 'Algunas funcionalidades pueden estar limitadas.');
}

console.log('\n');
