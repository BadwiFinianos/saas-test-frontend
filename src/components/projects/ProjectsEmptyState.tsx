import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';

interface ProjectsEmptyStateProps {
  onCreateNew: () => void;
}

export function ProjectsEmptyState({ onCreateNew }: ProjectsEmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun projet trouvé
        </h3>
        <p className="text-gray-600 mb-6">
          Créez votre premier projet d'exploration
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={onCreateNew}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Projet
        </Button>
      </CardContent>
    </Card>
  );
}
