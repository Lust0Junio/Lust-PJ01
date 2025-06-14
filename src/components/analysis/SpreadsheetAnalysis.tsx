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
    <div className="min-h-screen bg-gray-50">
      <AnalysisHeader onBack={onBack} onLogout={onLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Spreadsheet Analysis</h1>
          <p className="text-gray-600">Upload your data and discover insights automatically</p>
        </div>

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
      </main>
    </div>
  );
};