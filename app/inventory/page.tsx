'use client'

import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Download, 
  Trash2, 
  Edit,
  PackageOpen
} from 'lucide-react';
import StatisticCard from '@/components/StatisticCard';
import DataTable from '@/components/DataTable';
import AddISupplies from '@/components/AddISupplies';

// Sample inventory data
const inventoryData = [
  { id: 1, name: 'Rice', category: 'Grains', quantity: 50, unit: 'kg', status: 'In Stock', lastUpdated: '2023-07-01' },
  { id: 2, name: 'Tomatoes', category: 'Vegetables', quantity: 15, unit: 'kg', status: 'Low Stock', lastUpdated: '2023-07-02' },
  { id: 3, name: 'Chicken', category: 'Meat', quantity: 30, unit: 'kg', status: 'In Stock', lastUpdated: '2023-07-01' },
  { id: 4, name: 'Salt', category: 'Spices', quantity: 5, unit: 'kg', status: 'Low Stock', lastUpdated: '2023-06-28' },
  { id: 5, name: 'Cooking Oil', category: 'Oils', quantity: 20, unit: 'L', status: 'In Stock', lastUpdated: '2023-06-30' },
  { id: 6, name: 'Sugar', category: 'Sweeteners', quantity: 10, unit: 'kg', status: 'Low Stock', lastUpdated: '2023-07-02' },
  { id: 7, name: 'Flour', category: 'Baking', quantity: 25, unit: 'kg', status: 'In Stock', lastUpdated: '2023-06-29' },
];

// Sample supplier data
const supplierData = [
  { id: 1, name: 'Fresh Foods Inc.', contact: 'John Smith', phone: '555-1234', items: 12, lastDelivery: '2023-07-01' },
  { id: 2, name: 'Quality Meats', contact: 'Jane Doe', phone: '555-5678', items: 5, lastDelivery: '2023-06-28' },
  { id: 3, name: 'Organic Produce Co.', contact: 'Mike Johnson', phone: '555-9012', items: 8, lastDelivery: '2023-06-30' },
];

const InventoryManagement = () => {
  const [activeTab, setActiveTab] = useState('items');

  const inventoryColumns = [
    { header: 'Item Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Unit', accessor: 'unit' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => value === 'In Stock' ? 'text-green-600' : 'text-orange-600'
    },
    { header: 'Last Updated', accessor: 'lastUpdated' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      )
    },
  ];

  const supplierColumns = [
    { header: 'Supplier Name', accessor: 'name' },
    { header: 'Contact Person', accessor: 'contact' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Items Supplied', accessor: 'items' },
    { header: 'Last Delivery', accessor: 'lastDelivery' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800">
            <Edit size={18} />
          </button>
          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Inventory Management</h1>
        <div className="flex space-x-2">
          
          <AddISupplies />
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatisticCard
          title="Total Items"
          value={inventoryData.length}
          subtitle="Across all categories"
          className="bg-gradient-to-br from-indigo-50 to-white"
        />
        <StatisticCard
          title="Low Stock Items"
          value={inventoryData.filter(item => item.status === 'Low Stock').length}
          subtitle="Requires attention"
          className="bg-gradient-to-br from-orange-50 to-white"
        />
        <StatisticCard
          title="Total Suppliers"
          value={supplierData.length}
          subtitle="Active suppliers"
          className="bg-gradient-to-br from-emerald-50 to-white"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('items')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'items'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inventory Items
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'suppliers'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Suppliers
            </button>
            <button
              onClick={() => setActiveTab('stock-levels')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'stock-levels'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Stock Levels
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'items' && (
            <DataTable
              columns={inventoryColumns}
              data={inventoryData}
              title="Inventory Items"
              searchPlaceholder="Search items..."
            />
          )}
          {activeTab === 'suppliers' && (
            <DataTable
              columns={supplierColumns}
              data={supplierData}
              title="Suppliers"
              searchPlaceholder="Search suppliers..."
            />
          )}
          {activeTab === 'stock-levels' && (
            <div className="py-8 text-center">
              <PackageOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Stock Level Reports</h3>
              <p className="text-gray-500 mb-4">This feature is coming soon.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Request Early Access
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;