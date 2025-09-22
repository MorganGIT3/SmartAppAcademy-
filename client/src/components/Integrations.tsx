import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

export function Integrations() {
  const integrations = [
    {
      name: "Calendly",
      description: "Synchronisez vos rendez-vous et automatisez la planification",
      icon: Calendar,
      status: "connected",
      color: "bg-blue-500"
    },
    {
      name: "Facebook Ads",
      description: "Gérez vos campagnes publicitaires Facebook",
      icon: BarChart3,
      status: "connected",
      color: "bg-blue-600"
    },
    {
      name: "TikTok Ads",
      description: "Optimisez vos campagnes TikTok",
      icon: BarChart3,
      status: "pending",
      color: "bg-pink-500"
    },
    {
      name: "YouTube Ads",
      description: "Créez des campagnes YouTube efficaces",
      icon: BarChart3,
      status: "pending",
      color: "bg-red-500"
    },
    {
      name: "WhatsApp Business",
      description: "Automatisez vos conversations clients",
      icon: MessageSquare,
      status: "pending",
      color: "bg-green-500"
    },
    {
      name: "Google Analytics",
      description: "Analysez les performances de votre site",
      icon: BarChart3,
      status: "pending",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background avec cadrillage et gradient bleu */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `
               linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px),
               linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)
             `,
             backgroundSize: '50px 50px, 50px 50px, 100% 100%'
           }}
      />
      
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Intégrations</h1>
          <p className="text-gray-300 text-lg">Connectez vos outils préférés pour automatiser votre workflow</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg shadow-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Connectées</p>
                  <p className="text-2xl font-bold text-green-400">2</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg shadow-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">En attente</p>
                  <p className="text-2xl font-bold text-yellow-400">4</p>
                </div>
                <Settings className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg shadow-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-blue-400">6</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index} className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${integration.color} bg-opacity-20`}>
                    <integration.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    integration.status === 'connected' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {integration.status === 'connected' ? 'Connecté' : 'En attente'}
                  </div>
                </div>
                <CardTitle className="text-white text-lg">{integration.name}</CardTitle>
                <p className="text-gray-400 text-sm">{integration.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className={`w-full ${
                    integration.status === 'connected' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {integration.status === 'connected' ? 'Configurer' : 'Connecter'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
