import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Bot, Target, Users, Calendar, DollarSign, TrendingUp, Zap, Layout, BarChart3 } from 'lucide-react';

// Icon components
const HomeIcon = ({ className = "w-4 h-4" }) => <Home className={className} />;
const BotIcon = ({ className = "w-4 h-4" }) => <Bot className={className} />;
const TargetIcon = ({ className = "w-4 h-4" }) => <Target className={className} />;
const UsersIcon = ({ className = "w-4 h-4" }) => <Users className={className} />;
const CalendarIcon = ({ className = "w-4 h-4" }) => <Calendar className={className} />;
const DollarSignIcon = ({ className = "w-4 h-4" }) => <DollarSign className={className} />;
const TrendingUpIcon = ({ className = "w-4 h-4" }) => <TrendingUp className={className} />;
const ZapIcon = ({ className = "w-4 h-4" }) => <Zap className={className} />;
const LayoutIcon = ({ className = "w-4 h-4" }) => <Layout className={className} />;
const BarChart3Icon = ({ className = "w-4 h-4" }) => <BarChart3 className={className} />;

const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const SunIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const LinkedInIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const GitHubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 438.549 438.549" fill="currentColor">
    <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
  </svg>
);

// Tooltip component
const Tooltip = ({ children, content }) => {
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
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded shadow-lg whitespace-nowrap z-50"
        >
          {content}
        </motion.div>
      )}
    </div>
  );
};

// Theme toggle component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.div>
    </motion.button>
  );
};

// Dock item component
const DockItem = ({ children, tooltip }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, y: -8 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="relative"
    >
      <Tooltip content={tooltip}>
        {children}
      </Tooltip>
    </motion.div>
  );
};

// Separator component
const Separator = () => (
  <div className="w-px h-8 bg-gray-300 dark:bg-gray-600 mx-2" />
);

// Main dock component
const Dock = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-1 px-4 py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg"
    >
      {children}
    </motion.div>
  );
};

// Data configuration
const DATA = {
  navbar: [
    { href: "/dashboard", icon: HomeIcon, label: "Dashboard" },
    { href: "/book-call", icon: CalendarIcon, label: "Booker un Call" },
    { href: "/formation", icon: BarChart3Icon, label: "Formation" },
    { href: "/content", icon: BarChart3Icon, label: "Contenu" },
    { href: "/ads", icon: TargetIcon, label: "Publicités" },
    { href: "/funnel", icon: UsersIcon, label: "Entonnoir" },
    { href: "/chatbot", icon: BotIcon, label: "Chatbot IA" },
    { href: "/revenue", icon: DollarSignIcon, label: "Revenus" },
    { href: "/leaderboard", icon: TrendingUpIcon, label: "Leaderboard" },
    { href: "/kpis", icon: ZapIcon, label: "KPIs" },
    { href: "/landing-pages", icon: LayoutIcon, label: "LandingPage" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "#",
        icon: GitHubIcon,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "#",
        icon: LinkedInIcon,
      },
      X: {
        name: "X",
        url: "#",
        icon: XIcon,
      },
      Email: {
        name: "Send Email",
        url: "#",
        icon: MailIcon,
      },
    },
  },
};

interface DockThemeProps {
  onNavigate?: (path: string) => void;
}

export function DockTheme({ onNavigate }: DockThemeProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className={`${isDark ? 'dark' : ''} transition-colors duration-300`}>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        {/* Dock */}
        <Dock>
          {/* Navigation items - Show main navigation items */}
          {DATA.navbar.slice(0, 3).map((item) => (
            <DockItem key={item.label} tooltip={item.label}>
              <button
                onClick={() => handleNavigate(item.href)}
                className="w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300"
                aria-label={item.label}
              >
                <item.icon />
              </button>
            </DockItem>
          ))}

          <Separator />

          {/* More items button */}
          <DockItem tooltip="Plus d'options">
            <button
              onClick={() => handleNavigate('/more')}
              className="w-12 h-12 rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Plus d'options"
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
              </div>
            </button>
          </DockItem>

          <Separator />

          {/* Theme toggle */}
          <DockItem tooltip="Theme">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </DockItem>
        </Dock>
      </div>
    </div>
  );
}
