"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { useDramaticSound } from "@/hooks/useDramaticSound";
import { useUserRecognition } from "@/hooks/useUserRecognition";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
          className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center text-slate-950 transition-bg bg-gradient-to-b from-blue-900/20 via-blue-800/10 to-black/5",
          className
        )}
        {...props}
      >
        {/* Supprimé le fond aurora qui cachait DottedSurface */}
        {children}
      </div>
    </main>
  );
};

interface LandingPageNewProps {
  onLogin?: () => void;
  onSignup?: () => void;
  onGoToOnboarding?: () => void;
}

export default function LandingPageNew({ onLogin, onSignup, onGoToOnboarding }: LandingPageNewProps) {
  const { playDramaticSound } = useDramaticSound();
  const { isRecognized, userEmail, userFirstName, isLoading } = useUserRecognition();

  return (
        <AuroraBackground>
          <div className="text-center">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-700/90 to-blue-900/90 border border-blue-400/30 shadow-lg shadow-blue-500/20 mb-8">
              <div className="flex items-center justify-center w-4 h-4">
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-blue-100">
                Seulement réservé aux membres de l'accompagnement
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
              Connecte toi à SmartApp Academy™
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Crée, lance et vends ton application IA no‑code à des entreprises
            </p>

            {/* Message de bienvenue pour utilisateur reconnu */}
            {isRecognized && userEmail && (
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-white/90 to-gray-100/90 border border-white/30 shadow-lg shadow-white/20">
                  <div className="flex items-center justify-center w-5 h-5">
                    <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    Bienvenue de retour{userFirstName ? `, ${userFirstName}` : ''} !
                  </span>
                </div>
              </div>
            )}

            {/* Boutons conditionnels */}
            {!isLoading && (
              <div className="flex flex-col gap-4 justify-center relative z-30">
                {isRecognized ? (
                  // Boutons pour utilisateur reconnu
                  <div className="flex flex-col gap-3 items-center">
                    <button 
                      onClick={() => { 
                        playDramaticSound(); 
                        onGoToOnboarding?.(); 
                      }}
                      className="bg-gradient-to-t from-white to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-800 px-12 py-5 text-xl font-bold rounded-lg transition-all duration-200 shadow-lg shadow-white/50 cursor-pointer relative z-40 transform hover:scale-105"
                    >
                      GO
                    </button>
                    <button 
                      onClick={() => { 
                        playDramaticSound(); 
                        onSignup?.(); 
                      }}
                      className="bg-transparent border border-gray-400 text-gray-300 hover:bg-white/10 hover:text-white px-6 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer relative z-40"
                    >
                      S'inscrire avec un autre compte
                    </button>
                  </div>
                ) : (
                  // Boutons classiques pour nouveaux utilisateurs
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => { playDramaticSound(); onSignup?.(); }}
                      className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/50 cursor-pointer relative z-40"
                    >
                      Je m'inscris
                    </button>
                    <button 
                      onClick={() => { playDramaticSound(); onLogin?.(); }}
                      className="bg-transparent border border-gray-400 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-lg transition-all duration-200 cursor-pointer relative z-40"
                    >
                      Connection
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center relative z-30">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              </div>
            )}
      </div>
    </AuroraBackground>
  );
}