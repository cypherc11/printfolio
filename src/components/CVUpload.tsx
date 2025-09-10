import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
//import { AIService } from '../lib/aiService'; // Import personnel (non utilisé ici)
//import {pdfjs-dist/build/pdfb } from 'pdfjs-dist';
interface CVUploadProps {
  onFileUpload: (file: File, content: string) => void;
  onNext: () => void;
  isProcessing: boolean;
}


export const CVUpload: React.FC<CVUploadProps> = ({
  onFileUpload,
  onNext,
  isProcessing
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setUploadStatus('processing');
    setErrorMessage('');

    try {
      const content = await readFileContent(file);
      onFileUpload(file, content);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setErrorMessage('Failed to read file content. Please try again.');
    }
  }, [onFileUpload]);
  
  const readFileContent = (file: File): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      if (file.type === 'application/pdf') {
        try {
          const pdfjsLib = await import('pdfjs-dist');
          // @ts-ignore
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
              // @ts-ignore
              const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
              let text = '';
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map((item: any) => item.str).join(' ') + '\n';
              }
              resolve(text);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read PDF file'));
          reader.readAsArrayBuffer(file);
        } catch (err) {
          reject(err);
        }
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
          const mammoth = await import('mammoth');
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const arrayBuffer = e.target?.result as ArrayBuffer;
              const result = await mammoth.extractRawText({ arrayBuffer });
              resolve(result.value);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read DOCX file'));
          reader.readAsArrayBuffer(file);
        } catch (err) {
          reject(err);
        }
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          resolve(content);
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsText(file);
      }
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
  <div className="max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-4">
  <div className="text-center mb-8 px-2">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Upload Your CV
        </h2>
  <p className="text-base sm:text-lg text-gray-600">
          Upload your CV in PDF, DOCX, or TXT format and let our AI analyze it to create your professional portfolio.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-4 sm:p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : uploadStatus === 'success'
              ? 'border-green-500 bg-green-50'
              : uploadStatus === 'error'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <AnimatePresence mode="wait">
            {uploadStatus === 'processing' ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-blue-600 font-medium">Processing your CV...</p>
              </motion.div>
            ) : uploadStatus === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
                <p className="text-green-600 font-medium mb-2">CV uploaded successfully!</p>
                <p className="text-sm text-gray-600">
                  File: {uploadedFile?.name}
                </p>
              </motion.div>
            ) : uploadStatus === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
                <p className="text-red-600 font-medium mb-2">Upload failed</p>
                <p className="text-sm text-gray-600">{errorMessage}</p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-base sm:text-xl font-medium text-gray-700 mb-2">
                  {isDragActive ? 'Drop your CV here' : 'Drop your CV here or click to browse'}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Supports PDF, DOCX, and TXT files up to 10MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-2 sm:p-4 bg-gray-50 rounded-lg border"
          >
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-xs sm:text-base">{uploadedFile.name}</p>
                <p className="text-xs sm:text-sm text-gray-500">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {uploadStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center px-2"
          >
            <button
              onClick={onNext}
              disabled={isProcessing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-8 py-2 sm:py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Analyzing CV...' : 'Continue to Preview'}
            </button>
          </motion.div>
        )}
      </motion.div>

  <div className="mt-12 text-center px-2">
  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          What happens next?
        </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">1</span>
            </div>
            <h4 className="font-medium text-gray-900">AI Analysis</h4>
            <p className="text-sm text-gray-600 mt-1">
              Our AI extracts your experience, skills, and education
            </p>
          </div>

          <div className="text-center">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">2</span>
            </div>
            <h4 className="font-medium text-gray-900">Choose Template</h4>
            <p className="text-sm text-gray-600 mt-1">
              Select from professional templates and customize
            </p>
          </div>

          <div className="text-center">
            <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-emerald-600 font-bold">3</span>
            </div>
            <h4 className="font-medium text-gray-900">Deploy Live</h4>
            <p className="text-sm text-gray-600 mt-1">
              Get your portfolio online with a unique URL
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};