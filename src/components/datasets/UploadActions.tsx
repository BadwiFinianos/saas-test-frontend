import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

interface UploadActionsProps {
  isPending: boolean;
  onCancel: () => void;
}

export function UploadActions({ isPending, onCancel }: UploadActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isPending}
      >
        Annuler
      </Button>
      <Button
        type="submit"
        className="bg-hyreveal-500 hover:bg-hyreveal-600"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Téléchargement...
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Télécharger Dataset
          </>
        )}
      </Button>
    </div>
  );
}
