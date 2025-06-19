
export interface SchemaMetric {
  id: string;
  tableName: string;
  database: string;
  schema: string;
  columnCount: number;
  columnNames: string[];
  columnOrder: number;
  dataTypes: { [columnName: string]: string };
  partitionKeys: string[];
  constraints: string[];
  schemaVersion: string;
  primaryKeys: string[];
  uniqueKeys: string[];
  foreignKeys: { column: string; referencedTable: string; referencedColumn: string }[];
  lastUpdated: string;
  status: 'healthy' | 'warning' | 'critical';
  issues: string[];
}

export interface SchemaAlert {
  id: string;
  tableName: string;
  alertType: 'schema_drift' | 'column_missing' | 'type_mismatch' | 'constraint_violation' | 'key_issue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

// Mock data for schema observability
export const mockSchemaData: SchemaMetric[] = [
  {
    id: '1',
    tableName: 'user_profiles',
    database: 'production',
    schema: 'public',
    columnCount: 8,
    columnNames: ['id', 'username', 'email', 'created_at', 'updated_at', 'status', 'profile_data', 'region_id'],
    columnOrder: 1,
    dataTypes: {
      'id': 'UUID',
      'username': 'VARCHAR(50)',
      'email': 'VARCHAR(255)',
      'created_at': 'TIMESTAMP',
      'updated_at': 'TIMESTAMP',
      'status': 'VARCHAR(20)',
      'profile_data': 'JSONB',
      'region_id': 'INT'
    },
    partitionKeys: ['region_id'],
    constraints: ['NOT NULL id', 'UNIQUE email', 'CHECK status IN (active, inactive, pending)'],
    schemaVersion: 'v2.1.0',
    primaryKeys: ['id'],
    uniqueKeys: ['email'],
    foreignKeys: [{ column: 'region_id', referencedTable: 'regions', referencedColumn: 'id' }],
    lastUpdated: '2024-06-19T10:30:00Z',
    status: 'healthy',
    issues: []
  },
  {
    id: '2',
    tableName: 'inventory_items',
    database: 'production',
    schema: 'inventory',
    columnCount: 12,
    columnNames: ['item_id', 'sku', 'name', 'category', 'price', 'quantity', 'location', 'created_at', 'updated_at', 'supplier_id', 'status', 'metadata'],
    columnOrder: 2,
    dataTypes: {
      'item_id': 'UUID',
      'sku': 'VARCHAR(100)',
      'name': 'VARCHAR(255)',
      'category': 'VARCHAR(100)',
      'price': 'DECIMAL(10,2)',
      'quantity': 'INT',
      'location': 'VARCHAR(100)',
      'created_at': 'TIMESTAMP',
      'updated_at': 'TIMESTAMP',
      'supplier_id': 'UUID',
      'status': 'VARCHAR(20)',
      'metadata': 'JSONB'
    },
    partitionKeys: ['location'],
    constraints: ['NOT NULL item_id', 'NOT NULL sku', 'CHECK quantity >= 0', 'CHECK price > 0'],
    schemaVersion: 'v1.5.2',
    primaryKeys: ['item_id'],
    uniqueKeys: ['sku'],
    foreignKeys: [{ column: 'supplier_id', referencedTable: 'suppliers', referencedColumn: 'id' }],
    lastUpdated: '2024-06-19T09:15:00Z',
    status: 'warning',
    issues: ['Column order changed in staging environment']
  },
  {
    id: '3',
    tableName: 'order_transactions',
    database: 'production',
    schema: 'orders',
    columnCount: 10,
    columnNames: ['transaction_id', 'order_id', 'customer_id', 'amount', 'currency', 'payment_method', 'transaction_date', 'status', 'gateway_response', 'created_at'],
    columnOrder: 3,
    dataTypes: {
      'transaction_id': 'UUID',
      'order_id': 'UUID',
      'customer_id': 'UUID',
      'amount': 'DECIMAL(12,2)',
      'currency': 'VARCHAR(3)',
      'payment_method': 'VARCHAR(50)',
      'transaction_date': 'TIMESTAMP',
      'status': 'VARCHAR(20)',
      'gateway_response': 'TEXT',
      'created_at': 'TIMESTAMP'
    },
    partitionKeys: ['transaction_date'],
    constraints: ['NOT NULL transaction_id', 'NOT NULL order_id', 'CHECK amount > 0'],
    schemaVersion: 'v3.0.1',
    primaryKeys: ['transaction_id'],
    uniqueKeys: [],
    foreignKeys: [
      { column: 'order_id', referencedTable: 'orders', referencedColumn: 'id' },
      { column: 'customer_id', referencedTable: 'customers', referencedColumn: 'id' }
    ],
    lastUpdated: '2024-06-19T11:45:00Z',
    status: 'critical',
    issues: ['Foreign key constraint violation detected', 'Data type mismatch in staging']
  }
];

export const mockSchemaAlerts: SchemaAlert[] = [
  {
    id: '1',
    tableName: 'inventory_items',
    alertType: 'schema_drift',
    severity: 'medium',
    message: 'Column order has changed between production and staging environments',
    timestamp: '2024-06-19T09:15:00Z',
    resolved: false
  },
  {
    id: '2',
    tableName: 'order_transactions',
    alertType: 'constraint_violation',
    severity: 'critical',
    message: 'Foreign key constraint violation: customer_id references non-existent customer',
    timestamp: '2024-06-19T11:30:00Z',
    resolved: false
  },
  {
    id: '3',
    tableName: 'order_transactions',
    alertType: 'type_mismatch',
    severity: 'high',
    message: 'Data type mismatch: amount column is DECIMAL in production but FLOAT in staging',
    timestamp: '2024-06-19T11:45:00Z',
    resolved: false
  },
  {
    id: '4',
    tableName: 'user_profiles',
    alertType: 'column_missing',
    severity: 'low',
    message: 'New column "last_login" added in staging but not in production',
    timestamp: '2024-06-19T08:20:00Z',
    resolved: true
  }
];

export const getSchemaHealthScore = (metrics: SchemaMetric[]): number => {
  const totalTables = metrics.length;
  const healthyTables = metrics.filter(m => m.status === 'healthy').length;
  return Math.round((healthyTables / totalTables) * 100);
};

export const getSchemaIssuesSummary = (metrics: SchemaMetric[]) => {
  const summary = {
    total: 0,
    critical: 0,
    warning: 0,
    healthy: 0
  };
  
  metrics.forEach(metric => {
    summary.total++;
    if (metric.status === 'critical') summary.critical++;
    else if (metric.status === 'warning') summary.warning++;
    else summary.healthy++;
  });
  
  return summary;
};
