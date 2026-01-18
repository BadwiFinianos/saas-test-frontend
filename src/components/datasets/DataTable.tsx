import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Database } from 'lucide-react';

interface Column {
  name: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  isLoading: boolean;
  total: number;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export function DataTable({
  columns,
  data,
  isLoading,
  total,
  page,
  limit,
  onPageChange,
}: DataTableProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Données du Dataset</CardTitle>
            <CardDescription>
              {isLoading
                ? "Chargement..."
                : `${total.toLocaleString("fr-FR")} lignes au total`}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.max(0, page - 1))}
              disabled={page === 0 || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              Page {page + 1} / {totalPages || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1 || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-hyreveal-500"></div>
            <p className="mt-4 text-gray-600">Chargement des données...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">Aucune donnée disponible</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    #
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col?.name}
                      className="px-4 py-3 text-left font-semibold text-gray-700"
                    >
                      {col?.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                      {page * limit + idx + 1}
                    </td>
                    {columns.map((col) => (
                      <td
                        key={`${col?.name}_${idx}`}
                        className="px-4 py-3 text-gray-900"
                      >
                        {row[col?.name] !== null &&
                        row[col?.name] !== undefined ? (
                          String(row[col?.name])
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
