import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Dataset } from '@/lib/api';

interface ColumnMappingCardProps {
  columnMapping: Dataset['columnMapping'];
}

export function ColumnMappingCard({ columnMapping }: ColumnMappingCardProps) {
  if (!columnMapping || Object.keys(columnMapping).length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Mapping des Colonnes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columnMapping.longitude && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Longitude:
              </span>
              <code className="px-2 py-1 bg-hyreveal-50 text-hyreveal-700 rounded text-sm">
                {columnMapping.longitude}
              </code>
            </div>
          )}
          {columnMapping.latitude && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Latitude:
              </span>
              <code className="px-2 py-1 bg-hyreveal-50 text-hyreveal-700 rounded text-sm">
                {columnMapping.latitude}
              </code>
            </div>
          )}
          {columnMapping.altitude && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                Altitude:
              </span>
              <code className="px-2 py-1 bg-hyreveal-50 text-hyreveal-700 rounded text-sm">
                {columnMapping.altitude}
              </code>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
