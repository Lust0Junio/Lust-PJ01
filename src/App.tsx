import React, { useState } from 'react';
import { AuthView } from './components/auth/AuthView';
import { Dashboard } from './components/dashboard/Dashboard';
import { SpreadsheetAnalysis } from './components/analysis/SpreadsheetAnalysis';
import { ExecutiveReports } from './components/reports/ExecutiveReports';

type View = 'auth' | 'dashboard' | 'analysis' | 'reports';

function App() {
  const [currentView, setCurrentView] = useState<View>('auth');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleNavigation = (view: View) => {
    if (isAuthenticated) {
      setCurrentView(view);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('auth');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <AuthView onLogin={handleLogin} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} onLogout={handleLogout} />;
      case 'analysis':
        return <SpreadsheetAnalysis onBack={() => handleNavigation('dashboard')} onLogout={handleLogout} />;
      case 'reports':
        return <ExecutiveReports onBack={() => handleNavigation('dashboard')} onLogout={handleLogout} />;
      default:
        return <AuthView onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentView()}
    </div>
  );
}

export default App;