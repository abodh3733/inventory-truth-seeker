
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Filter, TrendingUp, BarChart } from 'lucide-react';
import { InventoryTable } from '@/components/InventoryTable';
import { TrendChart } from '@/components/TrendChart';
import { ComparisonBarChart } from '@/components/ComparisonBarChart';
import { FilterPanel } from '@/components/FilterPanel';
import { mockInventoryData, DrillLevel, InventoryData } from '@/data/inventoryData';

const Dashboard = () => {
  const [currentLevel, setCurrentLevel] = useState<DrillLevel>('region');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedInventoryType, setSelectedInventoryType] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'trends' | 'comparison'>('table');

  // Filter data based on current selections and drill level
  const filteredData = useMemo(() => {
    let data = mockInventoryData;

    if (selectedRegion && currentLevel !== 'region') {
      data = data.filter(item => item.region === selectedRegion);
    }
    if (selectedInventoryType) {
      data = data.filter(item => item.inventoryType === selectedInventoryType);
    }
    if (selectedStore && currentLevel === 'store') {
      data = data.filter(item => item.store === selectedStore);
    }

    return data;
  }, [selectedRegion, selectedInventoryType, selectedStore, currentLevel]);

  // Aggregate data based on current drill level
  const aggregatedData = useMemo(() => {
    const grouped = new Map<string, InventoryData[]>();
    
    filteredData.forEach(item => {
      let key: string;
      switch (currentLevel) {
        case 'region':
          key = item.region;
          break;
        case 'inventoryType':
          key = `${item.region} - ${item.inventoryType}`;
          break;
        case 'store':
          key = `${item.region} - ${item.inventoryType} - ${item.store}`;
          break;
        default:
          key = item.region;
      }
      
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(item);
    });

    return Array.from(grouped.entries()).map(([key, items]) => ({
      key,
      items,
      rawTotal: items.reduce((sum, item) => sum + item.rawLayer, 0),
      curatedTotal: items.reduce((sum, item) => sum + item.curatedLayer, 0),
      integratedTotal: items.reduce((sum, item) => sum + item.integratedLayer, 0),
      discrepancy: items.reduce((sum, item) => 
        sum + Math.abs(item.rawLayer - item.curatedLayer) + 
        Math.abs(item.curatedLayer - item.integratedLayer), 0
      )
    }));
  }, [filteredData, currentLevel]);

  const handleDrillDown = (key: string) => {
    const parts = key.split(' - ');
    
    if (currentLevel === 'region') {
      setSelectedRegion(parts[0]);
      setCurrentLevel('inventoryType');
    } else if (currentLevel === 'inventoryType') {
      setSelectedInventoryType(parts[1]);
      setCurrentLevel('store');
    }
  };

  const handleDrillUp = () => {
    if (currentLevel === 'store') {
      setSelectedInventoryType('');
      setCurrentLevel('inventoryType');
    } else if (currentLevel === 'inventoryType') {
      setSelectedRegion('');
      setCurrentLevel('region');
    }
  };

  const resetFilters = () => {
    setSelectedRegion('');
    setSelectedInventoryType('');
    setSelectedStore('');
    setCurrentLevel('region');
  };

  const getBreadcrumb = () => {
    const parts = [];
    if (selectedRegion) parts.push(selectedRegion);
    if (selectedInventoryType) parts.push(selectedInventoryType);
    if (selectedStore) parts.push(selectedStore);
    return parts.join(' > ');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Reconciliation Dashboard</h1>
            <p className="text-gray-600 mt-1">Compare inventory counts across Raw, Curated & Integrated layers</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button onClick={resetFilters} variant="outline">
              Reset All
            </Button>
          </div>
        </div>

        {/* Breadcrumb and Navigation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Current Level: <Badge variant="secondary">{currentLevel}</Badge>
                </div>
                {getBreadcrumb() && (
                  <div className="text-sm text-gray-600">
                    Path: <span className="font-medium">{getBreadcrumb()}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {currentLevel !== 'region' && (
                  <Button
                    onClick={handleDrillUp}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <ArrowUp className="w-4 h-4" />
                    Drill Up
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Panel */}
        {showFilters && (
          <FilterPanel
            data={mockInventoryData}
            selectedRegion={selectedRegion}
            selectedInventoryType={selectedInventoryType}
            selectedStore={selectedStore}
            onRegionChange={setSelectedRegion}
            onInventoryTypeChange={setSelectedInventoryType}
            onStoreChange={setSelectedStore}
          />
        )}

        {/* View Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setActiveView('table')}
                variant={activeView === 'table' ? 'default' : 'outline'}
                size="sm"
              >
                Data Table
              </Button>
              <Button
                onClick={() => setActiveView('trends')}
                variant={activeView === 'trends' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-1"
              >
                <TrendingUp className="w-4 h-4" />
                Trends
              </Button>
              <Button
                onClick={() => setActiveView('comparison')}
                variant={activeView === 'comparison' ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-1"
              >
                <BarChart className="w-4 h-4" />
                Comparison
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        {activeView === 'table' && (
          <InventoryTable
            data={aggregatedData}
            currentLevel={currentLevel}
            onDrillDown={handleDrillDown}
          />
        )}

        {activeView === 'trends' && (
          <TrendChart
            data={filteredData}
            selectedRegion={selectedRegion}
            selectedInventoryType={selectedInventoryType}
          />
        )}

        {activeView === 'comparison' && (
          <ComparisonBarChart
            data={aggregatedData}
            currentLevel={currentLevel}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
