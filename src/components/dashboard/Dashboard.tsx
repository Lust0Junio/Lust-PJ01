import React from 'react';
import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface DashboardProps {
  onNavigate: (view: 'analysis' | 'reports') => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex">
      <Sidebar onNavigate={onNavigate} onLogout={onLogout} />
      <MainContent onNavigate={onNavigate} />
    </div>
  );
};