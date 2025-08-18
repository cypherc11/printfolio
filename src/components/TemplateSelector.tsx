import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Eye } from 'lucide-react';
import { PortfolioTemplate } from '../types';

interface TemplateSelectorProps {
  onTemplateSelect: (template: PortfolioTemplate) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates: PortfolioTemplate[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design perfect for any profession',
    preview: '/templates/minimal-preview.jpg',
    category: 'minimal',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#111827'
    }
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with smooth animations',
    preview: '/templates/modern-preview.jpg',
    category: 'modern',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#06b6d4',
      background: '#f8fafc',
      text: '#1e293b'
    }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and colorful design for creative professionals',
    preview: '/templates/creative-preview.jpg',
    category: 'creative',
    colors: {
      primary: '#ec4899',
      secondary: '#f97316',
      accent: '#10b981',
      background: '#fef7ff',
      text: '#18181b'
    }
  },
  {
    id: 'technical',
    name: 'Technical',
    description: 'Professional design optimized for developers and engineers',
    preview: '/templates/technical-preview.jpg',
    category: 'technical',
    colors: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#22d3ee',
      background: '#f1f5f9',
      text: '#0f172a'
    }
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  onNext,
  onBack
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null);

  const handleTemplateSelect = (template: PortfolioTemplate) => {
    setSelectedTemplate(template);
    onTemplateSelect(template);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Portfolio Template
        </h2>
        <p className="text-lg text-gray-600">
          Select a template that matches your style and profession. You can customize colors and layout later.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedTemplate?.id === template.id
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            {selectedTemplate?.id === template.id && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white rounded-full p-1">
                <Check className="h-4 w-4" />
              </div>
            )}

            {/* Template Preview */}
            <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden h-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full mx-auto mb-3"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-24 mx-auto" />
                    <div className="h-2 bg-gray-200 rounded w-16 mx-auto" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <Eye className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {template.name}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {template.description}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 uppercase font-medium">
                  {template.category}
                </span>
                <div className="flex space-x-1">
                  {Object.values(template.colors).slice(0, 3).map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Template Features */}
            <div className="space-y-1">
              <div className="flex items-center text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-500 mr-2" />
                Responsive Design
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-500 mr-2" />
                SEO Optimized
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Check className="h-3 w-3 text-green-500 mr-2" />
                Contact Form
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedTemplate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 inline-block">
            <h4 className="font-semibold text-gray-900 mb-2">
              Selected: {selectedTemplate.name}
            </h4>
            <p className="text-gray-600 text-sm mb-4">
              {selectedTemplate.description}
            </p>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-sm text-gray-500">Colors:</span>
              <div className="flex space-x-2">
                {Object.entries(selectedTemplate.colors).map(([name, color]) => (
                  <div key={name} className="text-center">
                    <div
                      className="w-8 h-8 rounded-lg border border-gray-300 mb-1"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-gray-400 capitalize">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedTemplate}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedTemplate ? 'Generate Portfolio' : 'Select a Template'}
        </button>
      </div>
    </div>
  );
};