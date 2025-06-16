import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'text/csv'
  ];

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);

    // Check file type
    if (!acceptedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
      setError('Please upload a valid Excel (.xlsx, .xls) or CSV file');
      return;
    }

    // Check file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    onFileUpload(file);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Upload Your Data</h1>
        <p className="text-[#666666] text-lg">Drop your spreadsheet here to begin analysis</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl shadow-[#A23AFF]/10 border border-[#A23AFF]/20 p-12 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#A23AFF]/5 via-transparent to-[#FF6B9D]/5 pointer-events-none" />
        
        <div
          className={`relative border-3 border-dashed rounded-2xl p-16 text-center transition-all duration-500 ${
            isDragging
              ? 'border-[#FF6B9D] bg-[#A23AFF]/10 shadow-lg shadow-[#A23AFF]/20'
              : 'border-[#A23AFF] hover:border-[#FF6B9D] hover:shadow-lg hover:shadow-[#A23AFF]/20'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Pulsing glow on hover */}
          <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
            isDragging ? 'bg-[#A23AFF]/10 opacity-100 animate-pulse' : 'bg-[#A23AFF]/5 opacity-0 hover:opacity-100'
          }`} />
          
          {/* Central icon with dark circle */}
          <div className="relative mb-8">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm transition-all duration-300 ${
              isDragging ? 'bg-[#A23AFF] scale-110' : 'bg-[#2C2C2C]/80'
            }`}>
              <Upload className={`w-12 h-12 transition-colors duration-300 ${
                isDragging ? 'text-white' : 'text-[#A23AFF]'
              }`} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Drop your spreadsheet here
          </h3>
          <p className="text-[#666666] mb-8 text-lg">
            or click to browse your files
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-[#A23AFF] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#FF6B9D] hover:shadow-lg hover:shadow-[#A23AFF]/30 hover:scale-105 transition-all duration-300"
          >
            Choose File
          </button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-700 font-medium">{error}</span>
        </div>
      )}

      <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-[#A23AFF]/10 p-8">
        <h4 className="font-bold text-[#2C2C2C] mb-6 text-xl">Supported Formats</h4>
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#A23AFF]/20">
            <FileSpreadsheet className="w-6 h-6 text-[#A23AFF]" />
            <span className="font-medium text-[#2C2C2C]">Excel (.xlsx)</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#A23AFF]/20">
            <FileSpreadsheet className="w-6 h-6 text-[#A23AFF]" />
            <span className="font-medium text-[#2C2C2C]">Excel (.xls)</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-[#A23AFF]/20">
            <FileSpreadsheet className="w-6 h-6 text-[#A23AFF]" />
            <span className="font-medium text-[#2C2C2C]">CSV (.csv)</span>
          </div>
        </div>
        
        <div className="pt-6 border-t border-[#A23AFF]/20">
          <h5 className="font-semibold text-[#2C2C2C] mb-4">Requirements</h5>
          <div className="grid grid-cols-2 gap-4 text-[#666666]">
            <ul className="space-y-2">
              <li>• Maximum file size: 50MB</li>
              <li>• Headers should be in the first row</li>
            </ul>
            <ul className="space-y-2">
              <li>• Numerical data for KPI analysis</li>
              <li>• Date columns for trend analysis</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};