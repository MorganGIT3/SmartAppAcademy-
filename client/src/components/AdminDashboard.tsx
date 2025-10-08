import React, { useState, useEffect } from 'react';
import { getCurrentAdminSession, logoutAdmin } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Shield, Clock, User } from 'lucide-react';

interface AdminSession {
  code: string;
  name: string;
  level: string;
  description: string;
  permissions: string[];
  loginTime: string;
}

export function AdminDashboard() {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const session = getCurrentAdminSession();
    setAdminSession(session);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setAdminSession(null);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!adminSession) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="w-96 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-center">Accès Refusé</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Aucune session admin active trouvée
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              onClick={() => window.location.href = '/'}
              className="w-full"
            >
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'super_admin':
        return 'bg-red-500';
      case 'admin':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'super_admin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      default:
        return 'User';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-400">
              Bienvenue dans l'interface d'administration de SmartApp Academy™
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>

        {/* Admin Info Card */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <div>
                <CardTitle className="text-white">{adminSession.name}</CardTitle>
                <CardDescription className="text-gray-400">
                  {adminSession.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Niveau:</span>
                <Badge className={getLevelColor(adminSession.level)}>
                  {getLevelText(adminSession.level)}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Connecté depuis:</span>
                <span className="text-white">
                  {new Date(adminSession.loginTime).toLocaleString('fr-FR')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Code:</span>
                <code className="bg-gray-700 px-2 py-1 rounded text-green-400">
                  {adminSession.code}
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Permissions</CardTitle>
            <CardDescription className="text-gray-400">
              Permissions accordées à votre niveau d'accès
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {adminSession.permissions.map((permission, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {permission}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Gestion des Utilisateurs</CardTitle>
              <CardDescription className="text-gray-400">
                Voir et gérer les utilisateurs de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Accéder
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Statistiques</CardTitle>
              <CardDescription className="text-gray-400">
                Consulter les statistiques et métriques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Accéder
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-white">Configuration</CardTitle>
              <CardDescription className="text-gray-400">
                Configurer les paramètres de l'application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Accéder
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Codes Admin Disponibles */}
        <Card className="mt-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Codes Admin Disponibles</CardTitle>
            <CardDescription className="text-gray-400">
              Liste des codes d'accès administrateur
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <span className="text-white font-mono">admin123</span>
                  <Badge className="bg-blue-500">Admin</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <span className="text-white font-mono">smartapp2024</span>
                  <Badge className="bg-blue-500">Admin</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <span className="text-white font-mono">academy2024</span>
                  <Badge className="bg-blue-500">Admin</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <span className="text-white font-mono">master2024</span>
                  <Badge className="bg-red-500">Super Admin</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                  <span className="text-white font-mono">superadmin</span>
                  <Badge className="bg-red-500">Super Admin</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


