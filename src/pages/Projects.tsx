import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/lib/api';
import { ProjectsHeader } from '@/components/projects/ProjectsHeader';
import { ProjectsSearchBar } from '@/components/projects/ProjectsSearchBar';
import { ProjectsLoadingState } from '@/components/projects/ProjectsLoadingState';
import { ProjectsEmptyState } from '@/components/projects/ProjectsEmptyState';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';

export default function Projects() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: projectApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const filteredProjects = projects?.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectsHeader
        onBack={() => navigate('/dashboard')}
        onCreateNew={() => navigate('/projects/new')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectsSearchBar value={search} onChange={setSearch} />

        {isLoading ? (
          <ProjectsLoadingState />
        ) : filteredProjects.length === 0 ? (
          <ProjectsEmptyState onCreateNew={() => navigate('/projects/new')} />
        ) : (
          <ProjectsGrid
            projects={filteredProjects}
            onSelect={(projectId) => navigate(`/projects/${projectId}`)}
            onDelete={(projectId) => deleteMutation.mutate(projectId)}
          />
        )}
      </main>
    </div>
  );
}
