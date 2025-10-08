"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, User, MessageSquare, Plus, Save, Edit3, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  CallNote, 
  CallDetails as CallDetailsType,
  getCallNotes, 
  createCallNote, 
  updateCallNote, 
  deleteCallNote,
  upsertCallDetails
} from "@/lib/supabase"

interface CallDetailsProps {
  callId?: string
  callDate?: string
  callTime?: string
  callDuration?: string
  callType?: string
  status?: 'scheduled' | 'completed' | 'cancelled'
  onNotesChange?: (notes: CallNote[]) => void
}

export function CallDetails({ 
  callId,
  callDate = "15 Janvier 2025",
  callTime = "14:00",
  callDuration = "1 heure",
  callType = "Session d'accompagnement",
  status = 'scheduled',
  onNotesChange
}: CallDetailsProps) {
  const [notes, setNotes] = useState<CallNote[]>([])
  const [newNote, setNewNote] = useState("")
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Charger les notes existantes depuis Supabase
  useEffect(() => {
    const loadNotes = async () => {
      if (!callId) return
      
      setIsLoading(true)
      try {
        const callNotes = await getCallNotes(callId)
        setNotes(callNotes)
        onNotesChange?.(callNotes)
      } catch (error) {
        console.error('Erreur lors du chargement des notes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNotes()
  }, [callId, onNotesChange])

  // Sauvegarder les détails de l'appel dans Supabase
  useEffect(() => {
    const saveCallDetails = async () => {
      if (!callId) return
      
      try {
        await upsertCallDetails({
          id: callId,
          call_date: callDate,
          call_time: callTime,
          call_duration: callDuration,
          call_type: callType,
          status: status
        })
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des détails:', error)
      }
    }

    saveCallDetails()
  }, [callId, callDate, callTime, callDuration, callType, status])

  const handleAddNote = async () => {
    if (!newNote.trim() || !callId) return
    
    setIsLoading(true)
    try {
      const newNoteData = await createCallNote(callId, newNote.trim())
      if (newNoteData) {
        const updatedNotes = [...notes, newNoteData]
        setNotes(updatedNotes)
        setNewNote("")
        setIsAddingNote(false)
        onNotesChange?.(updatedNotes)
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditNote = async (noteId: string, newContent: string) => {
    if (!newContent.trim()) return
    
    setIsLoading(true)
    try {
      const updatedNote = await updateCallNote(noteId, newContent.trim())
      if (updatedNote) {
        const updatedNotes = notes.map(note => 
          note.id === noteId ? updatedNote : note
        )
        setNotes(updatedNotes)
        setEditingNoteId(null)
        onNotesChange?.(updatedNotes)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteNote = async (noteId: string) => {
    setIsLoading(true)
    try {
      const success = await deleteCallNote(noteId)
      if (success) {
        const updatedNotes = notes.filter(note => note.id !== noteId)
        setNotes(updatedNotes)
        onNotesChange?.(updatedNotes)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la note:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programmé'
      case 'completed': return 'Terminé'
      case 'cancelled': return 'Annulé'
      default: return 'Inconnu'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Détails de l'appel */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Détails de votre appel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Date</p>
                <p className="font-semibold text-white">{callDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Heure</p>
                <p className="font-semibold text-white">{callTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Type</p>
                <p className="font-semibold text-white">{callType}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Durée</p>
                <p className="font-semibold text-white">{callDuration}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Badge className={`${getStatusColor(status)} border-0`}>
              {getStatusText(status)}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Section des notes */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Notes de l'appel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Liste des notes existantes */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Chargement des notes...</p>
            </div>
          ) : notes.length > 0 ? (
            <div className="space-y-3">
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-4 border border-white/10"
                >
                  {editingNoteId === note.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={note.content}
                        onChange={(e) => {
                          const updatedNotes = notes.map(n => 
                            n.id === note.id ? { ...n, content: e.target.value } : n
                          )
                          setNotes(updatedNotes)
                        }}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleEditNote(note.id, note.content)}
                          disabled={isLoading}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingNoteId(null)}
                          disabled={isLoading}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          Annuler
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <p className="text-white text-sm flex-1">{note.content}</p>
                      <div className="flex gap-1 ml-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingNoteId(note.id)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-8 w-8"
                        >
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteNote(note.id)}
                          disabled={isLoading}
                          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 p-1 h-8 w-8"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(note.created_at).toLocaleString('fr-FR')}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">Aucune note pour le moment</p>
              <p className="text-sm text-gray-500">Ajoutez vos premières notes ci-dessous</p>
            </div>
          )}

          {/* Formulaire d'ajout de note */}
          {isAddingNote ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Ajoutez une note pour cet appel..."
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                rows={3}
              />
              <div className="flex gap-2">
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-1" />
                {isLoading ? 'Ajout...' : 'Ajouter la note'}
              </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingNote(false)
                    setNewNote("")
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Annuler
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              onClick={() => setIsAddingNote(true)}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une note
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
