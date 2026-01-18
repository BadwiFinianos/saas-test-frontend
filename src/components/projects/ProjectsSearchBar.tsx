import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProjectsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectsSearchBar({ value, onChange }: ProjectsSearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Rechercher un projet..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>
    </div>
  );
}
