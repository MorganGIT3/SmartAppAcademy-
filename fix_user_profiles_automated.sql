-- =====================================================
-- SCRIPT DE CORRECTION AUTOMATIQUE
-- Problème : "error saving new user" - Requête user_id vs id
-- =====================================================

-- 1. Ajouter la colonne user_id si elle n'existe pas
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'user_id' 
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD COLUMN user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;
        
        -- Créer un index pour user_id
        CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id 
        ON public.user_profiles(user_id);
    END IF;
END $$;

-- 2. Mettre à jour les données existantes (copier id vers user_id)
UPDATE public.user_profiles 
SET user_id = id 
WHERE user_id IS NULL;

-- 3. Rendre user_id NOT NULL après avoir rempli les données
ALTER TABLE public.user_profiles 
ALTER COLUMN user_id SET NOT NULL;

-- 4. Mettre à jour la fonction trigger pour utiliser user_id
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Créer le profil utilisateur (avec ON CONFLICT)
    INSERT INTO public.user_profiles (
        id,
        user_id,
        email,
        full_name,
        role,
        onboarding_completed,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.id,  -- user_id = id
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        'user',
        false,
        now(),
        now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        updated_at = now();
    
    -- Créer les tokens utilisateur (avec ON CONFLICT)
    INSERT INTO public.user_tokens (
        user_id,
        tokens_available,
        tokens_used,
        last_reset_date,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        1,
        0,
        CURRENT_DATE,
        now(),
        now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        updated_at = now();
    
    -- Créer les paramètres utilisateur (avec ON CONFLICT)
    INSERT INTO public.user_settings (
        user_id,
        available_credits,
        total_credits_earned,
        credits_used,
        max_monthly_calls,
        email_notifications,
        sms_notifications,
        push_notifications,
        timezone,
        working_hours,
        language,
        theme,
        auto_save,
        custom_data,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        0,
        0,
        0,
        10,
        true,
        false,
        true,
        'Europe/Paris',
        '{"end": "17:00", "days": [1, 2, 3, 4, 5], "start": "09:00"}',
        'fr',
        'light',
        true,
        '{}',
        now(),
        now()
    )
    ON CONFLICT (user_id) DO UPDATE SET
        updated_at = now();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Vérifier que tout est correct
SELECT 
    'user_profiles structure' as check_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
AND table_schema = 'public'
AND column_name IN ('id', 'user_id', 'email')
ORDER BY column_name;

-- 6. Vérifier les données
SELECT 
    'user_profiles data' as check_name,
    COUNT(*) as total_users,
    COUNT(user_id) as users_with_user_id,
    COUNT(CASE WHEN user_id = id THEN 1 END) as matching_ids
FROM public.user_profiles;

-- 7. Tester une requête comme celle qui échoue
SELECT 
    'test query' as check_name,
    id,
    email,
    full_name
FROM public.user_profiles 
WHERE user_id = '1f99c68a-fa7e-41e9-b0fa-8cc03d5065a5'
LIMIT 1;

-- ✅ TERMINÉ ! Le problème est maintenant corrigé.
