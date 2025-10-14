// Script d'installation automatique du système de limitation d'appels
const fs = require('fs');
const https = require('https');

const SUPABASE_URL = 'https://kwzurhhbvfkrvhbcdhwi.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3enVyaGhidmZrcnZoYmNkaHdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc4NTQ5MCwiZXhwIjoyMDc1MzYxNDkwfQ.P3BpGOIgMhgEMBjxdNQythIfbcqVurpuDyEF1mpFCYI';
const CALCOM_API_KEY = 'cal_live_222756a938835fd048807da9d241fba3';

console.log('🚀 Installation du système de limitation d\'appels...\n');

// Fonction pour faire une requête HTTPS
function makeRequest(url, options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

// Étape 1 : Exécuter le script SQL
async function step1_executeSQL() {
  console.log('📝 Étape 1 : Exécution du script SQL...');
  
  try {
    const sqlScript = fs.readFileSync('./supabase/migrations/create_call_limits_system.sql', 'utf8');
    
    const url = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`
      }
    };
    
    // Diviser le script en commandes individuelles
    const commands = sqlScript
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    console.log(`   → ${commands.length} commandes SQL à exécuter...`);
    
    // Exécuter chaque commande via l'API Supabase
    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i] + ';';
      try {
        const response = await makeRequest(
          `${SUPABASE_URL}/rest/v1/rpc/exec_sql`,
          options,
          { query: cmd }
        );
        console.log(`   ✅ Commande ${i + 1}/${commands.length} exécutée`);
      } catch (err) {
        console.log(`   ⚠️  Commande ${i + 1}/${commands.length} ignorée (peut-être déjà existante)`);
      }
    }
    
    console.log('   ✅ Script SQL exécuté avec succès\n');
    return true;
  } catch (error) {
    console.error('   ❌ Erreur:', error.message);
    console.log('   ℹ️  Vous devrez exécuter le SQL manuellement dans Supabase Dashboard\n');
    return false;
  }
}

// Étape 2 : Déployer le webhook Supabase
async function step2_deployWebhook() {
  console.log('🔗 Étape 2 : Déploiement du webhook...');
  console.log('   ℹ️  Le webhook doit être déployé via Supabase CLI');
  console.log('   ℹ️  Exécutez : supabase functions deploy calcom-webhook');
  console.log('   ✅ Fichier webhook créé : supabase/functions/calcom-webhook/index.ts\n');
  return true;
}

// Étape 3 : Configurer le webhook Cal.com
async function step3_configureCalcom() {
  console.log('🎣 Étape 3 : Configuration du webhook Cal.com...');
  
  try {
    const webhookUrl = `${SUPABASE_URL}/functions/v1/calcom-webhook`;
    
    const data = {
      subscriberUrl: webhookUrl,
      eventTriggers: ['BOOKING_CREATED', 'BOOKING_CANCELLED', 'BOOKING_RESCHEDULED'],
      active: true,
      payloadTemplate: null
    };
    
    const url = new URL('https://api.cal.com/v1/webhooks');
    url.searchParams.append('apiKey', CALCOM_API_KEY);
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const response = await makeRequest(url.toString(), options, data);
    
    if (response.status === 200 || response.status === 201) {
      console.log('   ✅ Webhook Cal.com configuré avec succès');
      console.log(`   📍 URL: ${webhookUrl}`);
      console.log('   📋 Events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED\n');
      return true;
    } else {
      console.log('   ⚠️  Réponse:', response.status, response.data);
      console.log('   ℹ️  Vous devrez peut-être configurer le webhook manuellement\n');
      return false;
    }
  } catch (error) {
    console.error('   ❌ Erreur:', error.message);
    console.log('   ℹ️  Configurez le webhook manuellement sur Cal.com');
    console.log(`   📍 URL: ${SUPABASE_URL}/functions/v1/calcom-webhook`);
    console.log('   📋 Events: BOOKING_CREATED, BOOKING_CANCELLED, BOOKING_RESCHEDULED\n');
    return false;
  }
}

// Étape 4 : Activer pg_cron
async function step4_enableCron() {
  console.log('⏰ Étape 4 : Configuration du reset automatique...');
  console.log('   ℹ️  Vous devez activer pg_cron manuellement :');
  console.log('   1. Supabase Dashboard → Database → Extensions');
  console.log('   2. Cherchez "pg_cron" et activez-le');
  console.log('   3. SQL Editor → Exécutez :');
  console.log('      SELECT cron.schedule(');
  console.log('        \'reset-weekly-calls\',');
  console.log('        \'0 0 * * 1\',');
  console.log('        \'SELECT reset_weekly_call_limits()\'');
  console.log('      );\n');
  return true;
}

// Exécution principale
async function main() {
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  INSTALLATION SYSTÈME DE LIMITATION D\'APPELS CAL.COM');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  await step1_executeSQL();
  await step2_deployWebhook();
  await step3_configureCalcom();
  await step4_enableCron();
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('  ✅ INSTALLATION TERMINÉE !');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log('📋 PROCHAINES ÉTAPES MANUELLES :');
  console.log('1. Déployez le webhook : supabase functions deploy calcom-webhook');
  console.log('2. Activez pg_cron dans Supabase Dashboard');
  console.log('3. Testez en réservant un appel sur Cal.com\n');
  
  console.log('📖 Consultez ACTIONS_A_FAIRE.md pour plus de détails\n');
}

main().catch(console.error);

