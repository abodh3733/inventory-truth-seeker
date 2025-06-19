
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { DataDistributionMetric } from '@/data/freshnessData';

interface DataDistributionTableProps {
  data: DataDistributionMetric[];
}

export const DataDistributionTable: React.FC<DataDistributionTableProps> = ({ data }) => {
  const formatValue = (value: string | number | undefined) => {
    if (value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') {
      return value % 1 === 0 ? value.toString() : value.toFixed(2);
    }
    return value.toString();
  };

  const getNullBadgeVariant = (percentage: number) => {
    if (percentage === 0) return 'default';
    if (percentage <= 5) return 'secondary';
    if (percentage <= 15) return 'destructive';
    return 'destructive';
  };

  const getUniqueBadgeVariant = (percentage: number) => {
    if (percentage >= 95) return 'default';
    if (percentage >= 80) return 'secondary';
    return 'destructive';
  };

  // Group by table for better organization
  const groupedData = data.reduce((acc, metric) => {
    if (!acc[metric.tableName]) {
      acc[metric.tableName] = [];
    }
    acc[metric.tableName].push(metric);
    return acc;
  }, {} as Record<string, DataDistributionMetric[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedData).map(([tableName, metrics]) => (
        <Card key={tableName}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {tableName} - Data Distribution Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Column</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Mean</TableHead>
                  <TableHead>Median</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Std Dev</TableHead>
                  <TableHead>Min/Max</TableHead>
                  <TableHead>Nulls</TableHead>
                  <TableHead>Uniqueness</TableHead>
                  <TableHead>Last Profiled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell className="font-medium">{metric.columnName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{metric.dataType}</Badge>
                    </TableCell>
                    <TableCell>{formatValue(metric.mean)}</TableCell>
                    <TableCell>{formatValue(metric.median)}</TableCell>
                    <TableCell>{formatValue(metric.mode)}</TableCell>
                    <TableCell>{formatValue(metric.standardDeviation)}</TableCell>
                    <TableCell className="text-sm">
                      {metric.minValue !== undefined && metric.maxValue !== undefined ? (
                        <div>
                          <div>Min: {formatValue(metric.minValue)}</div>
                          <div>Max: {formatValue(metric.maxValue)}</div>
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={getNullBadgeVariant(metric.nullPercentage)} className="text-xs">
                          {metric.nullPercentage.toFixed(1)}%
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {metric.nullCount.toLocaleString()} nulls
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={getUniqueBadgeVariant(metric.uniquePercentage)} className="text-xs">
                          {metric.uniquePercentage.toFixed(1)}%
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {metric.uniqueCount.toLocaleString()} unique
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(metric.lastProfiled).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
