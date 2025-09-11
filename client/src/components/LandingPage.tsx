import { useState } from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { CTA } from './CTA';
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
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">InfoScale</span>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                onClick={() => setAuthModalOpen(true)}
                data-testid="nav-login"
              >
                Connexion
              </Button>
              <Button 
                onClick={() => setAuthModalOpen(true)}
                data-testid="nav-signup"
              >
                Inscription
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-20">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary">
              <Zap className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="font-bold">InfoScale</span>
          </div>
          <p className="text-muted-foreground mb-4">
            La plateforme tout-en-un pour les infopreneurs qui veulent scaler leur business
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 InfoScale. Tous droits réservés.
          </p>
        </div>
      </footer>

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