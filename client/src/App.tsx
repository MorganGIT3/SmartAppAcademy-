import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LandingPage } from "@/components/LandingPage";
import { NewDashboardApp } from "@/components/NewDashboardApp";
import { OnboardingPage } from "@/components/OnboardingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleLogin = () => {
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowOnboarding(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark">
          {isLoggedIn ? (
            <NewDashboardApp onLogout={handleLogout} />
          ) : showOnboarding ? (
            <OnboardingPage onContinue={handleOnboardingComplete} />
          ) : (
            <LandingPage onLogin={handleLogin} />
          )}
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
