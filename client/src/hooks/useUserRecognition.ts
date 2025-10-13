import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserRecognitionState {
  isRecognized: boolean;
  userEmail: string | null;
  userFirstName: string | null;
  isLoading: boolean;
}

export function useUserRecognition() {
  const [isRecognized, setIsRecognized] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userFirstName, setUserFirstName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserRecognition();
  }, []);

  const checkUserRecognition = async () => {
    try {
      setIsLoading(true);

      // 1. Vérifier si l'utilisateur est déjà connecté dans Supabase
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (session?.user && !error) {
        console.log('✅ Utilisateur déjà connecté détecté:', session.user.email);
        setIsRecognized(true);
        setUserEmail(session.user.email || null);
        
        // Récupérer le prénom depuis user_metadata ou user_profiles
        const firstName = await getUserFirstName(session.user.id, session.user.email || '');
        setUserFirstName(firstName);
        
        setIsLoading(false);
        return;
      }

      // 2. Vérifier le localStorage pour les utilisateurs précédemment connectés
      const storedUserEmail = localStorage.getItem('smartapp_user_email');
      const lastLoginDate = localStorage.getItem('smartapp_last_login');
      
      if (storedUserEmail && lastLoginDate) {
        const lastLogin = new Date(lastLoginDate);
        const now = new Date();
        const daysSinceLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24);
        
        // Considérer l'utilisateur comme "reconnu" s'il s'est connecté dans les 30 derniers jours
        if (daysSinceLogin <= 30) {
          console.log('✅ Utilisateur reconnu depuis localStorage:', storedUserEmail);
          setIsRecognized(true);
          setUserEmail(storedUserEmail);
          
          // Récupérer le prénom depuis Supabase
          const firstName = await getUserFirstNameFromEmail(storedUserEmail);
          setUserFirstName(firstName);
          
          setIsLoading(false);
          return;
        } else {
          // Nettoyer les anciennes données
          localStorage.removeItem('smartapp_user_email');
          localStorage.removeItem('smartapp_last_login');
        }
      }

      // 3. Vérifier les cookies de navigateur (fallback)
      const cookieEmail = document.cookie
        .split('; ')
        .find(row => row.startsWith('smartapp_user_email='))
        ?.split('=')[1];
      
      if (cookieEmail) {
        console.log('✅ Utilisateur reconnu depuis cookies:', cookieEmail);
        setIsRecognized(true);
        setUserEmail(decodeURIComponent(cookieEmail));
        
        // Récupérer le prénom depuis Supabase
        const firstName = await getUserFirstNameFromEmail(decodeURIComponent(cookieEmail));
        setUserFirstName(firstName);
        
        setIsLoading(false);
        return;
      }

      // Aucun utilisateur reconnu
      console.log('ℹ️ Aucun utilisateur reconnu');
      setIsRecognized(false);
      setUserEmail(null);
      setUserFirstName(null);
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de reconnaissance:', error);
      setIsRecognized(false);
      setUserEmail(null);
      setUserFirstName(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour récupérer le prénom depuis user_metadata ou user_profiles
  const getUserFirstName = async (userId: string, email: string): Promise<string | null> => {
    try {
      // Essayer d'abord user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('user_id', userId)
        .single();

      if (profile?.full_name) {
        const firstName = profile.full_name.split(' ')[0];
        // Capitaliser la première lettre
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      }

      // Fallback: extraire le prénom de l'email
      const emailFirstName = email.split('@')[0].split('.')[0];
      return emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1).toLowerCase();
    } catch (error) {
      console.log('Erreur récupération prénom:', error);
      const emailFirstName = email.split('@')[0].split('.')[0];
      return emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1).toLowerCase();
    }
  };

  // Fonction pour récupérer le prénom depuis l'email
  const getUserFirstNameFromEmail = async (email: string): Promise<string | null> => {
    try {
      // Essayer de récupérer depuis user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('full_name')
        .eq('email', email)
        .single();

      if (profile?.full_name) {
        const firstName = profile.full_name.split(' ')[0];
        // Capitaliser la première lettre
        return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      }

      // Fallback: extraire le prénom de l'email
      const emailFirstName = email.split('@')[0].split('.')[0];
      return emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1).toLowerCase();
    } catch (error) {
      console.log('Erreur récupération prénom depuis email:', error);
      const emailFirstName = email.split('@')[0].split('.')[0];
      return emailFirstName.charAt(0).toUpperCase() + emailFirstName.slice(1).toLowerCase();
    }
  };

  // Fonction pour marquer un utilisateur comme connecté
  const markUserAsLoggedIn = (email: string) => {
    try {
      localStorage.setItem('smartapp_user_email', email);
      localStorage.setItem('smartapp_last_login', new Date().toISOString());
      
      // Cookie de fallback (expire dans 30 jours)
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 30);
      document.cookie = `smartapp_user_email=${encodeURIComponent(email)}; expires=${expireDate.toUTCString()}; path=/`;
      
      console.log('✅ Utilisateur marqué comme connecté:', email);
    } catch (error) {
      console.error('❌ Erreur lors du marquage utilisateur:', error);
    }
  };

  // Fonction pour nettoyer les données utilisateur
  const clearUserData = () => {
    try {
      localStorage.removeItem('smartapp_user_email');
      localStorage.removeItem('smartapp_last_login');
      document.cookie = 'smartapp_user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      console.log('✅ Données utilisateur nettoyées');
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage:', error);
    }
  };

  return {
    isRecognized,
    userEmail,
    userFirstName,
    isLoading,
    markUserAsLoggedIn,
    clearUserData
  };
}
