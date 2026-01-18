import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DatasetBasicInfoProps {
  name: string;
  description: string;
  dataType: "2D" | "3D" | "NON_GEO";
  tags: string;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDataTypeChange: (value: "2D" | "3D" | "NON_GEO") => void;
  onTagsChange: (value: string) => void;
}

export function DatasetBasicInfo({
  name,
  description,
  dataType,
  tags,
  onNameChange,
  onDescriptionChange,
  onDataTypeChange,
  onTagsChange,
}: DatasetBasicInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du dataset</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nom *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            placeholder="Mon dataset hydrogène"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description du dataset..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="dataType">Type de données *</Label>
          <select
            id="dataType"
            value={dataType}
            onChange={(e) => onDataTypeChange(e.target.value as any)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            required
          >
            <option value="2D">2D (Longitude, Latitude)</option>
            <option value="3D">3D (Longitude, Latitude, Altitude)</option>
            <option value="NON_GEO">Non géographique</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => onTagsChange(e.target.value)}
            placeholder="hydrogène, exploration, france"
          />
        </div>
      </CardContent>
    </Card>
  );
}
