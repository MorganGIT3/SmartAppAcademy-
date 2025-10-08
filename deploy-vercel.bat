@echo off
echo 🚀 Déploiement sur Vercel...
echo.

echo 📦 Build de l'application...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du build
    pause
    exit /b 1
)

echo.
echo ✅ Build réussi !
echo.

echo 🌐 Déploiement sur Vercel...
call npx vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Erreur lors du déploiement
    pause
    exit /b 1
)

echo.
echo 🎉 Déploiement terminé avec succès !
echo.
pause
