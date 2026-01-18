import { useDropzone } from "react-dropzone";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
}

export function FileDropzone({ onDrop }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
    },
    maxFiles: 1,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sélectionner un fichier</CardTitle>
        <CardDescription>
          Formats supportés: CSV, XLS, XLSX
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragActive
                ? "border-hyreveal-500 bg-hyreveal-50"
                : "border-gray-300 hover:border-hyreveal-400 hover:bg-gray-50"
            }
          `}
        >
          <input {...getInputProps()} />
          <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p className="text-lg font-medium text-hyreveal-600">
              Déposez le fichier ici...
            </p>
          ) : (
            <>
              <p className="text-lg font-medium text-gray-900 mb-2">
                Glissez-déposez un fichier ici
              </p>
              <p className="text-sm text-gray-500 mb-4">
                ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-gray-400">
                CSV, XLS, XLSX (max 50 Mo)
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
