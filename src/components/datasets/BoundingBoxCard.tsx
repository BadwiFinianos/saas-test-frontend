import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface BoundingBox {
  minLon?: number;
  maxLon?: number;
  minLat?: number;
  maxLat?: number;
  center?: [number, number];
}

interface BoundingBoxCardProps {
  boundingBox: BoundingBox | null | undefined;
}

export function BoundingBoxCard({ boundingBox }: BoundingBoxCardProps) {
  if (!boundingBox) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Zone Géographique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Min Longitude</p>
            <p className="font-mono font-semibold">
              {boundingBox.minLon?.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Max Longitude</p>
            <p className="font-mono font-semibold">
              {boundingBox.maxLon?.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Min Latitude</p>
            <p className="font-mono font-semibold">
              {boundingBox.minLat?.toFixed(6)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Max Latitude</p>
            <p className="font-mono font-semibold">
              {boundingBox.maxLat?.toFixed(6)}
            </p>
          </div>
        </div>
        {boundingBox.center && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-gray-500 text-sm mb-1">Centre</p>
            <p className="font-mono font-semibold">
              {boundingBox.center[0]?.toFixed(6)},{" "}
              {boundingBox.center[1]?.toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
