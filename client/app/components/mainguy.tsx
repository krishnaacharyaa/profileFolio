// app/components/resume-analyzer/ResumeAnalyzer.tsx
'use client';

import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { analyzeResume } from '../lib/resume';
import { FileUpload } from './fileUpload';
import { AnalysisResults } from './analysisResults';
import { AnalysisResult } from '../types/resume';

export const ResumeAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeResume(file);
      setAnalysis(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to analyze resume'
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600">
            Upload your resume and get instant AI-powered feedback
          </p>
        </div>

        {!analysis ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <FileUpload
              file={file}
              dragActive={dragActive}
              onDrag={handleDrag}
              onDrop={handleDrop}
              onFileChange={handleFileChange}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleAnalyze}
                disabled={!file || loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Resume'
                )}
              </button>

              {file && (
                <button
                  onClick={resetAnalysis}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        ) : (
          <AnalysisResults analysis={analysis} onReset={resetAnalysis} />
        )}
      </div>
    </div>
  );
};