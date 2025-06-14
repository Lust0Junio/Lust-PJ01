import React from 'react';
import { Download, Share, Edit, FileText, BarChart, TrendingUp } from 'lucide-react';

interface ReportPreviewProps {
  config: any;
  onStartOver: () => void;
}

const executiveSummary = {
  title: "Q3 2024 Performance Summary",
  period: "July - September 2024",
  keyMetrics: [
    { name: "Total Revenue", value: "$728,000", change: "+24.6%", positive: true },
    { name: "Customer Acquisition", value: "1,295", change: "+18.2%", positive: true },
    { name: "Conversion Rate", value: "3.6%", change: "+12.5%", positive: true },
    { name: "Customer Satisfaction", value: "4.5/5", change: "+4.7%", positive: true }
  ],
  highlights: [
    "Revenue growth accelerated to 24.6% in Q3, exceeding targets by 8.3%",
    "Customer acquisition improved significantly with enhanced digital marketing",
    "Conversion rate optimization initiatives delivered measurable results",
    "Customer satisfaction remains high despite rapid growth"
  ],
  recommendations: [
    "Scale successful digital marketing campaigns for Q4",
    "Investigate April performance dip to prevent future occurrences",
    "Implement customer retention programs to maintain satisfaction levels",
    "Consider expanding team capacity to support continued growth"
  ]
};

export const ReportPreview: React.FC<ReportPreviewProps> = ({ config, onStartOver }) => {
  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Report Generated Successfully</h2>
            <p className="text-gray-600">Your executive report is ready for review and export</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Report Header */}
        <div className="bg-gray-900 text-white p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">{executiveSummary.title}</h1>
              <p className="text-gray-300">{executiveSummary.period}</p>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-10 rounded-xl flex items-center justify-center">
              <BarChart className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-8 space-y-8">
          {/* Executive Summary */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {executiveSummary.keyMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
                  <div className={`text-sm font-medium ${
                    metric.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                Q3 2024 demonstrated exceptional performance across all key metrics, with revenue growth 
                significantly exceeding projections. The combination of enhanced digital marketing initiatives 
                and conversion rate optimization efforts has delivered measurable results, positioning the 
                organization for continued growth in Q4.
              </p>
            </div>
          </section>

          {/* Key Highlights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {executiveSummary.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{highlight}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Insights Placeholder */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Trends</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Revenue Growth</h3>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Chart: Revenue trend over time</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Customer Metrics</h3>
                <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Chart: Customer acquisition & satisfaction</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Strategic Recommendations</h2>
            <div className="space-y-4">
              {executiveSummary.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Report Footer */}
          <div className="pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>Generated by DataSight AI • {new Date().toLocaleDateString()}</div>
              <div>Page 1 of 3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onStartOver}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Create New Report
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Save to Library
          </button>
          <button className="flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Export PowerPoint
          </button>
        </div>
      </div>
    </div>
  );
};