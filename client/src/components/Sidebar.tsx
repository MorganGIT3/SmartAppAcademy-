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
  Zap 
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Contenu",
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
  }
];

interface AppSidebarProps {
  onNavigate?: (path: string) => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">InfoScale</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      className={isActive ? "bg-sidebar-accent" : ""}
                      data-testid={`nav-${item.title.toLowerCase()}`}
                    >
                      <button
                        onClick={() => {
                          console.log(`Navigate to ${item.url}`);
                          onNavigate?.(item.url);
                        }}
                        className="w-full"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Paramètres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild data-testid="nav-settings">
                  <button 
                    onClick={() => {
                      console.log('Navigate to /settings');
                      onNavigate?.('/settings');
                    }}
                    className="w-full"
                  >
                    <Settings />
                    <span>Paramètres</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">john@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}