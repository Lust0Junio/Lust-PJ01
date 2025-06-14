import React from 'react';
import { CheckCircle, Settings } from 'lucide-react';

interface DataPreviewProps {
  file: File;
  onAnalyze: () => void;
  onBack: () => void;
  isAnalyzing: boolean;
}

// Mock data for preview
const mockData = [
  { Month: 'January', Revenue: '$125,000', Orders: '342', 'Conversion Rate': '3.2%', 'Customer Satisfaction': '4.5' },
  { Month: 'February', Revenue: '$138,000', Orders: '389', 'Conversion Rate': '3.6%', 'Customer Satisfaction': '4.3' },
  { Month: 'March', Revenue: '$156,000', Orders: '421', 'Conversion Rate': '3.8%', 'Customer Satisfaction': '4.6' },
  { Month: 'April', Revenue: '$142,000', Orders: '378', 'Conversion Rate': '3.4%', 'Customer Satisfaction': '4.4' },
  { Month: 'May', Revenue: '$167,000', Orders: '445', 'Conversion Rate': '4.1%', 'Customer Satisfaction': '4.7' }
];

export const DataPreview: React.FC<DataPreviewProps> = ({ file, onAnalyze, onBack, isAnalyzing }) => {
  const columns = Object.keys(mockData[0]);

  return (
    <div className="space-y-8">
      {/* File Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">File Preview</h2>
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">File uploaded successfully</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-600">File Name</div>
            <div className="font-medium text-gray-900">{file.name}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">File Size</div>
            <div className="font-medium text-gray-900">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Detected Rows</div>
            <div className="font-medium text-gray-900">1,247 rows</div>
          </div>
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Data Preview</h3>
          <p className="text-gray-600 mt-1">First 5 rows of your dataset</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row[column as keyof typeof row]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis Configuration */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center mb-4">
          <Settings className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Analysis Configuration</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Column
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Month</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary KPI
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Revenue</option>
              <option>Orders</option>
              <option>Conversion Rate</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <label className="flex items-center">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <span className="ml-2 text-sm text-gray-700">Enable anomaly detection</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Upload
        </button>
        
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Analyzing...
            </>
          ) : (
            'Start Analysis'
          )}
        </button>
      </div>
    </div>
  );
};