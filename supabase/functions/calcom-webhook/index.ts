// Edge Function pour gérer les webhooks Cal.com
// Cette fonction est appelée automatiquement par Cal.com lors d'un booking

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Gérer les requêtes OPTIONS pour CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Créer le client Supabase
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Récupérer les données du webhook
    const webhookData = await req.json()
    console.log('Webhook Cal.com reçu:', JSON.stringify(webhookData, null, 2))

    // Extraire les informations du booking
    const {
      triggerEvent,
      payload
    } = webhookData

    // Vérifier le type d'événement
    if (triggerEvent === 'BOOKING_CREATED') {
      const {
        uid,
        title,
        startTime,
        endTime,
        attendees,
        eventType,
        status
      } = payload

      // Récupérer l'email du premier participant
      const attendeeEmail = attendees?.[0]?.email
      const attendeeName = attendees?.[0]?.name

      if (!attendeeEmail) {
        console.error('Aucun email trouvé dans le booking')
        return new Response(
          JSON.stringify({ error: 'Email manquant' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      console.log(`Booking créé pour: ${attendeeEmail}`)

      // Trouver l'utilisateur correspondant à cet email
      const { data: userData, error: userError } = await supabaseClient
        .from('auth.users')
        .select('id')
        .eq('email', attendeeEmail.toLowerCase())
        .single()

      if (userError || !userData) {
        console.error('Utilisateur non trouvé pour l\'email:', attendeeEmail)
        
        // Enregistrer quand même le booking sans user_id
        await supabaseClient
          .from('calcom_bookings')
          .insert({
            booking_id: uid,
            email: attendeeEmail,
            name: attendeeName,
            booking_date: startTime,
            event_type: eventType?.title || title,
            status: status || 'scheduled'
          })

        return new Response(
          JSON.stringify({ 
            success: true, 
            message: 'Booking enregistré mais utilisateur non trouvé',
            warning: 'L\'email ne correspond à aucun compte SmartApp Academy'
          }),
          { 
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }

      const userId = userData.id

      // Enregistrer le booking dans la base de données
      const { error: insertError } = await supabaseClient
        .from('calcom_bookings')
        .insert({
          user_id: userId,
          booking_id: uid,
          email: attendeeEmail,
          name: attendeeName,
          booking_date: startTime,
          event_type: eventType?.title || title,
          status: status || 'scheduled'
        })

      if (insertError) {
        console.error('Erreur lors de l\'insertion du booking:', insertError)
        
        // Si c'est une erreur de duplication, c'est OK
        if (insertError.code === '23505') {
          console.log('Booking déjà enregistré')
          return new Response(
            JSON.stringify({ success: true, message: 'Booking déjà enregistré' }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

        throw insertError
      }

      // Décrémenter le nombre d'appels disponibles
      const { data: callResult, error: callError } = await supabaseClient
        .rpc('use_call', {
          p_user_id: userId,
          p_booking_id: uid
        })

      if (callError) {
        console.error('Erreur lors de la décrémentation des appels:', callError)
      } else {
        console.log('Résultat décrémentation:', callResult)
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Booking enregistré avec succès',
          callsRemaining: callResult?.calls_remaining
        }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Gérer les annulations
    if (triggerEvent === 'BOOKING_CANCELLED') {
      const { uid } = payload

      // Mettre à jour le statut du booking
      await supabaseClient
        .from('calcom_bookings')
        .update({ status: 'cancelled' })
        .eq('booking_id', uid)

      // Note: On ne recrédite pas l'appel en cas d'annulation
      // Vous pouvez modifier ce comportement si nécessaire

      return new Response(
        JSON.stringify({ success: true, message: 'Booking annulé' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Gérer les reprogrammations
    if (triggerEvent === 'BOOKING_RESCHEDULED') {
      const { uid, startTime } = payload

      await supabaseClient
        .from('calcom_bookings')
        .update({ 
          booking_date: startTime,
          status: 'rescheduled'
        })
        .eq('booking_id', uid)

      return new Response(
        JSON.stringify({ success: true, message: 'Booking reprogrammé' }),
        { 
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Événement non géré
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Événement ${triggerEvent} reçu mais non géré` 
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Erreur dans le webhook:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

