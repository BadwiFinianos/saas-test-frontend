import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";

interface MapUpdaterProps {
  layersData: any[];
}

export function MapUpdater({ layersData }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    if (!layersData || layersData.length === 0) return;

    const allPoints: [number, number][] = [];

    layersData.forEach((layerData) => {
      const lonCol = layerData.dataset?.columns?.find((col: any) => col.isLongitude)?.name;
      const latCol = layerData.dataset?.columns?.find((col: any) => col.isLatitude)?.name;

      if (!lonCol || !latCol) return;

      layerData.measurements?.forEach((point: any) => {
        const lon = point[lonCol];
        const lat = point[latCol];

        if (lon && lat && !isNaN(lon) && !isNaN(lat)) {
          allPoints.push([lat, lon]);
        }
      });
    });

    if (allPoints.length > 0) {
      try {
        const bounds: LatLngBoundsExpression = allPoints;
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 15,
        });
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [layersData, map]);

  return null;
}
