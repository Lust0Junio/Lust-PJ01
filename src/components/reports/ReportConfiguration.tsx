import React, { useState } from 'react';
import { Settings, Calendar, Target, Users } from 'lucide-react';

interface ReportConfigurationProps {
  source: string;
  onSave: (config: any) => void;
  onBack: () => void;
  isGenerating: boolean;
}

export const ReportConfiguration: React.FC<ReportConfigurationProps> = ({ source, onSave, onBack, isGenerating }) => {
  const [config, setConfig] = useState({
    title: 'Q3 Executive Summary',
    audience: 'executive',
    period: 'quarterly',
    focus: 'performance',
    includeCharts: true,
    includeRecommendations: true,
    template: 'executive'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Report Details */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <Settings className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">Report Configuration</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Title
            </label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({...config, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter report title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Period
            </label>
            <select
              value={config.period}
              onChange={(e) => setConfig({...config, period: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Period</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audience & Focus */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Target Audience & Focus</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Target Audience
            </label>
            <div className="space-y-3">
              {[
                { id: 'executive', label: 'C-Level Executives', desc: 'High-level strategic insights', icon: Target },
                { id: 'management', label: 'Middle Management', desc: 'Operational insights and tactics', icon: Users },
                { id: 'team', label: 'Team Leads', desc: 'Detailed performance metrics', icon: Users }
              ].map((audience) => {
                const IconComponent = audience.icon;
                return (
                  <label key={audience.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="audience"
                      value={audience.id}
                      checked={config.audience === audience.id}
                      onChange={(e) => setConfig({...config, audience: e.target.value})}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">{audience.label}</div>
                        <div className="text-sm text-gray-600">{audience.desc}</div>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Report Focus
            </label>
            <div className="space-y-3">
              {[
                { id: 'performance', label: 'Performance Analysis', desc: 'KPI trends and comparisons' },
                { id: 'growth', label: 'Growth Opportunities', desc: 'Expansion and improvement areas' },
                { id: 'efficiency', label: 'Operational Efficiency', desc: 'Process optimization insights' },
                { id: 'risk', label: 'Risk Assessment', desc: 'Potential challenges and mitigation' }
              ].map((focus) => (
                <label key={focus.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="focus"
                    value={focus.id}
                    checked={config.focus === focus.id}
                    onChange={(e) => setConfig({...config, focus: e.target.value})}
                    className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{focus.label}</div>
                    <div className="text-sm text-gray-600">{focus.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Features */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Features</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div>
              <div className="font-medium text-gray-900">Include Charts & Visualizations</div>
              <div className="text-sm text-gray-600">Automatically generate appropriate charts for your data</div>
            </div>
            <input
              type="checkbox"
              checked={config.includeCharts}
              onChange={(e) => setConfig({...config, includeCharts: e.target.checked})}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
            <div>
              <div className="font-medium text-gray-900">Generate Recommendations</div>
              <div className="text-sm text-gray-600">AI-powered actionable insights and next steps</div>
            </div>
            <input
              type="checkbox"
              checked={config.includeRecommendations}
              onChange={(e) => setConfig({...config, includeRecommendations: e.target.checked})}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
          </label>
        </div>
      </div>

      {/* Template Selection */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Template</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'executive', name: 'Executive Summary', desc: 'Clean, professional layout for C-level' },
            { id: 'detailed', name: 'Detailed Analysis', desc: 'Comprehensive report with full data' },
            { id: 'presentation', name: 'Presentation Ready', desc: 'Optimized for boardroom presentations' }
          ].map((template) => (
            <label
              key={template.id}
              className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                config.template === template.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="template"
                value={template.id}
                checked={config.template === template.id}
                onChange={(e) => setConfig({...config, template: e.target.value})}
                className="sr-only"
              />
              <div className="font-medium text-gray-900 mb-1">{template.name}</div>
              <div className="text-sm text-gray-600">{template.desc}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back to Source
        </button>
        
        <button
          type="submit"
          disabled={isGenerating}
          className="px-8 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Generating Report...
            </>
          ) : (
            'Generate Report'
          )}
        </button>
      </div>
    </form>
  );
};