'use client';
import React from 'react';
import { Button } from '@/components/ui/button';

const featureContent = [
  {
    title: 'Beautiful Resumes',
    description:
      'Create stunning resumes that stand out to employers. Our platform helps you craft personalized resumes that effectively highlight your skills and experiences.',
    content: <div className="text-2xl font-bold text-gray-600">📄</div>,
  },
  {
    title: 'Comprehensive Portfolios',
    description:
      'Showcase your work and projects in a professional manner. Build impressive portfolios that demonstrate your expertise and catch the eye of potential clients or employers.',
    content: <div className="text-2xl font-bold text-gray-600">💼</div>,
  },
  {
    title: 'Github READMEs',
    description:
      "Generate detailed and attractive GitHub README files. Make your repositories stand out with well-structured documentation that highlights your projects' features and usage.",
    content: <div className="text-2xl font-bold text-gray-600">📘</div>,
  },
];
export const FeatureSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 border-black border-2 w-fit p-1 px-4 rounded-md text-sm">
            Features
          </div>
          <h2 className="text-3xl font-bold text-gray-900">What we offer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureContent.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-40 mb-4 bg-gray-200 rounded-md flex items-center justify-center">
                {item.content}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
