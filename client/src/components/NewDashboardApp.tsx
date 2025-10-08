import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Target, Zap, Home, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FullScreenCalendar } from './FullScreenCalendar';
import { CalComBookingPage } from './CalComBookingPage';
import { SimpleCalComRedirect } from './SimpleCalComRedirect';

interface NewDashboardAppProps {
  onLogout?: () => void;
}

export function NewDashboardApp({ onLogout }: NewDashboardAppProps) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('/dashboard');

  const handleLogout = () => {
    onLogout?.();
    navigate('/');
  };

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

          
          {/* Logout */}
          <div 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer transition-all duration-200 mt-8"
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

    </div>
  );
}