import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { datasetApi, projectApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogOut, Database, FolderOpen, Upload, Plus } from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: datasets } = useQuery({
    queryKey: ['datasets'],
    queryFn: () => datasetApi.list(),
  });

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.list(),
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const totalMeasurements = datasets?.reduce((sum, d) => sum + (d.rowCount || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.webp" alt="HyReveal" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-hyreveal-600 to-hyreveal-500 bg-clip-text text-transparent">
                  HyReveal
                </h1>
                <p className="text-sm text-gray-500">Plateforme de données hydrogène</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user?.firstName || 'Utilisateur'} !
          </h2>
          <p className="text-gray-600 mt-2">
            Gérez vos datasets et projets d'exploration hydrogène
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-hyreveal-200 cursor-pointer"
                onClick={() => navigate('/datasets')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-hyreveal-500 to-hyreveal-600 rounded-lg">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Datasets</CardTitle>
                    <CardDescription>
                      Téléchargez et gérez vos données de mesure
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-hyreveal-500 hover:bg-hyreveal-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/datasets/upload');
                  }}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/datasets');
                  }}
                >
                  Voir tout
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-200 cursor-pointer"
                onClick={() => navigate('/projects')}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
                    <FolderOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle>Projets</CardTitle>
                    <CardDescription>
                      Créez des projets avec plusieurs couches de données
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/projects/new');
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/projects');
                  }}
                >
                  Voir tout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-hyreveal-50 to-white border-hyreveal-100">
            <CardHeader>
              <CardDescription className="text-hyreveal-700">Total Datasets</CardDescription>
              <CardTitle className="text-4xl text-hyreveal-600">{datasets?.length || 0}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
            <CardHeader>
              <CardDescription className="text-green-700">Projets Actifs</CardDescription>
              <CardTitle className="text-4xl text-green-600">{projects?.length || 0}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <CardHeader>
              <CardDescription className="text-blue-700">Mesures</CardDescription>
              <CardTitle className="text-4xl text-blue-600">
                {totalMeasurements.toLocaleString('fr-FR')}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
}
