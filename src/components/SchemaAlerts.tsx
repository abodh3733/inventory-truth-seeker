
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import { SchemaAlert } from '@/data/schemaData';

interface SchemaAlertsProps {
  alerts: SchemaAlert[];
  onResolveAlert?: (alertId: string) => void;
}

export const SchemaAlerts: React.FC<SchemaAlertsProps> = ({ alerts, onResolveAlert }) => {
  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: 'secondary',
      medium: 'outline',
      high: 'destructive',
      critical: 'destructive'
    } as const;
    
    const colors = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge variant={variants[severity as keyof typeof variants]} className={colors[severity as keyof typeof colors]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getAlertTypeIcon = (alertType: string) => {
    switch (alertType) {
      case 'schema_drift':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'column_missing':
        return <X className="h-4 w-4 text-red-600" />;
      case 'type_mismatch':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'constraint_violation':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'key_issue':
        return <AlertTriangle className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getAlertTypeName = (alertType: string) => {
    const names = {
      schema_drift: 'Schema Drift',
      column_missing: 'Column Missing',
      type_mismatch: 'Type Mismatch',
      constraint_violation: 'Constraint Violation',
      key_issue: 'Key Issue'
    };
    return names[alertType as keyof typeof names] || alertType;
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts.filter(alert => alert.resolved);

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Active Alerts ({activeAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeAlerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <p>No active schema alerts</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getAlertTypeIcon(alert.alertType)}
                        {getAlertTypeName(alert.alertType)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{alert.tableName}</TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell className="max-w-md">{alert.message}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onResolveAlert?.(alert.id)}
                      >
                        Resolve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Recently Resolved ({resolvedAlerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Resolved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resolvedAlerts.map((alert) => (
                  <TableRow key={alert.id} className="opacity-60">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getAlertTypeIcon(alert.alertType)}
                        {getAlertTypeName(alert.alertType)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{alert.tableName}</TableCell>
                    <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                    <TableCell className="max-w-md">{alert.message}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
