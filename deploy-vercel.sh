#!/bin/bash

echo "🚀 Déploiement sur Vercel..."
echo

echo "📦 Build de l'application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo
echo "✅ Build réussi !"
echo

echo "🌐 Déploiement sur Vercel..."
npx vercel --prod
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du déploiement"
    exit 1
fi

echo
echo "🎉 Déploiement terminé avec succès !"
echo
