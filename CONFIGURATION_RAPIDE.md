# ⚡ CONFIGURATION RAPIDE (5 MINUTES)

## 🎯 Étape 1 : SQL Supabase (2 minutes)

### Copie-colle ce lien dans ton navigateur :
```
https://supabase.com/dashboard/project/kwzurhhbvfkrvhbcdhwi/sql/new
```

### Ensuite :
1. ✅ Tu arrives directement dans l'éditeur SQL
2. ✅ Ouvre le fichier `setup-supabase.sql` dans ton projet
3. ✅ Copie TOUT le contenu (Ctrl+A, Ctrl+C)
4. ✅ Colle dans l'éditeur Supabase (Ctrl+V)
5. ✅ Clique sur **"Run"** (en bas à droite)
6. ✅ Tu devrais voir : **"Success. No rows returned"**

**✅ Étape 1 terminée !**

---

## 🔗 Étape 2 : Webhook Cal.com (1 minute)

### Copie-colle ce lien dans ton navigateur :
```
https://app.cal.com/settings/developer/webhooks
```

### Ensuite :
1. ✅ Clique sur **"New Webhook"**
2. ✅ Dans **"Subscriber URL"**, colle :
   ```
   https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/calcom-webhook
   ```
3. ✅ Dans **"Event Triggers"**, coche ces 3 cases :
   - ✅ Booking Created
   - ✅ Booking Cancelled  
   - ✅ Booking Rescheduled
4. ✅ Active le webhook (bouton **"Active"** = ON)
5. ✅ Clique sur **"Create Webhook"**

**✅ Étape 2 terminée !**

---

## 🚀 Étape 3 : Déployer le Webhook Supabase (2 minutes)

### Dans ton terminal (PowerShell), exécute :

```powershell
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier ton projet
supabase link --project-ref kwzurhhbvfkrvhbcdhwi

# Déployer la fonction webhook
supabase functions deploy calcom-webhook --project-ref kwzurhhbvfkrvhbcdhwi
```

**✅ Étape 3 terminée !**

---

## ⏰ Étape 4 : Activer le Reset Automatique (optionnel, 1 minute)

### Copie-colle ce lien dans ton navigateur :
```
https://supabase.com/dashboard/project/kwzurhhbvfkrvhbcdhwi/database/extensions
```

### Ensuite :
1. ✅ Cherche **"pg_cron"** dans la liste
2. ✅ Clique sur **"Enable"** à côté de pg_cron
3. ✅ Va dans SQL Editor : https://supabase.com/dashboard/project/kwzurhhbvfkrvhbcdhwi/sql/new
4. ✅ Colle cette requête :
   ```sql
   SELECT cron.schedule(
     'reset-weekly-calls',
     '0 0 * * 1',
     'SELECT reset_weekly_call_limits()'
   );
   ```
5. ✅ Clique sur **"Run"**

**✅ Étape 4 terminée !**

---

## 🧪 TESTER LE SYSTÈME

### Test rapide :
1. ✅ Lance ton app : `npm run dev`
2. ✅ Connecte-toi avec un compte
3. ✅ Va dans "Book un Call"
4. ✅ Tu devrais voir : **"📞 Il vous reste 2 appels"**
5. ✅ Clique sur "Booker" → Tu vois ton email dans la popup
6. ✅ Clique sur "Continuer" → Tu es redirigé vers Cal.com
7. ✅ Réserve un appel (avec le même email !)
8. ✅ Retourne sur ton app → Maintenant : **"📞 Il vous reste 1 appel"**

---

## ✅ C'EST TERMINÉ !

Ton système est maintenant opérationnel ! 🎉

### Ce qui fonctionne maintenant :
- ✅ Chaque utilisateur a 2 appels/semaine
- ✅ L'email est vérifié automatiquement
- ✅ Les appels se décrémentent automatiquement
- ✅ Reset automatique chaque lundi à minuit
- ✅ Impossible de tricher

### En cas de problème :
- Vérifie les logs du webhook : https://supabase.com/dashboard/project/kwzurhhbvfkrvhbcdhwi/functions/calcom-webhook/logs
- Vérifie les données : https://supabase.com/dashboard/project/kwzurhhbvfkrvhbcdhwi/editor
- Consulte `CALCOM_CALL_LIMITS_SETUP.md` pour le dépannage détaillé

