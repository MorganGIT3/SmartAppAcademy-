"use client";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export default function LandingPageNew() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SmartApp Academy™</span>
            </div>
            
            <div className="flex items-center space-x-8">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10">
                Se connecter
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute left-0 top-0 w-full h-full z-0">
            <div
              className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
              style={{
                border: "200px solid #3131f5",
                filter: "blur(92px)",
                WebkitFilter: "blur(92px)",
              }}
            ></div>
            <div
              className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
              style={{
                border: "200px solid #3131f5",
                filter: "blur(92px)",
                WebkitFilter: "blur(92px)",
              }}
            ></div>
          </div>

        <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
            opacity: 0.6,
            mixBlendMode: "multiply",
          }}
        />

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto px-6 relative z-50">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.15}
                staggerFrom="first"
                reverse={true}
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 40,
                  delay: 0,
                }}
              >
              Connecte toi à SmartApp Academy™
              </VerticalCutReveal>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transformez votre entreprise avec notre plateforme IA de nouvelle génération. 
            Automatisez, analysez et optimisez comme jamais auparavant.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-800 px-8 py-4 text-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Voir la démo
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}