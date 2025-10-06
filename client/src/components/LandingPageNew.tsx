"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "aurora-bg absolute -inset-[10px] pointer-events-none",
              showRadialGradient && "aurora-mask"
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default function LandingPageNew() {
  return (
    <AuroraBackground>
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black dark:text-white">
          Connecte toi à SmartApp Academy™
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Crée, lance et vends ton application IA no‑code à des entreprises
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-lg">
            Commencer gratuitement
          </button>
          <button className="bg-transparent border border-gray-600 text-black dark:text-white hover:bg-white/10 px-8 py-4 text-lg rounded-lg">
            Voir la démo
          </button>
        </div>
      </div>
    </AuroraBackground>
  );
}