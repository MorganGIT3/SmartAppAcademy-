# 🎯 Configuration du Système de Limitation d'Appels Cal.com

## 📋 Vue d'ensemble

Ce système limite chaque utilisateur à **2 appels par semaine** qui se réinitialisent automatiquement **chaque lundi**. Le système vérifie que l'email utilisé pour réserver sur Cal.com correspond à l'email du compte SmartApp Academy™.

---

## 🗄️ Étape 1 : Configuration Supabase

### 1.1 Exécuter le script SQL

1. Allez dans votre **Supabase Dashboard**
2. Cliquez sur **SQL Editor**
3. Créez une nouvelle requête
4. Copiez-collez le contenu du fichier `supabase/migrations/create_call_limits_system.sql`
5. Cliquez sur **Run** pour exécuter le script

Ce script va créer :
- ✅ Table `user_call_limits` (limites d'appels par utilisateur)
- ✅ Table `calcom_bookings` (historique des réservations)
- ✅ Fonction `initialize_user_call_limits()` (initialisation auto pour nouveaux users)
- ✅ Fonction `use_call()` (décrémenter les appels)
- ✅ Fonction `get_user_call_limits()` (récupérer les limites)
- ✅ Fonction `reset_weekly_call_limits()` (reset hebdomadaire)
- ✅ Triggers et politiques RLS

### 1.2 Activer pg_cron (optionnel mais recommandé)

Pour le reset automatique chaque lundi :

1. Dans Supabase Dashboard, allez dans **Database** → **Extensions**
2. Cherchez `pg_cron` et activez-le
3. Retournez dans **SQL Editor** et exécutez :

```sql
SELECT cron.schedule(
  'reset-weekly-calls',
  '0 0 * * 1',
  'SELECT reset_weekly_call_limits()'
);
```

Cela va réinitialiser les appels de tous les utilisateurs **chaque lundi à minuit**.

---

## 🔗 Étape 2 : Configuration Cal.com Webhook

### 2.1 Déployer la Edge Function

1. Installez Supabase CLI si ce n'est pas déjà fait :
```bash
npm install -g supabase
```

2. Connectez-vous à votre projet :
```bash
supabase login
supabase link --project-ref VOTRE_PROJECT_REF
```

3. Déployez la fonction webhook :
```bash
supabase functions deploy calcom-webhook
```

4. Notez l'URL de la fonction (elle ressemble à) :
```
https://VOTRE_PROJECT_REF.supabase.co/functions/v1/calcom-webhook
```

### 2.2 Configurer le Webhook dans Cal.com

1. Allez sur [Cal.com](https://app.cal.com)
2. Cliquez sur votre profil → **Settings** → **Developer** → **Webhooks**
3. Cliquez sur **New Webhook**
4. Configurez :
   - **Subscriber URL** : `https://VOTRE_PROJECT_REF.supabase.co/functions/v1/calcom-webhook`
   - **Event Triggers** : Cochez :
     - ✅ Booking Created
     - ✅ Booking Cancelled
     - ✅ Booking Rescheduled
   - **Active** : ✅ Oui
5. Cliquez sur **Save**

---

## 🔑 Étape 3 : Variables d'environnement (optionnel)

Si vous voulez utiliser l'API Cal.com directement, ajoutez dans votre `.env` :

```env
# Cal.com API (optionnel)
VITE_CALCOM_API_KEY=votre_clé_api_calcom
CALCOM_API_KEY=votre_clé_api_calcom
```

Pour obtenir votre clé API Cal.com :
1. Allez sur [Cal.com](https://app.cal.com)
2. **Settings** → **Developer** → **API Keys**
3. Créez une nouvelle clé API

---

## 🧪 Étape 4 : Tester le système

### Test 1 : Vérifier l'initialisation

1. Connectez-vous à votre app avec un compte test
2. Allez dans la page "Book un Call"
3. Vous devriez voir : **"📞 Il vous reste 2 appels"**

### Test 2 : Réserver un appel

1. Cliquez sur **"Booker mes appels de la semaine"**
2. Vérifiez que la popup affiche :
   - ✅ Votre email de connexion
   - ✅ Le nombre d'appels restants
   - ✅ Le message d'avertissement
3. Cliquez sur **Continuer**
4. Vous êtes redirigé vers Cal.com avec votre email pré-rempli
5. **IMPORTANT** : Réservez avec le **même email** que votre compte

### Test 3 : Vérifier la décrémentation

Après avoir réservé sur Cal.com :

1. Retournez sur votre app
2. Rechargez la page "Book un Call"
3. Vous devriez voir : **"📞 Il vous reste 1 appel"**

### Test 4 : Vérifier la limite

1. Réservez un 2ème appel
2. Essayez de réserver un 3ème appel
3. Vous devriez voir : **"❌ Vous avez atteint votre limite..."**

### Test 5 : Vérifier dans Supabase

1. Allez dans **Supabase Dashboard** → **Table Editor**
2. Ouvrez la table `user_call_limits`
3. Vérifiez que votre ligne a :
   - `calls_remaining` = 0 ou 1
   - `calls_used` = 2 ou 1
4. Ouvrez la table `calcom_bookings`
5. Vérifiez que vos réservations sont enregistrées

---

## 🔄 Fonctionnement du système

### Flux complet :

```
1. Utilisateur clique sur "Booker mes appels"
   ↓
2. App vérifie les appels restants via get_user_call_limits()
   ↓
3. Si appels disponibles → Affiche popup avec email
   ↓
4. Utilisateur confirme → Redirigé vers Cal.com (email pré-rempli)
   ↓
5. Utilisateur réserve sur Cal.com
   ↓
6. Cal.com envoie webhook à Supabase
   ↓
7. Webhook vérifie l'email et trouve l'utilisateur
   ↓
8. Webhook enregistre le booking dans calcom_bookings
   ↓
9. Webhook appelle use_call() pour décrémenter
   ↓
10. Utilisateur a maintenant 1 appel de moins
```

### Reset hebdomadaire :

```
Chaque lundi à 00:00 (via pg_cron) :
  ↓
reset_weekly_call_limits() est exécuté
  ↓
Tous les utilisateurs repassent à 2 appels
```

---

## 🐛 Dépannage

### Problème : Les appels ne se décrémentent pas

**Solution** :
1. Vérifiez que le webhook Cal.com est actif
2. Allez dans Cal.com → Settings → Developer → Webhooks
3. Cliquez sur votre webhook et vérifiez les **Recent Deliveries**
4. Si erreur 500, vérifiez les logs Supabase :
   ```bash
   supabase functions logs calcom-webhook
   ```

### Problème : Email ne correspond pas

**Solution** :
- L'utilisateur DOIT réserver avec le **même email** que son compte SmartApp Academy™
- L'email est pré-rempli automatiquement dans Cal.com
- Si l'utilisateur change l'email, le booking ne sera pas comptabilisé

### Problème : Reset hebdomadaire ne fonctionne pas

**Solution** :
1. Vérifiez que `pg_cron` est activé
2. Vérifiez que le cron job est créé :
   ```sql
   SELECT * FROM cron.job;
   ```
3. Testez manuellement :
   ```sql
   SELECT reset_weekly_call_limits();
   ```

### Problème : Utilisateur bloqué à 0 appels

**Solution manuelle** :
```sql
-- Réinitialiser un utilisateur spécifique
UPDATE user_call_limits
SET calls_remaining = 2, calls_used = 0
WHERE email = 'email@utilisateur.com';
```

---

## 📊 Requêtes SQL utiles

### Voir tous les utilisateurs et leurs limites
```sql
SELECT 
  u.email,
  ucl.calls_remaining,
  ucl.calls_used,
  ucl.week_start_date,
  ucl.last_reset_date
FROM user_call_limits ucl
JOIN auth.users u ON u.id = ucl.user_id
ORDER BY ucl.calls_remaining ASC;
```

### Voir l'historique des bookings
```sql
SELECT 
  cb.email,
  cb.name,
  cb.booking_date,
  cb.event_type,
  cb.status,
  cb.created_at
FROM calcom_bookings cb
ORDER BY cb.booking_date DESC;
```

### Réinitialiser manuellement tous les utilisateurs
```sql
SELECT reset_weekly_call_limits();
```

### Ajouter manuellement des appels à un utilisateur
```sql
UPDATE user_call_limits
SET calls_remaining = calls_remaining + 1
WHERE email = 'email@utilisateur.com';
```

---

## ✅ Checklist de déploiement

- [ ] Script SQL exécuté dans Supabase
- [ ] Tables créées (user_call_limits, calcom_bookings)
- [ ] Fonctions PostgreSQL créées
- [ ] pg_cron activé et configuré
- [ ] Edge Function webhook déployée
- [ ] Webhook configuré dans Cal.com
- [ ] Test avec un compte utilisateur
- [ ] Vérification de la décrémentation
- [ ] Vérification du reset hebdomadaire

---

## 🎉 C'est terminé !

Votre système de limitation d'appels est maintenant opérationnel ! 

**Rappel important** : Les utilisateurs DOIVENT réserver avec le même email que leur compte SmartApp Academy™, sinon l'appel ne sera pas comptabilisé.

