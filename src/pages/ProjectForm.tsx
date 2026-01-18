import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/lib/api';
import { FormHeader } from '@/components/projects/FormHeader';
import { FormLoadingState } from '@/components/projects/FormLoadingState';
import { ProjectFormFields } from '@/components/projects/ProjectFormFields';
import { FormErrorAlert } from '@/components/projects/FormErrorAlert';
import { FormActions } from '@/components/projects/FormActions';

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectType, setProjectType] = useState<'2D' | '3D'>('2D');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', id],
    queryFn: () => projectApi.get(id!),
    enabled: isEdit,
  });

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || '');
      setProjectType(project.projectType);
    }
  }, [project]);

  const createMutation = useMutation({
    mutationFn: projectApi.create,
    onSuccess: async (data) => {
      // Invalidate and refetch projects list before navigating
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      await queryClient.refetchQueries({ queryKey: ['projects'] });
      navigate(`/projects/${data.id}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...data }: any) => projectApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', id] });
      navigate(`/projects/${id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      description: description || undefined,
      projectType,
    };

    if (isEdit) {
      updateMutation.mutate({ id, ...data });
    } else {
      createMutation.mutate(data);
    }
  };

  const mutation = isEdit ? updateMutation : createMutation;

  if (isEdit && isLoading) {
    return <FormLoadingState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader
        title={isEdit ? 'Modifier le projet' : 'Nouveau projet'}
        description={isEdit ? 'Modifiez les informations du projet' : 'Créez un nouveau projet d\'exploration'}
        onBack={() => navigate('/projects')}
        disabled={mutation.isPending}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <ProjectFormFields
            name={name}
            description={description}
            projectType={projectType}
            onNameChange={setName}
            onDescriptionChange={setDescription}
            onProjectTypeChange={setProjectType}
            disabled={mutation.isPending}
          />

          {mutation.isError && (
            <FormErrorAlert error={mutation.error} />
          )}

          <FormActions
            isEdit={isEdit}
            isPending={mutation.isPending}
            onCancel={() => navigate('/projects')}
          />
        </form>
      </main>
    </div>
  );
}
