import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Target, Zap, Home, Calendar, User, Mail, Shield, Clock, X, BrainCog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FullScreenCalendar } from './FullScreenCalendar';
import { CalComBookingPage } from './CalComBookingPage';
import { SimpleCalComRedirect } from './SimpleCalComRedirect';
import { SmartAIAssistant } from './SmartAIAssistant';
import { supabase, getCurrentUser } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NewDashboardAppProps {
  onLogout?: () => void;
}

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  last_sign_in_at?: string;
}

export function NewDashboardApp({ onLogout }: NewDashboardAppProps) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('/dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogout = () => {
    onLogout?.();
    navigate('/');
  };

  const loadUserProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUserProfile({
          id: user.id,
          email: user.email || '',
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Utilisateur',
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
    }
  };

  useEffect(() => {
    loadUserProfile();
  }, []);

  const renderContent = () => {
    switch (currentView) {
          case '/dashboard':
    return (
              <motion.div 
                className="min-h-screen flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
        <div className="text-center max-w-4xl mx-auto px-8">
                  {/* Titre principal avec animation simple */}
                  <motion.h1 
                    className="text-6xl md:text-8xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Dashboard
                  </motion.h1>
                  
                  {/* Description avec animation simple */}
                  <motion.p 
                    className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Bienvenue dans votre espace SmartApp Academy™
                  </motion.p>
                  
                  {/* Card de fonctionnalité avec animation simple */}
                  <motion.div 
                    className="flex justify-center mt-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-200 max-w-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="flex items-center space-x-3 mb-4"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <motion.div 
                          className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center"
                          whileHover={{ rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Calendar className="w-6 h-6 text-blue-400" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white">Booker un Call</h3>
                      </motion.div>
                      
                      <motion.p 
                        className="text-gray-300 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 1 }}
                      >
                        Réservez un appel stratégique avec nos experts
                      </motion.p>
                      
                      <motion.button 
                        onClick={() => setCurrentView('/book-call')}
                        className="w-full py-4 px-8 bg-gray-600 hover:bg-gray-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-bold text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.2 }}
                      >
                        Réserve ton appel de semaine
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );

          case '/book-call':
            return (
              <div className="min-h-screen">
                <SimpleCalComRedirect />
              </div>
            );

          case '/ai-assistant':
            return (
              <div className="min-h-screen">
                <SmartAIAssistant />
              </div>
            );


      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-8">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-12">
                Bienvenue dans votre espace SmartApp Academy™
              </p>
        </div>
      </div>
    );
    }
  };

  // Dashboard simplifié - pas besoin de variables complexes

  return (
    <div className="min-h-screen w-full bg-black relative flex" style={{ border: 'none !important' }}>
      {/* Background harmonisé avec la sidebar */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-800 to-black z-0"></div>
      

          {/* Sidebar fixe */}
          <div className="w-64 bg-gradient-to-b from-blue-900 to-black fixed left-0 top-0 h-full overflow-hidden z-10">

        {/* Logo Header */}
        <div className="relative z-10 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SmartApp</h1>
              <p className="text-sm text-blue-300">Academy™</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="relative z-10 p-4 space-y-2">
          {/* Dashboard */}
          <div 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentView === '/dashboard' 
                ? 'bg-blue-500/20 text-blue-300' 
                : 'text-gray-300 hover:bg-gray-700/20 hover:text-white'
            }`}
            onClick={() => setCurrentView('/dashboard')}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
            {currentView === '/dashboard' && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto"></div>}
          </div>

          {/* Book un Call */}
          <div 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentView === '/book-call' 
                ? 'bg-blue-500/20 text-blue-300' 
                : 'text-gray-300 hover:bg-gray-700/20 hover:text-white'
            }`}
            onClick={() => setCurrentView('/book-call')}
          >
            <Target className="w-5 h-5" />
            <span className="font-medium">Book un Call</span>
            {currentView === '/book-call' && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto"></div>}
          </div>

          {/* Smart AI Assistant */}
          <div 
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentView === '/ai-assistant' 
                ? 'bg-blue-500/20 text-blue-300' 
                : 'text-gray-300 hover:bg-gray-700/20 hover:text-white'
            }`}
            onClick={() => setCurrentView('/ai-assistant')}
          >
            <BrainCog className="w-5 h-5" />
            <span className="font-medium">Smart AI Assistant</span>
            {currentView === '/ai-assistant' && <div className="w-2 h-2 bg-blue-400 rounded-full ml-auto"></div>}
          </div>

          
          {/* Profil */}
          <div 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-blue-300 hover:bg-blue-500/10 hover:text-blue-200 cursor-pointer transition-all duration-200 mt-8"
            onClick={() => setIsProfileOpen(true)}
          >
            <User className="w-5 h-5" />
            <span className="font-medium">Profil</span>
          </div>

          {/* Logout */}
          <div 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer transition-all duration-200"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
          <main className="flex-1 relative z-20 ml-64" style={{ border: 'none !important' }}>
        <div className="p-8" style={{ border: 'none !important' }}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ border: 'none !important' }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Popup Profil */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsProfileOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="bg-transparent border-none">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-400" />
                      Mon Profil
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Informations de votre compte
                    </CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsProfileOpen(false)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {userProfile ? (
                    <>
                      {/* Avatar et nom */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                          {userProfile.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{userProfile.full_name}</h3>
                          <p className="text-gray-400">{userProfile.email}</p>
                        </div>
                      </div>

                      {/* Informations détaillées */}
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-400 text-sm">Email</span>
                          </div>
                          <p className="text-white font-medium">{userProfile.email}</p>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-gray-400 text-sm">ID Utilisateur</span>
                          </div>
                          <p className="text-white font-mono text-sm">{userProfile.id}</p>
                        </div>

                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-gray-400 text-sm">Compte créé le</span>
                          </div>
                          <p className="text-white">
                            {new Date(userProfile.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>

                        {userProfile.last_sign_in_at && (
                          <div className="bg-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-orange-400" />
                              <span className="text-gray-400 text-sm">Dernière connexion</span>
                            </div>
                            <p className="text-white">
                              {new Date(userProfile.last_sign_in_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        )}

                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-green-500 text-white">✓ Compte actif</Badge>
                          </div>
                          <p className="text-gray-400 text-sm">Votre compte est vérifié et actif</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 border-t border-gray-700">
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Se déconnecter
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Chargement du profil...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}