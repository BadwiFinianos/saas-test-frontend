import { DatasetCard } from './DatasetCard';
import type { Dataset } from '@/lib/api';

interface DatasetsGridProps {
  datasets: Dataset[];
  onSelect: (datasetId: string) => void;
  onDelete: (datasetId: string) => void;
}

export function DatasetsGrid({ datasets, onSelect, onDelete }: DatasetsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {datasets.map((dataset) => (
        <DatasetCard
          key={dataset.id}
          dataset={dataset}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
