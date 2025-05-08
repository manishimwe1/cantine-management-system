'use client'

import React, { use, useEffect, useState } from 'react'
import { columns } from './columns';
import DataTable from './data-table';
import { usePurchaseItemStore } from '@/lib/store';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import RequestItem from '@/components/RequestItem';

const RequestItemPage = () => {
    const [activeTab, setActiveTab] = useState('Requisition');
    const {purchaseItems,setPurchaseItems} = usePurchaseItemStore()
    const purchaseItem = useQuery(api.myFunctions.purchaseItem);
    useEffect(() => {
        if (!purchaseItems) {
            if (purchaseItem) {
                
                setPurchaseItems(purchaseItem);
            }
        }
    },[purchaseItems,purchaseItem])
    if (!purchaseItems) {
        return(
            <Skeleton className=' w-full h-20'/>
        )
    }
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('Requisition')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'transactions'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Requisition
            </button>
            <button
              onClick={() => setActiveTab('Pending-Requisition')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'expenses'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
             Pending Requisition
            </button>
            <button
              onClick={() => setActiveTab('Pending-Requisition')}
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
          {activeTab === 'Requisition' && (
            <DataTable
              columns={columns}
              data={purchaseItems}
              title="Requisition List"
              searchPlaceholder="Search transactions..."
            />
          )}

             
          {/* {activeTab === 'expenses' && (
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
          )} */}
        </div>
      </div>
  )
}

export default RequestItemPage