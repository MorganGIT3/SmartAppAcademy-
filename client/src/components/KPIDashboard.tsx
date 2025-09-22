import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  MessageCircle, 
  TrendingUp, 
  AlertTriangle,
  Instagram,
  Facebook,
  Music,
  Youtube,
  Users,
  Heart,
  Share2,
  Play,
  DollarSign,
  BarChart3,
  Target
} from 'lucide-react';

// Types pour les données KPI
interface GlobalKPIs {
  totalViews: number;
  totalConversations: number;
  positiveInsight: string;
  alertInsight: string;
}

interface PlatformKPI {
  name: string;
  icon: React.ReactNode;
  color: string;
  totalInteractions: number;
  metrics: Record<string, number | string>;
  isExpanded: boolean;
}

export function KPIDashboard() {
  const [globalKPIs, setGlobalKPIs] = useState<GlobalKPIs>({
    totalViews: 2105033,
    totalConversations: 445,
    positiveInsight: "TikTok en feu ! +2.8K abonnés cette semaine, continue comme ça 🚀",
    alertInsight: "Ton taux d'ouverture email chute à 10%, il faut retravailler tes objets 🚨"
  });

  const [platforms, setPlatforms] = useState<PlatformKPI[]>([
    {
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      color: "from-pink-500 to-purple-500",
      totalInteractions: 0,
      isExpanded: false,
      metrics: {
        reelViews: 245680,
        reelLikes: 12450,
        reelShares: 1890,
        reelComments: 856,
        storyViews: 89560,
        storyClicks: 2340,
        storyReplies: 145,
        dmReceived: 289,
        dmResponseRate: 87,
        followersGained: 1250,
        followersLost: 89,
        totalReach: 456780
      }
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      color: "from-blue-600 to-blue-800",
      totalInteractions: 0,
      isExpanded: false,
      metrics: {
        videoViews: 156780,
        storyViews: 45620,
        storyClicks: 890,
        messengerConversations: 156,
        pageLikes: 890,
        engagementRate: 4.2
      }
    },
    {
      name: "TikTok",
      icon: <Music className="w-6 h-6" />,
      color: "from-pink-400 to-red-500",
      totalInteractions: 0,
      isExpanded: false,
      metrics: {
        videoViews: 1245680,
        videoShares: 8950,
        videoLikes: 45680,
        videoComments: 2340,
        followersGained: 2890,
        completionRate: 78.5
      }
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-6 h-6" />,
      color: "from-red-500 to-red-700",
      totalInteractions: 0,
      isExpanded: false,
      metrics: {
        totalViews: 456780,
        shortsViews: 234560,
        shortsSubscribers: 450,
        longFormViews: 222220,
        averageWatchTime: "4:32",
        ctr: 8.9,
        estimatedRevenue: 1250
      }
    }
  ]);

  // Calcul des interactions par plateforme (une seule fois)
  useEffect(() => {
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      totalInteractions: Object.values(platform.metrics)
        .filter(val => typeof val === 'number')
        .reduce((sum, val) => sum + (val as number), 0)
    })));
  }, []);


  const togglePlatform = (index: number) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === index ? { ...platform, isExpanded: !platform.isExpanded } : platform
    ));
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
        {/* Header avec totaux globaux */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Tableau de Bord KPI InfoScale
          </h1>
          
          {/* Totaux globaux */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="led-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-blue-500/20">
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Vues Globales</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {globalKPIs.totalViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="led-card p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-green-500/20">
                  <MessageCircle className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Conversations Totales</p>
                  <p className="text-3xl font-bold text-green-400">
                    {globalKPIs.totalConversations.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mini Dashboards */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Dashboard Vues par mois */}
            <div className="led-card p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">Évolution des Vues</h3>
                <p className="text-gray-400 text-sm">Progression mensuelle</p>
              </div>
              <div className="relative h-24">
                {/* Graphique en barres simplifié */}
                <div className="flex items-end justify-between h-full gap-2">
                  {[1.2, 1.8, 1.5, 2.1, 2.8, 3.2, 2.9, 3.8, 4.2, 3.9, 4.8, 5.2].map((value, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm transition-all duration-500 hover:from-blue-500 hover:to-blue-300"
                        style={{ height: `${value * 16}px` }}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Indicateur de croissance */}
                <div className="absolute top-0 right-0 flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+24%</span>
                </div>
              </div>
            </div>

            {/* Dashboard Conversations par mois */}
            <div className="led-card p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-1">Évolution des Conversations</h3>
                <p className="text-gray-400 text-sm">Messages reçus par mois</p>
              </div>
              <div className="relative h-24">
                {/* Graphique en ligne simplifié */}
                <svg className="w-full h-full" viewBox="0 0 300 80">
                  <defs>
                    <linearGradient id="conversationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Zone sous la courbe */}
                  <path
                    d="M 0,60 L 25,45 L 50,50 L 75,35 L 100,30 L 125,25 L 150,28 L 175,20 L 200,15 L 225,18 L 250,10 L 275,8 L 300,12 L 300,80 L 0,80 Z"
                    fill="url(#conversationGradient)"
                  />
                  
                  {/* Ligne principale */}
                  <path
                    d="M 0,60 L 25,45 L 50,50 L 75,35 L 100,30 L 125,25 L 150,28 L 175,20 L 200,15 L 225,18 L 250,10 L 275,8 L 300,12"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Points sur la courbe */}
                  {[
                    [0, 60], [25, 45], [50, 50], [75, 35], [100, 30], [125, 25],
                    [150, 28], [175, 20], [200, 15], [225, 18], [250, 10], [275, 8], [300, 12]
                  ].map(([x, y], index) => (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="#10b981"
                      className="drop-shadow-sm"
                    />
                  ))}
                </svg>
                
                {/* Mois en bas */}
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'].map((month, index) => (
                    <span key={index} className={index % 2 === 0 ? 'opacity-100' : 'opacity-0'}>
                      {month}
                    </span>
                  ))}
                </div>
                
                {/* Indicateur de croissance */}
                <div className="absolute top-0 right-0 flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded text-xs">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">+18%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights IA */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="led-card p-6 border-green-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <TrendingUp className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="text-green-400 font-semibold mb-2">🎉 Point Fort du Jour</h3>
                  <p className="text-gray-300">{globalKPIs.positiveInsight}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="led-card p-6 border-orange-500/30"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-orange-400 mt-1" />
                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">🚨 À Améliorer</h3>
                  <p className="text-gray-300">{globalKPIs.alertInsight}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sections par plateforme */}
        <div className="space-y-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="led-card overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors"
                onClick={() => togglePlatform(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${platform.color} bg-opacity-20`}>
                      {platform.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                      <p className="text-gray-400">
                        {platform.totalInteractions.toLocaleString()} interactions ce mois
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: platform.isExpanded ? 180 : 0 }}
                    className="text-blue-400"
                  >
                    ▼
                  </motion.div>
                </div>
              </div>

              {platform.isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-700/50"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(platform.metrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-800/30 p-4 rounded-lg">
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-lg font-semibold text-white">
                            {typeof value === 'number' 
                              ? key.includes('Rate') || key.includes('ctr') 
                                ? `${value}%`
                                : key.includes('Revenue')
                                ? `$${value.toLocaleString()}`
                                : value.toLocaleString()
                              : value
                            }
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .led-card {
          background: #1b1b1b;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 0 15px rgba(59, 130, 246, 0.4),
            0 0 30px rgba(96, 165, 250, 0.2),
            0 0 45px rgba(59, 130, 246, 0.2);
          position: relative;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .led-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(96, 165, 250, 0.4),
            0 0 60px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
