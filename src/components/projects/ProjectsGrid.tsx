import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/api';

interface ProjectsGridProps {
  projects: Project[];
  onSelect: (projectId: string) => void;
  onDelete: (projectId: string) => void;
}

export function ProjectsGrid({ projects, onSelect, onDelete }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
