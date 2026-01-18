import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ProjectLayer } from "@/lib/api";

interface DataAnalysisPanelProps {
  layersData: any[];
  layers: ProjectLayer[];
}

export function DataAnalysisPanel({ layersData, layers }: DataAnalysisPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!layersData || layersData.length === 0) return null;

    const allMeasurements: any[] = [];
    layersData.forEach(ld => {
      allMeasurements.push(...(ld.measurements || []));
    });

    if (allMeasurements.length === 0) return null;

    // Get numeric columns
    const samplePoint = allMeasurements[0];
    const numericColumns = Object.keys(samplePoint).filter(key => {
      const value = samplePoint[key];
      return !["id", "_row_index", "_geom"].includes(key) && !isNaN(parseFloat(value));
    });

    // Calculate stats for each column
    const columnStats: any = {};
    numericColumns.forEach(col => {
      const values = allMeasurements
        .map(m => parseFloat(m[col]))
        .filter(v => !isNaN(v));

      if (values.length > 0) {
        columnStats[col] = {
          min: Math.min(...values),
          max: Math.max(...values),
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          count: values.length,
        };
      }
    });

    return {
      totalPoints: allMeasurements.length,
      columns: columnStats,
    };
  }, [layersData]);

  if (collapsed) {
    return (
      <div className="h-12 bg-white border-t border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Analyse des données</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setCollapsed(false)}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-80 bg-white border-t border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-hyreveal-600" />
          <h2 className="text-sm font-semibold text-gray-900">Analyse des données</h2>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setCollapsed(true)}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-4 mt-4">
            {stats ? (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Vue d'ensemble</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Points totaux</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalPoints.toLocaleString("fr-FR")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Layers visibles</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {layers.filter(l => l.visible).length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {Object.entries(stats.columns).map(([col, data]: [string, any]) => (
                  <Card key={col}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{col}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">Min</p>
                          <p className="font-semibold">{data.min.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Max</p>
                          <p className="font-semibold">{data.max.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Moyenne</p>
                          <p className="font-semibold">{data.avg.toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Aucune donnée à analyser</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="distribution" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Distribution par Layer</CardTitle>
                <CardDescription className="text-xs">
                  Nombre de points par layer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {layersData.map((ld) => {
                    const layer = layers.find(l => l.id === ld.layer?.id);
                    if (!layer) return null;

                    const percentage = stats
                      ? ((ld.measurements?.length || 0) / stats.totalPoints) * 100
                      : 0;

                    return (
                      <div key={ld.layer.id}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: layer.layerStyle?.color }}
                            />
                            <span className="text-gray-700">{ld.dataset?.name}</span>
                          </div>
                          <span className="text-gray-500">
                            {ld.measurements?.length || 0} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: layer.layerStyle?.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
