import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Project } from "@/lib/api";

interface ProjectSidebarProps {
  project: Project;
  onBack: () => void;
  children: React.ReactNode;
}

export function ProjectSidebar({ project, onBack, children }: ProjectSidebarProps) {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-3"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux projets
        </Button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-green-100 rounded">
            <MapPin className="h-4 w-4 text-green-600" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 truncate">
            {project.name}
          </h1>
        </div>

        {project.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="mt-2">
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
            {project.projectType}
          </span>
        </div>
      </div>

      {/* Children (LayerList) */}
      {children}
    </aside>
  );
}
