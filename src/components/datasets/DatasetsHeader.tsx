import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload, Database } from 'lucide-react';

interface DatasetsHeaderProps {
  onBack: () => void;
  onUpload: () => void;
}

export function DatasetsHeader({ onBack, onUpload }: DatasetsHeaderProps) {
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
              <div className="p-2 bg-hyreveal-100 rounded-lg">
                <Database className="h-6 w-6 text-hyreveal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Datasets</h1>
                <p className="text-sm text-gray-500">Gérez vos données d'exploration</p>
              </div>
            </div>
          </div>
          <Button
            className="bg-hyreveal-500 hover:bg-hyreveal-600"
            onClick={onUpload}
          >
            <Upload className="h-4 w-4 mr-2" />
            Télécharger Dataset
          </Button>
        </div>
      </div>
    </header>
  );
}
