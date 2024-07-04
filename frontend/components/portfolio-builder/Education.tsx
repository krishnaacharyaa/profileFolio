import React from 'react';

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

const Education = () => (
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

      <div
        key={1}
        className="mb-12 pl-12 relative animate-fade-in transform hover:scale-105 transition duration-300"
        // style={{ animationDelay: `${index * 100}ms` }}
      >
        {/* Circle on the timeline */}
        <div className="absolute left-0 w-8 h-8 bg-teal-500 rounded-full border-4 border-white px-1 ml-2 "></div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">
              <a href={'edu.url'} className="hover:text-teal-500 transition duration-300">
                {'State University'}
              </a>
            </h3>
            <p className="text-lg font-medium text-teal-600 mb-2">
              {`Bachelor`} in {'Computer Science'}
            </p>
            <p className="text-sm text-gray-600 mb-3">sept 2010 - june 2014</p>
            <p className="text-gray-700 mb-4">GPA: {'9.8'}</p>
            <h4 className="text-md font-semibold text-teal-600 mb-2">Relevant Courses:</h4>
            <ul className="grid grid-cols-2 gap-2">
              <li
                key={1}
                className="text-gray-600 animate-fade-in flex items-center"
                style={{ animationDelay: `${(200+ 1) * 100}ms` }}
              >
                <span className="mr-2 text-teal-500">•</span>
                {'Data Structures'}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* {education.map((edu, index) => (
        <div 
          key={edu.institution}
          className='mb-12 pl-12 relative animate-fade-in transform hover:scale-105 transition duration-300'
          // style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="absolute left-0 w-8 h-8 bg-teal-500 rounded-full border-4 border-white px-1 ml-2 "></div>
          
          <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='p-6'>
              <h3 className='text-xl font-semibold mb-2 text-teal-700'>
                <a href={edu.url} className='hover:text-teal-500 transition duration-300'>{edu.institution}</a>
              </h3>
              <p className='text-lg font-medium text-teal-600 mb-2'>
                {edu.studyType} in {edu.area}
              </p>
              <p className='text-sm text-gray-600 mb-3'>
                {new Date(edu.startDate.$date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - 
                {new Date(edu.endDate.$date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p className='text-gray-700 mb-4'>GPA: {edu.score}</p>
              <h4 className='text-md font-semibold text-teal-600 mb-2'>Relevant Courses:</h4>
              <ul className='grid grid-cols-2 gap-2'>
                {edu.courses.map((course, i) => (
                  <li 
                    key={i}
                    className='text-gray-600 animate-fade-in flex items-center'
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  >
                    <span className='mr-2 text-teal-500'>•</span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  </section>
);

export default Education;
