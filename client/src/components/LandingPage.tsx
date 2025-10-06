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
    <div className="relative min-h-screen">
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* LED 1 - Top Left */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse"></div>
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        
        {/* LED 2 - Top Right */}
        <div className="absolute top-32 right-16 w-1.5 h-1.5 bg-blue-300 rounded-full shadow-lg shadow-blue-300/50 animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* LED 3 - Middle Left */}
        <div className="absolute top-1/2 left-8 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* LED 4 - Middle Right */}
        <div className="absolute top-1/3 right-12 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* LED 5 - Bottom Left */}
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-blue-300 rounded-full shadow-lg shadow-blue-300/50 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        
        {/* LED 6 - Bottom Right */}
        <div className="absolute bottom-20 right-8 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* LED 7 - Center */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 animate-pulse" style={{animationDelay: '3.5s'}}></div>
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