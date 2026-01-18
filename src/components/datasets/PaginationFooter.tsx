import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationFooterProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function PaginationFooter({
  page,
  limit,
  total,
  onPageChange,
}: PaginationFooterProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
      <div>
        Affichage de {page * limit + 1} à{" "}
        {Math.min((page + 1) * limit, total)} sur{" "}
        {total.toLocaleString("fr-FR")} lignes
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(0, page - 1))}
          disabled={page === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
        >
          Suivant
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
