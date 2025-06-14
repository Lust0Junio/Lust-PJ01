import React from 'react';
import { Header } from './Header';
import { MainActions } from './MainActions';
import { RecentAnalyses } from './RecentAnalyses';
import { UsageStats } from './UsageStats';

interface DashboardProps {
  onNavigate: (view: 'analysis' | 'reports') => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Transform your data into actionable insights</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <MainActions onNavigate={onNavigate} />
            <RecentAnalyses />
          </div>
          
          <div>
            <UsageStats />
          </div>
        </div>
      </main>
    </div>
  );
};