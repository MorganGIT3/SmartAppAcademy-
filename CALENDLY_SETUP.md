# Configuration Calendly OAuth

## Variables d'environnement requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Calendly OAuth Configuration
VITE_CALENDLY_CLIENT_ID=your_calendly_client_id_here
VITE_CALENDLY_CLIENT_SECRET=your_calendly_client_secret_here
VITE_CALENDLY_REDIRECT_URI=https://your-project-ref.functions.supabase.co/calendly-oauth-callback

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Remplacement du PROJECT-REF

Dans le fichier `client/src/components/ConnectCalendlyButton.tsx`, remplacez `<PROJECT-REF>` par votre ID de projet Supabase :

```typescript
const redirectUri = encodeURIComponent(
  "https://VOTRE-PROJECT-REF.functions.supabase.co/calendly-oauth-callback"
);
```

## Configuration Calendly

1. Allez sur [Calendly Developer](https://developer.calendly.com/)
2. Créez une nouvelle application OAuth
3. Configurez l'URL de redirection : `https://VOTRE-PROJECT-REF.functions.supabase.co/calendly-oauth-callback`
4. Récupérez le Client ID et Client Secret
5. Ajoutez-les dans votre fichier `.env`

## Test

1. Démarrez l'application : `npm run dev`
2. Allez sur la page des paramètres
3. Cliquez sur "Connecter Calendly" dans la section Intégrations
4. Vous serez redirigé vers Calendly pour l'autorisation
5. Après autorisation, vous serez redirigé vers votre callback Supabase
6. Les tokens seront enregistrés dans votre base de données
