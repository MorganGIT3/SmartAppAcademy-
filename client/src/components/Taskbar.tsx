import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Target,
  Bot,
  DollarSign,
  Zap,
  GitBranch,
  Settings
} from 'lucide-react';

// Tooltip component
const Tooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 text-xs text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap z-50"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

// Dock item component
const DockItem = ({ children, tooltip, isActive = false, onClick }: { 
  children: React.ReactNode; 
  tooltip: string; 
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative"
    >
      <Tooltip content={tooltip}>
        <button
          onClick={onClick}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isActive 
              ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/25' 
              : 'bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white'
          }`}
        >
          {children}
        </button>
      </Tooltip>
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

// Separator component
const Separator = () => (
  <div className="w-px h-8 bg-gray-600 mx-2" />
);

// Main dock component
const Dock = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-1 px-6 py-3 bg-gray-900/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl"
    >
      {children}
    </motion.div>
  );
};

interface TaskbarProps {
  currentView: string;
  onNavigate: (path: string) => void;
}

export function Taskbar({ currentView, onNavigate }: TaskbarProps) {
  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/ads', icon: Target, label: 'Publicités' },
    { path: '/chatbot', icon: Bot, label: 'Chatbot IA' },
    { path: '/revenue', icon: DollarSign, label: 'Revenus' },
    { path: '/kpis', icon: Zap, label: 'KPIs' },
    { path: '/pipeline', icon: GitBranch, label: 'Pipeline' },
    { path: '/settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Dock>
        {navigationItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <DockItem 
              tooltip={item.label}
              isActive={currentView === item.path}
              onClick={() => onNavigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
            </DockItem>
            {/* Add separator after every 3 items */}
            {(index + 1) % 3 === 0 && index < navigationItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </Dock>
    </div>
  );
}
