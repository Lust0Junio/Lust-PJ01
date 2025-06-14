import React from 'react';
import { BarChart3, FileText, TrendingUp, Users } from 'lucide-react';

const stats = [
  {
    label: 'Analyses This Month',
    value: '24',
    change: '+18%',
    icon: BarChart3,
    positive: true
  },
  {
    label: 'Reports Generated',
    value: '12',
    change: '+25%',
    icon: FileText,
    positive: true
  },
  {
    label: 'Insights Discovered',
    value: '89',
    change: '+12%',
    icon: TrendingUp,
    positive: true
  }
];

export const UsageStats: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Usage Overview</h2>
      </div>
      
      <div className="p-6 space-y-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
                </div>
              </div>
              
              <div className={`text-sm font-medium ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-semibold text-gray-900 mb-1">Pro Plan</div>
            <div className="text-sm text-gray-600 mb-4">Unlimited analyses & reports</div>
            <button className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};