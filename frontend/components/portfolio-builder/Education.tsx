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

const Education: React.FC<EducationProps> = ({ education }) => (
    <section className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-bold">
            <a href={edu.url} className="text-blue-500">{edu.institution}</a> ({edu.studyType} in {edu.area})
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(edu.startDate.$date).toLocaleDateString()} - {new Date(edu.endDate.$date).toLocaleDateString()}
          </p>
          <p className="mt-2">GPA: {edu.score}</p>
          <ul className="list-disc list-inside mt-2">
            {edu.courses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
  
  export default Education;
