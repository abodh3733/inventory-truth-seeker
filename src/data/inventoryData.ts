
export type DrillLevel = 'region' | 'inventoryType' | 'store';

export interface InventoryData {
  id: string;
  region: string;
  inventoryType: string;
  store: string;
  rawLayer: number;
  curatedLayer: number;
  integratedLayer: number;
  date: string;
}

export interface HistoricalData extends InventoryData {
  timestamp: Date;
}

// Mock data for demonstration
export const mockInventoryData: InventoryData[] = [
  // North America - Electronics
  { id: '1', region: 'North America', inventoryType: 'Electronics', store: 'Store A', rawLayer: 1500, curatedLayer: 1485, integratedLayer: 1480, date: '2024-06-17' },
  { id: '2', region: 'North America', inventoryType: 'Electronics', store: 'Store B', rawLayer: 2200, curatedLayer: 2180, integratedLayer: 2175, date: '2024-06-17' },
  { id: '3', region: 'North America', inventoryType: 'Electronics', store: 'Store C', rawLayer: 1800, curatedLayer: 1795, integratedLayer: 1790, date: '2024-06-17' },
  
  // North America - Clothing
  { id: '4', region: 'North America', inventoryType: 'Clothing', store: 'Store A', rawLayer: 3200, curatedLayer: 3180, integratedLayer: 3175, date: '2024-06-17' },
  { id: '5', region: 'North America', inventoryType: 'Clothing', store: 'Store B', rawLayer: 2800, curatedLayer: 2790, integratedLayer: 2785, date: '2024-06-17' },
  { id: '6', region: 'North America', inventoryType: 'Clothing', store: 'Store C', rawLayer: 2400, curatedLayer: 2385, integratedLayer: 2380, date: '2024-06-17' },
  
  // Europe - Electronics
  { id: '7', region: 'Europe', inventoryType: 'Electronics', store: 'Store D', rawLayer: 1900, curatedLayer: 1885, integratedLayer: 1880, date: '2024-06-17' },
  { id: '8', region: 'Europe', inventoryType: 'Electronics', store: 'Store E', rawLayer: 2100, curatedLayer: 2085, integratedLayer: 2080, date: '2024-06-17' },
  { id: '9', region: 'Europe', inventoryType: 'Electronics', store: 'Store F', rawLayer: 1700, curatedLayer: 1690, integratedLayer: 1685, date: '2024-06-17' },
  
  // Europe - Clothing
  { id: '10', region: 'Europe', inventoryType: 'Clothing', store: 'Store D', rawLayer: 2900, curatedLayer: 2885, integratedLayer: 2880, date: '2024-06-17' },
  { id: '11', region: 'Europe', inventoryType: 'Clothing', store: 'Store E', rawLayer: 3100, curatedLayer: 3085, integratedLayer: 3080, date: '2024-06-17' },
  { id: '12', region: 'Europe', inventoryType: 'Clothing', store: 'Store F', rawLayer: 2600, curatedLayer: 2590, integratedLayer: 2585, date: '2024-06-17' },
  
  // Asia Pacific - Electronics
  { id: '13', region: 'Asia Pacific', inventoryType: 'Electronics', store: 'Store G', rawLayer: 2500, curatedLayer: 2480, integratedLayer: 2475, date: '2024-06-17' },
  { id: '14', region: 'Asia Pacific', inventoryType: 'Electronics', store: 'Store H', rawLayer: 2800, curatedLayer: 2785, integratedLayer: 2780, date: '2024-06-17' },
  { id: '15', region: 'Asia Pacific', inventoryType: 'Electronics', store: 'Store I', rawLayer: 2200, curatedLayer: 2190, integratedLayer: 2185, date: '2024-06-17' },
  
  // Asia Pacific - Clothing
  { id: '16', region: 'Asia Pacific', inventoryType: 'Clothing', store: 'Store G', rawLayer: 3500, curatedLayer: 3485, integratedLayer: 3480, date: '2024-06-17' },
  { id: '17', region: 'Asia Pacific', inventoryType: 'Clothing', store: 'Store H', rawLayer: 3800, curatedLayer: 3785, integratedLayer: 3780, date: '2024-06-17' },
  { id: '18', region: 'Asia Pacific', inventoryType: 'Clothing', store: 'Store I', rawLayer: 3200, curatedLayer: 3190, integratedLayer: 3185, date: '2024-06-17' },
];

// Generate historical data for trends
export const generateHistoricalData = (baseData: InventoryData[], days: number = 30): HistoricalData[] => {
  const historicalData: HistoricalData[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    baseData.forEach(item => {
      const variance = 0.1; // 10% variance
      const rawVariance = (Math.random() - 0.5) * variance * item.rawLayer;
      const curatedVariance = (Math.random() - 0.5) * variance * item.curatedLayer;
      const integratedVariance = (Math.random() - 0.5) * variance * item.integratedLayer;
      
      historicalData.push({
        ...item,
        id: `${item.id}_${i}`,
        rawLayer: Math.round(item.rawLayer + rawVariance),
        curatedLayer: Math.round(item.curatedLayer + curatedVariance),
        integratedLayer: Math.round(item.integratedLayer + integratedVariance),
        timestamp: date,
        date: date.toISOString().split('T')[0]
      });
    });
  }
  
  return historicalData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};
