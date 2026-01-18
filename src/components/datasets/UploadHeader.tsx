import { Button } from '@/components/ui/button';
import { ArrowLeft, Upload } from 'lucide-react';

interface UploadHeaderProps {
  onBack: () => void;
  disabled?: boolean;
}

export function UploadHeader({ onBack, disabled }: UploadHeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            disabled={disabled}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-hyreveal-100 rounded-lg">
              <Upload className="h-6 w-6 text-hyreveal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Télécharger Dataset
              </h1>
              <p className="text-sm text-gray-500">
                Importez vos données d'exploration
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
