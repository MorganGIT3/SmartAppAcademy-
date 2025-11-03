// AI Answer Edge Function - SmartApp Academy™
// Cette fonction gère les appels à l'API OpenAI de manière sécurisée

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface RequestBody {
  conversationId?: string
  userMessage: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Récupérer les variables d'environnement
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY non configurée')
    }

    // Vérifier l'authentification
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Non autorisé' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Créer le client Supabase avec le JWT de l'utilisateur
    const supabase = createClient(
      SUPABASE_URL!,
      SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: authHeader } } }
    )

    // Vérifier l'utilisateur
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Utilisateur non authentifié' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer le body de la requête
    const body: RequestBody = await req.json()
    const { conversationId, userMessage } = body

    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Message utilisateur requis' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Récupérer le system prompt actif depuis Supabase
    const { data: systemPromptData, error: promptError } = await supabase
      .from('ai_system_prompts')
      .select('prompt')
      .eq('is_active', true)
      .limit(1)
      .single()

    const systemPrompt = systemPromptData?.prompt || `Tu es "ZeroToApp Assistant", un assistant IA spécialisé dans l'accompagnement des entrepreneurs.

Règles importantes:
- Réponds TOUJOURS en français, de manière claire et concise
- Utilise des puces quand c'est utile pour la lisibilité
- Si une information manque, pose une question courte et précise
- Si tu n'es pas certain de quelque chose, dis "Je ne sais pas" plutôt que d'inventer
- Tu es spécialisé dans: la création d'entreprise, le marketing digital, l'IA appliquée au business, les SaaS, Supabase, et l'automatisation
- INTERDICTIONS: pas de données sensibles, pas d'informations inventées, pas de code non testé pour des opérations critiques
- Si la question sort de ton domaine d'expertise, réponds: "Cette question sort de mon domaine d'expertise."

Ton objectif: Aider les entrepreneurs à réussir leur projet avec ZeroToApp.`

    // Gérer la conversation (créer si nécessaire)
    let convId = conversationId
    if (!convId) {
      // Créer une nouvelle conversation
      const { data: newConv, error: convError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          title: userMessage.slice(0, 60) + (userMessage.length > 60 ? '...' : '')
        })
        .select('id')
        .single()

      if (convError) {
        console.error('Erreur création conversation:', convError)
        throw new Error('Impossible de créer la conversation')
      }

      convId = newConv.id
    }

    // Sauvegarder le message utilisateur
    const { error: userMsgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: convId,
        role: 'user',
        content: userMessage
      })

    if (userMsgError) {
      console.error('Erreur sauvegarde message user:', userMsgError)
      throw new Error('Impossible de sauvegarder le message')
    }

    // Récupérer l'historique des messages de la conversation (pour le contexte)
    const { data: historyMessages, error: historyError } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true })
      .limit(20) // Limiter à 20 messages pour ne pas dépasser les tokens

    // Construire les messages pour OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...(historyMessages || []).map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ]

    // Appeler l'API OpenAI
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('Erreur OpenAI:', errorText)
      throw new Error('Erreur lors de l\'appel à OpenAI')
    }

    const openaiData = await openaiResponse.json()
    const aiAnswer = openaiData.choices?.[0]?.message?.content || 'Désolé, je n\'ai pas pu générer de réponse.'

    // Sauvegarder la réponse de l'assistant
    const { error: assistantMsgError } = await supabase
      .from('messages')
      .insert({
        conversation_id: convId,
        role: 'assistant',
        content: aiAnswer
      })

    if (assistantMsgError) {
      console.error('Erreur sauvegarde message assistant:', assistantMsgError)
      // On continue même si la sauvegarde échoue
    }

    // Retourner la réponse
    return new Response(
      JSON.stringify({
        conversationId: convId,
        answer: aiAnswer,
        success: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Erreur dans ai-answer:', error)
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Erreur interne du serveur',
        success: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})

