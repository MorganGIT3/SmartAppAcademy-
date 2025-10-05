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
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: Deno.env.get('YOUTUBE_CLIENT_ID') || '',
        client_secret: Deno.env.get('YOUTUBE_CLIENT_SECRET') || '',
        redirect_uri: Deno.env.get('YOUTUBE_REDIRECT_URI') || '',
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Erreur lors de l'échange du code: ${tokenResponse.statusText}`);
    }

    const tokenJson = await tokenResponse.json();

    // tokenJson contient access_token, refresh_token, expires_in
    const { access_token, refresh_token, expires_in } = tokenJson;

    // calcule l'expiration
    const expiresAt = new Date(Date.now() + expires_in * 1000).toISOString();

    // récupère userId depuis state
    const stateData = JSON.parse(state || "{}");
    const userId = stateData.userId;

    // Récupère les informations du canal YouTube
    const channelResponse = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    let channelInfo = null;
    if (channelResponse.ok) {
      const channelData = await channelResponse.json();
      if (channelData.items && channelData.items.length > 0) {
        channelInfo = {
          channel_id: channelData.items[0].id,
          channel_title: channelData.items[0].snippet.title,
          channel_description: channelData.items[0].snippet.description,
          channel_thumbnail: channelData.items[0].snippet.thumbnails?.default?.url,
        };
      }
    }

    // Initialise Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // enregistre dans Supabase
    await supabase.from("profiles").upsert({
      id: userId,
      youtube_access_token: access_token,
      youtube_refresh_token: refresh_token,
      youtube_token_expires_at: expiresAt,
      youtube_channel_id: channelInfo?.channel_id || null,
      youtube_channel_title: channelInfo?.channel_title || null,
      youtube_channel_description: channelInfo?.channel_description || null,
      youtube_channel_thumbnail: channelInfo?.channel_thumbnail || null,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Token YouTube enregistré avec succès',
        userId: userId,
        channel: channelInfo
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Erreur dans youtube-oauth-callback:', error);
    
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

