import React, { useState } from 'react';
import { BarChart3, Upload, FileText, User, LogOut, Settings, Home } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: 'analysis' | 'reports') => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, onLogout }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'analysis', icon: Upload, label: 'Analysis', action: () => onNavigate('analysis') },
    { id: 'reports', icon: FileText, label: 'Reports', action: () => onNavigate('reports') },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-80 bg-[#0A0A0A] h-screen flex flex-col relative">
      {/* Logo */}
      <div className="p-8 border-b border-[#333333]">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#A23AFF] rounded-xl flex items-center justify-center shadow-lg shadow-[#A23AFF]/30">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">DataSight AI</h1>
            <p className="text-[#CCCCCC] text-sm">Analytics Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6">
        <div className="space-y-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.action) item.action();
                }}
                className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-[#A23AFF] text-white shadow-lg shadow-[#A23AFF]/30' 
                    : 'text-[#CCCCCC] hover:text-white hover:bg-[#A23AFF]/20 hover:shadow-lg hover:shadow-[#A23AFF]/20'
                }`}
              >
                <IconComponent className={`w-5 h-5 transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-[#CCCCCC] group-hover:text-[#A23AFF]'
                }`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-[#333333]">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-[#A23AFF]/20 transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#A23AFF] to-[#FF6B9D] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium">John Doe</div>
              <div className="text-[#CCCCCC] text-sm">Premium Plan</div>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#1A1A1A] rounded-xl border border-[#333333] shadow-xl shadow-black/50 overflow-hidden">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-[#CCCCCC] hover:text-white hover:bg-[#A23AFF]/20 transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#A23AFF]/30 to-transparent" />
    </div>
  );
};