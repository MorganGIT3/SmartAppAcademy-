# 🔍 Diagnostic - Erreur "Failed to fetch"

## ❌ Erreur reçue
```
Désolé, une erreur est survenue: Failed to fetch. Veuillez réessayer.
```

## 🎯 Causes possibles

### 1. ⚠️ Edge Function non déployée (CAUSE LA PLUS PROBABLE)
**Symptôme** : "Failed to fetch"  
**Solution** : Déployer l'Edge Function

**Vérification** :
1. Aller sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet
3. Aller dans **Edge Functions**
4. Vérifier si la fonction `ai-answer` existe et est **Active**

**Si elle n'existe pas** :
→ Suivre l'étape 4 de `QUICK_START_AI_CHATBOT.md`

---

### 2. 🔑 Utilisateur non authentifié
**Symptôme** : "Failed to fetch" ou "Unauthorized"  
**Solution** : Vérifier l'authentification

**Test** :
1. Ouvrir la console du navigateur (F12)
2. Onglet **Console**
3. Coller ce code :
```javascript
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session ? 'Connecté' : 'Non connecté');
console.log('User:', session?.user?.email);
```

**Si "Non connecté"** :
→ Se connecter avec un compte utilisateur

---

### 3. 🗄️ Tables non créées
**Symptôme** : Erreur après déploiement  
**Solution** : Créer les tables

**Vérification** :
1. Supabase Dashboard > **Table Editor**
2. Vérifier que ces tables existent :
   - `conversations`
   - `messages`
   - `ai_system_prompts`

**Si elles n'existent pas** :
→ Suivre l'étape 1 de `QUICK_START_AI_CHATBOT.md`

---

### 4. 🔐 Secret OPENAI_API_KEY non configuré
**Symptôme** : Erreur 500 ou "OPENAI_API_KEY non configurée"  
**Solution** : Configurer le secret

**Vérification** :
1. Supabase Dashboard > **Edge Functions**
2. Cliquer sur **Manage secrets**
3. Vérifier que `OPENAI_API_KEY` existe

**Si absent** :
→ Suivre l'étape 3 de `QUICK_START_AI_CHATBOT.md`

---

### 5. 🌐 Problème CORS ou réseau
**Symptôme** : "Failed to fetch" + erreur CORS dans la console  
**Solution** : Vérifier la console du navigateur

**Test** :
1. F12 > Onglet **Console**
2. Chercher des erreurs rouges mentionnant "CORS" ou "Access-Control-Allow-Origin"

**Si erreur CORS** :
→ L'Edge Function n'est probablement pas déployée

---

## 🔧 Procédure de diagnostic complète

### Étape 1 : Vérifier la console du navigateur

1. Ouvrir le navigateur
2. Appuyer sur **F12** (ou Ctrl+Shift+I / Cmd+Option+I)
3. Aller dans l'onglet **Console**
4. Envoyer un message dans le chatbot
5. Observer les erreurs

**Exemples d'erreurs et solutions** :

| Erreur dans la console | Cause | Solution |
|------------------------|-------|----------|
| `Failed to fetch` | Edge Function non déployée | Déployer la fonction |
| `404 Not Found` | Fonction n'existe pas | Déployer la fonction |
| `401 Unauthorized` | Non authentifié | Se connecter |
| `CORS error` | Problème de configuration | Redéployer la fonction |
| `500 Internal Error` | Erreur serveur | Vérifier les logs Supabase |

---

### Étape 2 : Vérifier l'Edge Function

1. Aller sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet : **SmartApp Academy**
3. Menu de gauche : **Edge Functions**
4. Vérifier :

**✅ Ce que vous devriez voir** :
```
Edge Functions
├─ ai-answer ● Active
   Created: [date]
   Last deployed: [date]
```

**❌ Si vous voyez** :
```
No functions deployed yet
[Create a new function]
```

**→ Action** : La fonction n'est pas déployée !

---

### Étape 3 : Déployer l'Edge Function (si nécessaire)

#### Option A : Via Dashboard (Plus simple)

1. Dans Supabase Dashboard > **Edge Functions**
2. Cliquer sur **Create a new function**
3. **Function name** : `ai-answer`
4. Copier **TOUT** le contenu de `supabase/functions/ai-answer/index.ts`
5. Coller dans l'éditeur
6. Cliquer sur **Deploy function**
7. Attendre 10-30 secondes
8. Vérifier que le statut est **● Active**

#### Option B : Via script

**Windows** :
```cmd
deploy-ai-function.bat
```

**Mac/Linux** :
```bash
chmod +x deploy-ai-function.sh
./deploy-ai-function.sh
```

---

### Étape 4 : Tester à nouveau

1. Recharger la page de l'application (Ctrl+R / Cmd+R)
2. Se connecter si nécessaire
3. Accéder au Smart AI Assistant
4. Envoyer un message : "Test"
5. Observer le résultat

**✅ Si ça marche** :
→ Vous devriez recevoir une réponse de l'IA

**❌ Si erreur persiste** :
→ Passer à l'étape 5

---

### Étape 5 : Vérifier les logs de l'Edge Function

1. Supabase Dashboard > **Edge Functions**
2. Cliquer sur **ai-answer**
3. Onglet **Logs**
4. Observer les erreurs

**Exemples d'erreurs dans les logs** :

| Erreur | Cause | Solution |
|--------|-------|----------|
| `OPENAI_API_KEY non configurée` | Secret manquant | Configurer le secret |
| `Unauthorized` | JWT invalide | Vérifier l'authentification |
| `OpenAI API error` | Problème OpenAI | Vérifier clé + crédits |
| Aucun log | Fonction pas appelée | Vérifier console navigateur |

---

### Étape 6 : Vérifier le secret OpenAI (si erreur dans les logs)

1. Supabase Dashboard > **Edge Functions**
2. Cliquer sur **Manage secrets** (ou **Settings**)
3. Vérifier que `OPENAI_API_KEY` existe

**Si absent** :
1. Cliquer sur **Add secret**
2. **Name** : `OPENAI_API_KEY`
3. **Value** : Votre clé OpenAI (commence par `sk-`)
4. Cliquer sur **Add**
5. **Redéployer** la fonction (étape 3)

---

## 🧪 Test de diagnostic rapide

Ouvrez la console du navigateur (F12) et collez ce code :

```javascript
// Test 1 : Vérifier l'authentification
const { data: { session } } = await supabase.auth.getSession();
console.log('✅ Test 1 - Authentification:');
console.log('  Connecté:', session ? 'OUI' : 'NON');
if (session) {
  console.log('  User:', session.user.email);
  console.log('  Token:', session.access_token.substring(0, 20) + '...');
}

// Test 2 : Vérifier les tables
console.log('\n✅ Test 2 - Tables:');
try {
  const { data, error } = await supabase.from('ai_system_prompts').select('count');
  console.log('  ai_system_prompts:', error ? '❌ ERREUR' : '✅ OK');
} catch (e) {
  console.log('  ai_system_prompts: ❌ N\'EXISTE PAS');
}

// Test 3 : Tester l'Edge Function
console.log('\n✅ Test 3 - Edge Function:');
try {
  const response = await fetch(
    'https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/ai-answer',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        userMessage: 'Test diagnostic'
      })
    }
  );
  console.log('  Status:', response.status);
  console.log('  OK:', response.ok ? '✅ OUI' : '❌ NON');
  const data = await response.json();
  console.log('  Réponse:', data);
} catch (error) {
  console.log('  ❌ ERREUR:', error.message);
}
```

**Résultats attendus** :

```
✅ Test 1 - Authentification:
  Connecté: OUI
  User: votre@email.com
  Token: eyJhbGciOiJIUzI1Ni...

✅ Test 2 - Tables:
  ai_system_prompts: ✅ OK

✅ Test 3 - Edge Function:
  Status: 200
  OK: ✅ OUI
  Réponse: { conversationId: "...", answer: "...", success: true }
```

**Si un test échoue, vous savez où est le problème !**

---

## 📋 Checklist de résolution

```
[ ] L'utilisateur est bien connecté
[ ] Les tables sont créées (conversations, messages, ai_system_prompts)
[ ] L'Edge Function ai-answer est déployée et Active
[ ] Le secret OPENAI_API_KEY est configuré
[ ] La console du navigateur ne montre pas d'erreur CORS
[ ] Les logs de l'Edge Function ne montrent pas d'erreur
[ ] Un test manuel fonctionne (voir code ci-dessus)
```

---

## 🎯 Solution la plus probable

**90% des cas : L'Edge Function n'est pas déployée**

**Action rapide** :
1. Aller sur Supabase Dashboard
2. Edge Functions
3. Vérifier si `ai-answer` existe
4. Si non → Déployer (voir Étape 3)
5. Tester à nouveau

---

## 📞 Besoin d'aide ?

Si le problème persiste après avoir suivi toutes ces étapes :

1. **Copier les résultats du test de diagnostic** (code JavaScript ci-dessus)
2. **Copier les erreurs de la console** (F12 > Console)
3. **Copier les logs de l'Edge Function** (Dashboard > Logs)
4. Partager ces informations

---

## 📚 Documentation

- `QUICK_START_AI_CHATBOT.md` - Configuration initiale
- `CHATBOT_IA_SETUP.md` - Guide complet
- `TODO_CHATBOT_IA.md` - Checklist

---

**Dernière mise à jour** : Octobre 2025

