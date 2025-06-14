import React, { useState } from 'react';
import { ReportsHeader } from './ReportsHeader';
import { DataSourceSelection } from './DataSourceSelection';
import { ReportConfiguration } from './ReportConfiguration';
import { ReportPreview } from './ReportPreview';

interface ExecutiveReportsProps {
  onBack: () => void;
  onLogout: () => void;
}

type ReportStep = 'source' | 'config' | 'preview';

export const ExecutiveReports: React.FC<ExecutiveReportsProps> = ({ onBack, onLogout }) => {
  const [currentStep, setCurrentStep] = useState<ReportStep>('source');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [reportConfig, setReportConfig] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
    setCurrentStep('config');
  };

  const handleConfigSave = (config: any) => {
    setReportConfig(config);
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep('preview');
    }, 3000);
  };

  const handleStartOver = () => {
    setSelectedSource(null);
    setReportConfig(null);
    setCurrentStep('source');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ReportsHeader onBack={onBack} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Executive Reports</h1>
          <p className="text-gray-600">Generate professional reports with AI-powered insights</p>
        </div>

        {currentStep === 'source' && (
          <DataSourceSelection onSourceSelect={handleSourceSelect} />
        )}

        {currentStep === 'config' && selectedSource && (
          <ReportConfiguration 
            source={selectedSource}
            onSave={handleConfigSave}
            onBack={handleStartOver}
            isGenerating={isGenerating}
          />
        )}

        {currentStep === 'preview' && reportConfig && (
          <ReportPreview 
            config={reportConfig}
            onStartOver={handleStartOver}
          />
        )}
      </main>
    </div>
  );
};