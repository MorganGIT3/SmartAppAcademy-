# 🚀 Supabase Edge Functions - SmartApp Academy™

Ce dossier contient les Edge Functions Supabase pour SmartApp Academy™.

---

## 📁 Structure

```
supabase/functions/
├── ai-answer/          # Fonction de chatbot IA avec OpenAI
│   └── index.ts
└── README.md           # Ce fichier
```

---

## 🤖 ai-answer

### Description
Cette fonction gère les interactions avec l'API OpenAI (ChatGPT) de manière sécurisée.

### Fonctionnalités
- ✅ Authentification JWT requise
- ✅ Récupération du system prompt depuis la base de données
- ✅ Gestion de l'historique des conversations (20 derniers messages)
- ✅ Appel sécurisé à l'API OpenAI
- ✅ Sauvegarde automatique des messages
- ✅ Gestion d'erreurs complète
- ✅ Support CORS

### Endpoint
```
POST https://kwzurhhbvfkrvhbcdhwi.supabase.co/functions/v1/ai-answer
```

### Headers requis
```http
Content-Type: application/json
Authorization: Bearer <JWT_TOKEN>
```

### Body
```json
{
  "conversationId": "uuid-optionnel",
  "userMessage": "Votre message ici"
}
```

### Réponse
```json
{
  "success": true,
  "conversationId": "uuid-de-la-conversation",
  "answer": "Réponse de l'IA"
}
```

### Variables d'environnement requises
```bash
OPENAI_API_KEY=sk-...        # Clé API OpenAI
SUPABASE_URL=https://...     # URL du projet Supabase
SUPABASE_ANON_KEY=eyJ...     # Clé anonyme Supabase
```

### Déploiement

#### Via CLI
```bash
supabase functions deploy ai-answer
```

#### Via Dashboard
1. Aller dans Edge Functions
2. Créer une nouvelle fonction nommée `ai-answer`
3. Copier-coller le contenu de `ai-answer/index.ts`
4. Déployer

### Configuration des secrets

```bash
# Via CLI
supabase secrets set OPENAI_API_KEY=sk-votre-clé

# Via Dashboard
Dashboard > Edge Functions > Manage secrets
```

### Logs

Visualiser les logs dans Supabase Dashboard :
```
Dashboard > Edge Functions > ai-answer > Logs
```

### Tests locaux

```bash
# Démarrer le serveur local
supabase functions serve ai-answer

# Tester avec curl
curl -X POST http://localhost:54321/functions/v1/ai-answer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"userMessage": "Hello"}'
```

---

## 🔐 Sécurité

### Authentification
- JWT vérifié pour chaque requête
- Utilisation de `supabase.auth.getUser()` pour valider l'utilisateur

### RLS (Row Level Security)
- Les tables sont protégées par RLS
- Chaque utilisateur ne peut accéder qu'à ses propres données

### Secrets
- Les clés API ne sont jamais exposées au client
- Stockées de manière sécurisée dans Supabase Secrets

### CORS
- Configuré pour accepter toutes les origines (à ajuster selon vos besoins)
- Headers CORS appropriés pour les requêtes OPTIONS

---

## 💰 Coûts

### Supabase Edge Functions
- **Gratuit** : Jusqu'à 500 000 invocations/mois
- **Ensuite** : $2 par million d'invocations supplémentaires

### OpenAI API (gpt-4o-mini)
- **Input** : ~$0.15 par million de tokens
- **Output** : ~$0.60 par million de tokens

**Estimation** : Pour 1000 messages/jour ≈ $0.50-1.00/jour

---

## 📊 Monitoring

### Métriques disponibles
- Nombre d'invocations
- Temps de réponse moyen
- Taux d'erreur
- Utilisation des tokens OpenAI

### Accès aux métriques
```
Dashboard > Edge Functions > ai-answer > Metrics
```

### Requêtes SQL utiles
```sql
-- Messages par jour
SELECT 
  DATE(created_at) as date,
  COUNT(*) as count
FROM messages
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Conversations actives
SELECT 
  COUNT(*) as active_conversations
FROM conversations
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

---

## 🐛 Dépannage

### Erreur 401 "Non autorisé"
**Cause** : JWT invalide ou expiré
**Solution** : Vérifier `supabase.auth.getSession()` dans le client

### Erreur "OPENAI_API_KEY non configurée"
**Cause** : Secret manquant
**Solution** : Configurer le secret avec `supabase secrets set`

### Erreur 500 "Erreur OpenAI"
**Cause** : Problème avec l'API OpenAI (crédits épuisés, clé invalide, etc.)
**Solution** : Vérifier le compte OpenAI et les logs

### Timeout
**Cause** : Réponse OpenAI trop longue
**Solution** : Réduire `max_tokens` dans le code

---

## 🔄 Workflow de développement

1. **Modifier le code** : Éditer `ai-answer/index.ts`
2. **Tester localement** : `supabase functions serve ai-answer`
3. **Déployer** : `supabase functions deploy ai-answer`
4. **Vérifier les logs** : Dashboard > Logs
5. **Tester en production** : Via l'application

---

## 📚 Ressources

- [Documentation Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Documentation OpenAI API](https://platform.openai.com/docs/api-reference)
- [Deno Runtime](https://deno.land/manual)
- [Guide de déploiement](../../CHATBOT_IA_SETUP.md)

---

## 🎯 Bonnes pratiques

1. **Toujours gérer les erreurs** : Entourer les appels API de try/catch
2. **Logger les erreurs** : Utiliser `console.error()` pour faciliter le debug
3. **Valider les entrées** : Vérifier que les données sont valides
4. **Limiter le contexte** : Ne pas envoyer trop de messages à OpenAI (coût)
5. **Gérer les timeouts** : OpenAI peut parfois être lent
6. **Monitorer les coûts** : Suivre régulièrement l'usage sur OpenAI

---

## 🚀 Prochaines étapes possibles

### Améliorations court terme
- [ ] Streaming de réponses (SSE)
- [ ] Rate limiting par utilisateur
- [ ] Retry automatique en cas d'échec
- [ ] Métriques personnalisées

### Améliorations moyen terme
- [ ] Support multi-modèles (GPT-4, Claude, etc.)
- [ ] Cache des réponses fréquentes
- [ ] Compression des messages historiques
- [ ] Webhooks pour notifications

### Améliorations long terme
- [ ] RAG avec documents utilisateur (pgvector)
- [ ] Fine-tuning de modèles personnalisés
- [ ] Analyse de sentiment
- [ ] A/B testing de prompts

---

**Dernière mise à jour** : Octobre 2025

