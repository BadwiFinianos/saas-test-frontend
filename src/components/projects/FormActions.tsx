import { Button } from '@/components/ui/button';
import { Save, Loader2 } from 'lucide-react';

interface FormActionsProps {
  isEdit: boolean;
  isPending: boolean;
  onCancel: () => void;
  disabled?: boolean;
}

export function FormActions({ isEdit, isPending, onCancel, disabled }: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={disabled || isPending}
      >
        Annuler
      </Button>
      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700"
        disabled={disabled || isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEdit ? 'Enregistrer' : 'Créer le projet'}
          </>
        )}
      </Button>
    </div>
  );
}
