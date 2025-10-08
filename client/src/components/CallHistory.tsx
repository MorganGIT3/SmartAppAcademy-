"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, MessageSquare, Eye, Plus, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CallDetails as CallDetailsType,
  CallNote,
  getUserCalls,
  getCallNotes
} from "@/lib/supabase"

interface CallWithNotes extends CallDetailsType {
  notes: CallNote[]
  notesCount: number
}

export function CallHistory() {
  const [calls, setCalls] = useState<CallWithNotes[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCall, setSelectedCall] = useState<CallWithNotes | null>(null)
  const [showCallDetails, setShowCallDetails] = useState(false)

  // Charger l'historique des appels
  useEffect(() => {
    const loadCallHistory = async () => {
      setIsLoading(true)
      try {
        const userCalls = await getUserCalls()
        
        // Charger les notes pour chaque appel
        const callsWithNotes = await Promise.all(
          userCalls.map(async (call) => {
            const notes = await getCallNotes(call.id)
            return {
              ...call,
              notes,
              notesCount: notes.length
            }
          })
        )
        
        setCalls(callsWithNotes)
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCallHistory()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-400" />
      case 'scheduled': return <AlertCircle className="h-4 w-4 text-blue-400" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé'
      case 'cancelled': return 'Annulé'
      case 'scheduled': return 'Programmé'
      default: return 'Inconnu'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleViewCall = (call: CallWithNotes) => {
    setSelectedCall(call)
    setShowCallDetails(true)
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-gray-400">Chargement de l'historique des appels...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Titre de la section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Historique de vos appels
        </h2>
        <p className="text-gray-300 text-lg">
          Retrouvez tous vos appels passés et à venir
        </p>
      </motion.div>

      {/* Liste des appels */}
      {calls.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-12"
        >
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Aucun appel enregistré
          </h3>
          <p className="text-gray-400">
            Vos appels apparaîtront ici une fois que vous aurez réservé votre premier appel.
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {calls.map((call, index) => (
            <motion.div
              key={call.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        {getStatusIcon(call.status)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            {call.call_type}
                          </h3>
                          <Badge className={`${getStatusColor(call.status)} border-0`}>
                            {getStatusText(call.status)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(call.call_date)}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="h-4 w-4" />
                            <span>{call.call_time}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-gray-300">
                            <MessageSquare className="h-4 w-4" />
                            <span>{call.notesCount} note{call.notesCount > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleViewCall(call)}
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                  
                  {/* Aperçu des notes */}
                  {call.notes.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-gray-400 mb-2">Dernières notes :</p>
                      <div className="space-y-2">
                        {call.notes.slice(0, 2).map((note) => (
                          <div key={note.id} className="text-sm text-gray-300 bg-white/5 rounded-lg p-3">
                            {note.content.length > 100 
                              ? `${note.content.substring(0, 100)}...` 
                              : note.content
                            }
                          </div>
                        ))}
                        {call.notes.length > 2 && (
                          <p className="text-xs text-gray-500">
                            +{call.notes.length - 2} autre{call.notes.length - 2 > 1 ? 's' : ''} note{call.notes.length - 2 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal des détails de l'appel */}
      {showCallDetails && selectedCall && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowCallDetails(false)} />
          <div className="relative z-10 bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">
                Détails de l'appel
              </h3>
              <Button
                onClick={() => setShowCallDetails(false)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                <XCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Informations de l'appel */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white font-semibold">{formatDate(selectedCall.call_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Heure</p>
                  <p className="text-white font-semibold">{selectedCall.call_time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Durée</p>
                  <p className="text-white font-semibold">{selectedCall.call_duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Statut</p>
                  <Badge className={`${getStatusColor(selectedCall.status)} border-0`}>
                    {getStatusText(selectedCall.status)}
                  </Badge>
                </div>
              </div>
              
              {/* Notes de l'appel */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Notes ({selectedCall.notesCount})
                </h4>
                
                {selectedCall.notes.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Aucune note pour cet appel
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedCall.notes.map((note) => (
                      <div key={note.id} className="bg-white/5 rounded-lg p-4">
                        <p className="text-white text-sm">{note.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(note.created_at).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}