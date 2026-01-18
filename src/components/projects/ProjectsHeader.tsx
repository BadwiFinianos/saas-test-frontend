import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, FolderOpen } from 'lucide-react';

interface ProjectsHeaderProps {
  onBack: () => void;
  onCreateNew: () => void;
}

export function ProjectsHeader({ onBack, onCreateNew }: ProjectsHeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
                <p className="text-sm text-gray-500">Gérez vos projets d'exploration</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={onCreateNew}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Projet
          </Button>
        </div>
      </div>
    </header>
  );
}
