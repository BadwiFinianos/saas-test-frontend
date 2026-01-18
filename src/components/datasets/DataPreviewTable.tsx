import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataPreviewTableProps {
  headers: string[];
  rows: any[];
}

export function DataPreviewTable({ headers, rows }: DataPreviewTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aperçu des données</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="text-left p-2 font-semibold"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b">
                  {headers.map((header) => (
                    <td key={header} className="p-2">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
