import React, { useState } from 'react';
import { AnalysisHeader } from './AnalysisHeader';
import { FileUpload } from './FileUpload';
import { DataPreview } from './DataPreview';
import { AnalysisResults } from './AnalysisResults';

interface SpreadsheetAnalysisProps {
  onBack: () => void;
  onLogout: () => void;
}

type AnalysisStep = 'upload' | 'preview' | 'results';

export const SpreadsheetAnalysis: React.FC<SpreadsheetAnalysisProps> = ({ onBack, onLogout }) => {
  const [currentStep, setCurrentStep] = useState<AnalysisStep>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentStep('preview');
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setCurrentStep('results');
    }, 3000);
  };

  const handleStartOver = () => {
    setUploadedFile(null);
    setCurrentStep('upload');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex">
      {/* Sidebar */}
      <div className="w-80 bg-[#0A0A0A] h-screen flex flex-col">
        <div className="p-8 border-b border-[#333333]">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 text-[#CCCCCC] hover:text-white transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#A23AFF] rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">Analysis</h1>
              <p className="text-[#CCCCCC] text-sm">Data Processing</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="p-6 flex-1">
          <div className="space-y-4">
            {[
              { id: 'upload', label: 'Upload File', active: currentStep === 'upload', completed: ['preview', 'results'].includes(currentStep) },
              { id: 'preview', label: 'Preview Data', active: currentStep === 'preview', completed: currentStep === 'results' },
              { id: 'results', label: 'View Results', active: currentStep === 'results', completed: false }
            ].map((step, index) => (
              <div key={step.id} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.completed 
                    ? 'bg-[#A23AFF] text-white' 
                    : step.active 
                      ? 'bg-[#A23AFF]/20 text-[#A23AFF] border-2 border-[#A23AFF]'
                      : 'bg-[#333333] text-[#CCCCCC]'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <span className={`font-medium ${
                  step.active ? 'text-white' : step.completed ? 'text-[#A23AFF]' : 'text-[#CCCCCC]'
                }`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {currentStep === 'upload' && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}

        {currentStep === 'preview' && uploadedFile && (
          <DataPreview 
            file={uploadedFile} 
            onAnalyze={handleAnalyze}
            onBack={handleStartOver}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentStep === 'results' && uploadedFile && (
          <AnalysisResults 
            fileName={uploadedFile.name}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </div>
  );
};