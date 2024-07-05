'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
interface Language {
  language: string;
  fluency: string;
}

interface Certificate {
  name: string;
  issuer: string;
  url: string;
}

const Footer = () => {
  const { watch } = useFormContext();
  const Languages = watch('languages') as Language[];
  const Certificates = watch('certificates') as Certificate[];
  return (
    <footer className="bg-gray-200 p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <ul className="list-disc list-inside">
              {Certificates?.map((cert, index) => (
              <li key={index} className="text-gray-700">
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {cert.name}
                </a> - {cert.issuer} 
              </li>
            ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <ul className="list-disc list-inside w-full">
              {Languages?.map((lang, index) => (
                <li key={index} className="text-gray-700 w-full">
                  {lang.language} - {lang.fluency}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
