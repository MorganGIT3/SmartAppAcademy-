import React, { useState, useEffect } from 'react';
import { getActiveSystemPrompt, updateSystemPrompt, type AISystemPrompt } from '../lib/supabase';
import { Save, RefreshCw, Check, AlertCircle } from 'lucide-react';

export function AIPromptManager() {
  const [prompt, setPrompt] = useState<AISystemPrompt | null>(null);
  const [editedPrompt, setEditedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadPrompt();
  }, []);

  const loadPrompt = async () => {
    setIsLoading(true);
    try {
      const data = await getActiveSystemPrompt();
      if (data) {
        setPrompt(data);
        setEditedPrompt(data.prompt);
      }
    } catch (error) {
      console.error('Erreur lors du chargement du prompt:', error);
      setMessage({ type: 'error', text: 'Erreur lors du chargement du prompt' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const success = await updateSystemPrompt(prompt.id, editedPrompt);
      if (success) {
        setMessage({ type: 'success', text: 'Prompt système mis à jour avec succès !' });
        setHasChanges(false);
        // Recharger le prompt pour obtenir les données à jour
        await loadPrompt();
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde du prompt' });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde du prompt' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (prompt) {
      setEditedPrompt(prompt.prompt);
      setHasChanges(false);
      setMessage(null);
    }
  };

  const handleChange = (value: string) => {
    setEditedPrompt(value);
    setHasChanges(value !== prompt?.prompt);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">
            Gestion du Prompt Système IA
          </h3>
          <p className="text-gray-400 text-sm">
            Personnalisez le comportement de votre assistant IA en modifiant le prompt système.
          </p>
        </div>
      </div>

      {/* Message de feedback */}
      {message && (
        <div
          className={`flex items-center gap-2 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.type === 'success' ? (
            <Check className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm">{message.text}</span>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-300">
            <p className="font-semibold mb-1">Conseils pour un bon prompt :</p>
            <ul className="list-disc list-inside space-y-1 text-blue-200/80">
              <li>Définissez clairement le rôle de l'IA</li>
              <li>Spécifiez les règles et limitations</li>
              <li>Indiquez le ton et le style de réponse souhaité</li>
              <li>Listez les domaines d'expertise</li>
              <li>Ajoutez des instructions sur la sécurité</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Éditeur de prompt */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300">
          Prompt Système ({editedPrompt.length} caractères)
        </label>
        <textarea
          value={editedPrompt}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full h-96 px-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-sm resize-none"
          placeholder="Entrez le prompt système pour l'IA..."
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <button
          onClick={handleReset}
          disabled={!hasChanges || isSaving}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className="w-4 h-4" />
          Réinitialiser
        </button>

        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Enregistrer les modifications
            </>
          )}
        </button>
      </div>

      {/* Métadonnées */}
      {prompt && (
        <div className="pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Nom du prompt :</span>
              <span className="ml-2 text-white font-medium">{prompt.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Dernière mise à jour :</span>
              <span className="ml-2 text-white font-medium">
                {new Date(prompt.updated_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

