
export interface FreshnessMetric {
  id: string;
  tableName: string;
  database: string;
  schema: string;
  dataAge: number; // in hours
  expectedArrivalTime: string;
  actualArrivalTime: string;
  timeSinceLastLoad: number; // in hours
  freshnessStatus: 'within_sla' | 'warning' | 'critical';
  slaThreshold: number; // in hours
  warningThreshold: number; // in hours
  criticalThreshold: number; // in hours
  updateFrequency: number; // expected updates per day
  actualUpdates: number; // actual updates today
  slaCompliance: number; // percentage
  recordsAffected: number;
  lastUpdated: string;
}

export interface DataDistributionMetric {
  id: string;
  tableName: string;
  columnName: string;
  dataType: string;
  mean?: number;
  median?: number;
  mode?: string | number;
  standardDeviation?: number;
  minValue?: string | number;
  maxValue?: string | number;
  nullCount: number;
  nullPercentage: number;
  uniqueCount: number;
  uniquePercentage: number;
  totalRows: number;
  lastProfiled: string;
}

export interface DataVolumeMetric {
  id: string;
  tableName: string;
  database: string;
  schema: string;
  totalRowCount: number;
  expectedRowCount: number;
  volumeDeviation: number; // percentage
  nullRowCount: number;
  duplicateRowCount: number;
  tableSizeGB: number;
  partitionConsistency: 'consistent' | 'inconsistent';
  hourlyArrivalCounts: { hour: string; count: number }[];
  volumeTrend: { date: string; count: number }[];
  lastUpdated: string;
}

// Mock data for freshness metrics
export const mockFreshnessData: FreshnessMetric[] = [
  {
    id: '1',
    tableName: 'user_profiles',
    database: 'production',
    schema: 'public',
    dataAge: 2.5,
    expectedArrivalTime: '2024-06-19T06:00:00Z',
    actualArrivalTime: '2024-06-19T06:30:00Z',
    timeSinceLastLoad: 2.5,
    freshnessStatus: 'within_sla',
    slaThreshold: 4,
    warningThreshold: 3,
    criticalThreshold: 6,
    updateFrequency: 6,
    actualUpdates: 6,
    slaCompliance: 95.2,
    recordsAffected: 0,
    lastUpdated: '2024-06-19T06:30:00Z'
  },
  {
    id: '2',
    tableName: 'inventory_items',
    database: 'production',
    schema: 'inventory',
    dataAge: 4.2,
    expectedArrivalTime: '2024-06-19T04:00:00Z',
    actualArrivalTime: '2024-06-19T05:12:00Z',
    timeSinceLastLoad: 4.2,
    freshnessStatus: 'warning',
    slaThreshold: 2,
    warningThreshold: 3,
    criticalThreshold: 5,
    updateFrequency: 12,
    actualUpdates: 10,
    slaCompliance: 87.3,
    recordsAffected: 1250,
    lastUpdated: '2024-06-19T05:12:00Z'
  },
  {
    id: '3',
    tableName: 'order_transactions',
    database: 'production',
    schema: 'orders',
    dataAge: 7.8,
    expectedArrivalTime: '2024-06-19T02:00:00Z',
    actualArrivalTime: '2024-06-19T02:47:00Z',
    timeSinceLastLoad: 7.8,
    freshnessStatus: 'critical',
    slaThreshold: 1,
    warningThreshold: 2,
    criticalThreshold: 4,
    updateFrequency: 24,
    actualUpdates: 18,
    slaCompliance: 72.1,
    recordsAffected: 5670,
    lastUpdated: '2024-06-19T02:47:00Z'
  }
];

// Mock data for data distribution metrics
export const mockDataDistributionData: DataDistributionMetric[] = [
  {
    id: '1',
    tableName: 'user_profiles',
    columnName: 'age',
    dataType: 'INTEGER',
    mean: 34.2,
    median: 32,
    mode: 28,
    standardDeviation: 12.5,
    minValue: 18,
    maxValue: 85,
    nullCount: 45,
    nullPercentage: 2.1,
    uniqueCount: 67,
    uniquePercentage: 85.2,
    totalRows: 2145,
    lastProfiled: '2024-06-19T08:00:00Z'
  },
  {
    id: '2',
    tableName: 'user_profiles',
    columnName: 'email',
    dataType: 'VARCHAR',
    nullCount: 0,
    nullPercentage: 0,
    uniqueCount: 2145,
    uniquePercentage: 100,
    totalRows: 2145,
    lastProfiled: '2024-06-19T08:00:00Z'
  },
  {
    id: '3',
    tableName: 'inventory_items',
    columnName: 'price',
    dataType: 'DECIMAL',
    mean: 89.45,
    median: 65.99,
    mode: 49.99,
    standardDeviation: 45.32,
    minValue: 5.99,
    maxValue: 999.99,
    nullCount: 12,
    nullPercentage: 0.8,
    uniqueCount: 1456,
    uniquePercentage: 98.2,
    totalRows: 1482,
    lastProfiled: '2024-06-19T08:00:00Z'
  }
];

// Mock data for data volume metrics
export const mockDataVolumeData: DataVolumeMetric[] = [
  {
    id: '1',
    tableName: 'user_profiles',
    database: 'production',
    schema: 'public',
    totalRowCount: 2145,
    expectedRowCount: 2200,
    volumeDeviation: -2.5,
    nullRowCount: 3,
    duplicateRowCount: 0,
    tableSizeGB: 0.45,
    partitionConsistency: 'consistent',
    hourlyArrivalCounts: [
      { hour: '00:00', count: 45 },
      { hour: '01:00', count: 32 },
      { hour: '02:00', count: 78 },
      { hour: '03:00', count: 56 },
      { hour: '04:00', count: 89 },
      { hour: '05:00', count: 67 }
    ],
    volumeTrend: [
      { date: '2024-06-14', count: 2100 },
      { date: '2024-06-15', count: 2120 },
      { date: '2024-06-16', count: 2098 },
      { date: '2024-06-17', count: 2156 },
      { date: '2024-06-18', count: 2134 },
      { date: '2024-06-19', count: 2145 }
    ],
    lastUpdated: '2024-06-19T10:30:00Z'
  },
  {
    id: '2',
    tableName: 'inventory_items',
    database: 'production',
    schema: 'inventory',
    totalRowCount: 1482,
    expectedRowCount: 1500,
    volumeDeviation: -1.2,
    nullRowCount: 8,
    duplicateRowCount: 5,
    tableSizeGB: 2.1,
    partitionConsistency: 'inconsistent',
    hourlyArrivalCounts: [
      { hour: '00:00', count: 12 },
      { hour: '01:00', count: 8 },
      { hour: '02:00', count: 25 },
      { hour: '03:00', count: 18 },
      { hour: '04:00', count: 34 },
      { hour: '05:00', count: 22 }
    ],
    volumeTrend: [
      { date: '2024-06-14', count: 1456 },
      { date: '2024-06-15', count: 1467 },
      { date: '2024-06-16', count: 1445 },
      { date: '2024-06-17', count: 1489 },
      { date: '2024-06-18', count: 1475 },
      { date: '2024-06-19', count: 1482 }
    ],
    lastUpdated: '2024-06-19T09:15:00Z'
  },
  {
    id: '3',
    tableName: 'order_transactions',
    database: 'production',
    schema: 'orders',
    totalRowCount: 8945,
    expectedRowCount: 9200,
    volumeDeviation: -2.8,
    nullRowCount: 15,
    duplicateRowCount: 23,
    tableSizeGB: 5.7,
    partitionConsistency: 'consistent',
    hourlyArrivalCounts: [
      { hour: '00:00', count: 145 },
      { hour: '01:00', count: 98 },
      { hour: '02:00', count: 234 },
      { hour: '03:00', count: 178 },
      { hour: '04:00', count: 289 },
      { hour: '05:00', count: 201 }
    ],
    volumeTrend: [
      { date: '2024-06-14', count: 8756 },
      { date: '2024-06-15', count: 8834 },
      { date: '2024-06-16', count: 8698 },
      { date: '2024-06-17', count: 8923 },
      { date: '2024-06-18', count: 8867 },
      { date: '2024-06-19', count: 8945 }
    ],
    lastUpdated: '2024-06-19T11:45:00Z'
  }
];
