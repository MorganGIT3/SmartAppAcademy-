# 📡 API Chatbot IA - Référence

Documentation technique des fonctions disponibles pour interagir avec le chatbot IA.

---

## 🎯 Vue d'ensemble

Toutes les fonctions sont disponibles via l'import :
```typescript
import { 
  sendAIMessage,
  getAIConversations,
  getAIMessages,
  deleteAIConversation,
  getActiveSystemPrompt,
  updateSystemPrompt
} from '../lib/supabase'
```

---

## 📨 Envoyer un message à l'IA

### `sendAIMessage(userMessage, conversationId?)`

Envoie un message à l'IA et récupère sa réponse.

**Paramètres :**
- `userMessage` (string, requis) : Le message de l'utilisateur
- `conversationId` (string, optionnel) : ID de la conversation existante. Si omis, une nouvelle conversation est créée.

**Retour :**
```typescript
{
  success: boolean;
  conversationId?: string;
  answer?: string;
  error?: string;
}
```

**Exemple :**
```typescript
// Nouvelle conversation
const result = await sendAIMessage("Bonjour, qui es-tu ?");
console.log(result.answer); // Réponse de l'IA
console.log(result.conversationId); // ID de la nouvelle conversation

// Continuer une conversation existante
const result2 = await sendAIMessage(
  "Parle-moi de SmartApp Academy",
  result.conversationId
);
```

**Gestion des erreurs :**
```typescript
const result = await sendAIMessage("Hello");
if (!result.success) {
  console.error(result.error); // Message d'erreur
}
```

---

## 💬 Récupérer les conversations

### `getAIConversations()`

Récupère toutes les conversations de l'utilisateur connecté.

**Paramètres :** Aucun

**Retour :**
```typescript
AIConversation[] // Tableau de conversations

interface AIConversation {
  id: string;
  user_id: string;
  title: string | null;
  created_at: string;
  updated_at: string;
}
```

**Exemple :**
```typescript
const conversations = await getAIConversations();
conversations.forEach(conv => {
  console.log(`${conv.title} - ${new Date(conv.created_at).toLocaleDateString()}`);
});
```

---

## 📜 Récupérer les messages d'une conversation

### `getAIMessages(conversationId)`

Récupère tous les messages d'une conversation spécifique.

**Paramètres :**
- `conversationId` (string, requis) : ID de la conversation

**Retour :**
```typescript
AIMessage[] // Tableau de messages

interface AIMessage {
  id: string;
  conversation_id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  created_at: string;
}
```

**Exemple :**
```typescript
const messages = await getAIMessages(conversationId);
messages.forEach(msg => {
  if (msg.role === 'user') {
    console.log(`Utilisateur: ${msg.content}`);
  } else if (msg.role === 'assistant') {
    console.log(`IA: ${msg.content}`);
  }
});
```

---

## 🗑️ Supprimer une conversation

### `deleteAIConversation(conversationId)`

Supprime une conversation et tous ses messages.

**Paramètres :**
- `conversationId` (string, requis) : ID de la conversation à supprimer

**Retour :**
```typescript
boolean // true si succès, false sinon
```

**Exemple :**
```typescript
const success = await deleteAIConversation(conversationId);
if (success) {
  console.log('Conversation supprimée');
} else {
  console.error('Erreur lors de la suppression');
}
```

---

## ⚙️ Récupérer le prompt système actif

### `getActiveSystemPrompt()`

Récupère le prompt système actuellement actif.

**Paramètres :** Aucun

**Retour :**
```typescript
AISystemPrompt | null

interface AISystemPrompt {
  id: string;
  name: string;
  prompt: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

**Exemple :**
```typescript
const prompt = await getActiveSystemPrompt();
if (prompt) {
  console.log(`Prompt actif: ${prompt.name}`);
  console.log(prompt.prompt);
}
```

---

## 🔧 Mettre à jour le prompt système

### `updateSystemPrompt(promptId, newPrompt)`

Met à jour le contenu du prompt système (réservé aux admins).

**Paramètres :**
- `promptId` (string, requis) : ID du prompt à modifier
- `newPrompt` (string, requis) : Nouveau contenu du prompt

**Retour :**
```typescript
boolean // true si succès, false sinon
```

**Exemple :**
```typescript
const newPromptContent = `
Tu es "SmartApp Assistant", un assistant IA spécialisé...
`;

const success = await updateSystemPrompt(promptId, newPromptContent);
if (success) {
  console.log('Prompt mis à jour avec succès');
}
```

---

## 🔌 Edge Function : ai-answer

### Endpoint
```
POST https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/ai-answer
```

### Headers requis
```typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <access_token>'
}
```

### Body
```typescript
{
  conversationId?: string; // Optionnel
  userMessage: string;     // Requis
}
```

### Réponse
```typescript
{
  success: boolean;
  conversationId: string;
  answer: string;
}
```

### Exemple d'appel direct
```typescript
const { data: { session } } = await supabase.auth.getSession();

const response = await fetch(
  'https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/ai-answer',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      userMessage: 'Bonjour !',
      conversationId: 'uuid-optionnel'
    })
  }
);

const data = await response.json();
console.log(data.answer);
```

---

## 🗄️ Structure de la base de données

### Table : `conversations`
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table : `messages`
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Table : `ai_system_prompts`
```sql
CREATE TABLE ai_system_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  prompt TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 🔒 Sécurité (RLS)

Toutes les tables ont Row Level Security (RLS) activé :

- ✅ Les utilisateurs ne peuvent voir que leurs propres conversations
- ✅ Les utilisateurs ne peuvent créer/modifier/supprimer que leurs données
- ✅ La clé OpenAI n'est jamais exposée au client
- ✅ Authentification requise pour tous les appels

---

## 📊 Exemples d'utilisation avancée

### Chatbot avec historique complet
```typescript
import { getAIMessages, sendAIMessage } from '../lib/supabase';

async function chatWithHistory(conversationId: string, newMessage: string) {
  // Récupérer l'historique
  const history = await getAIMessages(conversationId);
  
  // Afficher l'historique
  history.forEach(msg => {
    console.log(`${msg.role}: ${msg.content}`);
  });
  
  // Envoyer le nouveau message
  const result = await sendAIMessage(newMessage, conversationId);
  
  return result.answer;
}
```

### Gestionnaire de conversations multiples
```typescript
import { getAIConversations, getAIMessages, deleteAIConversation } from '../lib/supabase';

async function manageConversations() {
  // Récupérer toutes les conversations
  const conversations = await getAIConversations();
  
  for (const conv of conversations) {
    console.log(`\nConversation: ${conv.title}`);
    
    // Récupérer les messages
    const messages = await getAIMessages(conv.id);
    console.log(`Nombre de messages: ${messages.length}`);
    
    // Supprimer les vieilles conversations (> 30 jours)
    const age = Date.now() - new Date(conv.created_at).getTime();
    const days = age / (1000 * 60 * 60 * 24);
    
    if (days > 30) {
      await deleteAIConversation(conv.id);
      console.log('Conversation supprimée (trop ancienne)');
    }
  }
}
```

---

## 🎯 Bonnes pratiques

1. **Gestion des erreurs** : Toujours vérifier `result.success` avant d'utiliser les données
2. **Loading states** : Afficher un indicateur de chargement pendant les appels
3. **Délai de réponse** : Les réponses peuvent prendre 2-5 secondes
4. **Contexte** : L'Edge Function garde automatiquement les 20 derniers messages en contexte
5. **Coûts** : Le modèle `gpt-4o-mini` est très économique (~0,15$/million de tokens)

---

## 🐛 Codes d'erreur courants

| Erreur | Cause | Solution |
|--------|-------|----------|
| `401 Unauthorized` | Utilisateur non connecté | Vérifier `supabase.auth.getSession()` |
| `400 Bad Request` | Message vide | Vérifier que `userMessage` n'est pas vide |
| `500 Internal Error` | Erreur OpenAI | Vérifier les crédits OpenAI et la clé API |
| `OPENAI_API_KEY non configurée` | Secret manquant | Configurer le secret dans Supabase |

---

## 📚 Ressources

- [Documentation OpenAI](https://platform.openai.com/docs)
- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)

---

**Dernière mise à jour** : Octobre 2025

