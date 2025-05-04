'use client'

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  UserPlus, 
  Download, 
  Fingerprint,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Search,
  DollarSign
} from 'lucide-react';
import DataTable from '@/components/DataTable';
import StatisticCard from '@/components/StatisticCard';

// Sample clients data
const clientsData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 555-123-4567', type: 'Regular', visits: 45, lastVisit: '2023-07-01', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 555-987-6543', type: 'VIP', visits: 120, lastVisit: '2023-07-02', status: 'Active' },
  { id: 3, name: 'Mike Johnson', email: 'mike.j@example.com', phone: '+1 555-456-7890', type: 'Corporate', visits: 30, lastVisit: '2023-06-28', status: 'Active' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah.w@example.com', phone: '+1 555-789-0123', type: 'Regular', visits: 12, lastVisit: '2023-06-15', status: 'Inactive' },
  { id: 5, name: 'David Miller', email: 'david.m@example.com', phone: '+1 555-012-3456', type: 'Corporate', visits: 65, lastVisit: '2023-06-30', status: 'Active' },
];

const ClientManagement = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const clientColumns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Type', accessor: 'type' },
    { header: 'Visits', accessor: 'visits' },
    { header: 'Last Visit', accessor: 'lastVisit' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => value === 'Active' ? 'text-green-600' : 'text-gray-600'
    },
    { 
      header: 'Actions', 
      accessor: 'actions',
      render: (row: any) => (
        <div className="flex space-x-2">
          <button 
            className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            onClick={() => setSelectedClient(row.id)}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 md:mb-0">Client Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700 transition-colors">
            <UserPlus size={18} className="mr-2" />
            Add New Client
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Fingerprint size={18} className="mr-2" />
            Fingerprint Setup
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50 transition-colors">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatisticCard
          title="Total Clients"
          value={clientsData.length}
          subtitle="Registered in system"
          className="bg-gradient-to-br from-indigo-50 to-white"
        />
        <StatisticCard
          title="Active Clients"
          value={clientsData.filter(client => client.status === 'Active').length}
          subtitle="In the last month"
          className="bg-gradient-to-br from-green-50 to-white"
        />
        <StatisticCard
          title="VIP Clients"
          value={clientsData.filter(client => client.type === 'VIP').length}
          subtitle="Premium membership"
          className="bg-gradient-to-br from-amber-50 to-white"
        />
        <StatisticCard
          title="Corporate Clients"
          value={clientsData.filter(client => client.type === 'Corporate').length}
          subtitle="Business accounts"
          className="bg-gradient-to-br from-blue-50 to-white"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'clients'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Clients List
            </button>
            <button
              onClick={() => setActiveTab('authentication')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'authentication'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Authentication
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'activity'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Activity Log
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'clients' && (
            selectedClient ? (
              <div>
                <div className="flex justify-between mb-6">
                  <button 
                    onClick={() => setSelectedClient(null)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <span className="mr-1">←</span> Back to clients list
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                              {clientsData.find(c => c.id === selectedClient)?.name}
                            </h2>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {clientsData.find(c => c.id === selectedClient)?.type}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-500">
                            <MoreHorizontal size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <Mail size={18} className="text-gray-400 mr-3" />
                            <span className="text-gray-600">
                              {clientsData.find(c => c.id === selectedClient)?.email}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={18} className="text-gray-400 mr-3" />
                            <span className="text-gray-600">
                              {clientsData.find(c => c.id === selectedClient)?.phone}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={18} className="text-gray-400 mr-3" />
                            <span className="text-gray-600">
                              123 Main St, Anytown, USA
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Total Visits</p>
                              <p className="text-lg font-semibold">
                                {clientsData.find(c => c.id === selectedClient)?.visits}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Last Visit</p>
                              <p className="text-lg font-semibold">
                                {clientsData.find(c => c.id === selectedClient)?.lastVisit}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <div className="flex justify-between">
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            Edit Profile
                          </button>
                          <button className="px-4 py-2 border border-gray-300 bg-white rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                            View Activity
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                      </div>
                      <div className="p-6">
                        <div className="space-y-6">
                          <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <Users size={20} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">Visited the canteen</p>
                              <p className="text-sm text-gray-500">July 1, 2023 - 12:30 PM</p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                              <DollarSign size={20} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">Made a payment of $24.50</p>
                              <p className="text-sm text-gray-500">June 28, 2023 - 1:45 PM</p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              <Fingerprint size={20} />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">Updated fingerprint data</p>
                              <p className="text-sm text-gray-500">June 15, 2023 - 10:20 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                      <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                      </div>
                      <div className="p-6">
                        <textarea 
                          rows={4}
                          className="w-full border border-gray-300 rounded-md p-2 text-sm"
                          placeholder="Add notes about this client..."
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                            Save Notes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DataTable
                columns={clientColumns}
                data={clientsData}
                title="Clients Directory"
                searchPlaceholder="Search clients by name, email..."
              />
            )
          )}
          {activeTab === 'authentication' && (
            <div className="py-8 text-center">
              <Fingerprint size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Fingerprint Authentication</h3>
              <p className="text-gray-500 mb-4">Secure client authentication using biometric data.</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Register New Fingerprint
              </button>
            </div>
          )}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Client Activity Log</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Search activities..."
                  />
                </div>
              </div>
              
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jane Smith</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Canteen Visit</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-07-02 12:30 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Order #1052</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Payment</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-07-01 2:15 PM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$35.75 - Invoice #2043</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mike Johnson</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Registration</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-28 10:45 AM</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">New corporate account</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;