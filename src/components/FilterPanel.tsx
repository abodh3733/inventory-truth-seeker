
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { InventoryData } from '@/data/inventoryData';

interface FilterPanelProps {
  data: InventoryData[];
  selectedRegion: string;
  selectedInventoryType: string;
  selectedStore: string;
  onRegionChange: (value: string) => void;
  onInventoryTypeChange: (value: string) => void;
  onStoreChange: (value: string) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  data,
  selectedRegion,
  selectedInventoryType,
  selectedStore,
  onRegionChange,
  onInventoryTypeChange,
  onStoreChange
}) => {
  const regions = [...new Set(data.map(item => item.region))].sort();
  const inventoryTypes = [...new Set(data.map(item => item.inventoryType))].sort();
  const stores = [...new Set(data.map(item => item.store))].sort();

  const clearFilter = (filterType: 'region' | 'inventoryType' | 'store') => {
    switch (filterType) {
      case 'region':
        onRegionChange('');
        break;
      case 'inventoryType':
        onInventoryTypeChange('');
        break;
      case 'store':
        onStoreChange('');
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Region Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Region</label>
              {selectedRegion && (
                <Button
                  onClick={() => clearFilter('region')}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Select value={selectedRegion} onValueChange={onRegionChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Type Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Inventory Type</label>
              {selectedInventoryType && (
                <Button
                  onClick={() => clearFilter('inventoryType')}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Select value={selectedInventoryType} onValueChange={onInventoryTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {inventoryTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Store Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Store</label>
              {selectedStore && (
                <Button
                  onClick={() => clearFilter('store')}
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            <Select value={selectedStore} onValueChange={onStoreChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent>
                {stores.map(store => (
                  <SelectItem key={store} value={store}>
                    {store}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
