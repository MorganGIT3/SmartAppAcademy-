# 🚨 FIX RAPIDE - Erreur "Failed to fetch"

## ❌ Votre erreur
```
Désolé, une erreur est survenue: Failed to fetch. Veuillez réessayer.
```

---

## 🎯 Cause probable (90% des cas)

**L'Edge Function n'est pas encore déployée !**

---

## ✅ Solution en 3 minutes

### Étape 1 : Vérifier si la fonction existe (30 sec)

1. Ouvrir [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet **SmartApp Academy**
3. Cliquer sur **Edge Functions** dans le menu de gauche

**Question** : Voyez-vous une fonction nommée `ai-answer` avec un point vert ● ?

---

### ✅ SI OUI (la fonction existe)
→ Passez à la section "Autres causes" en bas

### ❌ SI NON (pas de fonction ou liste vide)
→ Continuez à l'Étape 2

---

### Étape 2 : Déployer la fonction (2 min)

1. Dans Supabase Dashboard, **Edge Functions**
2. Cliquer sur **Create a new function** ou **New Function**
3. **Function name** : Taper exactement `ai-answer`
4. Ouvrir le fichier sur votre ordinateur :
   ```
   supabase/functions/ai-answer/index.ts
   ```
5. **Sélectionner TOUT le contenu** (Ctrl+A / Cmd+A)
6. **Copier** (Ctrl+C / Cmd+C)
7. Retour dans Supabase, **coller** dans l'éditeur de code
8. Cliquer sur **Deploy function** (bouton en bas à droite)
9. **Attendre 10-30 secondes** ⏳

**✅ Vous devriez voir** : "Function deployed successfully"

---

### Étape 3 : Tester (30 sec)

1. Retourner dans votre application
2. **Recharger la page** (F5 ou Ctrl+R)
3. Aller dans **Smart AI Assistant**
4. Envoyer un message : "Bonjour"
5. Attendre 2-5 secondes...

**🎉 Si ça marche** : FÉLICITATIONS ! C'était ça !

**❌ Si ça ne marche toujours pas** : Voir section suivante

---

## 🔍 Autres causes possibles

### Cause 2 : Vous n'êtes pas connecté

**Test rapide** :
- Regardez en haut à droite de l'application
- Voyez-vous votre nom ou un bouton "Login" ?

**Si "Login" affiché** :
1. Cliquer sur **Login**
2. Se connecter avec votre compte
3. Réessayer le chatbot

---

### Cause 3 : Les tables ne sont pas créées

**Test** :
1. Supabase Dashboard > **Table Editor**
2. Chercher ces tables :
   - `conversations`
   - `messages`
   - `ai_system_prompts`

**Si elles n'existent pas** :
1. Supabase Dashboard > **SQL Editor**
2. Cliquer sur **New Query**
3. Ouvrir le fichier : `supabase/migrations/ai_chatbot.sql`
4. **Copier TOUT** le contenu
5. **Coller** dans l'éditeur SQL
6. Cliquer sur **Run** (ou Ctrl+Entrée)
7. Vérifier : "Success. No rows returned"

---

### Cause 4 : Le secret OpenAI n'est pas configuré

**Test** :
1. Supabase Dashboard > **Edge Functions**
2. Cliquer sur **Manage secrets** (en haut)
3. Chercher `OPENAI_API_KEY`

**Si absent** :
1. Cliquer sur **Add secret**
2. **Name** : `OPENAI_API_KEY`
3. **Value** : Votre clé OpenAI (commence par `sk-`)
4. Cliquer sur **Add**
5. **Important** : Redéployer la fonction (retour à Étape 2)

---

## 🧪 Test de diagnostic (Console du navigateur)

Si rien ne fonctionne, ouvrez la console :

1. Dans votre application, appuyer sur **F12**
2. Aller dans l'onglet **Console**
3. Coller ce code et appuyer sur Entrée :

```javascript
// Test complet
console.clear();
console.log('🔍 DIAGNOSTIC CHATBOT\n');

// 1. Authentification
const { data: { session } } = await supabase.auth.getSession();
console.log('1️⃣ Authentification:', session ? '✅ Connecté' : '❌ Non connecté');
if (!session) {
  console.log('   ⚠️ PROBLÈME : Vous devez vous connecter !');
}

// 2. Tables
console.log('\n2️⃣ Tables:');
try {
  const { error } = await supabase.from('conversations').select('count').limit(1);
  console.log('   conversations:', error ? '❌ N\'existe pas' : '✅ OK');
} catch (e) {
  console.log('   conversations: ❌ N\'existe pas');
}

// 3. Edge Function
console.log('\n3️⃣ Edge Function:');
if (session) {
  try {
    const res = await fetch(
      'https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/ai-answer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ userMessage: 'Test' })
      }
    );
    console.log('   Status:', res.status, res.ok ? '✅' : '❌');
    if (!res.ok) {
      const err = await res.text();
      console.log('   Erreur:', err);
    }
  } catch (e) {
    console.log('   ❌ ERREUR:', e.message);
    if (e.message === 'Failed to fetch') {
      console.log('   ⚠️ La fonction n\'est probablement PAS déployée !');
    }
  }
} else {
  console.log('   ⏭️ Ignoré (pas connecté)');
}

console.log('\n📋 RÉSUMÉ :');
console.log('Vérifiez les ❌ ci-dessus et corrigez-les.');
```

**Ce que vous devriez voir** :
```
1️⃣ Authentification: ✅ Connecté
2️⃣ Tables:
   conversations: ✅ OK
3️⃣ Edge Function:
   Status: 200 ✅
```

**Si vous voyez des ❌** → C'est là qu'est le problème !

---

## 📋 Checklist rapide

```
[❓] Edge Function déployée ?
     → Supabase > Edge Functions > Vérifier ai-answer

[❓] Utilisateur connecté ?
     → Regarder en haut à droite de l'app

[❓] Tables créées ?
     → Supabase > Table Editor > Vérifier les 3 tables

[❓] Secret configuré ?
     → Supabase > Edge Functions > Manage secrets
```

---

## 🎯 Solution la plus rapide

**Dans 90% des cas, le problème est** : L'Edge Function n'est pas déployée

**Action** :
1. Supabase Dashboard
2. Edge Functions
3. Créer la fonction `ai-answer`
4. Copier-coller le code depuis `supabase/functions/ai-answer/index.ts`
5. Deploy
6. Tester

**Temps** : 2 minutes

---

## 📞 Toujours bloqué ?

Si après avoir suivi TOUTES ces étapes ça ne marche toujours pas :

1. **Copier** le résultat du test de diagnostic (code JavaScript ci-dessus)
2. **Copier** les erreurs dans la console (F12 > Console)
3. **Faire une capture d'écran** de votre Edge Functions dans Supabase
4. Partager ces informations

---

## 📚 Documentation complète

- **`DIAGNOSTIC_ERREUR_CHATBOT.md`** ← Diagnostic détaillé
- **`QUICK_START_AI_CHATBOT.md`** ← Configuration complète
- **`TODO_CHATBOT_IA.md`** ← Checklist

---

**Bonne chance ! 🚀**

