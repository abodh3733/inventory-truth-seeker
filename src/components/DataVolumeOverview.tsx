
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingDown, TrendingUp, Database, AlertCircle } from 'lucide-react';
import { DataVolumeMetric } from '@/data/freshnessData';

interface DataVolumeOverviewProps {
  data: DataVolumeMetric[];
}

export const DataVolumeOverview: React.FC<DataVolumeOverviewProps> = ({ data }) => {
  const totalRows = data.reduce((sum, metric) => sum + metric.totalRowCount, 0);
  const totalExpectedRows = data.reduce((sum, metric) => sum + metric.expectedRowCount, 0);
  const totalSize = data.reduce((sum, metric) => sum + metric.tableSizeGB, 0);
  const totalDuplicates = data.reduce((sum, metric) => sum + metric.duplicateRowCount, 0);
  const totalNulls = data.reduce((sum, metric) => sum + metric.nullRowCount, 0);
  const avgVolumeDeviation = data.reduce((sum, metric) => sum + Math.abs(metric.volumeDeviation), 0) / data.length;
  const inconsistentPartitions = data.filter(m => m.partitionConsistency === 'inconsistent').length;

  const getDeviationColor = (deviation: number) => {
    if (Math.abs(deviation) <= 2) return 'text-green-600';
    if (Math.abs(deviation) <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Volume */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRows.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Expected: {totalExpectedRows.toLocaleString()}
          </p>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              {totalSize.toFixed(1)} GB
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Volume Deviation */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Deviation</CardTitle>
          {avgVolumeDeviation > 0 ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : (
            <TrendingUp className="h-4 w-4 text-green-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getDeviationColor(avgVolumeDeviation)}`}>
            {avgVolumeDeviation.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            From expected volume
          </p>
        </CardContent>
      </Card>

      {/* Data Quality Issues */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Quality Issues</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {totalDuplicates + totalNulls}
          </div>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              {totalDuplicates} duplicates
            </Badge>
            <Badge variant="outline" className="text-xs">
              {totalNulls} nulls
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Partition Consistency */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Partition Health</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${inconsistentPartitions > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {data.length - inconsistentPartitions}/{data.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Consistent partitions
          </p>
          {inconsistentPartitions > 0 && (
            <Badge variant="destructive" className="text-xs mt-1">
              {inconsistentPartitions} inconsistent
            </Badge>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
