# 🤖 Smart AI Assistant - Chatbot IA

Assistant IA intelligent intégré à SmartApp Academy™, propulsé par ChatGPT.

---

## 🎯 Présentation

Le Smart AI Assistant est un chatbot conversationnel alimenté par l'API OpenAI (GPT-4o-mini) qui permet aux utilisateurs de SmartApp Academy™ d'obtenir de l'aide et des conseils personnalisés sur :

- 💼 La création d'entreprise
- 📱 Le marketing digital
- 🤖 L'IA appliquée au business
- ⚡ Les SaaS et Supabase
- 🔄 L'automatisation

---

## ✨ Fonctionnalités

### Pour les utilisateurs
- 💬 **Conversations illimitées** : Créez autant de conversations que nécessaire
- 📝 **Historique complet** : Tous vos échanges sont sauvegardés
- 🧠 **Contexte intelligent** : L'IA se souvient de la conversation (20 derniers messages)
- 🔒 **Sécurisé** : Vos conversations sont privées et protégées
- ⚡ **Temps réel** : Réponses en quelques secondes
- 🎨 **Interface moderne** : Design élégant et intuitif

### Pour les administrateurs
- ⚙️ **Prompt personnalisable** : Modifiez le comportement de l'IA via l'interface admin
- 📊 **Statistiques** : Suivez l'utilisation du chatbot
- 🔍 **Logs détaillés** : Surveillez toutes les interactions
- 💰 **Contrôle des coûts** : Modèle économique (gpt-4o-mini)

---

## 🚀 Démarrage rapide

### 1. Configuration (8 minutes)

```bash
# 1. Créer les tables dans Supabase
   → Coller ai_chatbot.sql dans SQL Editor

# 2. Obtenir une clé OpenAI
   → platform.openai.com/api-keys

# 3. Configurer le secret
   → Supabase > Edge Functions > Secrets
   → Ajouter: OPENAI_API_KEY

# 4. Déployer l'Edge Function
   → Copier ai-answer/index.ts dans Supabase
   → Ou utiliser: deploy-ai-function.bat/.sh

# 5. Tester !
   npm run dev
```

### 2. Documentation

📖 **Guide complet** : [QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)

---

## 📁 Structure du projet

```
SmartAppAcademy™/
│
├── supabase/
│   ├── migrations/
│   │   └── ai_chatbot.sql                  ← Base de données
│   └── functions/
│       └── ai-answer/
│           └── index.ts                     ← Edge Function
│
├── client/src/
│   ├── components/
│   │   ├── SmartAIAssistant.tsx            ← Interface utilisateur
│   │   └── AIPromptManager.tsx             ← Interface admin
│   └── lib/
│       └── supabase.ts                      ← Fonctions helper
│
├── deploy-ai-function.sh                    ← Script déploiement (Mac/Linux)
├── deploy-ai-function.bat                   ← Script déploiement (Windows)
│
└── Documentation/
    ├── QUICK_START_AI_CHATBOT.md           ← Guide 5 min ⭐
    ├── CHATBOT_IA_SETUP.md                 ← Guide complet
    ├── AI_CHATBOT_API.md                   ← Référence API
    ├── CHATBOT_VISUAL_GUIDE.md             ← Guide visuel
    ├── CHATBOT_IA_RESUME.md                ← Récapitulatif
    ├── CHATBOT_ONE_PAGE.md                 ← Vue d'ensemble (1 page)
    ├── INDEX_CHATBOT_IA.md                 ← Index navigation
    ├── CHANGELOG_CHATBOT_IA.md             ← Historique
    └── CHATBOT_README.md                   ← Ce fichier
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
│  ┌────────────────────────────────────────────────┐    │
│  │        SmartAIAssistant Component               │    │
│  │  • Interface de chat                            │    │
│  │  • Gestion des messages                         │    │
│  │  • Appels API                                   │    │
│  └──────────────────┬──────────────────────────────┘    │
└─────────────────────┼────────────────────────────────────┘
                      │ HTTPS POST + JWT
                      ▼
┌─────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTION                      │
│  ┌────────────────────────────────────────────────┐    │
│  │           ai-answer Function                    │    │
│  │  1. ✅ Authentification (JWT)                  │    │
│  │  2. ✅ Récupération du prompt système          │    │
│  │  3. ✅ Chargement de l'historique              │    │
│  │  4. ✅ Appel OpenAI API                        │    │
│  │  5. ✅ Sauvegarde des messages                 │    │
│  │  6. ✅ Retour de la réponse                    │    │
│  └──────────┬──────────┬──────────┬─────────────────┘  │
└─────────────┼──────────┼──────────┼────────────────────┘
              │          │          │
      ┌───────▼──┐  ┌───▼───┐  ┌──▼─────┐
      │ OpenAI   │  │ PostgreSQL │  │  Auth   │
      │   API    │  │  Database  │  │ Service │
      └──────────┘  └───────────┘  └────────┘
```

---

## 🔐 Sécurité

### ✅ Mesures en place

- **Clé API protégée** : Stockée côté serveur, jamais exposée au client
- **Authentification requise** : JWT vérifié pour chaque requête
- **RLS activé** : Row Level Security sur toutes les tables
- **Isolation des données** : Chaque utilisateur ne voit que ses conversations
- **CORS configuré** : Protection contre les accès non autorisés
- **Validation des entrées** : Toutes les données sont validées

---

## 💰 Coûts

### Modèle : gpt-4o-mini (ultra-économique)

| Usage | Messages/jour | Coût/mois |
|-------|---------------|-----------|
| Léger | 50 | ~0,75€ |
| Normal | 200 | ~3€ |
| Intensif | 1000 | ~15€ |

💡 **Note** : Nouveaux comptes OpenAI reçoivent des crédits gratuits !

### Détails des tarifs
- **Input** : $0.15 / million de tokens (~750 000 mots)
- **Output** : $0.60 / million de tokens (~750 000 mots)
- **Conversations moyennes** : 150-300 tokens par échange

---

## 🎨 Personnalisation

### Modifier le comportement de l'IA

#### Via l'interface admin (recommandé)
1. Accéder à l'Admin Dashboard
2. Section "Gestion du Prompt IA"
3. Modifier le texte du prompt
4. Enregistrer

#### Via SQL
```sql
UPDATE ai_system_prompts 
SET prompt = 'Votre nouveau prompt ici...'
WHERE is_active = true;
```

### Modifier les paramètres OpenAI

Fichier : `supabase/functions/ai-answer/index.ts`

```typescript
// Ligne ~120
const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
  body: JSON.stringify({
    model: 'gpt-4o-mini',  // Modèle à utiliser
    messages: messages,
    temperature: 0.7,       // Créativité (0-2)
    max_tokens: 1000,       // Longueur maximale de réponse
  }),
})
```

---

## 📊 Monitoring

### Dashboard Supabase

```
Dashboard > Edge Functions > ai-answer > Logs
• Voir toutes les requêtes
• Temps de réponse
• Erreurs éventuelles
• Usage des tokens
```

### Requêtes SQL utiles

```sql
-- Nombre total de messages
SELECT COUNT(*) FROM messages;

-- Messages par jour
SELECT 
  DATE(created_at) as date,
  COUNT(*) as count
FROM messages
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Conversations actives
SELECT COUNT(*) FROM conversations
WHERE updated_at > NOW() - INTERVAL '7 days';

-- Utilisateurs les plus actifs
SELECT 
  user_id,
  COUNT(*) as message_count
FROM messages
WHERE role = 'user'
GROUP BY user_id
ORDER BY message_count DESC
LIMIT 10;
```

### OpenAI Usage
```
https://platform.openai.com/usage
• Voir la consommation de tokens
• Suivre les coûts
• Analyser l'utilisation
```

---

## 🔧 API pour les développeurs

### Fonctions disponibles

```typescript
import {
  sendAIMessage,
  getAIConversations,
  getAIMessages,
  deleteAIConversation,
  getActiveSystemPrompt,
  updateSystemPrompt
} from './lib/supabase'

// Envoyer un message
const result = await sendAIMessage("Bonjour !", conversationId?)
// → { success, conversationId, answer, error? }

// Récupérer les conversations
const conversations = await getAIConversations()
// → AIConversation[]

// Récupérer les messages d'une conversation
const messages = await getAIMessages(conversationId)
// → AIMessage[]

// Supprimer une conversation
const success = await deleteAIConversation(conversationId)
// → boolean

// Récupérer le prompt système actif
const prompt = await getActiveSystemPrompt()
// → AISystemPrompt | null

// Mettre à jour le prompt (admin)
const success = await updateSystemPrompt(promptId, newPrompt)
// → boolean
```

📖 **Documentation complète** : [AI_CHATBOT_API.md](./AI_CHATBOT_API.md)

---

## 🐛 Dépannage

### Erreur "Non autorisé" (401)
**Cause** : Utilisateur non connecté  
**Solution** : Vérifier `supabase.auth.getSession()`

### Erreur "OPENAI_API_KEY non configurée"
**Cause** : Secret manquant dans Supabase  
**Solution** : Configurer le secret via Dashboard ou CLI

### L'IA ne répond pas
**Cause** : Erreur OpenAI ou Edge Function  
**Solution** :
1. Vérifier la console du navigateur (F12)
2. Vérifier les logs Supabase Dashboard
3. Vérifier les crédits OpenAI

### Erreur "Insufficient credits"
**Cause** : Crédits OpenAI épuisés  
**Solution** : Ajouter un moyen de paiement sur platform.openai.com

📖 **Guide complet** : [CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md) section "Dépannage"

---

## 🚀 Roadmap

### Version 1.1.0 (Court terme)
- [ ] Interface de gestion des conversations
- [ ] Bouton "Nouvelle conversation"
- [ ] Export de conversations en PDF
- [ ] Statistiques d'utilisation dans l'admin

### Version 1.2.0 (Moyen terme)
- [ ] Recherche dans les conversations
- [ ] Tags et catégories
- [ ] Partage de conversations
- [ ] Mode "expert" avec paramètres ajustables

### Version 2.0.0 (Long terme)
- [ ] RAG avec documents utilisateur (pgvector)
- [ ] Intégration recherche web
- [ ] Support multi-modèles (GPT-4, Claude, Gemini)
- [ ] Assistant vocal (Whisper + TTS)
- [ ] Mode collaboratif

---

## 📚 Documentation complète

### Guides utilisateur
- 📘 **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)** - Démarrage rapide (5 min) ⭐
- 📗 **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)** - Guide complet
- 📙 **[CHATBOT_VISUAL_GUIDE.md](./CHATBOT_VISUAL_GUIDE.md)** - Guide visuel
- 📕 **[CHATBOT_ONE_PAGE.md](./CHATBOT_ONE_PAGE.md)** - Vue d'ensemble (1 page)

### Documentation technique
- 💻 **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)** - Référence API
- 🔧 **[supabase/functions/README.md](./supabase/functions/README.md)** - Edge Functions
- 📝 **[CHANGELOG_CHATBOT_IA.md](./CHANGELOG_CHATBOT_IA.md)** - Historique

### Navigation
- 📑 **[INDEX_CHATBOT_IA.md](./INDEX_CHATBOT_IA.md)** - Index complet
- 📄 **[CHATBOT_README.md](./CHATBOT_README.md)** - Ce fichier

---

## 🤝 Contribution

Ce chatbot est développé pour SmartApp Academy™. Pour toute suggestion ou amélioration :

1. Consultez le [CHANGELOG](./CHANGELOG_CHATBOT_IA.md)
2. Vérifiez la [Roadmap](#🚀-roadmap)
3. Proposez vos idées

---

## 📄 Licence

Propriété de SmartApp Academy™ - Tous droits réservés.

---

## 🆘 Support

### Ressources
- 📖 [Documentation complète](./INDEX_CHATBOT_IA.md)
- 🐛 [Guide de dépannage](./CHATBOT_IA_SETUP.md#🐛-dépannage)
- 💻 [Référence API](./AI_CHATBOT_API.md)

### Liens externes
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI Platform](https://platform.openai.com)
- [Supabase Dashboard](https://supabase.com/dashboard)

---

**🎉 Votre chatbot IA est prêt à transformer l'expérience utilisateur ! 🎉**

---

*Smart AI Assistant v1.0 - Octobre 2025*  
*Propulsé par OpenAI (GPT-4o-mini) & Supabase*

