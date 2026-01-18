import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { FileText, MapPin, User, Calendar } from 'lucide-react';
import type { Dataset } from '@/lib/api';

interface DatasetInfoCardsProps {
  dataset: Dataset;
}

export function DatasetInfoCards({ dataset }: DatasetInfoCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Lignes
          </CardDescription>
          <CardTitle className="text-3xl text-hyreveal-600">
            {dataset.rowCount?.toLocaleString("fr-FR") || 0}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Type
          </CardDescription>
          <CardTitle className="text-xl">{dataset.dataType}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Propriétaire
          </CardDescription>
          <CardTitle className="text-sm truncate">
            {dataset.owner?.email || "N/A"}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Créé le
          </CardDescription>
          <CardTitle className="text-sm">
            {new Date(dataset.createdAt).toLocaleDateString("fr-FR")}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
