'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface EducationProps {
  education: {
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: { $date: string };
    endDate: { $date: string };
    score: string;
    courses: string[];
  }[];
}
interface Education {
  institution: string;
  url?: string;
  area?: string;
  degree?: string;
  score?: string;
  scoreType?: string;
  duration?: string;
  courses?:string
}

const Education = () => {
  const { watch } = useFormContext();
  const Education = watch('educations') as Education[];

  return (
    <section className="p-8 bg-gradient-to-br from-green-50 to-teal-100">
      <h2 className="text-3xl font-bold mb-12 text-teal-800 border-b-2 border-teal-300 pb-2 animate-fade-in">
        Education
      </h2>
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-teal-300"
          style={{ left: '25px' }}
        ></div>

        {Education?.map((edu, index) => (
          <div
            key={edu.institution}
            className="mb-12 pl-12 relative animate-fade-in transform hover:scale-105 transition duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute left-0 w-8 h-8 bg-teal-500 rounded-full border-4 border-white px-1 ml-2 "></div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-teal-700">
                  <a
                    href={edu.url}
                    target="_blank"
                    className="hover:text-teal-500 transition duration-300"
                  >
                    {edu.institution}
                  </a>
                </h3>
                <p className="text-lg font-medium text-teal-600 mb-2">
                  {edu.degree} in {edu.area}
                </p>
                <p className="text-sm text-gray-600 mb-3">{edu.duration}</p>
                <p className="text-gray-700 mb-4">GPA: {edu.score}</p>
                <h4 className="text-md font-semibold text-teal-600 mb-2">Relevant Courses:
                  <span className='text-blue-500'>{edu.courses}</span>
                </h4>
                <ul className="grid grid-cols-2 gap-2"></ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
