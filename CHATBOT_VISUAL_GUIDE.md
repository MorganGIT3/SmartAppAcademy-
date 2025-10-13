# 🎨 Guide Visuel - Configuration Chatbot IA

Guide visuel étape par étape avec schémas pour configurer votre chatbot IA.

---

## 📍 Étape 1 : Exécuter le script SQL

### Dans Supabase Dashboard

```
┌─────────────────────────────────────────────────────────┐
│  Supabase Dashboard                          [X] [─] [□] │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ◉ Home                                                  │
│  ◉ Table Editor                                          │
│  ◉ Authentication                                        │
│  ► SQL Editor  👈 CLIQUEZ ICI                           │
│  ◉ Database                                              │
│  ◉ Storage                                               │
│  ◉ Edge Functions                                        │
│  ◉ API                                                   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

### Dans SQL Editor

```
┌──────────────────────────────────────────────────────────────┐
│  SQL Editor                         [+ New Query] [Run ▶]    │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  1 | -- AI Chatbot Schema                                    │
│  2 | CREATE TABLE IF NOT EXISTS public.conversations (       │
│  3 |   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),        │
│  4 |   user_id UUID NOT NULL ...                             │
│  5 | );                                                       │
│    |                                                          │
│    | 👈 COLLEZ TOUT LE CONTENU DE ai_chatbot.sql ICI        │
│    |                                                          │
│    |                                                          │
│    |                                                          │
└──────────────────────────────────────────────────────────────┘
          │
          │ Puis cliquez sur [Run ▶] ou Ctrl+Entrée
          ▼
┌──────────────────────────────────────────────────────────────┐
│  Results                                                      │
├──────────────────────────────────────────────────────────────┤
│  ✅ Success. No rows returned                                │
│  Time: 234ms                                                  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔑 Étape 2 : Obtenir la clé OpenAI

### Sur platform.openai.com

```
┌──────────────────────────────────────────────────────────────┐
│  OpenAI Platform                                  [Sign in]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Dashboard                                                    │
│  ► API Keys  👈 CLIQUEZ ICI                                 │
│  Usage                                                        │
│  Settings                                                     │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Créer une nouvelle clé

```
┌──────────────────────────────────────────────────────────────┐
│  API Keys                          [+ Create new secret key] │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Your API keys                                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 🔑 SmartApp Academy                                    │ │
│  │    sk-proj-abc123...xyz789                             │ │
│  │    Created: Oct 13, 2025                               │ │
│  │                                       [Copy] [Delete]  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ⚠️  ATTENTION : Sauvegardez votre clé maintenant !          │
│  Vous ne pourrez plus la voir après avoir fermé cette page.  │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Notez votre clé

```
┌──────────────────────────────────────────────────────────────┐
│  📋 Votre clé API OpenAI                                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  sk-proj-abc123def456ghi789jkl012mno345pqr678stu901...      │
│  ▲                                                            │
│  └─ Commence toujours par "sk-"                             │
│                                                               │
│  💾 COPIEZ ET SAUVEGARDEZ CETTE CLÉ MAINTENANT               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔐 Étape 3 : Configurer le secret Supabase

### Dans Edge Functions

```
┌──────────────────────────────────────────────────────────────┐
│  Supabase Dashboard                                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ◉ SQL Editor                                                │
│  ► Edge Functions  👈 CLIQUEZ ICI                           │
│     ├─ All Functions                                         │
│     └─ Secrets  👈 PUIS CLIQUEZ ICI                         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Ajouter le secret

```
┌──────────────────────────────────────────────────────────────┐
│  Secrets                                      [+ Add Secret]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Add a new secret                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Name:                                                   │ │
│  │ ┌──────────────────────────────────────────────────┐   │ │
│  │ │ OPENAI_API_KEY                                   │   │ │
│  │ └──────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │ Value:                                                  │ │
│  │ ┌──────────────────────────────────────────────────┐   │ │
│  │ │ sk-proj-abc123...                                │   │ │
│  │ └──────────────────────────────────────────────────┘   │ │
│  │                                                         │ │
│  │                     [Cancel]  [Add Secret] 👈          │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Étape 4 : Déployer l'Edge Function

### Option A : Via Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  Edge Functions                  [+ Create a new function]   │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Function name:                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ai-answer                                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  Function code:                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1 | import { createClient } from '...'              │   │
│  │ 2 |                                                   │   │
│  │ 3 | const corsHeaders = { ... };                     │   │
│  │   | 👈 COLLEZ LE CODE DE ai-answer/index.ts ICI     │   │
│  │   |                                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│                            [Cancel]  [Deploy function]        │
│                                               👆 CLIQUEZ      │
└──────────────────────────────────────────────────────────────┘
```

### Déploiement en cours

```
┌──────────────────────────────────────────────────────────────┐
│  Deploying function...                                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [████████████░░░░░░░░░░░░░░] 60%                           │
│                                                               │
│  ⏳ Building function...                                     │
│  ⏳ Deploying to edge nodes...                               │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Succès !

```
┌──────────────────────────────────────────────────────────────┐
│  ✅ Function deployed successfully!                          │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Function: ai-answer                                          │
│  Status: Active ●                                            │
│  URL: https://.../functions/v1/ai-answer                     │
│  Version: 1                                                   │
│  Created: Just now                                            │
│                                                               │
│  [View Logs]  [View Metrics]  [Configure]                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🧪 Étape 5 : Tester le chatbot

### Lancer l'application

```
┌──────────────────────────────────────────────────────────────┐
│  Terminal                                                     │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  C:\...\SmartAppAcademy™ V1 MVP> npm run dev                │
│                                                               │
│  > smartappacademy@1.0.0 dev                                 │
│  > vite                                                       │
│                                                               │
│  VITE v5.0.0  ready in 482 ms                                │
│                                                               │
│  ➜  Local:   http://localhost:5000/                          │
│  ➜  Network: use --host to expose                            │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Dans l'application

```
┌──────────────────────────────────────────────────────────────┐
│  SmartApp Academy™                          [John] [Logout]  │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  🧠 Smart AI Assistant                                       │
│  Votre assistant IA personnel                                │
│  ─────────────────────────────────────────────────────────  │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │  💬 Bienvenue dans Smart AI Assistant                  │ │
│  │                                                         │ │
│  │  Posez-moi vos questions ou demandez de l'aide        │ │
│  │  pour votre projet SmartApp Academy™                   │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Posez votre question à l'assistant IA...              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                           [Envoyer →]        │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Premier message

```
┌──────────────────────────────────────────────────────────────┐
│  🧠 Smart AI Assistant                                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │         Bonjour, qui es-tu ? ◄─ Votre message       │   │
│  │                                      14:35            │   │
│  │                                                       │   │
│  │  ● ● ●  L'IA réfléchit...                           │   │
│  │                                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Réponse de l'IA

```
┌──────────────────────────────────────────────────────────────┐
│  🧠 Smart AI Assistant                                       │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Bonjour, qui es-tu ?                         │   │
│  │                                      14:35            │   │
│  │                                                       │   │
│  │  Bonjour ! Je suis "SmartApp Academy Assistant",    │   │
│  │  votre assistant IA spécialisé dans                  │   │
│  │  l'accompagnement des entrepreneurs.                 │   │
│  │                                                       │   │
│  │  Je peux vous aider avec :                           │   │
│  │  • La création d'entreprise                          │   │
│  │  • Le marketing digital                              │   │
│  │  • L'IA appliquée au business                        │   │
│  │  • Les SaaS et Supabase                              │   │
│  │  • L'automatisation                                  │   │
│  │                                                       │   │
│  │  Comment puis-je vous aider aujourd'hui ? 😊         │   │
│  │                                      14:35            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Posez votre question...                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                                           [Envoyer →]        │
│                                                               │
└──────────────────────────────────────────────────────────────┘

                    🎉 ÇA MARCHE ! 🎉
```

---

## 📊 Vérifier les logs

### Dans Supabase Dashboard

```
┌──────────────────────────────────────────────────────────────┐
│  Edge Functions > ai-answer > Logs                           │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  [14:35:12] ✅ Request received                             │
│  [14:35:12] ✅ User authenticated: abc123...                │
│  [14:35:12] ✅ System prompt loaded                         │
│  [14:35:13] ✅ OpenAI API called                            │
│  [14:35:15] ✅ Response received from OpenAI                │
│  [14:35:15] ✅ Messages saved to database                   │
│  [14:35:15] ✅ Response sent to client                      │
│                                                               │
│  Status: 200 OK                                               │
│  Duration: 2.8s                                               │
│  Tokens used: 156 (input) + 89 (output) = 245 total         │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎨 Architecture visuelle

```
┌─────────────────────────────────────────────────────────────┐
│                      VOTRE APPLICATION                       │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         SmartAIAssistant Component                 │    │
│  │                                                     │    │
│  │  User: "Bonjour !"                                 │    │
│  │         │                                           │    │
│  │         ▼                                           │    │
│  │  handleSendMessage()                               │    │
│  └─────────────┬──────────────────────────────────────┘    │
│                │                                             │
└────────────────┼─────────────────────────────────────────────┘
                 │
                 │ HTTP POST
                 │ Bearer JWT Token
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTION                          │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │            ai-answer Function                      │    │
│  │                                                     │    │
│  │  1. ✅ Vérifie JWT                                 │    │
│  │  2. ✅ Charge le prompt système                    │    │
│  │  3. ✅ Récupère l'historique                       │    │
│  │  4. ✅ Appelle OpenAI                              │    │
│  │  5. ✅ Sauvegarde les messages                     │    │
│  │  6. ✅ Retourne la réponse                         │    │
│  └─────────────┬──────────────────────────────────────┘    │
│                │                                             │
│      ┌─────────┼──────────┐                                 │
│      ▼         ▼          ▼                                  │
│  ┌────────┬────────┬────────────┐                           │
│  │ OpenAI │Postgres│   Auth     │                           │
│  │   API  │   DB   │  Service   │                           │
│  └────────┴────────┴────────────┘                           │
└─────────────────────────────────────────────────────────────┘
                 │
                 │ Réponse JSON
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  VOTRE APPLICATION                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         SmartAIAssistant Component                 │    │
│  │                                                     │    │
│  │  IA: "Bonjour ! Je suis votre assistant..."       │    │
│  │                                                     │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist visuelle

```
Configuration du Chatbot IA
═══════════════════════════════════════════════════

[✓] Tables créées dans Supabase
    ├─ conversations
    ├─ messages
    └─ ai_system_prompts

[✓] Clé OpenAI obtenue
    └─ sk-proj-abc123...

[✓] Secret configuré dans Supabase
    └─ OPENAI_API_KEY

[✓] Edge Function déployée
    └─ ai-answer (Active)

[✓] Test réussi
    └─ L'IA répond correctement !

═══════════════════════════════════════════════════
✨ Votre chatbot IA est opérationnel ! ✨
```

---

## 📱 Flow utilisateur complet

```
1. L'utilisateur se connecte
   ↓
2. Accède au Smart AI Assistant
   ↓
3. Tape un message : "Bonjour !"
   ↓
4. Clique sur [Envoyer]
   ↓
5. L'app envoie la requête à Supabase
   ↓
6. Supabase Edge Function reçoit la requête
   ↓
7. Vérifie l'authentification
   ↓
8. Récupère le system prompt
   ↓
9. Appelle OpenAI API
   ↓
10. Reçoit la réponse de ChatGPT
    ↓
11. Sauvegarde les messages en DB
    ↓
12. Retourne la réponse à l'app
    ↓
13. L'utilisateur voit la réponse de l'IA
    ↓
14. Peut continuer la conversation 🎉
```

---

**Félicitations ! Vous avez configuré votre chatbot IA ! 🎊**

*Pour plus de détails, consultez les guides textuels.*

