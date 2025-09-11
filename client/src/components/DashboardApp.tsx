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
            <h1 className="text-3xl font-bold">Suivi du Contenu</h1>
            <p className="text-muted-foreground">Analysez les performances de vos posts, vidéos et emails.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/ads':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Suivi des Publicités</h1>
            <p className="text-muted-foreground">Gérez vos campagnes Facebook, TikTok et YouTube.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/funnel':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analyse d'Entonnoir</h1>
            <p className="text-muted-foreground">Suivez les conversions de leads à la vente.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/calendar':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Calendrier de Contenu</h1>
            <p className="text-muted-foreground">Planifiez vos posts avec un système drag & drop.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/revenue':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Suivi des Revenus</h1>
            <p className="text-muted-foreground">Analyse détaillée de vos revenus et objectifs.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/leaderboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Leaderboard du Contenu</h1>
            <p className="text-muted-foreground">Classement de vos contenus les plus performants.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/kpis':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">KPIs & Gamification</h1>
            <p className="text-muted-foreground">Objectifs quotidiens et système de badges.</p>
            <div className="text-center py-12 text-muted-foreground">
              🚧 Module en développement - Sera disponible dans la version complète
            </div>
          </div>
        );
      case '/settings':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">Configurez votre compte et vos intégrations.</p>
            <div className="text-center py-12 text-muted-foreground">
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
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar onNavigate={setCurrentView} />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h2 className="font-semibold">
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
  );
}