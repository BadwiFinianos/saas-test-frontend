import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ColumnMappingSectionProps {
  dataType: "2D" | "3D" | "NON_GEO";
  headers: string[];
  longitudeCol: string;
  latitudeCol: string;
  altitudeCol: string;
  onLongitudeChange: (value: string) => void;
  onLatitudeChange: (value: string) => void;
  onAltitudeChange: (value: string) => void;
}

export function ColumnMappingSection({
  dataType,
  headers,
  longitudeCol,
  latitudeCol,
  altitudeCol,
  onLongitudeChange,
  onLatitudeChange,
  onAltitudeChange,
}: ColumnMappingSectionProps) {
  if (dataType === "NON_GEO") {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mapping des colonnes</CardTitle>
        <CardDescription>
          Sélectionnez les colonnes contenant les coordonnées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="longitude">Longitude *</Label>
          <select
            id="longitude"
            value={longitudeCol}
            onChange={(e) => onLongitudeChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            required
          >
            <option value="">-- Sélectionner --</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="latitude">Latitude *</Label>
          <select
            id="latitude"
            value={latitudeCol}
            onChange={(e) => onLatitudeChange(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            required
          >
            <option value="">-- Sélectionner --</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>

        {dataType === "3D" && (
          <div>
            <Label htmlFor="altitude">Altitude</Label>
            <select
              id="altitude"
              value={altitudeCol}
              onChange={(e) => onAltitudeChange(e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="">-- Sélectionner --</option>
              {headers.map((header) => (
                <option key={header} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
