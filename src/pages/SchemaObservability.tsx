
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Settings, Download, AlertTriangle } from 'lucide-react';
import { SchemaOverview } from '@/components/SchemaOverview';
import { SchemaTable } from '@/components/SchemaTable';
import { SchemaAlerts } from '@/components/SchemaAlerts';
import { FreshnessOverview } from '@/components/FreshnessOverview';
import { DataVolumeOverview } from '@/components/DataVolumeOverview';
import { DataDistributionTable } from '@/components/DataDistributionTable';
import { VolumeCharts } from '@/components/VolumeCharts';
import { mockSchemaData, mockSchemaAlerts, SchemaAlert } from '@/data/schemaData';
import { mockFreshnessData, mockDataDistributionData, mockDataVolumeData } from '@/data/freshnessData';

const SchemaObservability = () => {
  const [alerts, setAlerts] = useState<SchemaAlert[]>(mockSchemaAlerts);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In a real app, this would trigger a data refresh
    console.log('Refreshing schema data...');
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, resolved: true }
          : alert
      )
    );
  };

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    console.log('Selected table:', tableId);
  };

  const activeAlertsCount = alerts.filter(alert => !alert.resolved).length;
  const criticalFreshnessIssues = mockFreshnessData.filter(m => m.freshnessStatus === 'critical').length;
  const totalIssues = activeAlertsCount + criticalFreshnessIssues;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Observability Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor data schema health, freshness, volume, and distribution across all tables
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {totalIssues > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">
                    {totalIssues} data observability issue{totalIssues > 1 ? 's' : ''} require attention
                  </p>
                  <p className="text-red-600 text-sm">
                    Issues may impact data pipeline reliability and quality
                  </p>
                </div>
                <Badge variant="destructive">{totalIssues}</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="freshness">Freshness</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              Alerts
              {totalIssues > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {totalIssues}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Schema Health</h2>
                <SchemaOverview data={mockSchemaData} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Data Freshness</h2>
                <FreshnessOverview data={mockFreshnessData} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Data Volume</h2>
                <DataVolumeOverview data={mockDataVolumeData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schema" className="space-y-6">
            <SchemaTable 
              data={mockSchemaData} 
              onTableSelect={handleTableSelect}
            />
          </TabsContent>

          <TabsContent value="freshness" className="space-y-6">
            <FreshnessOverview data={mockFreshnessData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Freshness Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Table</th>
                        <th className="text-left p-4">Data Age</th>
                        <th className="text-left p-4">Expected vs Actual</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">SLA Compliance</th>
                        <th className="text-left p-4">Records Affected</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockFreshnessData.map((metric) => (
                        <tr key={metric.id} className="border-b">
                          <td className="p-4 font-medium">{metric.tableName}</td>
                          <td className="p-4">{metric.dataAge.toFixed(1)}h</td>
                          <td className="p-4 text-sm">
                            <div>Expected: {new Date(metric.expectedArrivalTime).toLocaleTimeString()}</div>
                            <div>Actual: {new Date(metric.actualArrivalTime).toLocaleTimeString()}</div>
                          </td>
                          <td className="p-4">
                            <Badge variant={
                              metric.freshnessStatus === 'within_sla' ? 'default' :
                              metric.freshnessStatus === 'warning' ? 'secondary' : 'destructive'
                            }>
                              {metric.freshnessStatus.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="p-4">{metric.slaCompliance.toFixed(1)}%</td>
                          <td className="p-4">{metric.recordsAffected.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volume" className="space-y-6">
            <DataVolumeOverview data={mockDataVolumeData} />
            <VolumeCharts data={mockDataVolumeData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Volume Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Table</th>
                        <th className="text-left p-4">Current Count</th>
                        <th className="text-left p-4">Expected Count</th>
                        <th className="text-left p-4">Deviation</th>
                        <th className="text-left p-4">Data Quality</th>
                        <th className="text-left p-4">Size (GB)</th>
                        <th className="text-left p-4">Partition Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockDataVolumeData.map((metric) => (
                        <tr key={metric.id} className="border-b">
                          <td className="p-4 font-medium">{metric.tableName}</td>
                          <td className="p-4">{metric.totalRowCount.toLocaleString()}</td>
                          <td className="p-4">{metric.expectedRowCount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge variant={Math.abs(metric.volumeDeviation) <= 2 ? 'default' : 'destructive'}>
                              {metric.volumeDeviation.toFixed(1)}%
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>Nulls: {metric.nullRowCount}</div>
                              <div>Duplicates: {metric.duplicateRowCount}</div>
                            </div>
                          </td>
                          <td className="p-4">{metric.tableSizeGB.toFixed(1)}</td>
                          <td className="p-4">
                            <Badge variant={metric.partitionConsistency === 'consistent' ? 'default' : 'destructive'}>
                              {metric.partitionConsistency}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution" className="space-y-6">
            <DataDistributionTable data={mockDataDistributionData} />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <SchemaAlerts 
              alerts={alerts}
              onResolveAlert={handleResolveAlert}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchemaObservability;
