'use client'

import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Activity, 
  Download, 
  PieChart,
  TrendingUp,
  Calendar,
  Plus
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import StatisticCard from '@/components/StatisticCard';

// Sample transactions data
const transactionsData = [
  { id: 1, date: '2023-07-01', description: 'Daily Sales', category: 'Income', amount: '$850.00', paymentMethod: 'Cash', status: 'Completed' },
  { id: 2, date: '2023-07-01', description: 'Vegetable Supply', category: 'Expense', amount: '$350.00', paymentMethod: 'Bank Transfer', status: 'Completed' },
  { id: 3, date: '2023-07-02', description: 'Staff Salary - Kitchen', category: 'Expense', amount: '$1,200.00', paymentMethod: 'Bank Transfer', status: 'Pending' },
  { id: 4, date: '2023-07-02', description: 'Daily Sales', category: 'Income', amount: '$920.00', paymentMethod: 'Card', status: 'Completed' },
  { id: 5, date: '2023-07-03', description: 'Meat Supply', category: 'Expense', amount: '$520.00', paymentMethod: 'Bank Transfer', status: 'Completed' },
  { id: 6, date: '2023-07-03', description: 'Daily Sales', category: 'Income', amount: '$780.00', paymentMethod: 'Cash', status: 'Completed' },
  { id: 7, date: '2023-07-04', description: 'Utilities Bill', category: 'Expense', amount: '$350.00', paymentMethod: 'Bank Transfer', status: 'Pending' },
];

// Sample expense categories data
const expenseCategoriesData = [
  { category: 'Ingredients', percentage: 42, amount: '$2,150.00', color: 'bg-blue-500' },
  { category: 'Staff Salary', percentage: 28, amount: '$1,430.00', color: 'bg-green-500' },
  { category: 'Utilities', percentage: 15, amount: '$765.00', color: 'bg-yellow-500' },
  { category: 'Equipment', percentage: 10, amount: '$510.00', color: 'bg-red-500' },
  { category: 'Others', percentage: 5, amount: '$255.00', color: 'bg-purple-500' },
];

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState('transactions');

  const transactionColumns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { 
      header: 'Category', 
      accessor: 'category',
      className: (value: string) => value === 'Income' ? 'text-green-600' : 'text-red-600'
    },
    { header: 'Amount', accessor: 'amount' },
    { header: 'Payment Method', accessor: 'paymentMethod' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => value === 'Completed' ? 'text-green-600' : 'text-yellow-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Finance Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors">
            <Plus size={18} className="mr-2" />
            New Transaction
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Calendar size={18} className="mr-2" />
            Date Range
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatisticCard
          title="Total Income"
          value="$2,550.00"
          subtitle="This week"
          footer={
            <div className="flex items-center text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          }
          className="bg-gradient-to-br from-green-50 to-white"
        />
        <StatisticCard
          title="Total Expenses"
          value="$1,420.00"
          subtitle="This week"
          footer={
            <div className="flex items-center text-red-600">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm font-medium">+8.2%</span>
            </div>
          }
          className="bg-gradient-to-br from-red-50 to-white"
        />
        <StatisticCard
          title="Net Profit"
          value="$1,130.00"
          subtitle="This week"
          footer={
            <div className="flex items-center text-blue-600">
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm font-medium">+6.8%</span>
            </div>
          }
          className="bg-gradient-to-br from-blue-50 to-white"
        />
        <StatisticCard
          title="VAT"
          value="$230.00"
          subtitle="This week"
          className="bg-gradient-to-br from-purple-50 to-white"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'transactions'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'expenses'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Expense Analysis
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'reports'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Financial Reports
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'transactions' && (
            <DataTable
              columns={transactionColumns}
              data={transactionsData}
              title="Recent Transactions"
              searchPlaceholder="Search transactions..."
            />
          )}
          {activeTab === 'expenses' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Categories</h3>
              <div className="bg-white rounded-lg overflow-hidden mb-6">
                <div className="h-6 flex">
                  {expenseCategoriesData.map((item) => (
                    <div
                      key={item.category}
                      className={`${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenseCategoriesData.map((item) => (
                  <div key={item.category} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.category}</h4>
                      <p className="text-gray-500 text-sm">{item.amount}</p>
                    </div>
                    <span className="text-lg font-bold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="py-8 text-center">
              <PieChart size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Financial Reports</h3>
              <p className="text-gray-500 mb-4">Generate comprehensive financial reports.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <DollarSign size={24} className="text-green-600 mb-2" />
                  <h4 className="font-medium">Income Statement</h4>
                  <p className="text-sm text-gray-500">Profit and loss report</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <CreditCard size={24} className="text-blue-600 mb-2" />
                  <h4 className="font-medium">Cash Flow</h4>
                  <p className="text-sm text-gray-500">Money movement report</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg text-left hover:bg-gray-50">
                  <Activity size={24} className="text-purple-600 mb-2" />
                  <h4 className="font-medium">VAT Report</h4>
                  <p className="text-sm text-gray-500">Tax liability report</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;