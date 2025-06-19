
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, CheckCircle, TrendingUp, Database } from 'lucide-react';
import { FreshnessMetric } from '@/data/freshnessData';

interface FreshnessOverviewProps {
  data: FreshnessMetric[];
}

export const FreshnessOverview: React.FC<FreshnessOverviewProps> = ({ data }) => {
  const avgSlaCompliance = data.reduce((sum, metric) => sum + metric.slaCompliance, 0) / data.length;
  const criticalTables = data.filter(m => m.freshnessStatus === 'critical').length;
  const warningTables = data.filter(m => m.freshnessStatus === 'warning').length;
  const healthyTables = data.filter(m => m.freshnessStatus === 'within_sla').length;
  const totalRecordsAffected = data.reduce((sum, metric) => sum + metric.recordsAffected, 0);
  const avgDataAge = data.reduce((sum, metric) => sum + metric.dataAge, 0) / data.length;

  const getComplianceColor = (score: number) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* SLA Compliance */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getComplianceColor(avgSlaCompliance)}`}>
            {avgSlaCompliance.toFixed(1)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {healthyTables} of {data.length} tables within SLA
          </p>
        </CardContent>
      </Card>

      {/* Average Data Age */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Data Age</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgDataAge.toFixed(1)}h</div>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              Freshness metric
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Freshness Issues */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Freshness Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {criticalTables + warningTables}
          </div>
          <div className="flex gap-1 mt-1">
            {criticalTables > 0 && (
              <Badge variant="destructive" className="text-xs">
                {criticalTables} critical
              </Badge>
            )}
            {warningTables > 0 && (
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                {warningTables} warning
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Records Affected */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Records Affected</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRecordsAffected.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            By staleness issues
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
