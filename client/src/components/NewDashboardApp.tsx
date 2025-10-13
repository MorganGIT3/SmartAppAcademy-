import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Target, Home, Calendar, User, Mail, Shield, Clock, X, BrainCog } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FullScreenCalendar } from './FullScreenCalendar';
import { CalComBookingPage } from './CalComBookingPage';
import { SimpleCalComRedirect } from './SimpleCalComRedirect';
import { SmartAIAssistantSimple as SmartAIAssistant } from './SmartAIAssistantSimple';
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
        <div className="text-center max-w-5xl mx-auto px-8">
                  {/* Titre principal moderne */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-block mb-8"
                  >
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-2">
                    Dashboard
                    </h1>
                    <motion.div 
                      className="h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </motion.div>
                  
                  {/* Description moderne */}
                  <motion.p 
                    className="text-xl text-white/60 mb-16 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Bienvenue dans votre espace SmartApp Academy™
                  </motion.p>
                  
                  {/* Cards modernes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                      { icon: Target, title: 'Book un Call', desc: 'Réservez votre session', view: '/book-call', delay: 0.6 },
                      { icon: BrainCog, title: 'AI Assistant', desc: 'Posez vos questions', view: '/ai-assistant', delay: 0.7 },
                      { icon: Shield, title: 'Formation', desc: 'Accédez à Notion', view: '/formation', delay: 0.8 },
                    ].map((card) => (
                  <motion.div 
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: card.delay, duration: 0.5 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          if (card.view === '/formation') {
                            window.open(
                              "https://alive-buffer-ca8.notion.site/SmartApp-Academy-Cr-e-lance-et-vends-ton-application-IA-no-code-des-entreprises-en-30-jours-86dc953a59a14aceae127c06e675a098",
                              "_blank"
                            );
                          } else {
                            setCurrentView(card.view);
                          }
                        }}
                        className="backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] p-6 hover:border-blue-400/30 transition-all duration-300 cursor-pointer group"
                      >
                        <div className="flex items-center justify-center mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                            <card.icon className="w-7 h-7 text-blue-400" />
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-white/50">
                          {card.desc}
                        </p>
                    </motion.div>
                    ))}
                  </div>
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
    <div className="min-h-screen w-full bg-[#0A0A0B] relative flex overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }} />
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>

      {/* Sidebar moderne */}
      <motion.div 
        className="w-64 fixed left-0 top-0 h-full z-20 backdrop-blur-2xl bg-white/[0.02] border-r border-white/[0.05]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >

        {/* Logo Header */}
        <motion.div 
          className="p-6 border-b border-white/[0.05]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 overflow-hidden"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src="/ChatGPT Image 12 oct. 2025, 19_22_29.png" 
                alt="SmartApp Academy Logo" 
                className="w-full h-full object-cover scale-110"
              />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                SmartApp
              </h1>
              <p className="text-xs text-blue-400/80">Academy™</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {[
            { icon: Home, label: 'Dashboard', view: '/dashboard' },
            { icon: Target, label: 'Book un Call', view: '/book-call' },
            { icon: BrainCog, label: 'Smart AI Assistant', view: '/ai-assistant' },
          ].map((item, index) => (
            <motion.div
              key={item.view}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                currentView === item.view
                  ? 'text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
              }`}
              onClick={() => setCurrentView(item.view)}
            >
              {/* Effet de fond glassmorphism pour l'item actif */}
              {currentView === item.view && (
                <>
                  <motion.div
                    className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-transparent rounded-xl"
                    layoutId="activeNav"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  {/* Bordure lumineuse */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-blue-400/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </>
              )}
              
              {/* Icône avec effet de glow quand actif */}
              <div className={`relative z-10 ${currentView === item.view ? 'text-blue-400' : ''}`}>
                <item.icon className="w-5 h-5" />
                {currentView === item.view && (
                  <motion.div
                    className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
          </div>

              <span className="font-medium text-sm relative z-10">{item.label}</span>
            </motion.div>
          ))}

          <div className="h-px bg-white/[0.05] my-4" />
          
          {/* Profil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] cursor-pointer transition-all duration-200"
            onClick={() => setIsProfileOpen(true)}
          >
            <User className="w-5 h-5" />
            <span className="font-medium text-sm">Profil</span>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400/80 hover:text-red-400 hover:bg-red-500/10 cursor-pointer transition-all duration-200"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </motion.div>
        </nav>

        {/* Ligne LED animée sur le bord droit de la sidebar */}
        <motion.div 
          className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {/* Effet de lumière qui se déplace */}
          <motion.div
            className="absolute w-full h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent blur-sm"
            animate={{
              y: [0, "calc(100vh - 128px)", 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

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