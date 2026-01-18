import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Upload } from 'lucide-react';

interface DatasetsEmptyStateProps {
  onUpload: () => void;
}

export function DatasetsEmptyState({ onUpload }: DatasetsEmptyStateProps) {
  return (
    <Card className="text-center py-12">
      <CardContent>
        <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Aucun dataset trouvé
        </h3>
        <p className="text-gray-600 mb-6">
          Commencez par télécharger votre premier dataset
        </p>
        <Button
          className="bg-hyreveal-500 hover:bg-hyreveal-600"
          onClick={onUpload}
        >
          <Upload className="h-4 w-4 mr-2" />
          Télécharger Dataset
        </Button>
      </CardContent>
    </Card>
  );
}
