import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Dataset, Project } from "@/lib/api";

interface AddLayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | undefined;
  filteredDatasets: Dataset[] | undefined;
  onAddLayer: (datasetId: string) => void;
  isPending: boolean;
}

export function AddLayerDialog({
  open,
  onOpenChange,
  project,
  filteredDatasets,
  onAddLayer,
  isPending,
}: AddLayerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Ajouter un Layer</DialogTitle>
          <DialogDescription>
            Sélectionnez un dataset pour créer un nouveau layer ({project?.projectType})
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          {!filteredDatasets || filteredDatasets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucun dataset disponible</p>
              <p className="text-sm text-gray-500 mt-1">
                Tous les datasets compatibles sont déjà utilisés
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredDatasets.map((dataset) => (
                <button
                  key={dataset.id}
                  onClick={() => onAddLayer(dataset.id)}
                  disabled={isPending}
                  className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-hyreveal-300 hover:bg-hyreveal-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{dataset.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {dataset.description || "Aucune description"}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                        <span>{dataset.rowCount?.toLocaleString("fr-FR")} lignes</span>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                          {dataset.dataType}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
