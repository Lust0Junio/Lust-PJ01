import React from 'react';
import { Clock, FileSpreadsheet, TrendingUp, AlertCircle } from 'lucide-react';

const recentAnalyses = [
  {
    id: 1,
    name: 'Q3 Sales Performance',
    type: 'Spreadsheet Analysis',
    date: '2 hours ago',
    status: 'completed',
    insights: 3,
    icon: FileSpreadsheet
  },
  {
    id: 2,
    name: 'Marketing KPIs Review',
    type: 'Executive Report',
    date: '1 day ago',
    status: 'completed',
    insights: 5,
    icon: TrendingUp
  },
  {
    id: 3,
    name: 'Financial Dashboard',
    type: 'Spreadsheet Analysis',
    date: '3 days ago',
    status: 'completed',
    insights: 2,
    icon: AlertCircle
  }
];

export const RecentAnalyses: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {recentAnalyses.map((analysis) => {
            const IconComponent = analysis.icon;
            return (
              <div
                key={analysis.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">{analysis.name}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-500">{analysis.type}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {analysis.date}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {analysis.insights} insights
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 ml-auto"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="w-full mt-6 py-2 text-sm text-green-600 font-medium hover:text-green-700 transition-colors">
          View All Analyses
        </button>
      </div>
    </div>
  );
};