import React, { ReactNode } from 'react';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  trendLabel?: string;
  color?: string;
};

const DashboardCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel = 'vs last week',
  color = 'bg-indigo-600'
}: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color} text-white`}>
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '+' : ''}{trend}%
            </span>
            <span className="text-gray-500 text-sm ml-2">{trendLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCard;