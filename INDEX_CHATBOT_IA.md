# 📑 Index - Documentation Chatbot IA

Guide de navigation dans la documentation du chatbot IA.

---

## 🚀 Par où commencer ?

### Si vous voulez juste faire fonctionner le chatbot (5 min)
👉 **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)**

### Si vous voulez comprendre en détail
👉 **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)**

### Si vous voulez développer avec l'API
👉 **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)**

---

## 📚 Tous les documents

### 🎯 Guides utilisateur

#### 1. QUICK_START_AI_CHATBOT.md
**Quoi ?** Guide ultra-rapide en 5 minutes  
**Pour qui ?** Débutants, utilisateurs pressés  
**Contenu :**
- Checklist rapide des 5 étapes
- Instructions pas à pas
- Dépannage express
- Estimation des coûts

**📍 [Voir le fichier](./QUICK_START_AI_CHATBOT.md)**

---

#### 2. CHATBOT_IA_SETUP.md
**Quoi ?** Guide complet détaillé  
**Pour qui ?** Utilisateurs qui veulent tout comprendre  
**Contenu :**
- Configuration étape par étape
- Options avancées
- Modification du prompt système
- Consultation de l'historique
- Dépannage approfondi
- Notes de sécurité

**📍 [Voir le fichier](./CHATBOT_IA_SETUP.md)**

---

#### 3. CHATBOT_VISUAL_GUIDE.md
**Quoi ?** Guide visuel avec schémas  
**Pour qui ?** Apprenants visuels  
**Contenu :**
- Schémas ASCII des interfaces
- Flow de configuration illustré
- Architecture visuelle
- Checklist graphique

**📍 [Voir le fichier](./CHATBOT_VISUAL_GUIDE.md)**

---

#### 4. CHATBOT_IA_RESUME.md
**Quoi ?** Récapitulatif complet  
**Pour qui ?** Tout le monde (vue d'ensemble)  
**Contenu :**
- Ce qui a été fait
- Fichiers créés
- Architecture technique
- Prochaines étapes
- Fonctionnalités disponibles

**📍 [Voir le fichier](./CHATBOT_IA_RESUME.md)**

---

### 👨‍💻 Documentation technique

#### 5. AI_CHATBOT_API.md
**Quoi ?** Référence API développeur  
**Pour qui ?** Développeurs  
**Contenu :**
- Documentation de toutes les fonctions
- Exemples de code
- Structure de la base de données
- Codes d'erreur
- Bonnes pratiques
- Exemples d'utilisation avancée

**📍 [Voir le fichier](./AI_CHATBOT_API.md)**

---

#### 6. supabase/functions/README.md
**Quoi ?** Documentation des Edge Functions  
**Pour qui ?** Développeurs backend  
**Contenu :**
- Structure des fonctions
- Guide de déploiement
- Configuration des secrets
- Tests locaux
- Monitoring
- Dépannage technique

**📍 [Voir le fichier](./supabase/functions/README.md)**

---

#### 7. CHANGELOG_CHATBOT_IA.md
**Quoi ?** Historique des modifications  
**Pour qui ?** Développeurs, mainteneurs  
**Contenu :**
- Toutes les modifications apportées
- Nouvelles fonctionnalités
- Corrections de bugs
- Breaking changes
- Roadmap future

**📍 [Voir le fichier](./CHANGELOG_CHATBOT_IA.md)**

---

### 🛠️ Fichiers de code

#### 8. supabase/migrations/ai_chatbot.sql
**Quoi ?** Schéma SQL complet  
**Pour qui ?** Base de données  
**Contenu :**
- Tables : `conversations`, `messages`, `ai_system_prompts`
- Index optimisés
- Politiques RLS
- Triggers
- Prompt par défaut

**📍 [Voir le fichier](./supabase/migrations/ai_chatbot.sql)**

---

#### 9. supabase/functions/ai-answer/index.ts
**Quoi ?** Edge Function Supabase  
**Pour qui ?** Serveur (runtime Deno)  
**Contenu :**
- Authentification JWT
- Appel à OpenAI API
- Gestion des conversations
- Sauvegarde des messages
- Gestion d'erreurs

**📍 [Voir le fichier](./supabase/functions/ai-answer/index.ts)**

---

#### 10. client/src/components/SmartAIAssistant.tsx
**Quoi ?** Composant React du chatbot  
**Pour qui ?** Frontend  
**Contenu :**
- Interface utilisateur du chat
- Appel à l'Edge Function
- Gestion des états
- Affichage des messages

**📍 [Voir le fichier](./client/src/components/SmartAIAssistant.tsx)**

---

#### 11. client/src/components/AIPromptManager.tsx
**Quoi ?** Interface admin pour le prompt  
**Pour qui ?** Frontend admin  
**Contenu :**
- Éditeur de prompt système
- Sauvegarde avec feedback
- Métadonnées du prompt

**📍 [Voir le fichier](./client/src/components/AIPromptManager.tsx)**

---

#### 12. client/src/lib/supabase.ts
**Quoi ?** Fonctions helper (étendu)  
**Pour qui ?** Frontend  
**Contenu :**
- `sendAIMessage()`
- `getAIConversations()`
- `getAIMessages()`
- `deleteAIConversation()`
- `getActiveSystemPrompt()`
- `updateSystemPrompt()`

**📍 [Voir le fichier](./client/src/lib/supabase.ts)**

---

### 🔧 Scripts de déploiement

#### 13. deploy-ai-function.sh
**Quoi ?** Script de déploiement (Mac/Linux)  
**Pour qui ?** Utilisateurs Mac/Linux  
**Contenu :**
- Vérification de Supabase CLI
- Configuration des secrets guidée
- Déploiement automatisé

**📍 [Voir le fichier](./deploy-ai-function.sh)**

**Usage :**
```bash
chmod +x deploy-ai-function.sh
./deploy-ai-function.sh
```

---

#### 14. deploy-ai-function.bat
**Quoi ?** Script de déploiement (Windows)  
**Pour qui ?** Utilisateurs Windows  
**Contenu :**
- Vérification de Supabase CLI
- Configuration des secrets guidée
- Déploiement automatisé

**📍 [Voir le fichier](./deploy-ai-function.bat)**

**Usage :**
```cmd
deploy-ai-function.bat
```

---

### 📋 Fichiers de navigation

#### 15. INDEX_CHATBOT_IA.md
**Quoi ?** Ce fichier  
**Pour qui ?** Tout le monde  
**Contenu :**
- Liste de tous les documents
- Description de chaque fichier
- Guide de navigation

**📍 [Vous êtes ici](./INDEX_CHATBOT_IA.md)**

---

## 🎯 Navigation par besoin

### Je veux configurer le chatbot
1. Lire **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)** (5 min)
2. Exécuter **[ai_chatbot.sql](./supabase/migrations/ai_chatbot.sql)** dans Supabase
3. Déployer avec **[deploy-ai-function.bat](./deploy-ai-function.bat)** ou **.sh**
4. Tester !

### Je veux personnaliser le prompt
1. Lire section "Personnalisation" dans **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)**
2. Utiliser le composant **[AIPromptManager.tsx](./client/src/components/AIPromptManager.tsx)**
3. Ou modifier via SQL

### Je veux développer une fonctionnalité
1. Lire **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)**
2. Consulter **[supabase.ts](./client/src/lib/supabase.ts)** pour les fonctions disponibles
3. Voir **[SmartAIAssistant.tsx](./client/src/components/SmartAIAssistant.tsx)** pour un exemple

### Je veux comprendre l'architecture
1. Lire **[CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)** section "Architecture"
2. Voir **[CHATBOT_VISUAL_GUIDE.md](./CHATBOT_VISUAL_GUIDE.md)** pour les schémas
3. Consulter **[supabase/functions/README.md](./supabase/functions/README.md)**

### J'ai un problème
1. Section "Dépannage" dans **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)**
2. Section "Dépannage" dans **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)**
3. Codes d'erreur dans **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)**
4. Section "Troubleshooting" dans **[supabase/functions/README.md](./supabase/functions/README.md)**

### Je veux voir l'historique des modifications
👉 **[CHANGELOG_CHATBOT_IA.md](./CHANGELOG_CHATBOT_IA.md)**

---

## 📊 Statistiques de la documentation

- **Total de fichiers** : 15
- **Guides utilisateur** : 4
- **Documentation technique** : 3
- **Fichiers de code** : 5
- **Scripts** : 2
- **Navigation** : 1 (ce fichier)

- **Pages de documentation** : ~80 pages équivalentes
- **Exemples de code** : 50+
- **Schémas visuels** : 15+

---

## 🗺️ Carte mentale

```
Chatbot IA Documentation
│
├─ 🚀 Démarrage Rapide
│   ├─ QUICK_START_AI_CHATBOT.md
│   └─ CHATBOT_VISUAL_GUIDE.md
│
├─ 📚 Documentation Complète
│   ├─ CHATBOT_IA_SETUP.md
│   └─ CHATBOT_IA_RESUME.md
│
├─ 👨‍💻 Référence Technique
│   ├─ AI_CHATBOT_API.md
│   ├─ supabase/functions/README.md
│   └─ CHANGELOG_CHATBOT_IA.md
│
├─ 💻 Code Source
│   ├─ supabase/migrations/ai_chatbot.sql
│   ├─ supabase/functions/ai-answer/index.ts
│   ├─ client/src/components/SmartAIAssistant.tsx
│   ├─ client/src/components/AIPromptManager.tsx
│   └─ client/src/lib/supabase.ts
│
├─ 🛠️ Scripts
│   ├─ deploy-ai-function.sh
│   └─ deploy-ai-function.bat
│
└─ 📑 Navigation
    └─ INDEX_CHATBOT_IA.md (ce fichier)
```

---

## 🔍 Recherche rapide

### Par mot-clé

**Configuration**
→ [QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)
→ [CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)

**API / Développement**
→ [AI_CHATBOT_API.md](./AI_CHATBOT_API.md)
→ [supabase/functions/README.md](./supabase/functions/README.md)

**Dépannage / Erreurs**
→ Sections "Dépannage" dans tous les guides
→ [AI_CHATBOT_API.md](./AI_CHATBOT_API.md) (codes d'erreur)

**Sécurité**
→ [CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md) section "Sécurité"
→ [AI_CHATBOT_API.md](./AI_CHATBOT_API.md) section "Sécurité"

**Coûts**
→ [QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)
→ [CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)

**Architecture**
→ [CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)
→ [CHATBOT_VISUAL_GUIDE.md](./CHATBOT_VISUAL_GUIDE.md)

---

## 📱 Format par type d'utilisateur

### 🟢 Débutant / Utilisateur
1. **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)** ⭐
2. **[CHATBOT_VISUAL_GUIDE.md](./CHATBOT_VISUAL_GUIDE.md)**
3. **[CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)**

### 🟡 Développeur Frontend
1. **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)** ⭐
2. **[SmartAIAssistant.tsx](./client/src/components/SmartAIAssistant.tsx)**
3. **[supabase.ts](./client/src/lib/supabase.ts)**

### 🟠 Développeur Backend
1. **[supabase/functions/README.md](./supabase/functions/README.md)** ⭐
2. **[ai-answer/index.ts](./supabase/functions/ai-answer/index.ts)**
3. **[ai_chatbot.sql](./supabase/migrations/ai_chatbot.sql)**

### 🔴 Administrateur
1. **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)** ⭐
2. **[AIPromptManager.tsx](./client/src/components/AIPromptManager.tsx)**
3. **[CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)**

⭐ = Document principal recommandé

---

## 💡 Conseils de lecture

### Première fois
Lisez dans cet ordre :
1. **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)** (5 min)
2. **[CHATBOT_IA_RESUME.md](./CHATBOT_IA_RESUME.md)** (10 min)
3. Testez le chatbot
4. **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)** (si besoin d'approfondir)

### Pour développer
1. **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)** (référence)
2. Code source (exemples)
3. **[supabase/functions/README.md](./supabase/functions/README.md)** (si backend)

### Pour maintenir
1. **[CHANGELOG_CHATBOT_IA.md](./CHANGELOG_CHATBOT_IA.md)** (modifications)
2. **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)** (configuration)
3. Logs dans Supabase Dashboard

---

## 📞 Besoin d'aide ?

1. **Cherchez dans l'index** (cette page) votre besoin
2. **Consultez le guide approprié**
3. **Vérifiez la section dépannage**
4. **Consultez les logs** (Supabase Dashboard)

---

**Bon développement ! 🚀**

*Dernière mise à jour : Octobre 2025*

