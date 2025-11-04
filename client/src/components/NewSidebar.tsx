import { 
  BarChart3, 
  Bot, 
  Calendar, 
  DollarSign, 
  Home, 
  Settings, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  ChevronRight,
  LogOut,
  Layout
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Contenu Drive",
    url: "/content",
    icon: BarChart3,
  },
  {
    title: "Publicités",
    url: "/ads",
    icon: Target,
  },
  {
    title: "Entonnoir",
    url: "/funnel",
    icon: Users,
  },
  {
    title: "Calendrier",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Chatbot IA",
    url: "/chatbot",
    icon: Bot,
  },
  {
    title: "Revenus",
    url: "/revenue",
    icon: DollarSign,
  },
  {
    title: "Leaderboard",
    url: "/leaderboard",
    icon: TrendingUp,
  },
  {
    title: "KPIs",
    url: "/kpis",
    icon: Zap,
  },
  {
    title: "LandingPage et site",
    url: "/landing-pages",
    icon: Layout,
  }
];

interface NewSidebarProps {
  currentView: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

export function NewSidebar({ currentView, onNavigate, onLogout }: NewSidebarProps) {
  return (
    <div className="w-64 h-full bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 border-r border-neutral-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-400 via-[#a78bfa] to-purple-300 drop-shadow-[0_0_10px_rgba(167,139,250,0.5)]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-white">ZeroToApp</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = currentView === item.url;
              return (
                <motion.button
                  key={item.title}
                  onClick={() => onNavigate?.(item.url)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-400/20 via-[#a78bfa]/20 to-purple-300/20 border border-[#a78bfa]/30 shadow-lg shadow-[#a78bfa]/10 drop-shadow-[0_0_8px_rgba(167,139,250,0.4)]'
                      : 'text-gray-400 hover:text-white hover:bg-neutral-700/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-[#a78bfa] to-purple-300 rounded-r-full drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]"
                      layoutId="activeIndicator"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  {/* Icon with glow effect */}
                  <div className={`relative ${isActive ? 'text-[#a78bfa] drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]' : 'text-gray-400'}`}>
                    <item.icon className="h-5 w-5 relative z-10" />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-[#a78bfa] rounded-full blur-md opacity-30"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.3 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>

                  <span className="flex-1 text-left">{item.title}</span>

                  {/* Active arrow */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <ChevronRight className="h-4 w-4 text-[#a78bfa]" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}





