import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { datasetApi } from '@/lib/api';
import { DatasetsHeader } from '@/components/datasets/DatasetsHeader';
import { DatasetsSearchBar } from '@/components/datasets/DatasetsSearchBar';
import { DatasetsLoadingState } from '@/components/datasets/DatasetsLoadingState';
import { DatasetsEmptyState } from '@/components/datasets/DatasetsEmptyState';
import { DatasetsGrid } from '@/components/datasets/DatasetsGrid';

export default function Datasets() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: datasets, isLoading } = useQuery({
    queryKey: ['datasets'],
    queryFn: () => datasetApi.list(),
  });

  const deleteMutation = useMutation({
    mutationFn: datasetApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['datasets'] });
    },
  });

  const filteredDatasets = datasets?.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.description?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <DatasetsHeader
        onBack={() => navigate('/dashboard')}
        onUpload={() => navigate('/datasets/upload')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DatasetsSearchBar value={search} onChange={setSearch} />

        {isLoading ? (
          <DatasetsLoadingState />
        ) : filteredDatasets.length === 0 ? (
          <DatasetsEmptyState onUpload={() => navigate('/datasets/upload')} />
        ) : (
          <DatasetsGrid
            datasets={filteredDatasets}
            onSelect={(datasetId) => navigate(`/datasets/${datasetId}`)}
            onDelete={(datasetId) => deleteMutation.mutate(datasetId)}
          />
        )}
      </main>
    </div>
  );
}
