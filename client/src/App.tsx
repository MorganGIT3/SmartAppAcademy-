import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";
import { Integrations } from "@/components/Integrations";
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
            <Routes>
              <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/integrations" element={<Integrations />} />
            </Routes>
          )}
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
