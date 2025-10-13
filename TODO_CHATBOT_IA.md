# ✅ TODO - Configuration du Chatbot IA

Liste des tâches à effectuer pour activer votre chatbot IA.

---

## 📋 Checklist complète

### Phase 1 : Configuration de base (obligatoire) ⏱️ 8 minutes

#### ☐ 1. Créer les tables dans Supabase (2 min)

**Fichier** : `supabase/migrations/ai_chatbot.sql`

**Actions** :
1. Ouvrir [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet "SmartApp Academy"
3. Aller dans **SQL Editor**
4. Cliquer sur **New Query**
5. Copier **TOUT** le contenu de `supabase/migrations/ai_chatbot.sql`
6. Coller dans l'éditeur
7. Cliquer sur **Run** (ou Ctrl+Entrée)
8. Vérifier : "Success. No rows returned"

**✅ Validation** : Aller dans "Table Editor" et vérifier que les tables `conversations`, `messages`, et `ai_system_prompts` existent.

---

#### ☐ 2. Obtenir une clé API OpenAI (2 min)

**Site** : [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

**Actions** :
1. Créer un compte ou se connecter
2. Cliquer sur **+ Create new secret key**
3. Nommer la clé : "SmartApp Academy"
4. **IMPORTANT** : Copier la clé immédiatement (commence par `sk-`)
5. La sauvegarder dans un endroit sûr

**Format de la clé** : `sk-proj-abc123def456...`

**💡 Astuce** : Les nouveaux comptes reçoivent des crédits gratuits !

**✅ Validation** : Vous avez une clé qui commence par `sk-`

---

#### ☐ 3. Configurer le secret dans Supabase (1 min)

**Option A - Via Dashboard (recommandé)** :
1. Dans Supabase Dashboard, aller dans **Edge Functions**
2. Cliquer sur **Manage secrets** (en haut à droite)
3. Cliquer sur **Add secret**
4. **Name** : `OPENAI_API_KEY`
5. **Value** : Votre clé OpenAI (coller ici)
6. Cliquer sur **Add**

**Option B - Via CLI** :
```bash
# Installer Supabase CLI
npm install -g supabase

# Se connecter
supabase login

# Ajouter le secret
supabase secrets set OPENAI_API_KEY=sk-votre-clé-ici
```

**✅ Validation** : Le secret `OPENAI_API_KEY` apparaît dans la liste des secrets

---

#### ☐ 4. Déployer l'Edge Function (2 min)

**Fichier** : `supabase/functions/ai-answer/index.ts`

**Option A - Via Dashboard (recommandé pour débutants)** :
1. Dans Supabase, aller dans **Edge Functions**
2. Cliquer sur **Create a new function**
3. **Function name** : `ai-answer`
4. Copier **TOUT** le contenu de `supabase/functions/ai-answer/index.ts`
5. Coller dans l'éditeur de code
6. Cliquer sur **Deploy function**
7. Attendre le déploiement (10-30 secondes)

**Option B - Via script automatisé** :
- **Windows** : Double-cliquer sur `deploy-ai-function.bat`
- **Mac/Linux** : 
  ```bash
  chmod +x deploy-ai-function.sh
  ./deploy-ai-function.sh
  ```

**Option C - Via CLI** :
```bash
supabase functions deploy ai-answer
```

**✅ Validation** : La fonction apparaît avec le statut "Active" dans Edge Functions

---

#### ☐ 5. Tester le chatbot (1 min)

**Actions** :
1. Lancer l'application : `npm run dev`
2. Se connecter avec un compte utilisateur
3. Accéder au **Smart AI Assistant**
4. Envoyer un message test : "Bonjour, qui es-tu ?"
5. Attendre la réponse (2-5 secondes)

**✅ Validation** : L'IA répond avec une présentation complète

**🎉 Si ça marche : FÉLICITATIONS ! Votre chatbot est opérationnel !**

**❌ Si ça ne marche pas : Voir la section "Dépannage" ci-dessous**

---

### Phase 2 : Personnalisation (optionnel) ⏱️ 5-10 minutes

#### ☐ 6. Personnaliser le prompt système

**Option A - Via SQL** :
```sql
UPDATE ai_system_prompts 
SET prompt = 'Ton nouveau prompt personnalisé ici...'
WHERE is_active = true;
```

**Option B - Via l'interface admin** (à venir) :
1. Aller dans Admin Dashboard
2. Section "Gestion du Prompt IA"
3. Modifier le texte
4. Enregistrer

**📝 Conseils pour un bon prompt** :
- Définir clairement le rôle de l'IA
- Spécifier le ton et le style
- Lister les domaines d'expertise
- Ajouter des règles et limitations
- Indiquer comment gérer les erreurs

**✅ Validation** : Tester avec un message pour vérifier le nouveau comportement

---

#### ☐ 7. Ajuster les paramètres OpenAI (optionnel)

**Fichier** : `supabase/functions/ai-answer/index.ts` (ligne ~120)

**Paramètres disponibles** :
```typescript
model: 'gpt-4o-mini',  // Modèle (gpt-4o-mini, gpt-4, etc.)
temperature: 0.7,       // Créativité: 0 (précis) à 2 (créatif)
max_tokens: 1000,       // Longueur maximale de réponse
```

**💡 Recommandations** :
- `gpt-4o-mini` : Économique et rapide (recommandé)
- `temperature: 0.7` : Bon équilibre créativité/précision
- `max_tokens: 1000` : Suffisant pour la plupart des réponses

**✅ Validation** : Redéployer la fonction et tester

---

### Phase 3 : Monitoring (recommandé) ⏱️ 2 minutes

#### ☐ 8. Configurer le monitoring

**Actions** :
1. **Logs Edge Function** :
   - Dashboard Supabase > Edge Functions > ai-answer > Logs
   - Vérifier les requêtes et erreurs

2. **Usage OpenAI** :
   - [platform.openai.com/usage](https://platform.openai.com/usage)
   - Suivre la consommation de tokens
   - Surveiller les coûts

3. **Statistiques base de données** :
   ```sql
   -- Messages par jour
   SELECT 
     DATE(created_at) as date,
     COUNT(*) as count
   FROM messages
   GROUP BY DATE(created_at)
   ORDER BY date DESC;
   ```

**✅ Validation** : Vous pouvez voir les logs et statistiques

---

#### ☐ 9. Définir des alertes (optionnel)

**Idées d'alertes** :
- Budget OpenAI dépassé
- Taux d'erreur élevé
- Temps de réponse lent
- Usage anormal

**Où configurer** :
- OpenAI : [platform.openai.com/account/billing/limits](https://platform.openai.com/account/billing/limits)
- Supabase : Dashboard > Settings > Notifications

---

### Phase 4 : Documentation et formation (recommandé) ⏱️ 10 minutes

#### ☐ 10. Lire la documentation

**Priorité haute** :
- [ ] **[QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)** (5 min)
- [ ] **[CHATBOT_ONE_PAGE.md](./CHATBOT_ONE_PAGE.md)** (2 min)

**Priorité moyenne** :
- [ ] **[CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)** (10 min)
- [ ] **[AI_CHATBOT_API.md](./AI_CHATBOT_API.md)** (si développeur)

**Référence** :
- [ ] **[INDEX_CHATBOT_IA.md](./INDEX_CHATBOT_IA.md)** (navigation)

---

#### ☐ 11. Former votre équipe

**Pour les utilisateurs** :
- Montrer comment accéder au chatbot
- Expliquer les cas d'usage
- Donner des exemples de questions

**Pour les admins** :
- Expliquer comment modifier le prompt
- Montrer où voir les logs
- Expliquer la gestion des coûts

---

### Phase 5 : Optimisation (optionnel) ⏱️ Variable

#### ☐ 12. Collecter les retours utilisateurs

**Actions** :
- Demander aux utilisateurs leur avis
- Noter les questions fréquentes
- Identifier les points d'amélioration

**Méthode** :
- Ajouter un système de feedback (pouce haut/bas)
- Analyser les conversations
- Itérer sur le prompt

---

#### ☐ 13. Optimiser le prompt système

**Basé sur les retours** :
1. Identifier les types de questions
2. Améliorer les réponses
3. Ajouter des cas d'usage
4. Tester et itérer

**Conseils** :
- Commencer simple
- Ajouter progressivement
- Tester chaque modification
- Garder un historique des versions

---

#### ☐ 14. Planifier les évolutions futures

**Court terme** :
- [ ] Interface de gestion des conversations
- [ ] Export de conversations
- [ ] Statistiques d'utilisation

**Moyen terme** :
- [ ] Recherche dans les conversations
- [ ] Tags et catégories
- [ ] Mode expert

**Long terme** :
- [ ] RAG avec documents
- [ ] Multi-modèles
- [ ] Assistant vocal

---

## 🐛 Dépannage

### Problème : "Non autorisé" (401)
**Solution** :
1. Vérifier que vous êtes connecté
2. Vérifier `supabase.auth.getSession()` dans la console
3. Vérifier les politiques RLS dans Supabase

---

### Problème : "OPENAI_API_KEY non configurée"
**Solution** :
1. Retourner à l'étape 3
2. Ajouter le secret dans Supabase
3. Redéployer la fonction (étape 4)

---

### Problème : L'IA ne répond pas
**Solution** :
1. Ouvrir la console du navigateur (F12)
2. Regarder les erreurs dans l'onglet Console
3. Vérifier les logs : Dashboard Supabase > Edge Functions > Logs
4. Vérifier les crédits OpenAI : [platform.openai.com/usage](https://platform.openai.com/usage)

---

### Problème : Erreur "Insufficient credits"
**Solution** :
1. Aller sur [platform.openai.com/account/billing](https://platform.openai.com/account/billing)
2. Ajouter un moyen de paiement
3. Recharger des crédits

---

### Problème : Tables déjà existantes
**Solution** :
- Les tables existent déjà, c'est normal
- Passer à l'étape suivante

---

## 📊 Métriques de succès

### ✅ Configuration réussie si :
- [ ] Les 3 tables sont créées
- [ ] Le secret OPENAI_API_KEY est configuré
- [ ] L'Edge Function est déployée et active
- [ ] Le test de chatbot fonctionne
- [ ] Les logs montrent des requêtes réussies

### 🎯 Utilisation optimale si :
- [ ] Les utilisateurs utilisent régulièrement le chatbot
- [ ] Le taux d'erreur < 5%
- [ ] Le temps de réponse < 5 secondes
- [ ] Les coûts sont maîtrisés
- [ ] Les retours utilisateurs sont positifs

---

## 💰 Surveillance des coûts

### ⚠️ Alertes recommandées

**Budget journalier** : Fixer une limite sur OpenAI
- Exemple : $5/jour pour ~5000 messages

**Monitoring hebdomadaire** :
- Lundi : Vérifier l'usage de la semaine
- Ajuster le budget si nécessaire

**Métriques à suivre** :
- Nombre de messages / jour
- Coût par message
- Coût total / mois

---

## 🎯 Prochaines actions

Une fois tout configuré :

1. **Semaine 1** : Tester intensivement avec votre équipe
2. **Semaine 2** : Déployer auprès de quelques utilisateurs pilotes
3. **Semaine 3** : Collecter les retours et optimiser
4. **Semaine 4** : Déployer à tous les utilisateurs

---

## 📞 Ressources

### Documentation
- 📖 [QUICK_START_AI_CHATBOT.md](./QUICK_START_AI_CHATBOT.md)
- 📖 [CHATBOT_IA_SETUP.md](./CHATBOT_IA_SETUP.md)
- 📖 [AI_CHATBOT_API.md](./AI_CHATBOT_API.md)
- 📖 [INDEX_CHATBOT_IA.md](./INDEX_CHATBOT_IA.md)

### Liens externes
- [OpenAI Platform](https://platform.openai.com)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [OpenAI Docs](https://platform.openai.com/docs)
- [Supabase Docs](https://supabase.com/docs)

---

## ✅ Checklist finale

```
Configuration de base :
[☐] 1. Tables créées
[☐] 2. Clé OpenAI obtenue
[☐] 3. Secret configuré
[☐] 4. Edge Function déployée
[☐] 5. Test réussi

Personnalisation :
[☐] 6. Prompt personnalisé
[☐] 7. Paramètres ajustés

Monitoring :
[☐] 8. Monitoring configuré
[☐] 9. Alertes définies

Documentation :
[☐] 10. Documentation lue
[☐] 11. Équipe formée

Optimisation :
[☐] 12. Retours collectés
[☐] 13. Prompt optimisé
[☐] 14. Évolutions planifiées
```

---

**🎉 Félicitations ! Une fois cette checklist complétée, votre chatbot IA sera parfaitement opérationnel ! 🎉**

---

*TODO Chatbot IA - SmartApp Academy™ v1.0*

