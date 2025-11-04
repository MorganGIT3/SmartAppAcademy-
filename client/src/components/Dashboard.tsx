import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { Particles } from './InteractiveDashboard';

const dashboardCards = [
  {
    id: 1,
    title: 'Rejoins la communauté',
    buttonText: 'Accéder',
    gradient: 'from-purple-600 to-purple-400',
    logo: 'ACA',
    description: 'Connecte-toi avec d\'autres entrepreneurs'
  },
  {
    id: 2,
    title: 'MarketingOS',
    buttonText: 'Regarder maintenant',
    gradient: 'from-gray-900 to-gray-800',
    logo: 'MarketingOS',
    description: 'Formation marketing avancée',
    hasImage: true
  },
  {
    id: 3,
    title: 'PartnerAI',
    buttonText: 'Remplir le formulaire',
    gradient: 'from-orange-600 to-orange-500',
    logo: 'PartnerAI',
    description: 'Intelligence artificielle partenaire',
    hasImage: true
  }
];

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black flex relative">
      {/* Particles Background supprimé */}
      
      {/* Main Content */}
      <div className="flex-1 p-0">
          {/* Header */}
          <div className="p-8 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <h1 className="text-4xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-2">
                Dashboard
              </h1>
              <motion.div 
                className="h-px bg-gradient-to-r from-transparent via-[#a78bfa]/40 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>
            <p className="text-white/60">Bienvenue dans votre espace ZeroToApp</p>
          </div>

          {/* Hero Section */}
          <div className="relative mb-8 mx-8 rounded-2xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500 via-[#a78bfa] to-purple-400 p-8 rounded-2xl relative"
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-[#a78bfa]/30 to-purple-400/30"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#a78bfa]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-300/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <span className="text-2xl font-bold text-white">ACA</span>
                    </div>
              <div>
                      <h2 className="text-3xl font-bold text-white">AGENCE À CROISSANCE ACCÉLÉRÉE</h2>
                      <p className="text-purple-200 mt-2">Transformez votre entreprise avec l'IA</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
                  >
                    Accéder à la formation
                  </motion.button>
                </div>
                
                {/* Hero Image Placeholder */}
                <div className="hidden lg:block">
                  <div className="w-64 h-80 bg-gradient-to-br from-purple-400/30 via-[#a78bfa]/30 to-purple-300/30 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="w-48 h-64 bg-gradient-to-br from-purple-400/40 via-[#a78bfa]/40 to-purple-500/40 rounded-xl flex items-center justify-center">
                      <Users className="w-24 h-24 text-white/60" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
      </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
            {dashboardCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-gradient-to-br ${card.gradient} p-6 rounded-2xl relative overflow-hidden group cursor-pointer`}
              >
                  {/* Background Pattern for MarketingOS */}
                  {card.logo === 'MarketingOS' && (
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-4 left-4 w-8 h-8 border-2 border-red-500 rounded"></div>
                      <div className="absolute top-8 left-8 w-6 h-6 border-2 border-orange-500 rounded"></div>
                      <div className="absolute top-12 left-12 w-4 h-4 border-2 border-yellow-500 rounded"></div>
                      <div className="absolute top-16 left-16 w-2 h-2 border-2 border-red-500 rounded"></div>
            </div>
                  )}
                  
                  {/* Background Effects for PartnerAI */}
                  {card.logo === 'PartnerAI' && (
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-4 right-4 w-3 h-3 bg-[#a78bfa] rounded-full"></div>
                      <div className="absolute top-8 right-8 w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="absolute top-12 right-12 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                        <span className="text-lg font-bold text-white">{card.logo}</span>
            </div>
                      <h3 className="text-xl font-bold text-white">{card.title}</h3>
      </div>

                    <p className="text-white/80 mb-6 text-sm">{card.description}</p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                        card.logo === 'PartnerAI' 
                          ? 'bg-orange-500 text-white hover:bg-orange-600' 
                          : 'bg-white text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {card.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
}