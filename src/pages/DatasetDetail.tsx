import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { datasetApi } from "@/lib/api";
import { DatasetDetailHeader } from "@/components/datasets/DatasetDetailHeader";
import { DatasetDetailLoadingState } from "@/components/datasets/DatasetDetailLoadingState";
import { DatasetInfoCards } from "@/components/datasets/DatasetInfoCards";
import { ColumnMappingCard } from "@/components/datasets/ColumnMappingCard";
import { ColumnsSchemaCard } from "@/components/datasets/ColumnsSchemaCard";
import { TagsCard } from "@/components/datasets/TagsCard";
import { BoundingBoxCard } from "@/components/datasets/BoundingBoxCard";
import { DataTable } from "@/components/datasets/DataTable";
import { PaginationFooter } from "@/components/datasets/PaginationFooter";

export default function DatasetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit] = useState(50);

  const { data: dataset, isLoading: datasetLoading } = useQuery({
    queryKey: ["dataset", id],
    queryFn: () => datasetApi.get(id!),
    enabled: !!id,
  });
  
  const { data: measurements, isLoading: measurementsLoading } = useQuery({
    queryKey: ["data", id, page],
    queryFn: () =>
      datasetApi.getData(id!, {
        limit,
        offset: page * limit,
      }),
    enabled: !!id,
  });

  if (datasetLoading || !dataset) {
    return <DatasetDetailLoadingState />;
  }

  const data = measurements?.measurements || [];
  const columns = dataset?.columns || [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DatasetDetailHeader
        dataset={dataset}
        onBack={() => navigate("/datasets")}
        onExport={() => {
          // TODO: Implement download
          alert("Fonctionnalité de téléchargement à venir");
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DatasetInfoCards dataset={dataset} />
        <ColumnMappingCard columnMapping={dataset.columnMapping} />
        <ColumnsSchemaCard columns={columns} />
        <TagsCard tags={dataset.tags || []} />
        <BoundingBoxCard boundingBox={dataset.boundingBox} />

        <DataTable
          columns={columns}
          data={data}
          isLoading={measurementsLoading}
          total={measurements?.total || 0}
          page={page}
          limit={limit}
          onPageChange={setPage}
        />

        {!measurementsLoading && data.length > 0 && (
          <PaginationFooter
            page={page}
            limit={limit}
            total={measurements?.total || 0}
            onPageChange={setPage}
          />
        )}
      </main>
    </div>
  );
}
