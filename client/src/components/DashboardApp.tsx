import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { AIChatbot } from './AIChatbot';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface DashboardAppProps {
  onLogout?: () => void;
}

export function DashboardApp({ onLogout }: DashboardAppProps) {
  const [currentView, setCurrentView] = useState('/dashboard');

  const renderContent = () => {
    switch (currentView) {
      case '/chatbot':
        return (
          <div className="max-w-4xl mx-auto">
            <AIChatbot />
          </div>
        );
      case '/content':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi du Contenu</h1>
            <p className="text-gray-300">Analysez les performances de vos posts, vidéos et emails.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/ads':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi des Publicités</h1>
            <p className="text-gray-300">Gérez vos campagnes Facebook, TikTok et YouTube.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/funnel':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Analyse d'Entonnoir</h1>
            <p className="text-gray-300">Suivez les conversions de leads à la vente.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/calendar':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Calendrier de Contenu</h1>
            <p className="text-gray-300">Planifiez vos posts avec un système drag & drop.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/revenue':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Suivi des Revenus</h1>
            <p className="text-gray-300">Analyse détaillée de vos revenus et objectifs.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/leaderboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Leaderboard du Contenu</h1>
            <p className="text-gray-300">Classement de vos contenus les plus performants.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/kpis':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">KPIs & Gamification</h1>
            <p className="text-gray-300">Objectifs quotidiens et système de badges.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/landing-pages':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">LandingPage et site</h1>
            <p className="text-gray-300">Créez et gérez vos landing pages avec l'IA.</p>
            
            {/* Search and Create Section */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher vos pages..."
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => window.open('/page-builder', '_blank')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium"
              >
                🤖 Créer une page grâce à l'IA
              </button>
            </div>

            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example pages */}
              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200">
                <div className="aspect-video bg-neutral-700 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Aperçu de la page</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Page de vente produit</h3>
                <p className="text-gray-400 text-sm mb-4">Créée il y a 2 jours</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors text-sm">
                    Modifier
                  </button>
                  <button className="px-3 py-2 bg-neutral-700 text-gray-300 rounded-md hover:bg-neutral-600 transition-colors text-sm">
                    Dupliquer
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200">
                <div className="aspect-video bg-neutral-700 rounded-md mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Aperçu de la page</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Landing page service</h3>
                <p className="text-gray-400 text-sm mb-4">Créée il y a 1 semaine</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-md hover:bg-blue-500/30 transition-colors text-sm">
                    Modifier
                  </button>
                  <button className="px-3 py-2 bg-neutral-700 text-gray-300 rounded-md hover:bg-neutral-600 transition-colors text-sm">
                    Dupliquer
                  </button>
                </div>
              </div>

              {/* Add New Page Card */}
              <div 
                onClick={() => window.open('/page-builder', '_blank')}
                className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-2 border-dashed border-neutral-600 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
              >
                <div className="aspect-video rounded-md mb-4 flex items-center justify-center border-2 border-dashed border-neutral-600 group-hover:border-blue-500/50 transition-colors">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">+</span>
                    </div>
                    <span className="text-gray-400 text-sm">Nouvelle page</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2 text-center">Créer avec l'IA</h3>
                <p className="text-gray-400 text-sm text-center">Laissez l'IA créer votre page parfaite</p>
              </div>
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Paramètres</h1>
            <p className="text-gray-300">Configurez votre compte et vos intégrations.</p>
            <div className="text-center py-12 text-gray-400">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <div
          className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
            opacity: 0.6,
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full relative z-10">
          <AppSidebar onNavigate={setCurrentView} />
          <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between p-4 border-b border-neutral-800 bg-black/80 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <h2 className="font-semibold text-white">
                  {currentView === '/dashboard' ? 'Dashboard' : 
                   currentView === '/chatbot' ? 'Growth Operator IA' :
                   currentView.replace('/', '').charAt(0).toUpperCase() + currentView.replace('/', '').slice(1)}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onLogout}
                  data-testid="button-logout"
                  className="text-white hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-6">
              {renderContent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}