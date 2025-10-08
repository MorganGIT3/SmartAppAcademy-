import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { AdminDashboard } from "@/components/AdminDashboard";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Vérifier l'état basé sur l'URL
  const isOnboarding = location.pathname === '/onboarding';
  const isDashboard = location.pathname === '/dashboard';
  const isLanding = location.pathname === '/' || location.pathname === '/landingpage';

  const handleLogin = () => {
    navigate('/onboarding');
  };

  const handleOnboardingComplete = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    navigate('/landingpage');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider defaultTheme="dark">
          <Routes>
            <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
            <Route path="/landingpage" element={<LandingPage onLogin={handleLogin} />} />
            <Route path="/onboarding" element={<OnboardingPage onContinue={handleOnboardingComplete} />} />
            <Route path="/dashboard" element={<NewDashboardApp onLogout={handleLogout} />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
