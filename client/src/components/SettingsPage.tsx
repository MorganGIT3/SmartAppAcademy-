import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ConnectCalendlyButton from './ConnectCalendlyButton';
import ConnectYouTubeButton from './ConnectYouTubeButton';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Zap,
  Check,
  X,
  ExternalLink,
  Calendar,
  CalendarDays,
  Mail,
  MessageSquare,
  Video,
  BarChart3,
  DollarSign,
  Globe,
  Camera,
  Music
} from 'lucide-react';

// Calendly Logo Component - Using the exact logo image provided
const CalendlyLogo = ({ className }: { className?: string }) => (
  <img 
    src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmx1ZUdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzQyODVGNDtzdG9wLW9wYWNpdHk6MSIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMTU2NUMwO3N0b3Atb3BhY2l0eToxIiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgCiAgPCEtLSBPdXRlciBibHVlIGNpcmNsZSAtLT4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEwMCIgZmlsbD0idXJsKCNibHVlR3JhZGllbnQpIi8+CiAgCiAgPCEtLSBXaGl0ZSByaW5nIC0tPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzUiIGZpbGw9IndoaXRlIi8+CiAgCiAgPCEtLSBJbm5lciBibHVlIGNpcmNsZSAtLT4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjMTk3NkQyIi8+CiAgCiAgPCEtLSBDeWFuIEMgc2hhcGUgLS0+CiAgPHBhdGggZD0iTSA2MCAxMDAgCiAgICAgICAgICAgQSA0MCA0MCAwIDEgMSA2MCA5OS45CiAgICAgICAgICAgQSAyNSAyNSAwIDEgMCA2MCAxMDAuMSBaIiAKICAgICAgICBmaWxsPSIjMDBFNUZGIi8+CiAgCiAgPCEtLSBUb3Agb3BlbmluZyAtLT4KICA8cGF0aCBkPSJNIDEwMCA2MAogICAgICAgICAgIEEgNDAgNDAgMCAwIDEgMTM1IDg1CiAgICAgICAgICAgQSAyNSAyNSAwIDAgMCAxMDAgNzUgWiIgCiAgICAgICAgZmlsbD0id2hpdGUiLz4KICAgICAgICAKICA8IS0tIEJvdHRvbSBvcGVuaW5nIC0tPiAgCiAgPHBhdGggZD0iTSAxMDAgMTQwCiAgICAgICAgICAgQSA0MCA0MCAwIDAgMSAxMzUgMTE1CiAgICAgICAgICAgQSAyNSAyNSAwIDAgMCAxMDAgMTI1IFoiIAogICAgICAgIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg=="
    alt="Calendly Logo"
    className={className}
  />
);

interface AppConnection {
  id: string;
  name: string;
  description: string;
  logo: React.ReactNode;
  connected: boolean;
  category: 'calendar' | 'email' | 'social' | 'analytics' | 'payment' | 'design';
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [connections, setConnections] = useState<AppConnection[]>([
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Synchronisez vos rendez-vous et automatisez votre calendrier',
      logo: <CalendlyLogo className="h-8 w-8" />,
      connected: false,
      category: 'calendar'
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Intégrez votre email pour l\'automatisation des campagnes',
      logo: <Mail className="h-8 w-8 text-red-500" />,
      connected: true,
      category: 'email'
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Recevez des notifications et gérez votre équipe',
      logo: <MessageSquare className="h-8 w-8 text-purple-500" />,
      connected: false,
      category: 'social'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Automatisez vos webinaires et réunions clients',
      logo: <Video className="h-8 w-8 text-blue-600" />,
      connected: false,
      category: 'calendar'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Trackez les performances de vos landing pages',
      logo: <BarChart3 className="h-8 w-8 text-orange-500" />,
      connected: true,
      category: 'analytics'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Gérez vos paiements et abonnements',
      logo: <DollarSign className="h-8 w-8 text-indigo-500" />,
      connected: false,
      category: 'payment'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Connectez vos pages Facebook pour la gestion de contenu',
      logo: <Globe className="h-8 w-8 text-blue-700" />,
      connected: true,
      category: 'social'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Automatisez vos posts et analysez vos performances',
      logo: <Camera className="h-8 w-8 text-pink-500" />,
      connected: false,
      category: 'social'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Gérez votre contenu TikTok et analysez vos vues',
      logo: <Music className="h-8 w-8 text-black" />,
      connected: false,
      category: 'social'
    }
  ]);

  const toggleConnection = (id: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === id ? { ...conn, connected: !conn.connected } : conn
      )
    );
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'integrations', label: 'Intégrations', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'appearance', label: 'Apparence', icon: Palette }
  ];

  const categories = {
    calendar: 'Calendrier & Rendez-vous',
    email: 'Email & Communication',
    social: 'Réseaux Sociaux',
    analytics: 'Analytics & Données',
    payment: 'Paiements',
    design: 'Design & Création'
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700">
          <h3 className="text-lg font-semibold text-white mb-4">Informations personnelles</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Nom complet</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none" 
                defaultValue="John Doe" 
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none" 
                defaultValue="john@example.com" 
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Téléphone</label>
              <input 
                type="tel" 
                className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none" 
                defaultValue="+33 6 12 34 56 78" 
              />
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700">
          <h3 className="text-lg font-semibold text-white mb-4">Entreprise</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Nom de l'entreprise</label>
              <input 
                type="text" 
                className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none" 
                defaultValue="Mon Business" 
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Secteur d'activité</label>
              <select className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none">
                <option>Marketing Digital</option>
                <option>E-commerce</option>
                <option>Coaching</option>
                <option>Formation</option>
                <option>Consulting</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Site web</label>
              <input 
                type="url" 
                className="w-full p-3 rounded-lg bg-neutral-700 border border-neutral-600 text-white focus:border-blue-500 focus:outline-none" 
                defaultValue="https://monbusiness.com" 
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600">
          Sauvegarder les modifications
        </Button>
      </div>
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-8">
      {Object.entries(categories).map(([categoryKey, categoryLabel]) => {
        const categoryConnections = connections.filter(conn => conn.category === categoryKey);
        
        if (categoryConnections.length === 0) return null;
        
        return (
          <div key={categoryKey} className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{categoryLabel}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryConnections.map((app) => (
                <div key={app.id} className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {app.logo}
                      <div>
                        <h4 className="font-semibold text-white">{app.name}</h4>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                          app.connected 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {app.connected ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          {app.connected ? 'Connecté' : 'Déconnecté'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">{app.description}</p>
                  
                  <div className="flex gap-2">
                    {app.id === 'calendly' ? (
                      <ConnectCalendlyButton userId="user-123" />
                    ) : app.id === 'zoom' ? (
                      <ConnectYouTubeButton userId="user-123" />
                    ) : (
                      <>
                        <Button
                          variant={app.connected ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleConnection(app.id)}
                          className={app.connected 
                            ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                            : "bg-blue-500 hover:bg-blue-600"
                          }
                        >
                          {app.connected ? 'Déconnecter' : 'Connecter'}
                        </Button>
                        {app.connected && (
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications Email</h3>
          <div className="space-y-3">
            {[
              'Nouveaux leads',
              'Ventes réalisées',
              'Rappels de rendez-vous',
              'Rapports hebdomadaires',
              'Mises à jour produit'
            ].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded bg-neutral-700 border-neutral-600" defaultChecked />
                <span className="text-white">{item}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications Push</h3>
          <div className="space-y-3">
            {[
              'Alertes temps réel',
              'Messages clients',
              'Objectifs atteints',
              'Erreurs système',
              'Nouvelles fonctionnalités'
            ].map((item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded bg-neutral-700 border-neutral-600" defaultChecked />
                <span className="text-white">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'integrations':
        return renderIntegrationsTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'security':
        return (
          <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
            <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Sécurité</h3>
            <p className="text-gray-400">Fonctionnalités de sécurité en cours de développement</p>
          </div>
        );
      case 'appearance':
        return (
          <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
            <Palette className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Apparence</h3>
            <p className="text-gray-400">Options de personnalisation en cours de développement</p>
          </div>
        );
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-300 text-lg">Configurez votre compte et vos intégrations</p>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-neutral-800/50 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-neutral-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {renderTab()}
      </div>
    </div>
  );
}
