# 🚀 Smart AI Assistant - Version SIMPLE

**Version ultra-simplifiée qui fonctionne en 2 minutes !**

---

## ✅ Avantages

- ✅ **Fonctionne immédiatement** (pas de configuration Supabase)
- ✅ **Prompt modifiable** via l'interface Admin
- ✅ **Prompt personnalisé Prosmo** déjà intégré
- ✅ **Sauvegarde locale** du prompt (localStorage)
- ✅ **Historique des 10 derniers messages** en contexte

---

## ⚡ Installation en 2 ÉTAPES

### Étape 1 : Obtenir une clé OpenAI (2 minutes)

1. Allez sur [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Créez un compte ou connectez-vous
3. Cliquez sur **"+ Create new secret key"**
4. Copiez la clé (commence par `sk-`)

💡 **Astuce** : Les nouveaux comptes reçoivent des crédits gratuits !

---

### Étape 2 : Configurer la clé dans le code (30 secondes)

1. Ouvrez le fichier : `client/src/components/SmartAIAssistantSimple.tsx`

2. À la **ligne 7**, remplacez :
   ```typescript
   const OPENAI_API_KEY = "sk-votre-clé-openai-ici";
   ```
   
   Par votre clé :
   ```typescript
   const OPENAI_API_KEY = "sk-proj-abc123..."; // 👈 Votre clé ici
   ```

3. **Sauvegardez** le fichier (Ctrl+S)

---

## 🎯 C'EST TOUT ! Votre chatbot est prêt !

---

## 🎨 Utilisation

### Pour les utilisateurs

1. Allez dans **Smart AI Assistant**
2. Posez vos questions
3. L'IA répond avec le prompt Prosmo de Morgan & Yohan

### Pour les admins (modifier le prompt)

1. Dans le chatbot, cliquez sur **"Gérer le prompt"**
2. Modifiez le texte
3. Cliquez sur **"Enregistrer"**
4. ✅ Le nouveau prompt est actif immédiatement !

---

## 📝 Fonctionnalités

- **Contexte intelligent** : Les 10 derniers messages sont envoyés à OpenAI
- **Prompt personnalisable** : Modifiez-le via l'interface
- **Sauvegarde locale** : Le prompt est sauvegardé dans le navigateur
- **Réinitialisation** : Bouton pour revenir au prompt par défaut
- **Compteur de caractères** : Pour suivre la taille du prompt

---

## 💰 Coûts

Avec `gpt-4o-mini` (ultra-économique) :
- **50 messages/jour** : ~0,75€/mois
- **200 messages/jour** : ~3€/mois
- **1000 messages/jour** : ~15€/mois

💡 **Nouveaux comptes OpenAI = crédits gratuits !**

---

## 🔄 Pour utiliser cette version

### Option 1 : Remplacer dans App.tsx

Dans `client/src/App.tsx`, remplacez :
```typescript
import { SmartAIAssistant } from './components/SmartAIAssistant'
```

Par :
```typescript
import { SmartAIAssistantSimple as SmartAIAssistant } from './components/SmartAIAssistantSimple'
```

### Option 2 : Route dédiée

Ajoutez une nouvelle route dans votre router :
```typescript
<Route path="/ai-assistant" element={<SmartAIAssistantSimple />} />
```

---

## ⚠️ Note de sécurité

**Version actuelle** :
- La clé OpenAI est dans le code côté client
- Visible dans le code source du navigateur
- ✅ OK pour prototypes et tests
- ⚠️ PAS recommandé pour production avec gros volume

**Pour la production** :
- Utilisez la version complète avec Supabase Edge Function
- La clé est cachée côté serveur
- Voir `QUICK_START_AI_CHATBOT.md`

---

## 🎨 Personnalisation

### Modifier le modèle OpenAI

Dans `SmartAIAssistantSimple.tsx`, ligne ~170 :
```typescript
model: 'gpt-4o-mini',  // Changez ici
temperature: 0.7,       // Créativité (0-2)
max_tokens: 1000,       // Longueur max
```

### Modifier le nombre de messages en contexte

Ligne ~156 :
```typescript
...messages.slice(-10).map(msg => ({  // 👈 -10 = 10 derniers messages
```

---

## 🐛 Dépannage

### Erreur "Please configure your OpenAI API key"
→ Vous avez oublié de mettre votre clé à la ligne 7

### Erreur "Invalid API key"
→ Votre clé est incorrecte, vérifiez sur platform.openai.com

### Erreur "Insufficient credits"
→ Votre compte OpenAI n'a plus de crédits
→ Ajoutez un moyen de paiement sur platform.openai.com/account/billing

### L'IA ne répond pas / répond bizarrement
→ Vérifiez le prompt dans "Gérer le prompt"
→ Assurez-vous qu'il est clair et bien structuré

---

## 📊 Différences avec la version complète

| Caractéristique | Version Simple | Version Complète |
|-----------------|---------------|------------------|
| Configuration | 2 minutes | 8 minutes |
| Clé API | Dans le code | Cachée serveur |
| Sécurité | Basique | Maximale |
| Sauvegarde conversations | Non | Oui (Supabase) |
| Historique complet | Non | Oui |
| Prompt modifiable | Oui (localStorage) | Oui (Supabase) |
| Multi-utilisateurs | Non | Oui |
| Contexte | 10 messages | 20 messages |
| Pour production | Non | Oui |

---

## 🚀 Migration vers la version complète

Si plus tard vous voulez la version complète avec Supabase :

1. Suivez le guide `QUICK_START_AI_CHATBOT.md`
2. Créez les tables dans Supabase
3. Déployez l'Edge Function
4. Changez l'import dans App.tsx
5. Votre prompt actuel peut être copié dans Supabase

---

## 💡 Conseils

1. **Testez d'abord** avec cette version simple
2. **Collectez les retours** utilisateurs
3. **Optimisez le prompt** selon les besoins
4. **Migrez vers la version complète** quand vous êtes prêt pour la production

---

## 📞 Support

Si vous avez des problèmes :
1. Vérifiez que votre clé OpenAI est correcte
2. Vérifiez la console du navigateur (F12)
3. Vérifiez vos crédits OpenAI

---

**🎉 Votre Smart AI Assistant est prêt en 2 minutes ! 🎉**

---

*Smart AI Assistant - Version Simple v1.0*  
*Prosmo par Morgan & Yohan*

