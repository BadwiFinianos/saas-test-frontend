import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";

interface FileAnalysisSuccessProps {
  fileName: string;
  columnCount: number;
  rowCount: number;
  onReset: () => void;
}

export function FileAnalysisSuccess({
  fileName,
  columnCount,
  rowCount,
  onReset,
}: FileAnalysisSuccessProps) {
  return (
    <Card className="bg-green-50 border-green-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-green-900">
              Fichier analysé avec succès
            </p>
            <p className="text-sm text-green-700 mt-1">
              {fileName} • {columnCount} colonnes • {rowCount} lignes
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onReset}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
