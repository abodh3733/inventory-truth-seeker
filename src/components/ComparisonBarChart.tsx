
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DrillLevel } from '@/data/inventoryData';

interface AggregatedData {
  key: string;
  items: any[];
  rawTotal: number;
  curatedTotal: number;
  integratedTotal: number;
  discrepancy: number;
}

interface ComparisonBarChartProps {
  data: AggregatedData[];
  currentLevel: DrillLevel;
}

export const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  data,
  currentLevel
}) => {
  const chartData = data.map(item => ({
    name: item.key.length > 20 ? item.key.substring(0, 20) + '...' : item.key,
    fullName: item.key,
    rawLayer: item.rawTotal,
    curatedLayer: item.curatedTotal,
    integratedLayer: item.integratedTotal,
    discrepancy: item.discrepancy
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{data.fullName}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Layer Comparison Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Layer Comparison by {currentLevel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="rawLayer" fill="#ef4444" name="Raw Layer" />
                <Bar dataKey="curatedLayer" fill="#3b82f6" name="Curated Layer" />
                <Bar dataKey="integratedLayer" fill="#10b981" name="Integrated Layer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Discrepancy Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Data Discrepancies by {currentLevel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="discrepancy" 
                  fill="#f59e0b" 
                  name="Total Discrepancy"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
