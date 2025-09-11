import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Zap } from "lucide-react";
import heroImage from "@assets/generated_images/SaaS_dashboard_hero_visualization_1267fd75.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(30, 41, 59, 0.8) 100%), url(${heroImage})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center gap-1 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powered by AI</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
          Scale Your Business
          <span className="block text-primary">With Smart Analytics</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          The all-in-one platform for infopreneurs to track content performance, 
          manage ad campaigns, and boost revenue with AI-powered insights.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            data-testid="button-signup"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 backdrop-blur-sm"
            data-testid="button-demo"
          >
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <TrendingUp className="h-6 w-6 text-chart-2" />
              <span>300%</span>
            </div>
            <p className="text-muted-foreground">Average ROI Increase</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span>10K+</span>
            </div>
            <p className="text-muted-foreground">Active Users</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Zap className="h-6 w-6 text-chart-3" />
              <span>50M+</span>
            </div>
            <p className="text-muted-foreground">Content Pieces Tracked</p>
          </div>
        </div>
      </div>
    </section>
  );
}