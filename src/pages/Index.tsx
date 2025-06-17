
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Database, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Data Reconciliation Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Compare and analyze inventory data across Raw, Curated, and Integrated layers 
            with powerful drill-down capabilities and comprehensive reporting.
          </p>
          <Button
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="text-lg px-8 py-3"
          >
            Launch Dashboard
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Database className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle>Multi-Layer Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Compare inventory counts across Raw, Curated, and Integrated data layers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Filter className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle>Advanced Filtering</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Filter by region, inventory type, and store with drill-down capabilities
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle>Historical Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Visualize inventory trends over time with interactive line charts
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart className="w-12 h-12 mx-auto text-orange-600 mb-4" />
              <CardTitle>Visual Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interactive bar charts and tables for comprehensive data analysis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Drill-Down Navigation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Region-level overview</li>
                <li>• Inventory type breakdown</li>
                <li>• Store-level granularity</li>
                <li>• One-click drill-up/drill-down</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Data Reconciliation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Real-time discrepancy detection</li>
                <li>• Variance percentage calculations</li>
                <li>• Color-coded alerts</li>
                <li>• Comprehensive reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
