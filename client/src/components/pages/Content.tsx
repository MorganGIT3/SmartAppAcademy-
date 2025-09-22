import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Calendar,
  Plus,
  Filter,
  Search,
  Play,
  Image,
  FileText,
  Video
} from "lucide-react";

const contentData = [
  {
    id: 1,
    title: "5 Secrets pour 10K€/mois",
    platform: "TikTok",
    type: "video",
    views: "287K",
    likes: "12.5K",
    comments: "892",
    shares: "1.2K",
    revenue: "$2,450",
    growth: "+340%",
    published: "2 jours",
    status: "published",
    thumbnail: "🎥"
  },
  {
    id: 2,
    title: "Email Marketing Masterclass",
    platform: "YouTube",
    type: "video",
    views: "156K",
    likes: "8.9K",
    comments: "445",
    shares: "678",
    revenue: "$1,890",
    growth: "+280%",
    published: "5 jours",
    status: "published",
    thumbnail: "🎥"
  },
  {
    id: 3,
    title: "Landing Page qui Convertit",
    platform: "Instagram",
    type: "image",
    views: "89K",
    likes: "4.2K",
    comments: "234",
    shares: "456",
    revenue: "$1,230",
    growth: "+180%",
    published: "1 semaine",
    status: "published",
    thumbnail: "🖼️"
  },
  {
    id: 4,
    title: "Guide Complet E-commerce",
    platform: "LinkedIn",
    type: "article",
    views: "45K",
    likes: "2.1K",
    comments: "123",
    shares: "234",
    revenue: "$890",
    growth: "+120%",
    published: "2 semaines",
    status: "published",
    thumbnail: "📄"
  },
  {
    id: 5,
    title: "Tendances 2024 Marketing",
    platform: "Twitter",
    type: "thread",
    views: "67K",
    likes: "3.4K",
    comments: "567",
    shares: "789",
    revenue: "$0",
    growth: "+95%",
    published: "3 jours",
    status: "scheduled",
    thumbnail: "🐦"
  },
  {
    id: 6,
    title: "Case Study: 0 à 100K followers",
    platform: "TikTok",
    type: "video",
    views: "0",
    likes: "0",
    comments: "0",
    shares: "0",
    revenue: "$0",
    growth: "0%",
    published: "Programmé pour demain",
    status: "draft",
    thumbnail: "🎥"
  }
];

const platformStats = [
  {
    platform: "TikTok",
    totalViews: "2.1M",
    totalRevenue: "$8,450",
    posts: 45,
    growth: "+25%",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10"
  },
  {
    platform: "YouTube",
    totalViews: "1.8M",
    totalRevenue: "$6,230",
    posts: 23,
    growth: "+18%",
    color: "text-red-400",
    bgColor: "bg-red-500/10"
  },
  {
    platform: "Instagram",
    totalViews: "1.2M",
    totalRevenue: "$4,890",
    posts: 67,
    growth: "+12%",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  {
    platform: "LinkedIn",
    totalViews: "890K",
    totalRevenue: "$3,450",
    posts: 34,
    growth: "+8%",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  }
];

export function Content() {
  const publishedContent = contentData.filter(c => c.status === "published");
  const totalViews = publishedContent.reduce((sum, c) => sum + parseInt(c.views.replace('K', '')) * 1000, 0);
  const totalRevenue = publishedContent.reduce((sum, c) => sum + parseFloat(c.revenue.replace('$', '')), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Gestion du Contenu</h1>
          <p className="text-gray-300 text-lg">Analysez et gérez toutes vos créations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-0">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Contenu
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Vues</p>
                <p className="text-2xl font-bold text-white">{(totalViews / 1000000).toFixed(1)}M</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-2">
              <Badge className="bg-green-500/20 text-green-400">+15% ce mois</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Revenus</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(0)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
            <div className="mt-2">
              <Badge className="bg-green-500/20 text-green-400">+23% ce mois</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Contenus</p>
                <p className="text-2xl font-bold text-white">{contentData.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
            <div className="mt-2">
              <Badge className="bg-blue-500/20 text-blue-400">3 nouveaux</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Engagement</p>
                <p className="text-2xl font-bold text-white">4.2%</p>
              </div>
              <Heart className="h-8 w-8 text-pink-400" />
            </div>
            <div className="mt-2">
              <Badge className="bg-pink-500/20 text-pink-400">+0.8% cette semaine</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-400" />
            Performance par Plateforme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformStats.map((platform, index) => (
              <div key={index} className={`p-4 rounded-lg border ${platform.bgColor} border-neutral-700`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{platform.platform}</h4>
                  <Badge className="bg-green-500/20 text-green-400">{platform.growth}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Vues</span>
                    <span className="text-white font-medium">{platform.totalViews}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Revenus</span>
                    <span className="text-white font-medium">{platform.totalRevenue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Posts</span>
                    <span className="text-white font-medium">{platform.posts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              Tous vos Contenus
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-neutral-600 text-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-600 text-gray-300">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentData.map((content) => (
              <div key={content.id} className="flex items-center gap-4 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700 hover:border-neutral-600 transition-all duration-300">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-neutral-700 flex items-center justify-center text-2xl">
                  {content.thumbnail}
                </div>

                {/* Content Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white truncate">{content.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {content.platform}
                    </Badge>
                    <Badge 
                      className={`text-xs ${
                        content.status === 'published' ? 'bg-green-500/20 text-green-400' :
                        content.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {content.status === 'published' ? 'Publié' :
                       content.status === 'scheduled' ? 'Programmé' : 'Brouillon'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{content.published}</p>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Vues</p>
                    <p className="font-semibold text-white">{content.views}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Revenus</p>
                    <p className="font-semibold text-green-400">{content.revenue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Croissance</p>
                    <Badge className="bg-blue-500/20 text-blue-400">{content.growth}</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}






