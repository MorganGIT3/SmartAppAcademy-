import { useState } from 'react';
import LandingPageNew from './LandingPageNew';
import { AuthModal } from './AuthModal';
import { OnboardingModal } from './OnboardingModal';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface LandingPageProps {
  onLogin?: () => void;
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setOnboardingOpen(true);
  };

  const handleOnboardingComplete = () => {
    setOnboardingOpen(false);
    onLogin?.();
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-black/80 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-500">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl text-white">InfoScale</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                onClick={() => setAuthModalOpen(true)}
                data-testid="nav-login"
                className="text-white hover:bg-white/10"
              >
                Connexion
              </Button>
              <Button 
                onClick={() => setAuthModalOpen(true)}
                data-testid="nav-signup"
                className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500"
              >
                Inscription
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* New Landing Page Content */}
      <LandingPageNew />

      {/* Modals */}
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onAuthSuccess={handleAuthSuccess}
      />
      <OnboardingModal 
        open={onboardingOpen} 
        onOpenChange={handleOnboardingComplete}
      />
    </div>
  );
}