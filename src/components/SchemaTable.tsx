
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronRight, AlertCircle, CheckCircle, Database, Key } from 'lucide-react';
import { SchemaMetric } from '@/data/schemaData';

interface SchemaTableProps {
  data: SchemaMetric[];
  onTableSelect?: (tableId: string) => void;
}

export const SchemaTable: React.FC<SchemaTableProps> = ({ data, onTableSelect }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (tableId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(tableId)) {
      newExpanded.delete(tableId);
    } else {
      newExpanded.add(tableId);
    }
    setExpandedRows(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      healthy: 'default',
      warning: 'secondary',
      critical: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schema Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Table Name</TableHead>
              <TableHead>Database/Schema</TableHead>
              <TableHead>Columns</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Keys</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((table) => (
              <React.Fragment key={table.id}>
                <TableRow className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(table.id)}
                      className="p-0 h-8 w-8"
                    >
                      {expandedRows.has(table.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell 
                    className="font-medium cursor-pointer hover:text-blue-600"
                    onClick={() => onTableSelect?.(table.id)}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(table.status)}
                      {table.tableName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{table.database}</div>
                      <div className="text-muted-foreground">{table.schema}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{table.columnCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{table.schemaVersion}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {table.primaryKeys.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          PK: {table.primaryKeys.length}
                        </Badge>
                      )}
                      {table.foreignKeys.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          FK: {table.foreignKeys.length}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(table.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(table.lastUpdated).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                
                {expandedRows.has(table.id) && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-muted/20">
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Column Details */}
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <Database className="h-4 w-4" />
                              Columns ({table.columnCount})
                            </h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {table.columnNames.map((col, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="font-mono">{col}</span>
                                  <span className="text-muted-foreground ml-2">
                                    {table.dataTypes[col]}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Constraints */}
                          <div>
                            <h4 className="font-medium mb-2">Constraints</h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {table.constraints.map((constraint, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                                  {constraint}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Foreign Keys */}
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-1">
                              <Key className="h-4 w-4" />
                              Foreign Keys
                            </h4>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {table.foreignKeys.map((fk, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="font-mono">{fk.column}</span>
                                  <span className="text-muted-foreground"> → </span>
                                  <span className="font-mono">{fk.referencedTable}.{fk.referencedColumn}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Issues */}
                        {table.issues.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 text-red-600">Issues</h4>
                            <div className="space-y-1">
                              {table.issues.map((issue, idx) => (
                                <div key={idx} className="text-sm text-red-600 flex items-center gap-2">
                                  <AlertCircle className="h-3 w-3" />
                                  {issue}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Partition Keys */}
                        {table.partitionKeys.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2">Partition Keys</h4>
                            <div className="flex gap-1">
                              {table.partitionKeys.map((key, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {key}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
