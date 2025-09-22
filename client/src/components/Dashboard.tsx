import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Users, 
  Phone, 
  TrendingUp, 
  BarChart3,
  Search,
  ChevronLeft,
  ChevronRight,
  Target,
  Percent,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';

// Données de placeholder pour les KPIs du mois
const monthlyKPIs = [
  {
    title: "Revenus du mois",
    value: "€47,674.64",
    subtitle: "En temps réel",
    icon: DollarSign,
    growth: "+23.4% ce mois",
    goal: "Objectif mensuel: €65,000",
    progress: 73
  },
  {
    title: "Total des ventes contractées",
    value: "47",
    subtitle: "Contrats signés ce mois",
    icon: Users
  },
  {
    title: "Appels Réservés (Mois)",
    value: "23",
    subtitle: "Nombre de calls bookés",
    icon: Phone
  },
  {
    title: "Adspend (Mois)",
    value: "€2,450",
    subtitle: "Somme des dépenses pub.",
    icon: TrendingUp
  }
];

// Données pour les ratios (mini-cards)
const ratioCards = [
  {
    title: "CPA",
    value: "€110",
    subtitle: "Coût par vente",
    icon: Target,
    color: "text-blue-400"
  },
  {
    title: "Sales / Booked Calls",
    value: "87%",
    subtitle: "Taux de conversion",
    icon: Percent,
    color: "text-green-400"
  },
  {
    title: "Cash / new followers",
    value: "€7.02",
    subtitle: "Valeur par follower",
    icon: DollarSign,
    color: "text-purple-400"
  },
  {
    title: "C-ROI",
    value: "357%",
    subtitle: "Retour sur investissement",
    icon: TrendingUp,
    color: "text-orange-400"
  }
];

// Données EOD simplifiées
const eodTotals = [
  { title: "DMs envoyés", value: "1,247", icon: "💬" },
  { title: "Liens Calendly envoyés", value: "89", icon: "📅" },
  { title: "Relances envoyées", value: "456", icon: "🔄" },
  { title: "Appels programmés", value: "67", icon: "📞" },
  { title: "Heures travaillées", value: "342h", icon: "⏰" }
];

const eodDetails = [
  { date: "15/01/2024", prenom: "Alex", dms: "12", calendly: "3", appels: "2", heures: "8", victoire: "Nouveau client converti" },
  { date: "16/01/2024", prenom: "Marie", dms: "8", calendly: "2", appels: "1", heures: "7", victoire: "Landing page optimisée" },
  { date: "17/01/2024", prenom: "Thomas", dms: "15", calendly: "4", appels: "3", heures: "9", victoire: "Campagne Facebook lancée" },
  { date: "18/01/2024", prenom: "Sarah", dms: "10", calendly: "1", appels: "2", heures: "6", victoire: "Email sequence créée" },
  { date: "19/01/2024", prenom: "David", dms: "18", calendly: "5", appels: "4", heures: "10", victoire: "3 nouveaux leads qualifiés" }
];

// Données pour les graphiques
const cashData = [
  { month: "Jan", cash: 3800 },
  { month: "Fév", cash: 6800 },
  { month: "Mar", cash: 8600 },
  { month: "Avr", cash: 7700 },
  { month: "Mai", cash: 9100 },
  { month: "Juin", cash: 10500 },
  { month: "Juil", cash: 10000 },
  { month: "Août", cash: 9600 },
  { month: "Sep", cash: 10500 },
  { month: "Oct", cash: 11400 },
  { month: "Nov", cash: 12300 },
  { month: "Déc", cash: 13200 }
];

const plData = [
  { month: "Jan", pl: 2600 },
  { month: "Fév", pl: 5000 },
  { month: "Mar", pl: 7400 },
  { month: "Avr", pl: 6550 },
  { month: "Mai", pl: 7700 },
  { month: "Juin", pl: 8900 },
  { month: "Juil", pl: 8600 },
  { month: "Août", pl: 8400 },
  { month: "Sep", pl: 9000 },
  { month: "Oct", pl: 9700 },
  { month: "Nov", pl: 10500 },
  { month: "Déc", pl: 11300 }
];

const adsData = [
  { month: "Jan", facebook: 800, tiktok: 300, youtube: 100 },
  { month: "Fév", facebook: 1200, tiktok: 500, youtube: 100 },
  { month: "Mar", facebook: 1400, tiktok: 600, youtube: 100 },
  { month: "Avr", facebook: 1300, tiktok: 550, youtube: 100 },
  { month: "Mai", facebook: 1500, tiktok: 700, youtube: 100 },
  { month: "Juin", facebook: 1700, tiktok: 800, youtube: 100 },
  { month: "Juil", facebook: 1600, tiktok: 700, youtube: 100 },
  { month: "Août", facebook: 1500, tiktok: 600, youtube: 100 },
  { month: "Sep", facebook: 1700, tiktok: 700, youtube: 100 },
  { month: "Oct", facebook: 1900, tiktok: 800, youtube: 100 },
  { month: "Nov", facebook: 2100, tiktok: 800, youtube: 100 },
  { month: "Déc", facebook: 2300, tiktok: 800, youtube: 100 }
];

export function Dashboard() {
  return (
    <div className="space-y-8">

      {/* 1) En haut → 4 KPI cards (bleu LED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {monthlyKPIs.map((kpi, index) => (
          <Card key={index} className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
            <CardContent className="p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <kpi.icon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-400">{kpi.title}</h3>
                  <p className="text-3xl font-bold text-white">{kpi.value}</p>
                  <p className="text-xs text-gray-500">{kpi.subtitle}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2) Ligne suivante → Graphiques simples */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cash collecté par mois (courbe) */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Cash collecté par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cashData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, 'Cash collecté']}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cash" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bénéfice (P/L) par mois (courbe, avec vert = positif, rouge = négatif) */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              Bénéfice (P/L) par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={plData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString()}`, 'Bénéfice (P/L)']}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Bar 
                    dataKey="pl" 
                    fill={(entry: any) => entry.pl >= 0 ? '#10B981' : '#EF4444'}
                    radius={[2, 2, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Dépenses pub. par mois (barres empilées par canal) */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              Dépenses pub. par mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9CA3AF"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickFormatter={(value) => `€${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                    formatter={(value: number, name: string) => [`€${value.toLocaleString()}`, name]}
                    labelStyle={{ color: '#F9FAFB' }}
                  />
                  <Bar dataKey="facebook" stackId="a" fill="#1877F2" name="Facebook" />
                  <Bar dataKey="tiktok" stackId="a" fill="#FF0050" name="TikTok" />
                  <Bar dataKey="youtube" stackId="a" fill="#FF0000" name="YouTube" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3) Ligne suivante → Conversion & ratios (mini-cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ratioCards.map((ratio, index) => (
          <Card key={index} className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <ratio.icon className={`h-8 w-8 ${ratio.color}`} />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-400">{ratio.title}</h3>
                <p className={`text-2xl font-bold ${ratio.color}`}>{ratio.value}</p>
                <p className="text-xs text-gray-500">{ratio.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
                  </div>

      {/* 4) Ligne suivante → EOD résumé */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Totaux de la période (synthèse) dans 5 mini-cards horizontales */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              EOD — Totaux de la période
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {eodTotals.map((total, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-neutral-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{total.icon}</span>
                    <span className="text-gray-300 text-sm">{total.title}</span>
                  </div>
                  <span className="text-white font-bold text-lg">{total.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* EOD journalier avec table allégée */}
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20">
        <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
              EOD — Détail journalier
          </CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Rechercher un prénom…" 
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              <Button size="sm" variant="outline" className="border-neutral-700">
                <Search className="h-4 w-4" />
              </Button>
            </div>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="text-left py-2 text-gray-400">Date</th>
                    <th className="text-left py-2 text-gray-400">Prénom</th>
                    <th className="text-right py-2 text-gray-400">DMs</th>
                    <th className="text-right py-2 text-gray-400">Liens Calendly</th>
                    <th className="text-right py-2 text-gray-400">Appels</th>
                    <th className="text-right py-2 text-gray-400">Heures</th>
                    <th className="text-left py-2 text-gray-400">Victoire du jour</th>
                  </tr>
                </thead>
                <tbody>
                  {eodDetails.map((row, index) => (
                    <tr key={index} className={`border-b border-neutral-800/50 ${index % 2 === 0 ? 'bg-neutral-800/30' : ''}`}>
                      <td className="py-2 text-white">{row.date}</td>
                      <td className="py-2 text-white font-medium">{row.prenom}</td>
                      <td className="py-2 text-right text-white">{row.dms}</td>
                      <td className="py-2 text-right text-white">{row.calendly}</td>
                      <td className="py-2 text-right text-white">{row.appels}</td>
                      <td className="py-2 text-right text-white">{row.heures}</td>
                      <td className="py-2 text-gray-300 text-xs max-w-xs truncate">{row.victoire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-400">
                Affichage 1-5 sur 5 entrées
            </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-neutral-700">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-neutral-700">
                  <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}