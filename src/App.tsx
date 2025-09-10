import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { StepIndicator } from './components/StepIndicator';
import { CVUpload } from './components/CVUpload';
import { DataPreview } from './components/DataPreview';
import { TemplateSelector } from './components/TemplateSelector';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { CVData, PortfolioTemplate } from './types';
import { AIService } from './lib/aiService';

const steps = [
  { id: 1, title: 'Upload CV', description: 'Upload your resume' },
  { id: 2, title: 'Review Data', description: 'Edit extracted information' },
  { id: 3, title: 'Choose Template', description: 'Select portfolio design' },
  { id: 4, title: 'Deploy', description: 'Generate & publish' }
];

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<PortfolioTemplate | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const aiService = new AIService();

  const handleFileUpload = async (file: File, content: string) => {
    setUploadedFile(file);
    setIsProcessing(true);
    
    try {
      const parsedData = await aiService.parseCV(content, file.name);
      
      const cvData: CVData = {
        personalInfo: parsedData.personalInfo,
        experience: parsedData.experience,
        education: parsedData.education,
        skills: parsedData.skills,
        projects: parsedData.projects,
        languages: parsedData.languages,
        certifications: parsedData.certifications
      };
      
      setCvData(cvData);
    } catch (error) {
      console.error('Error processing CV:', error);
      alert(error)
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataUpdate = (data: CVData) => {
    setCvData(data);
  };

  const handleTemplateSelect = (template: PortfolioTemplate) => {
    setSelectedTemplate(template);
  };

  const handleNewPortfolio = () => {
    setCurrentStep(1);
    setCvData(null);
    setSelectedTemplate(null);
    setUploadedFile(null);
    setIsProcessing(false);
  };

  return (
    <Layout>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
  <div className="container mx-auto px-2 sm:px-4 md:px-8 py-4">
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={steps.length} 
          steps={steps}
        />

  <div className="mt-8 sm:mt-12">
          {currentStep === 1 && (
            <CVUpload
              onFileUpload={handleFileUpload}
              onNext={handleNext}
              isProcessing={isProcessing}
            />
          )}

          {currentStep === 2 && cvData && (
            <DataPreview
              cvData={cvData}
              onDataUpdate={handleDataUpdate}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <TemplateSelector
              onTemplateSelect={handleTemplateSelect}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 4 && cvData && selectedTemplate && (
            <PortfolioGenerator
              cvData={cvData}
              template={selectedTemplate}
              onBack={handleBack}
              onNewPortfolio={handleNewPortfolio}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;