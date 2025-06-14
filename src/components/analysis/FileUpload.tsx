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
    <div className="max-w-2xl mx-auto">
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
            isDragging ? 'bg-green-500' : 'bg-gray-100'
          }`}>
            <Upload className={`w-8 h-8 ${isDragging ? 'text-white' : 'text-gray-600'}`} />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Drop your spreadsheet here
          </h3>
          <p className="text-gray-600 mb-6">
            or click to browse your files
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
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
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      <div className="mt-8 bg-white rounded-xl border border-gray-100 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Supported Formats</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Excel (.xlsx)</span>
          </div>
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Excel (.xls)</span>
          </div>
          <div className="flex items-center space-x-3">
            <FileSpreadsheet className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">CSV (.csv)</span>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h5 className="font-medium text-gray-900 mb-2">Requirements</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Maximum file size: 50MB</li>
            <li>• Headers should be in the first row</li>
            <li>• Numerical data for KPI analysis</li>
            <li>• Date columns for trend analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
};