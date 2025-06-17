
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, AlertTriangle } from 'lucide-react';
import { DrillLevel } from '@/data/inventoryData';

interface AggregatedData {
  key: string;
  items: any[];
  rawTotal: number;
  curatedTotal: number;
  integratedTotal: number;
  discrepancy: number;
}

interface InventoryTableProps {
  data: AggregatedData[];
  currentLevel: DrillLevel;
  onDrillDown: (key: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  data,
  currentLevel,
  onDrillDown
}) => {
  const getDiscrepancyColor = (discrepancy: number) => {
    if (discrepancy === 0) return 'bg-green-100 text-green-800';
    if (discrepancy < 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getVariancePercentage = (layer1: number, layer2: number) => {
    if (layer1 === 0) return 0;
    return ((Math.abs(layer1 - layer2) / layer1) * 100).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Inventory Data Reconciliation
          <Badge variant="outline">{currentLevel} Level</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  {currentLevel === 'region' ? 'Region' : 
                   currentLevel === 'inventoryType' ? 'Region - Inventory Type' : 
                   'Region - Inventory Type - Store'}
                </TableHead>
                <TableHead className="text-right">Raw Layer</TableHead>
                <TableHead className="text-right">Curated Layer</TableHead>
                <TableHead className="text-right">Integrated Layer</TableHead>
                <TableHead className="text-right">Raw vs Curated</TableHead>
                <TableHead className="text-right">Curated vs Integrated</TableHead>
                <TableHead className="text-right">Total Discrepancy</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{row.key}</TableCell>
                  <TableCell className="text-right font-mono">
                    {row.rawTotal.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.curatedTotal.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {row.integratedTotal.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-sm">
                        {Math.abs(row.rawTotal - row.curatedTotal).toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getVariancePercentage(row.rawTotal, row.curatedTotal)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono text-sm">
                        {Math.abs(row.curatedTotal - row.integratedTotal).toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {getVariancePercentage(row.curatedTotal, row.integratedTotal)}%
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={getDiscrepancyColor(row.discrepancy)}>
                      {row.discrepancy > 0 && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {row.discrepancy.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {currentLevel !== 'store' && (
                      <Button
                        onClick={() => onDrillDown(row.key)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <ArrowDown className="w-4 h-4" />
                        Drill Down
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data available for the current selection.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
