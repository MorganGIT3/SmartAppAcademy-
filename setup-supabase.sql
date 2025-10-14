-- Ce fichier doit être exécuté dans Supabase Dashboard → SQL Editor
-- Copiez-collez TOUT le contenu et cliquez sur "Run"

-- =====================================================
-- SYSTÈME DE LIMITATION D'APPELS HEBDOMADAIRES
-- =====================================================

-- 1. Table pour stocker les limites d'appels des utilisateurs
CREATE TABLE IF NOT EXISTS user_call_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  calls_remaining INTEGER NOT NULL DEFAULT 2,
  calls_used INTEGER NOT NULL DEFAULT 0,
  last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
  week_start_date DATE NOT NULL DEFAULT date_trunc('week', CURRENT_DATE)::DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 2. Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_user_call_limits_user_id ON user_call_limits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_call_limits_email ON user_call_limits(email);
CREATE INDEX IF NOT EXISTS idx_user_call_limits_week_start ON user_call_limits(week_start_date);

-- 3. Table pour l'historique des appels Cal.com
CREATE TABLE IF NOT EXISTS calcom_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  name TEXT,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled',
  synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Index pour calcom_bookings
CREATE INDEX IF NOT EXISTS idx_calcom_bookings_user_id ON calcom_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_calcom_bookings_email ON calcom_bookings(email);
CREATE INDEX IF NOT EXISTS idx_calcom_bookings_booking_id ON calcom_bookings(booking_id);
CREATE INDEX IF NOT EXISTS idx_calcom_bookings_status ON calcom_bookings(status);

-- 5. Fonction pour initialiser les limites d'appels d'un nouvel utilisateur
CREATE OR REPLACE FUNCTION initialize_user_call_limits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_call_limits (user_id, email, calls_remaining, calls_used, last_reset_date, week_start_date)
  VALUES (
    NEW.id, 
    NEW.email, 
    2, 
    0, 
    CURRENT_DATE,
    date_trunc('week', CURRENT_DATE)::DATE
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Trigger pour créer automatiquement les limites lors de l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created_call_limits ON auth.users;
CREATE TRIGGER on_auth_user_created_call_limits
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_call_limits();

-- 7. Fonction pour décrémenter un appel
CREATE OR REPLACE FUNCTION use_call(p_user_id UUID, p_booking_id TEXT)
RETURNS JSON AS $$
DECLARE
  v_calls_remaining INTEGER;
  v_week_start DATE;
  v_current_week_start DATE;
BEGIN
  v_current_week_start := date_trunc('week', CURRENT_DATE)::DATE;
  
  SELECT calls_remaining, week_start_date
  INTO v_calls_remaining, v_week_start
  FROM user_call_limits
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    INSERT INTO user_call_limits (user_id, email, calls_remaining, calls_used, last_reset_date, week_start_date)
    SELECT p_user_id, email, 2, 0, CURRENT_DATE, v_current_week_start
    FROM auth.users
    WHERE id = p_user_id;
    
    v_calls_remaining := 2;
    v_week_start := v_current_week_start;
  END IF;
  
  IF v_week_start < v_current_week_start THEN
    UPDATE user_call_limits
    SET 
      calls_remaining = 2,
      calls_used = 0,
      last_reset_date = CURRENT_DATE,
      week_start_date = v_current_week_start,
      updated_at = NOW()
    WHERE user_id = p_user_id;
    
    v_calls_remaining := 2;
  END IF;
  
  IF v_calls_remaining <= 0 THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Vous avez atteint votre limite de 2 appels pour cette semaine',
      'calls_remaining', 0
    );
  END IF;
  
  UPDATE user_call_limits
  SET 
    calls_remaining = calls_remaining - 1,
    calls_used = calls_used + 1,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN json_build_object(
    'success', true,
    'message', 'Appel enregistré avec succès',
    'calls_remaining', v_calls_remaining - 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Fonction pour obtenir les limites d'un utilisateur
CREATE OR REPLACE FUNCTION get_user_call_limits(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
  v_week_start DATE;
  v_current_week_start DATE;
BEGIN
  v_current_week_start := date_trunc('week', CURRENT_DATE)::DATE;
  
  SELECT json_build_object(
    'calls_remaining', calls_remaining,
    'calls_used', calls_used,
    'week_start_date', week_start_date,
    'last_reset_date', last_reset_date
  )
  INTO v_result
  FROM user_call_limits
  WHERE user_id = p_user_id;
  
  IF v_result IS NULL THEN
    INSERT INTO user_call_limits (user_id, email, calls_remaining, calls_used, last_reset_date, week_start_date)
    SELECT p_user_id, email, 2, 0, CURRENT_DATE, v_current_week_start
    FROM auth.users
    WHERE id = p_user_id;
    
    v_result := json_build_object(
      'calls_remaining', 2,
      'calls_used', 0,
      'week_start_date', v_current_week_start,
      'last_reset_date', CURRENT_DATE
    );
  ELSE
    SELECT week_start_date INTO v_week_start
    FROM user_call_limits
    WHERE user_id = p_user_id;
    
    IF v_week_start < v_current_week_start THEN
      UPDATE user_call_limits
      SET 
        calls_remaining = 2,
        calls_used = 0,
        last_reset_date = CURRENT_DATE,
        week_start_date = v_current_week_start,
        updated_at = NOW()
      WHERE user_id = p_user_id;
      
      v_result := json_build_object(
        'calls_remaining', 2,
        'calls_used', 0,
        'week_start_date', v_current_week_start,
        'last_reset_date', CURRENT_DATE
      );
    END IF;
  END IF;
  
  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Fonction pour réinitialiser les appels de tous les utilisateurs
CREATE OR REPLACE FUNCTION reset_weekly_call_limits()
RETURNS void AS $$
DECLARE
  v_current_week_start DATE;
BEGIN
  v_current_week_start := date_trunc('week', CURRENT_DATE)::DATE;
  
  UPDATE user_call_limits
  SET 
    calls_remaining = 2,
    calls_used = 0,
    last_reset_date = CURRENT_DATE,
    week_start_date = v_current_week_start,
    updated_at = NOW()
  WHERE week_start_date < v_current_week_start;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Activer Row Level Security (RLS)
ALTER TABLE user_call_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE calcom_bookings ENABLE ROW LEVEL SECURITY;

-- 11. Politiques RLS pour user_call_limits
DROP POLICY IF EXISTS "Users can view their own call limits" ON user_call_limits;
CREATE POLICY "Users can view their own call limits"
  ON user_call_limits FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own call limits" ON user_call_limits;
CREATE POLICY "Users can update their own call limits"
  ON user_call_limits FOR UPDATE
  USING (auth.uid() = user_id);

-- 12. Politiques RLS pour calcom_bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON calcom_bookings;
CREATE POLICY "Users can view their own bookings"
  ON calcom_bookings FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can insert bookings" ON calcom_bookings;
CREATE POLICY "Service role can insert bookings"
  ON calcom_bookings FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update bookings" ON calcom_bookings;
CREATE POLICY "Service role can update bookings"
  ON calcom_bookings FOR UPDATE
  USING (true);

-- ✅ TERMINÉ ! Vous pouvez maintenant tester le système.

