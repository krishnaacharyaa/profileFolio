'use client';
import { format, parseISO } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  score?: string;
  scoreType?: string;
  startDate?: string;
  endDate?: string;
  courses?: string;
}

const Education = () => {
  const { watch } = useFormContext();
  const educations = watch('education') as Education[];

  function convertISOToFormattedDate(isoString: string | undefined): string {
    if (!isoString) return '';

    try {
      const date = parseISO(isoString);
      return format(date, 'dd-MM-yyyy');
    } catch (error) {
      console.error('Error parsing ISO string:', error);
      return '';
    }
  }

  console.log(educations)

  return (
    educations?.length > 0 && (
      <div className="flex flex-col gap-1 mt-2 px-8 py-6">
        <h1 className="text-2xl font-bold mb-1">Education</h1>
        <div className='grid grid-cols-2 gap-5'>
          {educations?.map((education, index) => (
            <div key={index} className='px-4 py-3 rounded-md border-2 border-gray-200'>
              <div className="flex flex-col">
                  {education?.studyType && <h1 className='text-lg font-semibold tracking-tight'>{education?.studyType} Of {education?.area}</h1>}
                  <span className='flex items-center'>
                    {education.institution}
                    {education?.url && (
                      <a className='ml-1' href={education.url}>
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </span>
              </div>
              <div className="flex items-center justify-between">
                {education?.score && education?.scoreType && (
                  <span className="uppercase font-light tracking-tight text-sm">
                    {education?.scoreType} - {education?.score}
                  </span>
                )}
                <span className="uppercase font-light text-sm tracking-tighter">
                  {convertISOToFormattedDate(education?.startDate)} {education?.startDate && education?.endDate && "-"} {convertISOToFormattedDate(education?.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Education;
