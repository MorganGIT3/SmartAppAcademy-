# Configuration du Chatbot IA - SmartApp Academy™

## 🎯 Vue d'ensemble

Votre Smart AI Assistant est maintenant connecté à l'API ChatGPT via Supabase Edge Functions. Les clés API sont sécurisées côté serveur et les conversations sont sauvegardées dans Supabase.

## 📋 Étapes de configuration

### 1. Créer les tables dans Supabase

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet SmartApp Academy
3. Allez dans **SQL Editor**
4. Copiez tout le contenu du fichier `supabase/migrations/ai_chatbot.sql`
5. Collez-le dans l'éditeur SQL et cliquez sur **Run**

Cela va créer :
- ✅ Table `conversations` (stocke les conversations)
- ✅ Table `messages` (stocke les messages)
- ✅ Table `ai_system_prompts` (stocke le prompt système configurable)
- ✅ Politiques RLS (sécurité)
- ✅ Le prompt système par défaut

### 2. Configurer la Supabase Edge Function

#### Option A : Via le Dashboard Supabase (Recommandé)

1. Allez dans **Edge Functions** dans votre projet Supabase
2. Cliquez sur **Create Function**
3. Nommez-la `ai-answer`
4. Copiez le contenu de `supabase/functions/ai-answer/index.ts`
5. Collez-le dans l'éditeur
6. Cliquez sur **Deploy**

#### Option B : Via Supabase CLI (Avancé)

```bash
# Installer Supabase CLI si ce n'est pas déjà fait
npm install -g supabase

# Se connecter à Supabase
supabase login

# Lier votre projet
supabase link --project-ref kwzurhhbvfkrvhbcdhwi

# Déployer la fonction
supabase functions deploy ai-answer
```

### 3. Configurer les secrets Supabase

Vous devez ajouter votre clé API OpenAI dans les secrets Supabase :

#### Via le Dashboard :
1. Allez dans **Edge Functions** > **Settings**
2. Dans la section **Secrets**, ajoutez :
   - Nom : `OPENAI_API_KEY`
   - Valeur : Votre clé OpenAI (commence par `sk-...`)

#### Via CLI :
```bash
supabase secrets set OPENAI_API_KEY=sk-votre-clé-openai-ici
```

### 4. Obtenir une clé API OpenAI

Si vous n'avez pas encore de clé OpenAI :

1. Allez sur [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créez un compte ou connectez-vous
3. Cliquez sur **Create new secret key**
4. Copiez la clé (elle commence par `sk-`)
5. ⚠️ **Important** : Sauvegardez-la car vous ne pourrez plus la voir !

### 5. Tester le chatbot

1. Lancez votre application : `npm run dev`
2. Connectez-vous avec un compte utilisateur
3. Accédez au Smart AI Assistant
4. Envoyez un message test : "Bonjour, qui es-tu ?"
5. Vous devriez recevoir une réponse de l'IA en quelques secondes

## 🔧 Configuration avancée

### Modifier le prompt système

Pour personnaliser le comportement de l'IA :

1. Allez dans **SQL Editor** sur Supabase
2. Exécutez cette requête pour voir le prompt actuel :
```sql
SELECT * FROM ai_system_prompts WHERE is_active = true;
```

3. Pour modifier le prompt :
```sql
UPDATE ai_system_prompts 
SET prompt = 'Votre nouveau prompt ici...'
WHERE is_active = true;
```

4. Ou créez un nouveau prompt et désactivez l'ancien :
```sql
-- Désactiver l'ancien
UPDATE ai_system_prompts SET is_active = false WHERE is_active = true;

-- Créer un nouveau
INSERT INTO ai_system_prompts (name, prompt, is_active)
VALUES ('Mon nouveau prompt', 'Le contenu de votre prompt...', true);
```

### Consulter l'historique des conversations

```sql
-- Voir toutes les conversations
SELECT * FROM conversations ORDER BY created_at DESC;

-- Voir les messages d'une conversation spécifique
SELECT * FROM messages 
WHERE conversation_id = 'id-de-la-conversation'
ORDER BY created_at ASC;
```

## 🐛 Dépannage

### Erreur "Non autorisé"
- Vérifiez que l'utilisateur est bien connecté
- Vérifiez les politiques RLS dans Supabase

### Erreur "OPENAI_API_KEY non configurée"
- Ajoutez la clé dans les secrets Supabase (voir étape 3)
- Redéployez la Edge Function après avoir ajouté le secret

### L'IA ne répond pas
- Vérifiez la console du navigateur pour voir les erreurs
- Vérifiez les logs de la Edge Function dans Supabase Dashboard
- Vérifiez que vous avez des crédits sur votre compte OpenAI

### Erreur "Erreur OpenAI"
- Vérifiez que votre clé API OpenAI est valide
- Vérifiez que vous avez des crédits sur votre compte OpenAI
- Le modèle `gpt-4o-mini` est économique et recommandé

## 💰 Coûts

Le modèle `gpt-4o-mini` est très économique :
- ~$0.15 pour 1 million de tokens en entrée
- ~$0.60 pour 1 million de tokens en sortie

Pour un usage normal (quelques centaines de messages/jour), cela représente quelques centimes par jour.

## 🔐 Sécurité

✅ **Sécurisé** : La clé OpenAI est stockée côté serveur (jamais exposée au client)
✅ **Authentification** : Seuls les utilisateurs connectés peuvent utiliser le chatbot
✅ **RLS activé** : Chaque utilisateur ne voit que ses conversations
✅ **CORS configuré** : Protection contre les accès non autorisés

## 📝 Notes

- Le chatbot conserve l'historique des 20 derniers messages pour le contexte
- Les conversations sont automatiquement sauvegardées
- Vous pouvez modifier le prompt système à tout moment sans redéployer
- Le modèle utilisé est `gpt-4o-mini` (rapide et économique)

## 🎨 Personnalisation future

Vous pouvez facilement :
- Changer le modèle OpenAI (dans `ai-answer/index.ts`)
- Ajuster la température (créativité de l'IA)
- Modifier le nombre de tokens maximum
- Ajouter des fonctions spécifiques (RAG, recherche web, etc.)

---

**Besoin d'aide ?** Consultez :
- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation OpenAI API](https://platform.openai.com/docs/api-reference)

