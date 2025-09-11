import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Bot, 
  Calendar, 
  DollarSign, 
  Eye, 
  Target, 
  TrendingUp, 
  Users, 
  Zap 
} from "lucide-react";
import contentImage from "@assets/generated_images/Content_creation_feature_illustration_0c39c2f0.png";

const features = [
  {
    icon: Eye,
    title: "Content Performance Tracking",
    description: "Monitor views, clicks, likes, shares, and conversions across all your content platforms."
  },
  {
    icon: Target,
    title: "Advanced Ad Analytics",
    description: "Centralized dashboard for Facebook, TikTok, and YouTube ads with ROI, CPC, and ROAS metrics."
  },
  {
    icon: Users,
    title: "Sales Funnel Analysis",
    description: "Track conversion rates from lead generation to closing deals with clear visual reports."
  },
  {
    icon: Bot,
    title: "AI Growth Operator",
    description: "Get personalized recommendations and strategic insights based on your performance data."
  },
  {
    icon: Calendar,
    title: "Content Planning Hub",
    description: "Notion-style calendar with drag & drop functionality for organizing your content strategy."
  },
  {
    icon: DollarSign,
    title: "Real-time Revenue Tracking",
    description: "Live revenue counter with Stripe integration and automatic goal tracking."
  },
  {
    icon: TrendingUp,
    title: "Content Leaderboard",
    description: "Discover your top-performing content by reach, engagement, and ROI automatically."
  },
  {
    icon: Zap,
    title: "Gamified KPIs",
    description: "Daily objectives with badges and rewards to keep you motivated and on track."
  }
];

export function Features() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to 
            <span className="text-primary"> Scale Your Business</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful tools and AI-driven insights to help infopreneurs optimize 
            their content strategy and maximize revenue.
          </p>
        </div>
        
        {/* Feature Image */}
        <div className="mb-16">
          <div className="relative max-w-4xl mx-auto">
            <img 
              src={contentImage} 
              alt="Content creation and analytics platform" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-lg" />
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover-elevate border-card-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}