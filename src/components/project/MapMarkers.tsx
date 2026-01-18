import { CircleMarker, Popup } from "react-leaflet";
import type { ProjectLayer } from "@/lib/api";

interface MapMarkersProps {
  layersData: any[] | undefined;
  layers: ProjectLayer[] | undefined;
}

export function MapMarkers({ layersData, layers }: MapMarkersProps) {
  if (!layersData || !layers) return null;

  return (
    <>
      {layersData.map((layerData) => {
        const layer = layers.find((l) => l.id === layerData.layer?.id);
        if (!layer || !layer.visible) return null;

        const lonCol = layerData.dataset?.columns?.find((col: any) => col.isLongitude)?.name;
        const latCol = layerData.dataset?.columns?.find((col: any) => col.isLatitude)?.name;

        if (!lonCol || !latCol) return null;

        return layerData.measurements?.map((point: any, idx: number) => {
          const lon = point[lonCol];
          const lat = point[latCol];

          if (!lon || !lat || isNaN(lon) || isNaN(lat)) return null;

          return (
            <CircleMarker
              key={`${layer.id}-${idx}`}
              center={[lat, lon]}
              radius={layer.layerStyle?.size || 8}
              fillColor={layer.layerStyle?.color || "#FF6333"}
              color={layer.layerStyle?.color || "#FF6333"}
              fillOpacity={layer.layerStyle?.opacity || 0.8}
              weight={2}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold mb-1">
                    {layerData.dataset?.name || "Dataset"}
                  </p>
                  {Object.entries(point)
                    .filter(([key]) => !["id", "_row_index", "_geom"].includes(key))
                    .slice(0, 5)
                    .map(([key, value]) => (
                      <p key={key} className="text-xs">
                        <span className="font-medium">{key}:</span> {String(value)}
                      </p>
                    ))}
                </div>
              </Popup>
            </CircleMarker>
          );
        });
      })}
    </>
  );
}
