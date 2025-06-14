import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Download, Eye, BarChart, LineChart } from 'lucide-react';

interface AnalysisResultsProps {
  fileName: string;
  onStartOver: () => void;
}

const insights = [
  {
    type: 'trend',
    title: 'Revenue Growth Trend',
    description: 'Revenue shows consistent upward trajectory with 34% growth over the analyzed period.',
    impact: 'positive',
    confidence: 92,
    icon: TrendingUp
  },
  {
    type: 'anomaly',
    title: 'April Performance Dip',
    description: 'Orders decreased by 10.2% in April compared to March, breaking the growth pattern.',
    impact: 'negative',
    confidence: 87,
    icon: TrendingDown
  },
  {
    type: 'opportunity',
    title: 'Conversion Rate Optimization',
    description: 'May shows highest conversion rate (4.1%), suggesting successful tactics worth replicating.',
    impact: 'positive',
    confidence: 94,
    icon: AlertTriangle
  }
];

const kpis = [
  { name: 'Total Revenue', value: '$728,000', change: '+24.6%', positive: true },
  { name: 'Average Orders', value: '395', change: '+18.2%', positive: true },
  { name: 'Conversion Rate', value: '3.6%', change: '+12.5%', positive: true },
  { name: 'Customer Satisfaction', value: '4.5', change: '+4.7%', positive: true }
];

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ fileName, onStartOver }) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'trends' | 'anomalies'>('insights');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Analysis Complete</h2>
            <p className="text-gray-600">Analysis of {fileName}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="text-sm text-gray-600 mb-1">{kpi.name}</div>
            <div className="text-2xl font-semibold text-gray-900 mb-2">{kpi.value}</div>
            <div className={`flex items-center text-sm font-medium ${
              kpi.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.positive ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Tabs */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="border-b border-gray-100">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'insights', label: 'Key Insights', count: insights.length },
              { id: 'trends', label: 'Trends', count: 2 },
              { id: 'anomalies', label: 'Anomalies', count: 1 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'insights' && (
            <div className="space-y-6">
              {insights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div key={index} className="border border-gray-100 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                          insight.impact === 'positive' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            insight.impact === 'positive' ? 'text-green-600' : 'text-red-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                          <p className="text-gray-600 mt-1">{insight.description}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Confidence</div>
                        <div className="text-lg font-semibold text-gray-900">{insight.confidence}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-100 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <BarChart className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
                  </div>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Chart visualization would appear here</span>
                  </div>
                </div>
                
                <div className="border border-gray-100 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <LineChart className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-900">Order Volume</h3>
                  </div>
                  <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Chart visualization would appear here</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anomalies' && (
            <div className="space-y-6">
              <div className="border border-gray-100 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">April Order Volume Drop</h3>
                    <p className="text-gray-600 mb-4">
                      Detected significant decrease in order volume during April. This represents a 10.2% drop compared to the previous month's performance.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-sm">
                        <div className="font-medium text-yellow-800">Recommended Actions:</div>
                        <ul className="mt-2 text-yellow-700 space-y-1">
                          <li>• Investigate marketing campaigns during April</li>
                          <li>• Review seasonal factors affecting demand</li>
                          <li>• Analyze competitor activities in that period</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onStartOver}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Analyze New File
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Save Analysis
          </button>
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
            Generate Executive Report
          </button>
        </div>
      </div>
    </div>
  );
};