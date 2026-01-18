import { useState, useEffect } from "react";
import { useMap, Rectangle } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import type { LeafletMouseEvent } from "leaflet";

export function AreaSelector() {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleMouseDown = (e: LeafletMouseEvent) => {
      if (!isSelecting) return;
      
      setIsDragging(true);
      setStartPoint([e.latlng.lat, e.latlng.lng]);
      setEndPoint([e.latlng.lat, e.latlng.lng]);
      
      // Disable map dragging during selection
      map.dragging.disable();
    };

    const handleMouseMove = (e: LeafletMouseEvent) => {
      if (!isSelecting || !isDragging || !startPoint) return;
      
      setEndPoint([e.latlng.lat, e.latlng.lng]);
    };

    const handleMouseUp = (e: LeafletMouseEvent) => {
      if (!isSelecting || !isDragging || !startPoint) return;
      
      setIsDragging(false);
      setEndPoint([e.latlng.lat, e.latlng.lng]);
      
      // Re-enable map dragging
      map.dragging.enable();
      
      // Create bounds and zoom
      const L = (window as any).L;
      const bounds = L.latLngBounds(startPoint, [e.latlng.lat, e.latlng.lng]);
      
      // Only zoom if the selection is meaningful (not just a click)
      const minDistance = 0.001; // roughly 100 meters
      const distance = Math.abs(startPoint[0] - e.latlng.lat) + Math.abs(startPoint[1] - e.latlng.lng);
      
      if (distance > minDistance) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
      
      // Reset after a short delay to show the final rectangle
      setTimeout(() => {
        setStartPoint(null);
        setEndPoint(null);
        setIsSelecting(false);
      }, 300);
    };

    map.on('mousedown', handleMouseDown);
    map.on('mousemove', handleMouseMove);
    map.on('mouseup', handleMouseUp);

    return () => {
      map.off('mousedown', handleMouseDown);
      map.off('mousemove', handleMouseMove);
      map.off('mouseup', handleMouseUp);
    };
  }, [map, isSelecting, isDragging, startPoint]);

  useEffect(() => {
    if (map) {
      if (isSelecting) {
        map.getContainer().style.cursor = 'crosshair';
      } else {
        map.getContainer().style.cursor = '';
      }
    }
  }, [isSelecting, map]);

  return (
    <>
      {/* Selection Button */}
      <div className="leaflet-top leaflet-right" style={{ zIndex: 1000, marginTop: '10px', marginRight: '10px' }}>
        <div className="leaflet-control leaflet-bar bg-white">
          <Button
            size="sm"
            variant={isSelecting ? "default" : "outline"}
            className={`rounded h-8 w-8 p-0 ${isSelecting ? 'bg-hyreveal-500 hover:bg-hyreveal-600' : ''}`}
            onClick={() => {
              setIsSelecting(!isSelecting);
              setStartPoint(null);
              setEndPoint(null);
              setIsDragging(false);
            }}
            title="Drag to select an area"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selection Rectangle */}
      {startPoint && endPoint && (
        <Rectangle
          bounds={[startPoint, endPoint]}
          pathOptions={{ 
            color: "#FF6333", 
            weight: 2, 
            fillOpacity: isDragging ? 0.1 : 0.15,
            dashArray: isDragging ? '5, 5' : undefined,
          }}
        />
      )}
    </>
  );
}
