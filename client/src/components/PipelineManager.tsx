import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch, Plus, Settings, Play, Pause, MoreVertical, Users, Target, Zap, Clock } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  leads: number;
  conversions: number;
  conversionRate: number;
  createdAt: Date;
  lastUpdated: Date;
}

const initialPipelines: Pipeline[] = [
  {
    id: '1',
    name: 'Pipeline Formation',
    description: 'Automatisation pour vendre les formations InfoScale',
    status: 'active',
    leads: 1247,
    conversions: 89,
    conversionRate: 7.1,
    createdAt: new Date('2024-01-15'),
    lastUpdated: new Date('2024-05-18')
  },
  {
    id: '2', 
    name: 'Pipeline Coaching',
    description: 'Séquence pour les sessions de coaching 1-to-1',
    status: 'active',
    leads: 534,
    conversions: 67,
    conversionRate: 12.5,
    createdAt: new Date('2024-02-20'),
    lastUpdated: new Date('2024-05-17')
  },
  {
    id: '3',
    name: 'Pipeline Webinaire',
    description: 'Funnel pour les webinaires gratuits',
    status: 'paused',
    leads: 2103,
    conversions: 156,
    conversionRate: 7.4,
    createdAt: new Date('2024-03-10'),
    lastUpdated: new Date('2024-05-10')
  }
];

export function PipelineManager() {
  const [pipelines, setPipelines] = useState<Pipeline[]>(initialPipelines);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPipeline, setNewPipeline] = useState({
    name: '',
    description: ''
  });

  const handleCreatePipeline = () => {
    if (newPipeline.name.trim()) {
      const pipeline: Pipeline = {
        id: Date.now().toString(),
        name: newPipeline.name,
        description: newPipeline.description,
        status: 'draft',
        leads: 0,
        conversions: 0,
        conversionRate: 0,
        createdAt: new Date(),
        lastUpdated: new Date()
      };
      
      setPipelines([...pipelines, pipeline]);
      setNewPipeline({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const togglePipelineStatus = (id: string) => {
    setPipelines(prev => prev.map(pipeline => 
      pipeline.id === id 
        ? { 
            ...pipeline, 
            status: pipeline.status === 'active' ? 'paused' : 'active',
            lastUpdated: new Date()
          }
        : pipeline
    ));
  };

  const getStatusColor = (status: Pipeline['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'draft': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Pipeline['status']) => {
    return status === 'active' ? Play : Pause;
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background avec cadrillage et gradient combinés */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
               radial-gradient(circle at center, rgba(32,108,232,0.3) 0%, transparent 70%)
             `,
             backgroundSize: '70px 80px, 70px 80px, 100% 100%'
           }} 
      />

      <div className="relative z-10 p-6 pt-2 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Gestion des Pipelines
              </h1>
              <p className="text-gray-400">Automatisez vos processus de conversion et optimisez vos ventes</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Créer un Pipeline
            </motion.button>
          </div>
        </motion.div>

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelines.map((pipeline, index) => (
            <motion.div
              key={pipeline.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="led-card p-6 hover:scale-105 transition-transform duration-200"
            >
              {/* Header de la carte */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <GitBranch className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{pipeline.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(pipeline.status)}`}>
                      {pipeline.status === 'active' ? 'Actif' : 
                       pipeline.status === 'paused' ? 'En pause' : 'Brouillon'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePipelineStatus(pipeline.id)}
                    className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    {React.createElement(getStatusIcon(pipeline.status), { 
                      className: "w-4 h-4 text-gray-400" 
                    })}
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-4">{pipeline.description}</p>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-gray-400">Leads</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{pipeline.leads.toLocaleString()}</p>
                </div>

                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-gray-400">Conversions</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{pipeline.conversions}</p>
                </div>
              </div>

              {/* Taux de conversion */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Taux de conversion</span>
                  <span className="text-sm font-medium text-green-400">{pipeline.conversionRate}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(pipeline.conversionRate, 100)}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Mis à jour {pipeline.lastUpdated.toLocaleDateString('fr-FR')}</span>
                </div>
                <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                  <Settings className="w-3 h-3" />
                  <span>Configurer</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal de création */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="led-card p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">Créer un nouveau Pipeline</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nom du Pipeline
                    </label>
                    <input
                      type="text"
                      value={newPipeline.name}
                      onChange={(e) => setNewPipeline({...newPipeline, name: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                      placeholder="Ex: Pipeline Webinaire"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newPipeline.description}
                      onChange={(e) => setNewPipeline({...newPipeline, description: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none text-white h-24 resize-none"
                      placeholder="Décrivez l'objectif de ce pipeline..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-gray-700">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreatePipeline}
                    disabled={!newPipeline.name.trim()}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors text-white"
                  >
                    Créer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



