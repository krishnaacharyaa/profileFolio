'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Experience {
  name: string;
  position: string;
  duration:string
  url?: string;
  summary?: string;
}

const WorkExperience = () => {
  const { watch } = useFormContext()
  const companies = watch("companies") as Experience[]
  console.log(companies)
 return (
  <section className='p-8 bg-gradient-to-br from-blue-50 to-indigo-100'>
    <h2 className='text-3xl font-bold mb-12 text-indigo-800 border-b-2 border-indigo-300 pb-2 animate-fade-in'>
      Work Experience
    </h2>
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-300" style={{ left: '15px' }}></div>
      
      
      {companies?.map((job, index) => (
        <div 
          key={job.name}
          className='mb-12 pl-12 relative animate-fade-in'
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute left-0 w-8 h-8 bg-indigo-500 rounded-full border-4 border-white" style={{ left: '1px', top: '0' }}></div>
          
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2 text-indigo-700'>
                {job.position} at <a href={job.url} className='text-blue-600 hover:text-blue-800 transition duration-300'>{job.name}</a>
              </h3>
              <p className='text-sm text-gray-600 mb-3'>
                june-2024 to present
              </p>
              <p className='text-gray-700 mb-4 w-full text-justify'>{job.summary}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
)};

export default WorkExperience;
