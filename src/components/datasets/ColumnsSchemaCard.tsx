import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Column {
  name: string;
  type: string;
}

interface ColumnsSchemaCardProps {
  columns: Column[];
}

export function ColumnsSchemaCard({ columns }: ColumnsSchemaCardProps) {
  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Schéma des Colonnes</CardTitle>
        <CardDescription>
          {columns.length} colonnes • Types détectés automatiquement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {columns.map((col, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {col.name}
                </p>
              </div>
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  col.type === "decimal"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {col.type === "decimal" ? "Number" : "Text"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
