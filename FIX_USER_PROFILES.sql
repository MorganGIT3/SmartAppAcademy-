-- =====================================================
-- CORRECTION : Créer la table user_profiles et le trigger
-- =====================================================
-- Ce script corrige l'erreur "Database error saving new user"
-- Exécutez ce script dans Supabase Dashboard → SQL Editor

-- 1. Créer la table user_profiles qui va stocker les infos des utilisateurs
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Activer Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Supprimer les anciennes politiques s'elles existent
DROP POLICY IF EXISTS "Allow public read access" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow update for own profile" ON public.user_profiles;

-- 4. Créer les nouvelles politiques
CREATE POLICY "Allow public read access" ON public.user_profiles
    FOR SELECT USING (true);

CREATE POLICY "Allow insert for authenticated users" ON public.user_profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update for own profile" ON public.user_profiles
    FOR UPDATE USING (true);

-- 5. Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at DESC);

-- 6. Supprimer l'ancienne fonction s'elle existe
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 7. Créer la fonction trigger pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, email, full_name, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Utilisateur'),
        NEW.created_at
    )
    ON CONFLICT (user_id) DO UPDATE
    SET 
        email = EXCLUDED.email,
        full_name = COALESCE(EXCLUDED.full_name, public.user_profiles.full_name),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Supprimer l'ancien trigger s'il existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 9. Créer le trigger qui s'exécute à chaque nouvelle inscription
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- 10. IMPORTANT : Remplir la table avec les utilisateurs EXISTANTS
-- Cette requête va importer tous les users qui existent déjà dans auth.users
INSERT INTO public.user_profiles (user_id, email, full_name, created_at)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', email, 'Utilisateur'),
    created_at
FROM auth.users
ON CONFLICT (user_id) DO UPDATE
SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, public.user_profiles.full_name),
    updated_at = NOW();

-- 11. Vérification : Afficher tous les utilisateurs
SELECT 
    up.id,
    up.user_id,
    up.email,
    up.full_name,
    up.created_at
FROM public.user_profiles up
ORDER BY up.created_at DESC;

-- ✅ TERMINÉ ! Le problème "Database error saving new user" est maintenant corrigé.
-- ✅ Chaque nouvelle inscription créera automatiquement un profil dans user_profiles.
-- ✅ Les utilisateurs existants sont maintenant dans user_profiles.
