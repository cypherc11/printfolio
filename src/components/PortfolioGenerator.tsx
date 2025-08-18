import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Copy, Share2, Download } from 'lucide-react';
import { CVData, PortfolioTemplate } from '../types';
import toast from 'react-hot-toast';

interface PortfolioGeneratorProps {
  cvData: CVData;
  template: PortfolioTemplate;
  onBack: () => void;
  onNewPortfolio: () => void;
}

export const PortfolioGenerator: React.FC<PortfolioGeneratorProps> = ({
  cvData,
  template,
  onBack,
  onNewPortfolio
}) => {
  const [generationStatus, setGenerationStatus] = useState<'generating' | 'deploying' | 'completed'>('generating');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');

  useEffect(() => {
    generatePortfolio();
  }, []);

  const generatePortfolio = async () => {
    // Simulate portfolio generation and deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGenerationStatus('deploying');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a unique portfolio URL
    const username = cvData.personalInfo.name.toLowerCase().replace(/\s+/g, '-');
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const url = `https://${username}-${uniqueId}.printfolio.app`;
    
    setPortfolioUrl(url);
    setGenerationStatus('completed');
    
    toast.success('Portfolio deployed successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(portfolioUrl);
    toast.success('URL copied to clipboard!');
  };

  const sharePortfolio = () => {
    if (navigator.share) {
      navigator.share({
        title: `${cvData.personalInfo.name}'s Portfolio`,
        text: 'Check out my professional portfolio',
        url: portfolioUrl,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {generationStatus === 'completed' ? 'Portfolio Ready!' : 'Generating Your Portfolio'}
        </h2>
        <p className="text-lg text-gray-600">
          {generationStatus === 'generating' && 'Our AI is creating your personalized portfolio...'}
          {generationStatus === 'deploying' && 'Deploying your portfolio to the web...'}
          {generationStatus === 'completed' && 'Your portfolio is now live and ready to share!'}
        </p>
      </div>

      {/* Generation Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
      >
        <div className="space-y-6">
          {/* Step 1: Generating */}
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'generating' 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : 'bg-green-100'
            }`}>
              {generationStatus === 'generating' ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Creating Portfolio Content</h3>
              <p className="text-sm text-gray-600">
                Formatting your experience, skills, and projects with the {template.name} template
              </p>
            </div>
          </div>

          {/* Step 2: Deploying */}
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'deploying' 
                ? 'bg-blue-100 border-2 border-blue-500' 
                : generationStatus === 'completed'
                ? 'bg-green-100'
                : 'bg-gray-100'
            }`}>
              {generationStatus === 'deploying' ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              ) : generationStatus === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-sm font-medium text-gray-400">2</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Deploying to Web</h3>
              <p className="text-sm text-gray-600">
                Publishing your portfolio with SEO optimization and SSL certificate
              </p>
            </div>
          </div>

          {/* Step 3: Ready */}
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              generationStatus === 'completed' 
                ? 'bg-green-100' 
                : 'bg-gray-100'
            }`}>
              {generationStatus === 'completed' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <span className="text-sm font-medium text-gray-400">3</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Portfolio Live</h3>
              <p className="text-sm text-gray-600">
                Your portfolio is accessible worldwide with a unique URL
              </p>
            </div>
          </div>
        </div>

        {/* Portfolio Preview */}
        {generationStatus === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Portfolio Preview</h4>
            <div className="bg-white rounded-lg border border-gray-200 p-4 min-h-64">
              {/* Mock portfolio preview */}
              <div className="text-center mb-6">
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  style={{ backgroundColor: template.colors.primary }}
                />
                <h2 className="text-2xl font-bold" style={{ color: template.colors.primary }}>
                  {cvData.personalInfo.name}
                </h2>
                <p className="text-gray-600">{cvData.experience[0]?.position || 'Professional'}</p>
                <p className="text-sm text-gray-500 mt-2">{cvData.personalInfo.location}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: template.colors.primary }}>
                    About
                  </h3>
                  <p className="text-sm text-gray-600">{cvData.personalInfo.bio}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3" style={{ color: template.colors.primary }}>
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cvData.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-1 rounded text-xs"
                        style={{ 
                          backgroundColor: template.colors.accent + '20',
                          color: template.colors.accent 
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Success Actions */}
      {generationStatus === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
        >
          <div className="text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Your Portfolio is Live!
            </h3>
            <p className="text-gray-600">
              Share your professional portfolio with potential employers and clients
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio URL
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={portfolioUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open(portfolioUrl, '_blank')}
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Portfolio</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={sharePortfolio}
              className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyToClipboard}
              className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>Copy URL</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toast.success('Export feature coming soon!')}
              className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </motion.button>
          </div>

          <div className="text-center">
            <button
              onClick={onNewPortfolio}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 mr-4"
            >
              Create Another Portfolio
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Back to Templates
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};