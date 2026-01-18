import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ProjectLayer } from "@/lib/api";

interface MapLegendProps {
  layers: ProjectLayer[];
}

export function MapLegend({ layers }: MapLegendProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (!layers || layers.filter(l => l.visible).length === 0) return null;

  return (
    <div className="leaflet-bottom leaflet-left" style={{ zIndex: 1000, marginBottom: '20px', marginLeft: '10px' }}>
      <div className="leaflet-control bg-white rounded-lg shadow-lg p-3 max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-900">Légende</h3>
          <Button
            size="sm"
            variant="ghost"
            className="h-5 w-5 p-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </Button>
        </div>
        
        {!collapsed && (
          <div className="space-y-1.5">
            {layers.filter(l => l.visible).map((layer) => (
              <div key={layer.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: layer.layerStyle?.color || "#FF6333" }}
                />
                <span className="text-xs text-gray-700 truncate">
                  {layer.dataset?.name}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {layer.dataset?.rowCount?.toLocaleString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
