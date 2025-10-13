#!/bin/bash

# Script de déploiement de l'Edge Function AI pour SmartApp Academy™

echo "🚀 Déploiement de l'Edge Function AI..."
echo ""

# Vérifier si Supabase CLI est installé
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI n'est pas installé."
    echo "📦 Installation avec : npm install -g supabase"
    exit 1
fi

echo "✅ Supabase CLI détecté"
echo ""

# Vérifier si l'utilisateur est connecté
echo "🔐 Vérification de la connexion Supabase..."
if ! supabase projects list &> /dev/null; then
    echo "❌ Vous n'êtes pas connecté à Supabase."
    echo "🔑 Exécutez : supabase login"
    exit 1
fi

echo "✅ Connecté à Supabase"
echo ""

# Demander si l'utilisateur veut configurer les secrets
echo "🔑 Configuration des secrets..."
echo "Avez-vous déjà configuré votre clé OpenAI ? (o/n)"
read -r configure_secrets

if [ "$configure_secrets" = "o" ] || [ "$configure_secrets" = "O" ]; then
    echo ""
    echo "⏭️  Passage à la prochaine étape..."
else
    echo ""
    echo "📝 Pour configurer votre clé OpenAI, exécutez :"
    echo "   supabase secrets set OPENAI_API_KEY=sk-votre-clé-ici"
    echo ""
    echo "Voulez-vous continuer quand même ? (o/n)"
    read -r continue_anyway
    if [ "$continue_anyway" != "o" ] && [ "$continue_anyway" != "O" ]; then
        echo "❌ Déploiement annulé"
        exit 0
    fi
fi

echo ""

# Déployer la fonction
echo "📤 Déploiement de la fonction ai-answer..."
if supabase functions deploy ai-answer --no-verify-jwt; then
    echo ""
    echo "✅ Fonction déployée avec succès !"
    echo ""
    echo "🎉 Votre chatbot IA est prêt à être utilisé !"
    echo ""
    echo "📋 Prochaines étapes :"
    echo "   1. Assurez-vous d'avoir exécuté le script SQL dans Supabase"
    echo "   2. Testez le chatbot dans votre application"
    echo "   3. Surveillez les logs dans le Dashboard Supabase"
    echo ""
else
    echo ""
    echo "❌ Erreur lors du déploiement"
    echo "📖 Consultez les logs ci-dessus pour plus d'informations"
    exit 1
fi

