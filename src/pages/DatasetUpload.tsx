import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { datasetApi } from "@/lib/api";
import { UploadHeader } from "@/components/datasets/UploadHeader";
import { FileDropzone } from "@/components/datasets/FileDropzone";
import { FileAnalysisSuccess } from "@/components/datasets/FileAnalysisSuccess";
import { DatasetBasicInfo } from "@/components/datasets/DatasetBasicInfo";
import { ColumnMappingSection } from "@/components/datasets/ColumnMappingSection";
import { DataPreviewTable } from "@/components/datasets/DataPreviewTable";
import { UploadErrorAlert } from "@/components/datasets/UploadErrorAlert";
import { UploadActions } from "@/components/datasets/UploadActions";
import { parseSemicolonCSVFrontend } from "@/lib/utils";
interface ExcelAnalysis {
  headers: string[];
  rows: any[];
}

export default function DatasetUpload() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<ExcelAnalysis | null>(null);
  const [step, setStep] = useState<"upload" | "configure">("upload");

  // Form data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dataType, setDataType] = useState<"2D" | "3D" | "NON_GEO">("2D");
  const [tags, setTags] = useState("");
  const [longitudeCol, setLongitudeCol] = useState("");
  const [latitudeCol, setLatitudeCol] = useState("");
  const [altitudeCol, setAltitudeCol] = useState("");

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("🚀 Uploading dataset...");
      const result = await datasetApi.create(formData);
      console.log("✅ Upload response:", result);
      return result;
    },
    onSuccess: async (data: any) => {
      console.log("✅ Upload successful, navigating to:", data.id);
      // Invalidate and refetch datasets list before navigating
      await queryClient.invalidateQueries({ queryKey: ['datasets'] });
      await queryClient.refetchQueries({ queryKey: ['datasets'] });
      navigate("/datasets");
    },
    onError: (error: any) => {
      console.error("❌ Upload error:", error);
      console.error("Error response:", error?.response?.data);
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFile(file);
    setName(file.name.replace(/\.[^/.]+$/, "")); // Remove extension

    // Parse Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;

        // 🔍 Detect delimiter for CSV
        const previewText = new TextDecoder("utf-8").decode(
          arrayBuffer.slice(0, 1024),
        );

        const hasSemicolon = previewText.includes(";");
        const hasComma = previewText.includes(",");

        let headers: string[] = [];
        let rows: any[] = [];

        // 🟢 SEMICOLON CSV (manual parsing)
        if (file.type === "text/csv" && hasSemicolon && !hasComma) {
          const parsed = parseSemicolonCSVFrontend(arrayBuffer);
          headers = parsed.headers;
          rows = parsed.rows;
        }
        // 🟢 XLS / XLSX / comma CSV (SheetJS)
        else {
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const jsonData = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            raw: false,
          }) as any[][];

          if (jsonData.length === 0) {
            alert("Fichier vide");
            return;
          }

          headers = jsonData[0].map((h) => String(h).trim());
          rows = jsonData
            .slice(1)
            .filter((row) =>
              row.some(
                (cell) => cell !== null && cell !== undefined && cell !== "",
              ),
            )
            .map((row) => {
              const obj: any = {};
              headers.forEach((header, idx) => {
                if (
                  row[idx] !== null &&
                  row[idx] !== undefined &&
                  row[idx] !== ""
                ) {
                  obj[header] = row[idx];
                }
              });
              return obj;
            });
        }

        // 🔎 Auto-detect lon/lat/alt
        const lonPatterns = ["lon", "longitude", "lng", "x", "centroid_lon"];
        const latPatterns = ["lat", "latitude", "y", "centroid_lat"];
        const altPatterns = ["alt", "altitude", "z", "elevation", "height"];

        const detectedLon = headers.find((h) =>
          lonPatterns.some((p) => h.toLowerCase().includes(p)),
        );
        const detectedLat = headers.find((h) =>
          latPatterns.some((p) => h.toLowerCase().includes(p)),
        );
        const detectedAlt = headers.find((h) =>
          altPatterns.some((p) => h.toLowerCase().includes(p)),
        );

        if (detectedLon) setLongitudeCol(detectedLon);
        if (detectedLat) setLatitudeCol(detectedLat);
        if (detectedAlt) setAltitudeCol(detectedAlt);

        setAnalysis({
          headers,
          rows,
        });

        setStep("configure");
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Erreur lors de l'analyse du fichier");
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !analysis) return;

    if (dataType !== "NON_GEO" && (!longitudeCol || !latitudeCol)) {
      alert("Veuillez sélectionner les colonnes longitude et latitude");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    if (description) formData.append("description", description);
    formData.append("dataType", dataType);
    if (tags)
      formData.append(
        "tags",
        JSON.stringify(tags.split(",").map((t) => t.trim())),
      );

    const columnMapping: any = {};
    if (longitudeCol) columnMapping.longitude = longitudeCol;
    if (latitudeCol) columnMapping.latitude = latitudeCol;
    if (altitudeCol) columnMapping.altitude = altitudeCol;
    formData.append("columnMapping", JSON.stringify(columnMapping));

    console.log("📤 Submitting form data...");
    uploadMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UploadHeader
        onBack={() => navigate("/datasets")}
        disabled={uploadMutation.isPending}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === "upload" && (
          <FileDropzone onDrop={onDrop} />
        )}

        {step === "configure" && analysis && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <FileAnalysisSuccess
              fileName={file?.name || ""}
              columnCount={analysis.headers.length}
              rowCount={analysis.rows.length}
              onReset={() => {
                setFile(null);
                setAnalysis(null);
                setStep("upload");
              }}
            />

            <DatasetBasicInfo
              name={name}
              description={description}
              dataType={dataType}
              tags={tags}
              onNameChange={setName}
              onDescriptionChange={setDescription}
              onDataTypeChange={setDataType}
              onTagsChange={setTags}
            />

            <ColumnMappingSection
              dataType={dataType}
              headers={analysis.headers}
              longitudeCol={longitudeCol}
              latitudeCol={latitudeCol}
              altitudeCol={altitudeCol}
              onLongitudeChange={setLongitudeCol}
              onLatitudeChange={setLatitudeCol}
              onAltitudeChange={setAltitudeCol}
            />

            <DataPreviewTable
              headers={analysis.headers}
              rows={analysis.rows}
            />

            {uploadMutation.isError && (
              <UploadErrorAlert error={uploadMutation.error} />
            )}

            <UploadActions
              isPending={uploadMutation.isPending}
              onCancel={() => navigate("/datasets")}
            />
          </form>
        )}
      </main>
    </div>
  );
}
