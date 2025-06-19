
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, Database, Filter, Shield, Key, GitBranch, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Data Observability Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive monitoring and analysis for data reconciliation, schema observability, 
            and data quality management across your entire data ecosystem.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              size="lg"
              className="text-lg px-8 py-3"
            >
              Data Reconciliation
            </Button>
            <Button
              onClick={() => navigate('/schema-observability')}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3"
            >
              Schema Observability
            </Button>
          </div>
        </div>

        {/* Dashboards Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Data Reconciliation Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/dashboard')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <BarChart className="w-8 h-8 text-blue-600" />
                Data Reconciliation Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Compare and analyze inventory data across Raw, Curated, and Integrated layers 
                with powerful drill-down capabilities and comprehensive reporting.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  Multi-Layer Comparison
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-green-600" />
                  Advanced Filtering
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-600" />
                  Historical Trends
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="w-4 h-4 text-orange-600" />
                  Visual Analytics
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schema Observability Dashboard */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/schema-observability')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600" />
                Schema Observability Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor data schema health, structure, and integrity. Track schema evolution, 
                detect drift, and ensure data pipeline reliability.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-green-600" />
                  Schema Monitoring
                </div>
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-blue-600" />
                  Data Integrity
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Real-time Alerts
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-purple-600" />
                  Version Tracking
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Data Reconciliation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Multi-layer data comparison</li>
                <li>• Drill-down navigation</li>
                <li>• Real-time discrepancy detection</li>
                <li>• Historical trend analysis</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Schema Observability</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Schema drift detection</li>
                <li>• Data type monitoring</li>
                <li>• Constraint validation</li>
                <li>• Version control tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Data Quality</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Automated quality checks</li>
                <li>• Anomaly detection</li>
                <li>• Data lineage tracking</li>
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
