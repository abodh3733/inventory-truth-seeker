
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Database, Key, Shield, GitBranch } from 'lucide-react';
import { SchemaMetric, getSchemaHealthScore, getSchemaIssuesSummary } from '@/data/schemaData';

interface SchemaOverviewProps {
  data: SchemaMetric[];
}

export const SchemaOverview: React.FC<SchemaOverviewProps> = ({ data }) => {
  const healthScore = getSchemaHealthScore(data);
  const issuesSummary = getSchemaIssuesSummary(data);
  const totalColumns = data.reduce((sum, table) => sum + table.columnCount, 0);
  const totalConstraints = data.reduce((sum, table) => sum + table.constraints.length, 0);
  const totalForeignKeys = data.reduce((sum, table) => sum + table.foreignKeys.length, 0);

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Schema Health Score */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Schema Health Score</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getHealthColor(healthScore)}`}>
            {healthScore}%
          </div>
          <p className="text-xs text-muted-foreground">
            {issuesSummary.healthy} of {issuesSummary.total} tables healthy
          </p>
        </CardContent>
      </Card>

      {/* Total Tables */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tables</CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.length}</div>
          <div className="flex gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {totalColumns} columns
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Schema Issues */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {issuesSummary.critical + issuesSummary.warning}
          </div>
          <div className="flex gap-1 mt-1">
            {issuesSummary.critical > 0 && (
              <Badge variant="destructive" className="text-xs">
                {issuesSummary.critical} critical
              </Badge>
            )}
            {issuesSummary.warning > 0 && (
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                {issuesSummary.warning} warning
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Integrity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Data Integrity</CardTitle>
          <Key className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalConstraints + totalForeignKeys}</div>
          <div className="flex gap-1 mt-1">
            <Badge variant="outline" className="text-xs">
              {totalConstraints} constraints
            </Badge>
            <Badge variant="outline" className="text-xs">
              {totalForeignKeys} FK
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
