import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ParsedExcelData {
  headers: string[];
  rows: any[];
}

export function parseSemicolonCSVFrontend(
  arrayBuffer: ArrayBuffer,
): ParsedExcelData {
  const text = new TextDecoder("utf-8").decode(arrayBuffer);
  const lines = text.split(/\r?\n/).filter((line) => line.trim());

  if (lines.length === 0) {
    throw new Error("Empty file");
  }

  const headerLine = lines[0].replace(/^"|"$/g, "");
  const headers = headerLine.split(";").map((h) => h.trim());

  const rows = lines.slice(1).map((line) => {
    const cleanLine = line.replace(/^"|"$/g, "");
    const values = cleanLine.split(";");

    const obj: any = {};
    headers.forEach((header, idx) => {
      if (values[idx] !== undefined && values[idx] !== "") {
        obj[header] = values[idx].trim();
      }
    });
    return obj;
  });

  return { headers, rows };
}
