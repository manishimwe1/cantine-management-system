'use client'

import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Clock, 
  ChefHat, 
  Utensils,
  Clipboard,
  CheckCircle,
  XCircle
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import StatisticCard from '@/components/StatisticCard';

// Sample menu items data
const menuItems = [
  { id: 1, name: 'Pasta Carbonara', category: 'Main Course', price: '$12.99', ingredients: 5, prepTime: '25 mins', status: 'Available' },
  { id: 2, name: 'Caesar Salad', category: 'Appetizer', price: '$8.50', ingredients: 7, prepTime: '15 mins', status: 'Available' },
  { id: 3, name: 'Beef Steak', category: 'Main Course', price: '$18.99', ingredients: 4, prepTime: '30 mins', status: 'Not Available' },
  { id: 4, name: 'Chocolate Cake', category: 'Dessert', price: '$6.99', ingredients: 8, prepTime: '45 mins', status: 'Available' },
  { id: 5, name: 'Vegetable Soup', category: 'Appetizer', price: '$7.50', ingredients: 6, prepTime: '20 mins', status: 'Available' },
];

// Sample orders data
const ordersData = [
  { id: 1, table: 'Table 5', items: 3, status: 'Preparing', time: '10:15 AM', server: 'John Doe' },
  { id: 2, table: 'Table 2', items: 4, status: 'Ready', time: '10:05 AM', server: 'Jane Smith' },
  { id: 3, table: 'Table 8', items: 2, status: 'Delivered', time: '9:50 AM', server: 'Mike Johnson' },
  { id: 4, table: 'Table 1', items: 5, status: 'Ordered', time: '10:25 AM', server: 'Sarah Wilson' },
];

const KitchenManagement = () => {
  const [activeTab, setActiveTab] = useState('menu');

  const menuColumns = [
    { header: 'Item Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Ingredients', accessor: 'ingredients' },
    { header: 'Prep Time', accessor: 'prepTime' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => value === 'Available' ? 'text-green-600' : 'text-red-600'
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button className="p-1 bg-amber-100 text-amber-600 rounded hover:bg-amber-200">
            <Utensils size={18} />
          </button>
          {row.status === 'Available' ? (
            <button className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200">
              <XCircle size={18} />
            </button>
          ) : (
            <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
              <CheckCircle size={18} />
            </button>
          )}
        </div>
      )
    },
  ];

  const orderColumns = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Table', accessor: 'table' },
    { header: 'Items', accessor: 'items' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => {
        if (value === 'Delivered') return 'text-green-600';
        if (value === 'Ready') return 'text-blue-600';
        if (value === 'Preparing') return 'text-amber-600';
        return 'text-gray-600';
      }
    },
    { header: 'Time', accessor: 'time' },
    { header: 'Server', accessor: 'server' },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
            <Clipboard size={18} />
          </button>
          {row.status !== 'Delivered' && (
            <button className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200">
              <CheckCircle size={18} />
            </button>
          )}
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Kitchen Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            Add Menu Item
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} className="mr-2" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Clock size={18} className="mr-2" />
            Kitchen Timer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatisticCard
          title="Active Orders"
          value={ordersData.filter(order => order.status !== 'Delivered').length}
          subtitle="Requiring attention"
          className="bg-gradient-to-br from-amber-50 to-white"
        />
        <StatisticCard
          title="Menu Items"
          value={menuItems.length}
          subtitle="Currently on menu"
          className="bg-gradient-to-br from-indigo-50 to-white"
        />
        <StatisticCard
          title="Average Prep Time"
          value="23 mins"
          subtitle="Across all items"
          className="bg-gradient-to-br from-emerald-50 to-white"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'menu'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Menu Items
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'orders'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Active Orders
            </button>
            <button
              onClick={() => setActiveTab('requisition')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'requisition'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Requisitions
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'menu' && (
            <DataTable
              columns={menuColumns}
              data={menuItems}
              title="Menu Items"
              searchPlaceholder="Search menu items..."
            />
          )}
          {activeTab === 'orders' && (
            <DataTable
              columns={orderColumns}
              data={ordersData}
              title="Active Orders"
              searchPlaceholder="Search orders..."
            />
          )}
          {activeTab === 'requisition' && (
            <div className="py-8 text-center">
              <ChefHat size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Kitchen Requisitions</h3>
              <p className="text-gray-500 mb-4">Request ingredients and supplies from inventory.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Create New Requisition
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenManagement;