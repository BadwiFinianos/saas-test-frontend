import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MapContainer, TileLayer } from "react-leaflet";
import { datasetApi, projectApi, type ProjectLayer } from "@/lib/api";
import { AreaSelector } from "@/components/project/AreaSelector";
import { MapUpdater } from "@/components/project/MapUpdater";
import { MapLegend } from "@/components/project/MapLegend";
import { DataAnalysisPanel } from "@/components/project/DataAnalysisPanel";
import { StyleDialog } from "@/components/project/StyleDialog";
import { LayerList } from "@/components/project/LayerList";
import { AddLayerDialog } from "@/components/project/AddLayerDialog";
import { ProjectSidebar } from "@/components/project/ProjectSidebar";
import { MapMarkers } from "@/components/project/MapMarkers";
import "leaflet/dist/leaflet.css";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<ProjectLayer | null>(null);
  const [styleDialogOpen, setStyleDialogOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522]);
  const [mapZoom, setMapZoom] = useState(13);

  // Fetch project
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectApi.get(id!),
    enabled: !!id,
  });

  // Fetch layers
  const { data: layers, isLoading: layersLoading } = useQuery({
    queryKey: ["projectLayers", id],
    queryFn: () => projectApi.getLayers(id!),
    enabled: !!id,
  });

  // Fetch all datasets for adding
  const { data: availableDatasets } = useQuery({
    queryKey: ["availableDatasets", id],
    queryFn: () => datasetApi.list(),
    enabled: addDialogOpen && !!id,
  });

  // Fetch layer data for map rendering
  const { data: layersData } = useQuery({
    queryKey: ["layersData", id, layers?.map((l) => l.id).join(",")],
    queryFn: async () => {
      if (!layers || layers.length === 0) return [];

      const promises = layers
        .filter((l) => l.visible)
        .map((layer) => projectApi.getLayerData(id!, layer.id));

      return Promise.all(promises);
    },
    enabled: !!layers && layers.length > 0 && !!id,
  });

  // Add layer mutation
  const addLayerMutation = useMutation({
    mutationFn: (datasetId: string) => projectApi.addLayer(id!, datasetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectLayers", id] });
      setAddDialogOpen(false);
    },
  });

  // Update layer mutation
  const updateLayerMutation = useMutation({
    mutationFn: ({ layerId, updates }: any) =>
      projectApi.updateLayer(id!, layerId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectLayers", id] });
      queryClient.invalidateQueries({ queryKey: ["layersData", id] });
    },
  });

  // Remove layer mutation
  const removeLayerMutation = useMutation({
    mutationFn: (layerId: string) => projectApi.removeLayer(id!, layerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectLayers", id] });
    },
  });

  // Reorder layers mutation
  const reorderMutation = useMutation({
    mutationFn: (layerOrders: Array<{ layer_id: string; order: number }>) =>
      projectApi.reorderLayers(id!, layerOrders),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectLayers", id] });
    },
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination || !layers) return;

    const items = Array.from(layers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const layerOrders = items.map((layer, index) => ({
      layer_id: layer.id,
      order: index,
    }));

    reorderMutation.mutate(layerOrders);
  };

  const toggleVisibility = (layer: ProjectLayer) => {
    updateLayerMutation.mutate({
      layerId: layer.id,
      updates: { visible: !layer.visible },
    });
  };

  const openStyleDialog = (layer: ProjectLayer) => {
    setSelectedLayer(layer);
    setStyleDialogOpen(true);
  };

  const updateStyle = (newStyle: any) => {
    if (!selectedLayer) return;

    updateLayerMutation.mutate({
      layerId: selectedLayer.id,
      updates: { layerStyle: newStyle },
    });

    setStyleDialogOpen(false);
    setSelectedLayer(null);
  };

  if (projectLoading || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-hyreveal-500"></div>
          <p className="mt-4 text-gray-600">Chargement du projet...</p>
        </div>
      </div>
    );
  }

  // Filter datasets already used in layers
  const filteredDatasets = availableDatasets?.filter((dataset) => {
    const usedDatasetIds = layers?.map((l) => l.dataset_id) || [];
    if (usedDatasetIds.includes(dataset.id)) return false;

    if (project.projectType === "2D") {
      return dataset.dataType === "2D";
    } else if (project.projectType === "3D") {
      return dataset.dataType === "2D" || dataset.dataType === "3D";
    }
    return false;
  });


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Layers */}
        <ProjectSidebar project={project} onBack={() => navigate("/projects")}>
          <LayerList
            layers={layers}
            layersLoading={layersLoading}
            onAddLayer={() => setAddDialogOpen(true)}
            onToggleVisibility={toggleVisibility}
            onOpenStyleDialog={openStyleDialog}
            onRemoveLayer={(layerId) => removeLayerMutation.mutate(layerId)}
            onDragEnd={handleDragEnd}
          />
        </ProjectSidebar>

        {/* Right Content - Map */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              className="absolute inset-0"
              style={{ zIndex: 0 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={20}
              />

              <MapUpdater layersData={layersData || []} />
              <AreaSelector />
              {layers && <MapLegend layers={layers} />}
              <MapMarkers layersData={layersData} layers={layers} />
            </MapContainer>
          </div>

          {/* Data Analysis Panel */}
          <DataAnalysisPanel layersData={layersData || []} layers={layers || []} />
        </main>
      </div>

      {/* Dialogs */}
      <AddLayerDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        project={project}
        filteredDatasets={filteredDatasets}
        onAddLayer={(datasetId) => addLayerMutation.mutate(datasetId)}
        isPending={addLayerMutation.isPending}
      />

      <StyleDialog
        open={styleDialogOpen}
        onOpenChange={setStyleDialogOpen}
        layer={selectedLayer}
        onSave={updateStyle}
      />
    </div>
  );
}