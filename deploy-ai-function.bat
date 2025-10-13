@echo off
REM Script de déploiement de l'Edge Function AI pour SmartApp Academy™

echo.
echo 🚀 Déploiement de l'Edge Function AI...
echo.

REM Vérifier si Supabase CLI est installé
where supabase >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Supabase CLI n'est pas installé.
    echo 📦 Installation avec : npm install -g supabase
    pause
    exit /b 1
)

echo ✅ Supabase CLI détecté
echo.

REM Vérifier si l'utilisateur est connecté
echo 🔐 Vérification de la connexion Supabase...
supabase projects list >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vous n'êtes pas connecté à Supabase.
    echo 🔑 Exécutez : supabase login
    pause
    exit /b 1
)

echo ✅ Connecté à Supabase
echo.

REM Configuration des secrets
echo 🔑 Configuration des secrets...
echo Avez-vous déjà configuré votre clé OpenAI ? (o/n)
set /p configure_secrets=

if /i "%configure_secrets%"=="o" (
    echo.
    echo ⏭️  Passage à la prochaine étape...
) else (
    echo.
    echo 📝 Pour configurer votre clé OpenAI, exécutez :
    echo    supabase secrets set OPENAI_API_KEY=sk-votre-clé-ici
    echo.
    echo Voulez-vous continuer quand même ? (o/n)
    set /p continue_anyway=
    if /i not "%continue_anyway%"=="o" (
        echo ❌ Déploiement annulé
        pause
        exit /b 0
    )
)

echo.

REM Déployer la fonction
echo 📤 Déploiement de la fonction ai-answer...
supabase functions deploy ai-answer --no-verify-jwt
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Fonction déployée avec succès !
    echo.
    echo 🎉 Votre chatbot IA est prêt à être utilisé !
    echo.
    echo 📋 Prochaines étapes :
    echo    1. Assurez-vous d'avoir exécuté le script SQL dans Supabase
    echo    2. Testez le chatbot dans votre application
    echo    3. Surveillez les logs dans le Dashboard Supabase
    echo.
) else (
    echo.
    echo ❌ Erreur lors du déploiement
    echo 📖 Consultez les logs ci-dessus pour plus d'informations
)

pause

