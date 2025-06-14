import React from 'react';
import { Upload, FileSpreadsheet, Database, Clock } from 'lucide-react';

interface DataSourceSelectionProps {
  onSourceSelect: (source: string) => void;
}

const recentAnalyses = [
  {
    id: 'analysis_1',
    name: 'Q3 Sales Performance',
    date: '2 hours ago',
    type: 'Spreadsheet Analysis',
    rows: '1,247 rows',
    icon: FileSpreadsheet
  },
  {
    id: 'analysis_2',
    name: 'Marketing KPIs Review',
    date: '1 day ago',
    type: 'Excel Analysis',
    rows: '892 rows',
    icon: Database
  },
  {
    id: 'analysis_3',
    name: 'Financial Dashboard',
    date: '3 days ago',
    type: 'CSV Analysis',
    rows: '2,156 rows',
    icon: FileSpreadsheet
  }
];

export const DataSourceSelection: React.FC<DataSourceSelectionProps> = ({ onSourceSelect }) => {
  return (
    <div className="space-y-8">
      {/* New Upload Option */}
      <div className="bg-white rounded-xl border border-gray-100 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload New Data</h2>
          <p className="text-gray-600 mb-6">
            Upload a new spreadsheet to create an executive report
          </p>
          
          <button
            onClick={() => onSourceSelect('new_upload')}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            Choose File
          </button>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Use Recent Analysis</h2>
          <p className="text-gray-600 mt-1">Generate a report from your recent data analyses</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => {
              const IconComponent = analysis.icon;
              return (
                <div
                  key={analysis.id}
                  onClick={() => onSourceSelect(analysis.id)}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-green-200 hover:bg-green-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-green-100">
                      <IconComponent className="w-6 h-6 text-gray-600 group-hover:text-green-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{analysis.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-500">{analysis.type}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{analysis.rows}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {analysis.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors">
                    Use This Data
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-4">Report Generation Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <div className="font-medium mb-2">Data Requirements:</div>
            <ul className="space-y-1">
              <li>• Numerical KPIs and metrics</li>
              <li>• Time-series data for trends</li>
              <li>• Clear column headers</li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">Report Features:</div>
            <ul className="space-y-1">
              <li>• Executive summary generation</li>
              <li>• Automated chart suggestions</li>
              <li>• Actionable recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};