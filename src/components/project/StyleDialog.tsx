import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectLayer } from "@/lib/api";

interface StyleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  layer: ProjectLayer | null;
  onSave: (style: { color: string; size: number; opacity: number }) => void;
}

export function StyleDialog({ open, onOpenChange, layer, onSave }: StyleDialogProps) {
  const [color, setColor] = useState("#FF6333");
  const [size, setSize] = useState(8);
  const [opacity, setOpacity] = useState(0.8);

  useEffect(() => {
    if (layer?.layerStyle) {
      setColor(layer.layerStyle.color || "#FF6333");
      setSize(layer.layerStyle.size || 8);
      setOpacity(layer.layerStyle.opacity || 0.8);
    }
  }, [layer]);

  const handleSave = () => {
    onSave({ color, size, opacity });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Style du Layer</DialogTitle>
          <DialogDescription>Personnalisez l'apparence des points</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium mb-2">Couleur</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20 rounded border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-1 h-10 px-3 rounded border border-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Taille: {size}px</label>
            <input
              type="range"
              min="3"
              max="20"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Opacité: {(opacity * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Aperçu</p>
            <div className="flex items-center gap-3">
              <div
                className="rounded-full"
                style={{
                  width: size * 2,
                  height: size * 2,
                  backgroundColor: color,
                  opacity: opacity,
                }}
              />
              <span className="text-sm text-gray-600">Point sur la carte</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="bg-hyreveal-500 hover:bg-hyreveal-600" onClick={handleSave}>
            Appliquer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
