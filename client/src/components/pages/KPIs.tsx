import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Calendar,
  Award,
  Star,
  Zap,
  CheckCircle2,
  Clock,
  BarChart3
} from "lucide-react";

const kpiData = [
  {
    title: "Objectif Mensuel",
    value: "€47,618",
    target: "€65,000",
    progress: 73,
    icon: Target,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    title: "Leads Générés",
    value: "2,847",
    target: "3,000",
    progress: 95,
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20"
  },
  {
    title: "Contenus Publiés",
    value: "73",
    target: "80",
    progress: 91,
    icon: Calendar,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20"
  },
  {
    title: "Taux de Conversion",
    value: "3.2%",
    target: "4.0%",
    progress: 80,
    icon: BarChart3,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20"
  }
];

const badges = [
  {
    title: "Pionnier de l'IA",
    description: "Premier à utiliser toutes les fonctionnalités IA",
    icon: Award,
    earned: true,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10"
  },
  {
    title: "Maître du Contenu",
    description: "100 contenus publiés avec succès",
    icon: Star,
    earned: true,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Champion des Revenus",
    description: "Dépasser l'objectif mensuel 3 mois de suite",
    icon: Trophy,
    earned: false,
    color: "text-gray-400",
    bgColor: "bg-gray-500/10"
  },
  {
    title: "Expert en Conversion",
    description: "Atteindre 5% de taux de conversion",
    icon: Zap,
    earned: false,
    color: "text-gray-400",
    bgColor: "bg-gray-500/10"
  }
];

const dailyChallenges = [
  {
    title: "Publier du contenu",
    description: "Créer et publier 1 nouveau contenu",
    points: 50,
    completed: true,
    icon: CheckCircle2
  },
  {
    title: "Analyser les métriques",
    description: "Examiner les performances de la semaine",
    points: 30,
    completed: true,
    icon: CheckCircle2
  },
  {
    title: "Répondre aux leads",
    description: "Traiter tous les nouveaux leads",
    points: 40,
    completed: false,
    icon: Clock
  },
  {
    title: "Planifier le contenu",
    description: "Préparer le contenu de demain",
    points: 25,
    completed: false,
    icon: Clock
  }
];

export function KPIs() {
  const totalPoints = dailyChallenges.reduce((sum, challenge) => 
    challenge.completed ? sum + challenge.points : sum, 0
  );
  const maxPoints = dailyChallenges.reduce((sum, challenge) => sum + challenge.points, 0);
  const completedChallenges = dailyChallenges.filter(c => c.completed).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">KPIs & Gamification</h1>
          <p className="text-gray-300 text-lg">Suivez vos objectifs et débloquez des récompenses</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500/20 to-blue-700/20 text-blue-400 border-blue-500/30 px-4 py-2">
          <Trophy className="h-4 w-4 mr-2" />
          Niveau Expert
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={kpi.title} className={`bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-neutral-600 transition-all duration-300 ${kpi.borderColor}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <Badge variant="outline" className="text-xs">
                  {kpi.progress}%
                </Badge>
              </div>
              <CardTitle className="text-lg text-white">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{kpi.value}</span>
                  <span className="text-sm text-gray-400">/ {kpi.target}</span>
                </div>
                <Progress value={kpi.progress} className="h-2" />
                <p className="text-xs text-gray-400">
                  {kpi.progress >= 100 ? "Objectif atteint !" : `${100 - kpi.progress}% restant`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Challenges & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Challenges */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="h-5 w-5 text-blue-400" />
              Défis du Jour
              <Badge className="ml-auto">{completedChallenges}/{dailyChallenges.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Points gagnés</span>
                  <span className="text-white font-semibold">{totalPoints}/{maxPoints}</span>
                </div>
                <Progress value={(totalPoints / maxPoints) * 100} className="h-3" />
              </div>

              {/* Challenges List */}
              <div className="space-y-3">
                {dailyChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800/50">
                    <div className={`p-2 rounded-full ${challenge.completed ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                      <challenge.icon className={`h-4 w-4 ${challenge.completed ? 'text-green-400' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${challenge.completed ? 'text-white line-through' : 'text-gray-300'}`}>
                        {challenge.title}
                      </p>
                      <p className="text-xs text-gray-400">{challenge.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +{challenge.points}pts
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Award className="h-5 w-5 text-yellow-400" />
              Badges & Récompenses
              <Badge className="ml-auto bg-yellow-500/20 text-yellow-400">
                {badges.filter(b => b.earned).length}/{badges.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {badges.map((badge, index) => (
                <div key={index} className={`p-4 rounded-lg border transition-all duration-300 ${
                  badge.earned 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                    : 'bg-neutral-800/50 border-neutral-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${badge.bgColor}`}>
                      <badge.icon className={`h-5 w-5 ${badge.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${badge.earned ? 'text-white' : 'text-gray-400'}`}>
                        {badge.title}
                      </h4>
                      <p className="text-sm text-gray-400">{badge.description}</p>
                    </div>
                    {badge.earned && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Débloqué
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard Preview */}
      <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Votre Classement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-700/10 border border-blue-500/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg">
                3
              </div>
              <div>
                <h4 className="font-semibold text-white">Votre Position</h4>
                <p className="text-sm text-gray-400">Top 5% des utilisateurs cette semaine</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-400">2,847</p>
              <p className="text-sm text-gray-400">Points totaux</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}






