'use client'

import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Wrench, 
  Calendar, 
  Trash2, 
  Edit,
  ArrowUpDown
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import StatisticCard from '@/components/StatisticCard';

// Sample assets data
const assetsData = [
  { id: 1, name: 'Industrial Oven', category: 'Kitchen Equipment', status: 'Operational', value: '$5,000', purchaseDate: '2021-05-15', nextMaintenance: '2023-08-10' },
  { id: 2, name: 'Commercial Refrigerator', category: 'Kitchen Equipment', status: 'Needs Repair', value: '$3,200', purchaseDate: '2020-11-20', nextMaintenance: '2023-07-05' },
  { id: 3, name: 'Food Processor', category: 'Kitchen Appliance', status: 'Operational', value: '$800', purchaseDate: '2022-01-10', nextMaintenance: '2023-09-15' },
  { id: 4, name: 'Dishwasher', category: 'Kitchen Equipment', status: 'Operational', value: '$2,500', purchaseDate: '2021-08-05', nextMaintenance: '2023-08-20' },
  { id: 5, name: 'Coffee Machine', category: 'Beverage Equipment', status: 'Under Maintenance', value: '$1,200', purchaseDate: '2022-03-15', nextMaintenance: '2023-07-02' },
];

// Sample maintenance data
const maintenanceData = [
  { id: 1, asset: 'Commercial Refrigerator', issue: 'Temperature fluctuation', status: 'Scheduled', priority: 'High', scheduledDate: '2023-07-05', assignedTo: 'Tech Team' },
  { id: 2, name: 'Coffee Machine', issue: 'Leaking water', status: 'In Progress', priority: 'Medium', scheduledDate: '2023-07-02', assignedTo: 'John Technician' },
  { id: 3, name: 'Industrial Mixer', issue: 'Unusual noise', status: 'Completed', priority: 'Low', scheduledDate: '2023-06-28', assignedTo: 'Maintenance Dept' },
];

const AssetManagement = () => {
  const [activeTab, setActiveTab] = useState('assets');

  const assetColumns = [
    { header: 'Asset Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => {
        if (value === 'Operational') return 'text-green-600';
        if (value === 'Needs Repair') return 'text-red-600';
        return 'text-yellow-600';
      }
    },
    { header: 'Value', accessor: 'value' },
    { header: 'Purchase Date', accessor: 'purchaseDate' },
    { header: 'Next Maintenance', accessor: 'nextMaintenance' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <button className="text-yellow-600 hover:text-yellow-800">
            <Wrench size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      )
    },
  ];

  const maintenanceColumns = [
    { header: 'Asset', accessor: 'asset' },
    { header: 'Issue', accessor: 'issue' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => {
        if (value === 'Completed') return 'text-green-600';
        if (value === 'Scheduled') return 'text-blue-600';
        return 'text-yellow-600';
      }
    },
    { 
      header: 'Priority', 
      accessor: 'priority',
      className: (value: string) => {
        if (value === 'High') return 'text-red-600 font-medium';
        if (value === 'Medium') return 'text-yellow-600';
        return 'text-green-600';
      }
    },
    { header: 'Scheduled Date', accessor: 'scheduledDate' },
    { header: 'Assigned To', accessor: 'assignedTo' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <button className="text-green-600 hover:text-green-800">
            <ArrowUpDown size={18} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Asset Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            Add New Asset
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar size={18} className="mr-2" />
            Schedule Maintenance
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatisticCard
          title="Total Assets"
          value={assetsData.length}
          subtitle="Across all categories"
          className="bg-gradient-to-br from-indigo-50 to-white"
        />
        <StatisticCard
          title="Assets Value"
          value="$12,700"
          subtitle="Total investment"
          className="bg-gradient-to-br from-blue-50 to-white"
        />
        <StatisticCard
          title="Pending Maintenance"
          value={maintenanceData.filter(item => item.status !== 'Completed').length}
          subtitle="Scheduled or in progress"
          className="bg-gradient-to-br from-yellow-50 to-white"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('assets')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'assets'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Assets List
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'maintenance'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'usage'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Usage Tracking
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'assets' && (
            <DataTable
              columns={assetColumns}
              data={assetsData}
              title="Assets Registry"
              searchPlaceholder="Search assets..."
            />
          )}
          {activeTab === 'maintenance' && (
            <DataTable
              columns={maintenanceColumns}
              data={maintenanceData}
              title="Maintenance Schedule"
              searchPlaceholder="Search maintenance records..."
            />
          )}
          {activeTab === 'usage' && (
            <div className="py-8 text-center">
              <ArrowUpDown size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Asset Usage Tracking</h3>
              <p className="text-gray-500 mb-4">Track how often assets are being used and by whom.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Enable Usage Tracking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetManagement;