import React from 'react';
import { 
  ShoppingCart, 
  DollarSign, 
  Users, 
  ChefHat, 
  TrendingUp, 
  TrendingDown,
  Coffee
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import DataTable from '../components/DataTable';
import StatisticCard from '../components/StatisticCard';

const Dashboard = () => {
  // Sample data for dashboard
  const recentTransactions = [
    { id: 1, date: '2023-07-01', description: 'Vegetables Supply', amount: '$350.00', status: 'Completed' },
    { id: 2, date: '2023-07-02', description: 'Kitchen Equipment', amount: '$1,200.00', status: 'Pending' },
    { id: 3, date: '2023-07-03', description: 'Staff Salary', amount: '$2,500.00', status: 'Completed' },
    { id: 4, date: '2023-07-04', description: 'Cleaning Supplies', amount: '$150.00', status: 'Completed' },
    { id: 5, date: '2023-07-05', description: 'Meat Supply', amount: '$620.00', status: 'Processing' },
  ];

  const columns = [
    { header: 'Date', accessor: 'date' },
    { header: 'Description', accessor: 'description' },
    { header: 'Amount', accessor: 'amount', className: 'font-medium' },
    { 
      header: 'Status', 
      accessor: 'status',
      className: (value: string) => {
        if (value === 'Completed') return 'text-green-600';
        if (value === 'Pending') return 'text-yellow-600';
        return 'text-blue-600';
      }
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Revenue" 
          value="$24,580" 
          icon={<DollarSign size={20} />} 
          trend={8.2} 
          color="bg-emerald-600"
        />
        <DashboardCard 
          title="Total Expenses" 
          value="$15,200" 
          icon={<ShoppingCart size={20} />} 
          trend={-2.3} 
          color="bg-red-600"
        />
        <DashboardCard 
          title="Total Clients" 
          value="237" 
          icon={<Users size={20} />} 
          trend={4.6} 
          color="bg-blue-600"
        />
        <DashboardCard 
          title="Total Meals" 
          value="1,543" 
          icon={<ChefHat size={20} />} 
          trend={12.7} 
          color="bg-amber-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DataTable 
            title="Recent Transactions" 
            columns={columns} 
            data={recentTransactions} 
            searchPlaceholder="Search transactions..."
          />
        </div>
        <div className="space-y-6">
          <StatisticCard
            title="Net Income"
            value="$9,380"
            subtitle="After taxes and expenses"
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center text-green-600">
                  <TrendingUp size={16} className="mr-1" />
                  <span className="text-sm font-medium">12.5%</span>
                </div>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            }
          />
          <StatisticCard
            title="Low Stock Items"
            value="8"
            subtitle="Items need reordering"
            footer={
              <div className="flex justify-between items-center">
                <div className="flex items-center text-red-600">
                  <TrendingDown size={16} className="mr-1" />
                  <span className="text-sm font-medium">3 critical</span>
                </div>
                <span className="text-sm text-gray-500">View all</span>
              </div>
            }
          />
          <StatisticCard
            title="Today's Special"
            value="Pasta Carbonara"
            subtitle="$12.99 per serving"
            footer={
              <div className="flex items-center">
                <Coffee size={16} className="mr-2 text-amber-600" />
                <span className="text-sm text-gray-600">42 orders today</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;