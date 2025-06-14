import React from 'react';
import { Upload, FileText, ArrowRight } from 'lucide-react';

interface MainActionsProps {
  onNavigate: (view: 'analysis' | 'reports') => void;
}

export const MainActions: React.FC<MainActionsProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        onClick={() => onNavigate('analysis')}
        className="bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Spreadsheet Analysis</h3>
        <p className="text-gray-600 mb-4">
          Upload your data files and let our AI identify patterns, trends, and key insights automatically.
        </p>
        
        <div className="flex items-center text-sm text-green-600 font-medium">
          Analyze Data
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>

      <div
        onClick={() => onNavigate('reports')}
        className="bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Executive Reports</h3>
        <p className="text-gray-600 mb-4">
          Transform technical data into professional executive reports with narrative and actionable insights.
        </p>
        
        <div className="flex items-center text-sm text-green-600 font-medium">
          Generate Report
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};