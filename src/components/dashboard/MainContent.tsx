import React from 'react';
import { Upload, TrendingUp, FileText, ArrowRight } from 'lucide-react';

interface MainContentProps {
  onNavigate: (view: 'analysis' | 'reports') => void;
}

export const MainContent: React.FC<MainContentProps> = ({ onNavigate }) => {
  return (
    <div className="flex-1 p-8">
      {/* Header with status indicators */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Welcome back</h1>
            <p className="text-[#666666] text-lg">Transform your data into actionable insights</p>
          </div>
          
          {/* Status Medallions */}
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full border-2 border-[#A23AFF] bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#A23AFF]/20">
              <TrendingUp className="w-7 h-7 text-[#A23AFF]" />
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-[#A23AFF] bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#A23AFF]/20">
              <FileText className="w-7 h-7 text-[#A23AFF]" />
            </div>
            <div className="w-16 h-16 rounded-full border-2 border-[#A23AFF] bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-[#A23AFF]/20">
              <Upload className="w-7 h-7 text-[#A23AFF]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Upload Panel */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl shadow-[#A23AFF]/10 border border-[#A23AFF]/20 p-12 relative overflow-hidden">
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#A23AFF]/5 via-transparent to-[#FF6B9D]/5 pointer-events-none" />
          
          {/* Upload Area */}
          <div className="relative">
            <div className="border-3 border-dashed border-[#A23AFF] rounded-2xl p-16 text-center relative group hover:border-[#FF6B9D] hover:shadow-lg hover:shadow-[#A23AFF]/20 transition-all duration-500">
              {/* Pulsing glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#A23AFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              {/* Central icon with dark circle */}
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-[#2C2C2C]/80 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                  <Upload className="w-12 h-12 text-[#A23AFF]" />
                </div>
                
                {/* Hand-drawn arrow */}
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
                  <svg width="60" height="40" viewBox="0 0 60 40" className="text-[#A23AFF]">
                    <path 
                      d="M5 20 Q25 5 45 20 Q35 25 45 20" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <path 
                      d="M40 15 L45 20 L40 25" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Text placeholders */}
              <div className="space-y-4">
                <div className="h-8 bg-[#CCCCCC]/30 rounded-lg w-64 mx-auto" />
                <div className="h-6 bg-[#CCCCCC]/20 rounded-lg w-48 mx-auto" />
              </div>

              {/* Action buttons */}
              <div className="mt-8 space-y-4">
                <button
                  onClick={() => onNavigate('analysis')}
                  className="bg-[#A23AFF] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#FF6B9D] hover:shadow-lg hover:shadow-[#A23AFF]/30 hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Upload className="w-5 h-5" />
                  <span>Start Analysis</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => onNavigate('reports')}
                  className="border-2 border-[#A23AFF] text-[#A23AFF] px-8 py-4 rounded-xl font-semibold hover:bg-[#A23AFF] hover:text-white hover:shadow-lg hover:shadow-[#A23AFF]/30 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <FileText className="w-5 h-5" />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {[
            { label: 'Analyses', value: '24', change: '+18%' },
            { label: 'Reports', value: '12', change: '+25%' },
            { label: 'Insights', value: '89', change: '+12%' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#A23AFF]/10 hover:border-[#A23AFF]/30 hover:shadow-lg hover:shadow-[#A23AFF]/10 transition-all duration-300">
              <div className="h-4 bg-[#CCCCCC]/30 rounded w-20 mb-3" />
              <div className="h-8 bg-[#2C2C2C]/80 rounded w-12 mb-2" />
              <div className="h-4 bg-[#A23AFF]/60 rounded w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};