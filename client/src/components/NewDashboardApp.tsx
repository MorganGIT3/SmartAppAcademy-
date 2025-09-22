import { useState } from 'react';
import { Taskbar } from './Taskbar';
import { Dashboard } from './Dashboard';
import { AIChatbotNew } from './AIChatbotNew';
import { KPIDashboard } from './KPIDashboard';
import { RevenueTracker } from './RevenueTracker';
import { PipelineManager } from './PipelineManager';
import { SettingsPage } from './SettingsPage';
import { ThemeToggle } from './ThemeToggle';
import { ProfilePopover } from './ProfilePopover';
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Maximize2, 
  LogOut,
  BarChart3,
  Target,
  Bot,
  DollarSign,
  Settings,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewDashboardAppProps {
  onLogout?: () => void;
}

const pageIcons = {
  '/dashboard': BarChart3,
  '/ads': Target,
  '/chatbot': Bot,
  '/revenue': DollarSign,
  '/kpis': BarChart3,
  '/pipeline': GitBranch,
  '/settings': Settings
};

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/ads': 'Publicités',
  '/chatbot': 'Chatbot IA',
  '/revenue': 'Suivi des Revenus',
  '/kpis': 'KPIs & Analytics',
  '/pipeline': 'Pipeline',
  '/settings': 'Paramètres'
};

export function NewDashboardApp({ onLogout }: NewDashboardAppProps) {
  const [currentView, setCurrentView] = useState('/dashboard');

  const renderContent = () => {
    switch (currentView) {
      case '/kpis':
        return <KPIDashboard />;
      case '/chatbot':
        return <AIChatbotNew />;
      case '/ads':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Gestion des Publicités</h1>
                <p className="text-gray-300 text-lg">Gérez vos campagnes Facebook, TikTok et YouTube</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Facebook Ads</h3>
                <p className="text-gray-400 mb-4">Gérez vos campagnes Facebook</p>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Configurer</Button>
              </div>
              <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <Target className="h-8 w-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">TikTok Ads</h3>
                <p className="text-gray-400 mb-4">Optimisez vos campagnes TikTok</p>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">Configurer</Button>
              </div>
              <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Target className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">YouTube Ads</h3>
                <p className="text-gray-400 mb-4">Créez des campagnes YouTube</p>
                <Button className="w-full bg-red-500 hover:bg-red-600">Configurer</Button>
              </div>
            </div>
          </div>
        );
      case '/revenue':
        return <RevenueTracker />;
      case '/pipeline':
        return <PipelineManager />;
      case '/settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  const CurrentIcon = pageIcons[currentView as keyof typeof pageIcons] || BarChart3;
  const pageTitle = pageTitles[currentView as keyof typeof pageTitles] || 'Dashboard';

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Background avec cadrillage et gradient bleu */}
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

      {/* Header - Masqué pour le chatbot */}
      {currentView !== '/chatbot' && (
        <header className="relative z-10 flex items-center justify-between p-6 border-b border-neutral-700/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <CurrentIcon className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{pageTitle}</h2>
                {currentView === '/dashboard' && (
                  <p className="text-sm text-gray-400">Vue d'ensemble de vos performances</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-neutral-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-neutral-700"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </header>
      )}

      {/* Header minimal pour chatbot avec seulement les boutons */}
      {currentView === '/chatbot' && (
        <header className="relative z-10 flex items-center justify-end p-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-neutral-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white hover:bg-neutral-700"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="relative z-10 pb-24">
        <div className={currentView === '/chatbot' ? 'h-[calc(100vh-140px)] p-4' : 'p-8'}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={currentView === '/chatbot' ? 'h-full' : ''}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Taskbar */}
      <Taskbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Profile en bas à droite */}
      <div className="fixed bottom-6 right-6 z-50">
        <ProfilePopover onLogout={onLogout} />
      </div>
    </div>
  );
}





