# 🎯 ACTIONS À FAIRE POUR ACTIVER LE SYSTÈME D'APPELS

## ✅ CE QUI EST DÉJÀ FAIT

- ✅ Code complet développé et committé sur GitHub
- ✅ Interface utilisateur modifiée (affichage email + appels restants)
- ✅ Fonctions Supabase créées
- ✅ Webhook Cal.com développé
- ✅ Documentation complète

---

## 🚀 CE QU'IL TE RESTE À FAIRE

### 📝 Étape 1 : Exécuter le script SQL dans Supabase (5 minutes)

1. Va sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionne ton projet : `kwzurhhbvfkrvhbcdhwi`
3. Clique sur **SQL Editor** dans le menu de gauche
4. Clique sur **New Query**
5. Ouvre le fichier `supabase/migrations/create_call_limits_system.sql` dans ton projet
6. **Copie TOUT le contenu** du fichier
7. **Colle-le** dans l'éditeur SQL de Supabase
8. Clique sur **Run** (en bas à droite)
9. Tu devrais voir : ✅ **Success. No rows returned**

**Important** : Ce script va créer toutes les tables et fonctions nécessaires.

---

### 🔗 Étape 2 : Déployer le Webhook Supabase (5 minutes)

#### Option A : Via Supabase CLI (recommandé)

1. Ouvre un terminal dans ton projet
2. Exécute :
```bash
# Installer Supabase CLI (si pas déjà fait)
npm install -g supabase

# Se connecter
supabase login

# Lier ton projet
supabase link --project-ref kwzurhhbvfkrvhbcdhwi

# Déployer la fonction webhook
supabase functions deploy calcom-webhook
```

3. Note l'URL qui s'affiche (elle ressemble à) :
```
https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/calcom-webhook
```

#### Option B : Via Dashboard Supabase

1. Va dans **Edge Functions** dans Supabase Dashboard
2. Clique sur **New Function**
3. Nom : `calcom-webhook`
4. Copie le contenu de `supabase/functions/calcom-webhook/index.ts`
5. Colle-le et clique sur **Deploy**

---

### 🎣 Étape 3 : Configurer le Webhook dans Cal.com (3 minutes)

1. Va sur [Cal.com](https://app.cal.com)
2. Connecte-toi avec ton compte
3. Clique sur ton profil (en haut à droite) → **Settings**
4. Dans le menu de gauche, clique sur **Developer**
5. Clique sur **Webhooks**
6. Clique sur **New Webhook**
7. Configure :
   - **Subscriber URL** : 
     ```
     https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/calcom-webhook
     ```
   - **Event Triggers** : Coche ces 3 cases :
     - ✅ Booking Created
     - ✅ Booking Cancelled
     - ✅ Booking Rescheduled
   - **Active** : ✅ Oui
8. Clique sur **Create Webhook**

---

### ⏰ Étape 4 : Activer le Reset Automatique (2 minutes)

1. Va dans **Supabase Dashboard** → **Database** → **Extensions**
2. Cherche `pg_cron` dans la liste
3. Clique sur **Enable** à côté de `pg_cron`
4. Va dans **SQL Editor**
5. Exécute cette requête :

```sql
SELECT cron.schedule(
  'reset-weekly-calls',
  '0 0 * * 1',
  'SELECT reset_weekly_call_limits()'
);
```

6. Tu devrais voir : ✅ **Success**

**Résultat** : Maintenant, chaque lundi à minuit, tous les utilisateurs repasseront automatiquement à 2 appels disponibles.

---

## 🧪 TESTER LE SYSTÈME

### Test 1 : Vérifier l'interface

1. Lance ton app en local : `npm run dev`
2. Connecte-toi avec un compte test
3. Va dans "Book un Call"
4. Tu devrais voir : **"📞 Il vous reste 2 appels"**

### Test 2 : Réserver un appel

1. Clique sur **"Booker mes appels de la semaine"**
2. Vérifie que la popup affiche :
   - ✅ Ton email de connexion
   - ✅ "Il vous reste 2 appels"
   - ✅ Message d'avertissement en rouge
3. Clique sur **Continuer**
4. Tu es redirigé vers Cal.com
5. **IMPORTANT** : Réserve avec le **même email** que ton compte
6. Confirme la réservation sur Cal.com

### Test 3 : Vérifier la décrémentation

1. Attends 10-20 secondes (le temps que le webhook s'exécute)
2. Retourne sur ton app
3. Recharge la page "Book un Call"
4. Tu devrais maintenant voir : **"📞 Il vous reste 1 appel"**

### Test 4 : Vérifier dans Supabase

1. Va dans **Supabase Dashboard** → **Table Editor**
2. Ouvre la table `user_call_limits`
3. Tu devrais voir ta ligne avec :
   - `calls_remaining` = 1
   - `calls_used` = 1
4. Ouvre la table `calcom_bookings`
5. Tu devrais voir ton booking enregistré

---

## 🐛 SI ÇA NE MARCHE PAS

### Problème : "Il vous reste 2 appels" ne change pas

**Solutions** :

1. **Vérifier le webhook Cal.com** :
   - Va sur Cal.com → Settings → Developer → Webhooks
   - Clique sur ton webhook
   - Regarde **Recent Deliveries**
   - Si erreur rouge, lis le message d'erreur

2. **Vérifier les logs Supabase** :
   ```bash
   supabase functions logs calcom-webhook
   ```

3. **Tester manuellement** :
   - Va dans Supabase → SQL Editor
   - Exécute :
   ```sql
   SELECT * FROM user_call_limits WHERE email = 'ton@email.com';
   ```

### Problème : Email ne correspond pas

**Solution** :
- Tu DOIS réserver sur Cal.com avec le **même email** que ton compte SmartApp Academy™
- L'email est automatiquement pré-rempli quand tu cliques sur "Continuer"
- Ne change PAS l'email sur Cal.com

### Problème : Fonction SQL n'existe pas

**Solution** :
- Retourne à l'Étape 1
- Réexécute le script SQL complet
- Vérifie qu'il n'y a pas d'erreurs

---

## 📊 REQUÊTES UTILES

### Voir tous les utilisateurs et leurs limites
```sql
SELECT 
  u.email,
  ucl.calls_remaining,
  ucl.calls_used,
  ucl.week_start_date
FROM user_call_limits ucl
JOIN auth.users u ON u.id = ucl.user_id
ORDER BY ucl.calls_remaining ASC;
```

### Réinitialiser manuellement un utilisateur
```sql
UPDATE user_call_limits
SET calls_remaining = 2, calls_used = 0
WHERE email = 'email@utilisateur.com';
```

### Voir l'historique des bookings
```sql
SELECT 
  email,
  name,
  booking_date,
  event_type,
  status
FROM calcom_bookings
ORDER BY booking_date DESC;
```

---

## ✅ CHECKLIST FINALE

Avant de dire que c'est terminé, vérifie :

- [ ] Script SQL exécuté dans Supabase (Étape 1)
- [ ] Tables créées (`user_call_limits`, `calcom_bookings`)
- [ ] Webhook déployé sur Supabase (Étape 2)
- [ ] Webhook configuré dans Cal.com (Étape 3)
- [ ] pg_cron activé et configuré (Étape 4)
- [ ] Test : Interface affiche "2 appels"
- [ ] Test : Réservation sur Cal.com
- [ ] Test : Décrémentation fonctionne
- [ ] Test : Données visibles dans Supabase

---

## 🎉 RÉSULTAT FINAL

Une fois tout configuré, voici ce qui se passe :

1. **Utilisateur** clique sur "Book un Call"
2. **App** affiche son email + nombre d'appels restants
3. **Utilisateur** confirme et est redirigé vers Cal.com (email pré-rempli)
4. **Utilisateur** réserve sur Cal.com
5. **Cal.com** envoie un webhook à Supabase
6. **Supabase** vérifie l'email et décrémente automatiquement
7. **Utilisateur** voit maintenant "1 appel restant"
8. **Chaque lundi** à minuit → Reset automatique à 2 appels

---

## 📞 BESOIN D'AIDE ?

Si tu as des questions ou des problèmes :

1. Lis le fichier `CALCOM_CALL_LIMITS_SETUP.md` (documentation complète)
2. Vérifie les logs Supabase
3. Vérifie les Recent Deliveries du webhook Cal.com
4. Exécute les requêtes SQL de débogage ci-dessus

**Bon courage ! 🚀**

