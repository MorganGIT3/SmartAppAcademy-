# 🚀 Démarrage Rapide - Chatbot IA

Guide ultra-simplifié pour mettre en place votre chatbot IA en 5 minutes.

---

## ✅ Checklist Rapide

- [ ] Créer les tables dans Supabase
- [ ] Obtenir une clé OpenAI
- [ ] Configurer les secrets Supabase
- [ ] Déployer l'Edge Function
- [ ] Tester le chatbot

---

## 📝 Étape 1 : Créer les tables (2 minutes)

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Ouvrez votre projet **SmartApp Academy**
3. Cliquez sur **SQL Editor** dans le menu de gauche
4. Cliquez sur **New Query**
5. Copiez-collez **TOUT** le contenu du fichier `supabase/migrations/ai_chatbot.sql`
6. Cliquez sur **Run** (ou appuyez sur Ctrl+Entrée)
7. Vous devriez voir : "Success. No rows returned"

✅ Les tables sont créées !

---

## 🔑 Étape 2 : Obtenir une clé OpenAI (2 minutes)

1. Allez sur [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créez un compte ou connectez-vous
3. Cliquez sur **+ Create new secret key**
4. Donnez-lui un nom : "SmartApp Academy"
5. Copiez la clé (elle commence par `sk-`)
6. ⚠️ **Sauvegardez-la immédiatement** car vous ne la reverrez plus !

💡 **Note** : OpenAI offre des crédits gratuits aux nouveaux comptes !

---

## 🔐 Étape 3 : Configurer les secrets Supabase (1 minute)

### Option A : Via le Dashboard (Plus simple)

1. Dans votre projet Supabase, allez dans **Edge Functions**
2. Cliquez sur **Manage secrets** (en haut à droite)
3. Ajoutez un nouveau secret :
   - **Name** : `OPENAI_API_KEY`
   - **Value** : Votre clé OpenAI (celle qui commence par `sk-`)
4. Cliquez sur **Add secret**

### Option B : Via CLI

```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Ajouter le secret
supabase secrets set OPENAI_API_KEY=sk-votre-clé-ici
```

✅ Les secrets sont configurés !

---

## 🚀 Étape 4 : Déployer l'Edge Function (2 minutes)

### Option A : Via le Dashboard (Recommandé pour débutants)

1. Dans Supabase, allez dans **Edge Functions**
2. Cliquez sur **Create a new function**
3. Nommez-la : `ai-answer`
4. Copiez tout le contenu de `supabase/functions/ai-answer/index.ts`
5. Collez-le dans l'éditeur
6. Cliquez sur **Deploy function**
7. Attendez quelques secondes

### Option B : Via CLI (Pour développeurs)

```bash
# Depuis la racine du projet
supabase functions deploy ai-answer
```

### Option C : Via script automatisé

**Sur Windows :**
```bash
deploy-ai-function.bat
```

**Sur Mac/Linux :**
```bash
chmod +x deploy-ai-function.sh
./deploy-ai-function.sh
```

✅ La fonction est déployée !

---

## 🧪 Étape 5 : Tester (1 minute)

1. Lancez votre application : `npm run dev`
2. Connectez-vous avec un compte utilisateur
3. Accédez au **Smart AI Assistant**
4. Envoyez un message : "Bonjour, qui es-tu ?"
5. Attendez quelques secondes... 🎉

**Si ça marche** : Vous avez réussi ! 🎊

**Si ça ne marche pas** : Voir la section dépannage ci-dessous.

---

## 🐛 Dépannage Express

### Erreur "Non autorisé"
➡️ Vérifiez que vous êtes bien connecté avec un compte utilisateur

### Erreur "OPENAI_API_KEY non configurée"
➡️ Retournez à l'étape 3 et ajoutez le secret
➡️ Redéployez la fonction (étape 4)

### L'IA ne répond pas
➡️ Ouvrez la console du navigateur (F12) et regardez les erreurs
➡️ Dans Supabase, allez dans **Edge Functions** > **ai-answer** > **Logs**

### Erreur "Insufficient credits"
➡️ Votre compte OpenAI n'a plus de crédits
➡️ Ajoutez un moyen de paiement sur [https://platform.openai.com/account/billing](https://platform.openai.com/account/billing)

---

## 💰 Coûts estimés

Avec le modèle `gpt-4o-mini` :
- **100 messages par jour** : ~0,05€/jour
- **1000 messages par jour** : ~0,50€/jour

C'est **très économique** ! 💸

---

## 🎨 Personnalisation

### Modifier le prompt système

**Via l'interface admin** (bientôt disponible) :
1. Allez dans l'Admin Dashboard
2. Section "Gestion du Prompt IA"
3. Modifiez le texte
4. Enregistrez

**Via SQL** :
```sql
UPDATE ai_system_prompts 
SET prompt = 'Votre nouveau prompt ici...'
WHERE is_active = true;
```

---

## 📚 Documentation complète

Pour plus de détails, consultez :
- `CHATBOT_IA_SETUP.md` : Guide complet détaillé
- `supabase/functions/ai-answer/index.ts` : Code de la fonction
- `supabase/migrations/ai_chatbot.sql` : Structure de la base de données

---

## 🆘 Besoin d'aide ?

1. Vérifiez les logs dans Supabase Dashboard
2. Vérifiez la console du navigateur (F12)
3. Consultez la [documentation OpenAI](https://platform.openai.com/docs)
4. Consultez la [documentation Supabase](https://supabase.com/docs)

---

**Félicitations ! Votre chatbot IA est maintenant opérationnel ! 🎉**

