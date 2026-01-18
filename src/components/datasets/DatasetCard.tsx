import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, FileText, MapPin, User, Calendar } from 'lucide-react';
import type { Dataset } from '@/lib/api';

interface DatasetCardProps {
  dataset: Dataset;
  onSelect: (datasetId: string) => void;
  onDelete: (datasetId: string) => void;
}

export function DatasetCard({ dataset, onSelect, onDelete }: DatasetCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Supprimer ce dataset ?')) {
      onDelete(dataset.id);
    }
  };

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
      onClick={() => onSelect(dataset.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-hyreveal-600 transition-colors">
              {dataset.name}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {dataset.description || 'Aucune description'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="h-4 w-4" />
          <span>{dataset.rowCount?.toLocaleString('fr-FR')} lignes</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="capitalize">{dataset.dataType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User className="h-4 w-4" />
          <span>{dataset.owner?.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{new Date(dataset.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        {dataset.tags && dataset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {dataset.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-hyreveal-50 text-hyreveal-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
