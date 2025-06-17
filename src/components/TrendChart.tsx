
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateHistoricalData, InventoryData } from '@/data/inventoryData';

interface TrendChartProps {
  data: InventoryData[];
  selectedRegion?: string;
  selectedInventoryType?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  selectedRegion,
  selectedInventoryType
}) => {
  const chartData = useMemo(() => {
    const historicalData = generateHistoricalData(data, 30);
    
    // Group by date and aggregate
    const grouped = new Map<string, any>();
    
    historicalData.forEach(item => {
      const date = item.date;
      if (!grouped.has(date)) {
        grouped.set(date, {
          date,
          rawLayer: 0,
          curatedLayer: 0,
          integratedLayer: 0,
          count: 0
        });
      }
      
      const existing = grouped.get(date)!;
      existing.rawLayer += item.rawLayer;
      existing.curatedLayer += item.curatedLayer;
      existing.integratedLayer += item.integratedLayer;
      existing.count += 1;
    });
    
    // Convert to array and sort by date
    return Array.from(grouped.values())
      .map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-14); // Last 14 days
  }, [data]);

  const getTitle = () => {
    let title = 'Historical Inventory Trends';
    if (selectedRegion && selectedInventoryType) {
      title += ` - ${selectedRegion} - ${selectedInventoryType}`;
    } else if (selectedRegion) {
      title += ` - ${selectedRegion}`;
    }
    return title;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{getTitle()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  value.toLocaleString(),
                  name.replace('Layer', ' Layer')
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="rawLayer" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Raw Layer"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="curatedLayer" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Curated Layer"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="integratedLayer" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Integrated Layer"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
