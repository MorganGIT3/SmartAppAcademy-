import { useState } from 'react';
import LandingPageNew from './LandingPageNew';
import { AuthModal } from './AuthModal';
import { OnboardingModal } from './OnboardingModal';
import { ThemeToggle } from './ThemeToggle';
import { BlueLEDs } from './BlueLEDs';
import { BlueGlowBackground } from './BlueGlowBackground';
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
    <div className="relative min-h-screen bg-black">
      {/* Blue Glow Background */}
      <div className="absolute inset-0 z-0">
        <BlueGlowBackground />
      </div>

      {/* Integrated Navigation in Background */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl text-white">SmartApp Academy™</span>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              onClick={() => setAuthModalOpen(true)}
              data-testid="nav-login"
              className="text-white hover:bg-white/10 backdrop-blur-sm"
            >
              Connexion
            </Button>
            <Button 
              onClick={() => setAuthModalOpen(true)}
              data-testid="nav-signup"
              className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/50"
            >
              Inscription
            </Button>
          </div>
        </div>
      </div>

      {/* Blue LEDs Background Effect */}
      <div className="relative z-5">
        <BlueLEDs />
      </div>

      {/* New Landing Page Content */}
      <div className="relative z-20">
        <LandingPageNew 
          onLogin={() => setAuthModalOpen(true)}
          onSignup={() => setAuthModalOpen(true)}
        />
      </div>

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