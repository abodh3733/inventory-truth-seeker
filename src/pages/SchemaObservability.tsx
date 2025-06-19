
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Settings, Download, AlertTriangle } from 'lucide-react';
import { SchemaOverview } from '@/components/SchemaOverview';
import { SchemaTable } from '@/components/SchemaTable';
import { SchemaAlerts } from '@/components/SchemaAlerts';
import { mockSchemaData, mockSchemaAlerts, SchemaAlert } from '@/data/schemaData';

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Schema Observability Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Monitor data schema health, structure, and integrity across all tables
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
        {activeAlertsCount > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="flex-1">
                  <p className="text-red-800 font-medium">
                    {activeAlertsCount} active schema alert{activeAlertsCount > 1 ? 's' : ''} require attention
                  </p>
                  <p className="text-red-600 text-sm">
                    Critical issues may impact data pipeline reliability
                  </p>
                </div>
                <Badge variant="destructive">{activeAlertsCount}</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Cards */}
        <SchemaOverview data={mockSchemaData} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="tables" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tables">Schema Details</TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              Alerts
              {activeAlertsCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {activeAlertsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tables" className="space-y-6">
            <SchemaTable 
              data={mockSchemaData} 
              onTableSelect={handleTableSelect}
            />
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <SchemaAlerts 
              alerts={alerts}
              onResolveAlert={handleResolveAlert}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schema Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Schema Evolution Timeline</h3>
                    <p className="text-muted-foreground text-sm">
                      Track schema changes, version updates, and structural modifications over time.
                    </p>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        📊 Chart visualization coming soon...
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-3">Data Type Distribution</h3>
                    <p className="text-muted-foreground text-sm">
                      Analyze the distribution of data types across all columns in your schema.
                    </p>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        📊 Chart visualization coming soon...
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SchemaObservability;
