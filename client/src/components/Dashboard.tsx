import { RevenueCounter } from './RevenueCounter';
import { MetricCard } from './MetricCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Eye, 
  Target, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  Zap,
  CheckCircle
} from 'lucide-react';

const dailyGoals = [
  { task: "Publier 1 contenu sur TikTok", completed: true },
  { task: "Analyser les métriques de la semaine", completed: true },
  { task: "Répondre aux leads WhatsApp", completed: false },
  { task: "Planifier le contenu de demain", completed: false }
];

const topContent = [
  { title: "5 Secrets pour 10K€/mois", platform: "TikTok", views: "287K", revenue: "$2,450", roi: "+340%" },
  { title: "Email Marketing Masterclass", platform: "YouTube", views: "156K", revenue: "$1,890", roi: "+280%" },
  { title: "Landing Page qui Convertit", platform: "Instagram", views: "89K", revenue: "$1,230", roi: "+180%" }
];

export function Dashboard() {
  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const goalProgress = (completedGoals / dailyGoals.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Vue d'ensemble de vos performances</p>
        </div>
        <Badge className="bg-chart-2/10 text-chart-2 border-chart-2/20">
          <Zap className="h-3 w-3 mr-1" />
          Objectifs en cours
        </Badge>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueCounter />
        <MetricCard
          title="Leads générés"
          value="2,847"
          change="+12% ce mois"
          changeType="positive"
          icon={Users}
          description="Objectif: 3,000"
        />
        <MetricCard
          title="Vues de contenu"
          value="1.2M"
          change="+8% cette semaine"
          changeType="positive"
          icon={Eye}
          badge="Trending"
        />
        <MetricCard
          title="Taux de conversion"
          value="3.2%"
          change="+0.5% aujourd'hui"
          changeType="positive"
          icon={Target}
          description="Moyenne des funnels"
        />
      </div>

      {/* Goals and Content Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Goals */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Objectifs du jour
              <Badge variant="secondary">{completedGoals}/{dailyGoals.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progression</span>
                <span>{Math.round(goalProgress)}%</span>
              </div>
              <Progress value={goalProgress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {dailyGoals.map((goal, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    goal.completed 
                      ? 'bg-chart-2 border-chart-2' 
                      : 'border-muted-foreground/30'
                  }`}>
                    {goal.completed && (
                      <CheckCircle className="h-3 w-3 text-background" />
                    )}
                  </div>
                  <span className={goal.completed ? 'line-through text-muted-foreground' : ''}>
                    {goal.task}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card className="hover-elevate">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Top contenu cette semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topContent.map((content, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-md bg-muted/30">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{content.title}</p>
                    <p className="text-xs text-muted-foreground">{content.platform} • {content.views} vues</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{content.revenue}</p>
                    <Badge variant="secondary" className="text-xs">{content.roi}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <Card className="hover-elevate">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Aperçu analytique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">73</div>
              <p className="text-sm text-muted-foreground">Contenus publiés ce mois</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-2 mb-2">€47,580</div>
              <p className="text-sm text-muted-foreground">Revenus générés</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-3 mb-2">2.8x</div>
              <p className="text-sm text-muted-foreground">ROI moyen des campagnes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}