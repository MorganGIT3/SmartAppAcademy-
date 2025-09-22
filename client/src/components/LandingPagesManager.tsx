import { Button } from '@/components/ui/button';
import { Layout, Plus, Eye, Edit3, Trash2 } from 'lucide-react';

interface LandingPagesManagerProps {
  onOpenPageBuilder: () => void;
}

export function LandingPagesManager({ onOpenPageBuilder }: LandingPagesManagerProps) {
  const landingPages = [
    {
      id: 1,
      name: "Formation Marketing Digital",
      status: "Publié",
      views: "2.3K",
      conversions: "12.5%",
      lastModified: "Il y a 2 jours"
    },
    {
      id: 2,
      name: "Webinaire E-commerce",
      status: "Brouillon",
      views: "-",
      conversions: "-",
      lastModified: "Il y a 1 semaine"
    },
    {
      id: 3,
      name: "Lead Magnet PDF",
      status: "Publié",
      views: "1.8K",
      conversions: "18.2%",
      lastModified: "Il y a 3 jours"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Landing Pages & Sites</h1>
          <p className="text-gray-300 text-lg">Créez et gérez vos pages de conversion</p>
        </div>
        <Button 
          onClick={onOpenPageBuilder}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Page
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {landingPages.map((page) => (
          <div 
            key={page.id}
            className="p-6 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <Layout className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{page.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      page.status === 'Publié' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {page.status}
                    </span>
                    <span>Modifié {page.lastModified}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Vues</p>
                  <p className="text-lg font-semibold text-white">{page.views}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Conversion</p>
                  <p className="text-lg font-semibold text-green-400">{page.conversions}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 text-center">
        <Layout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Page Builder Avancé</h3>
        <p className="text-gray-400 mb-4">Créez des landing pages avec notre éditeur drag & drop</p>
        <Button 
          onClick={onOpenPageBuilder}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Ouvrir le Page Builder
        </Button>
      </div>
    </div>
  );
}
