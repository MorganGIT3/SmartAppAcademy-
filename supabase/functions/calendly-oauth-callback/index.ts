import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Récupère le code d'autorisation depuis l'URL
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Code d\'autorisation manquant' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Échange le code contre un token d'accès
    const tokenResponse = await fetch('https://auth.calendly.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Deno.env.get('CALENDLY_CLIENT_ID') || '',
        client_secret: Deno.env.get('CALENDLY_CLIENT_SECRET') || '',
        redirect_uri: Deno.env.get('CALENDLY_REDIRECT_URI') || '',
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Erreur lors de l'échange du code: ${tokenResponse.statusText}`);
    }

    const tokenJson = await tokenResponse.json();

    // tokenJson contient access_token, refresh_token, expires_in
    const { access_token, refresh_token, expires_in, owner } = tokenJson;

    // calcule l'expiration
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    // récupère userId depuis state
    const stateData = JSON.parse(state || "{}");
    const userId = stateData.userId;

    // Initialise Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // enregistre dans Supabase
    await supabase.from("profiles").upsert({
      id: userId,
      calendly_access_token: access_token,
      calendly_refresh_token: refresh_token,
      calendly_token_expires_at: expiresAt,
      calendly_user_uri: owner?.uri || null
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Token Calendly enregistré avec succès',
        userId: userId
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erreur dans calendly-oauth-callback:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erreur interne du serveur',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
