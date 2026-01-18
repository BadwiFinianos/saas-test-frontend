import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ProjectFormFieldsProps {
  name: string;
  description: string;
  projectType: '2D' | '3D';
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onProjectTypeChange: (value: '2D' | '3D') => void;
  disabled?: boolean;
}

export function ProjectFormFields({
  name,
  description,
  projectType,
  onNameChange,
  onDescriptionChange,
  onProjectTypeChange,
  disabled,
}: ProjectFormFieldsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du projet</CardTitle>
        <CardDescription>
          Renseignez les détails de votre projet d'exploration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nom du projet *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            required
            placeholder="Exploration Paris Nord"
            disabled={disabled}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description du projet..."
            rows={4}
            disabled={disabled}
          />
        </div>

        <div>
          <Label htmlFor="projectType">Type de projet *</Label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => onProjectTypeChange(e.target.value as '2D' | '3D')}
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
            required
            disabled={disabled}
          >
            <option value="2D">2D - Carte plane</option>
            <option value="3D">3D - Visualisation 3D</option>
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
