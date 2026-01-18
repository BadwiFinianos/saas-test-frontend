import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
  Palette,
} from "lucide-react";
import type { ProjectLayer } from "@/lib/api";

interface LayerListProps {
  layers: ProjectLayer[] | undefined;
  layersLoading: boolean;
  onAddLayer: () => void;
  onToggleVisibility: (layer: ProjectLayer) => void;
  onOpenStyleDialog: (layer: ProjectLayer) => void;
  onRemoveLayer: (layerId: string) => void;
  onDragEnd: (result: any) => void;
}

export function LayerList({
  layers,
  layersLoading,
  onAddLayer,
  onToggleVisibility,
  onOpenStyleDialog,
  onRemoveLayer,
  onDragEnd,
}: LayerListProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-hyreveal-600" />
          <h2 className="text-sm font-semibold text-gray-900">Layers</h2>
          <span className="text-xs text-gray-500">
            ({layers?.length || 0})
          </span>
        </div>
        <Button
          size="sm"
          className="bg-hyreveal-500 hover:bg-hyreveal-600 h-7 px-2"
          onClick={onAddLayer}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          <span className="text-xs">Ajouter</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {layersLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-hyreveal-500"></div>
          </div>
        ) : !layers || layers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <Layers className="h-12 w-12 text-gray-300 mb-3" />
            <p className="text-sm text-gray-600 text-center mb-4">
              Aucun layer dans ce projet
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={onAddLayer}
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un layer
            </Button>
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="layers">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="p-2 space-y-1"
                >
                  {layers.map((layer, index) => (
                    <Draggable
                      key={layer.id}
                      draggableId={layer.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`group relative rounded-lg border transition-all ${
                            snapshot.isDragging
                              ? "border-hyreveal-300 bg-hyreveal-50 shadow-lg"
                              : layer.visible
                                ? "border-gray-200 bg-white hover:border-hyreveal-200 hover:bg-gray-50"
                                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center gap-2 p-2">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move"
                            >
                              <GripVertical className="h-4 w-4 text-gray-400" />
                            </div>

                            <div
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: layer.layerStyle?.color || "#FF6333",
                              }}
                            />

                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  layer.visible ? "text-gray-900" : "text-gray-500"
                                }`}
                              >
                                {layer.dataset?.name || "Sans dataset"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {layer.dataset?.rowCount?.toLocaleString("fr-FR") || "0"} pts
                              </p>
                            </div>

                            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => onToggleVisibility(layer)}
                              >
                                {layer.visible ? (
                                  <Eye className="h-3.5 w-3.5 text-gray-600" />
                                ) : (
                                  <EyeOff className="h-3.5 w-3.5 text-gray-400" />
                                )}
                              </Button>

                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0"
                                onClick={() => onOpenStyleDialog(layer)}
                              >
                                <Palette className="h-3.5 w-3.5 text-gray-600" />
                              </Button>

                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                                onClick={() => {
                                  if (confirm("Retirer ce layer ?")) {
                                    onRemoveLayer(layer.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
