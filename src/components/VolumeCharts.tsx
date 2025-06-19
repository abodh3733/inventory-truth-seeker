
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { DataVolumeMetric } from '@/data/freshnessData';

interface VolumeChartsProps {
  data: DataVolumeMetric[];
}

export const VolumeCharts: React.FC<VolumeChartsProps> = ({ data }) => {
  // Prepare trend data - combine all tables
  const trendData = data[0]?.volumeTrend.map((trend, index) => ({
    date: trend.date,
    ...data.reduce((acc, table) => {
      acc[table.tableName] = table.volumeTrend[index]?.count || 0;
      return acc;
    }, {} as Record<string, number>)
  })) || [];

  // Prepare hourly arrival data - combine all tables
  const hourlyData = data[0]?.hourlyArrivalCounts.map((hour, index) => ({
    hour: hour.hour,
    ...data.reduce((acc, table) => {
      acc[table.tableName] = table.hourlyArrivalCounts[index]?.count || 0;
      return acc;
    }, {} as Record<string, number>)
  })) || [];

  const chartConfig = {
    user_profiles: {
      label: "User Profiles",
      color: "hsl(var(--chart-1))",
    },
    inventory_items: {
      label: "Inventory Items",
      color: "hsl(var(--chart-2))",
    },
    order_transactions: {
      label: "Order Transactions",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Volume Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Volume Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={trendData}>
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {data.map((table) => (
                <Line
                  key={table.tableName}
                  type="monotone"
                  dataKey={table.tableName}
                  stroke={`var(--color-${table.tableName.replace('_', '-')})`}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Hourly Arrival Pattern */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Data Arrival Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {data.map((table, index) => (
                <Bar
                  key={table.tableName}
                  dataKey={table.tableName}
                  fill={`var(--color-${table.tableName.replace('_', '-')})`}
                  opacity={0.8}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
