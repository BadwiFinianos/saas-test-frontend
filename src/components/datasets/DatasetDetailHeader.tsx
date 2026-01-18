import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Database } from 'lucide-react';
import type { Dataset } from '@/lib/api';

interface DatasetDetailHeaderProps {
  dataset: Dataset;
  onBack: () => void;
  onExport: () => void;
}

export function DatasetDetailHeader({ dataset, onBack, onExport }: DatasetDetailHeaderProps) {
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
                <h1 className="text-2xl font-bold text-gray-900">
                  {dataset.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {dataset.description || "Aucune description"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
