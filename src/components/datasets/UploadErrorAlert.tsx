import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface UploadErrorAlertProps {
  error: any;
}

export function UploadErrorAlert({ error }: UploadErrorAlertProps) {
  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium text-red-900">
              Erreur lors du téléchargement
            </p>
            <p className="text-sm text-red-700 mt-1">
              {error?.response?.data?.error ||
                error?.message ||
                "Une erreur est survenue. Veuillez réessayer."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
