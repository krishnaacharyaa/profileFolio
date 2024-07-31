'use client';
import { format, parseISO } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Experience {
  name: string;
  position: string;
  url?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
}

const WorkExperience = () => {
  const { watch } = useFormContext();

  const companies = watch('work') as Experience[];

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

  return (
    companies?.length > 0 && (
      <div className="flex flex-col gap-1 mt-2 px-8 py-6">
        <h1 className="text-2xl font-bold">Experience</h1>
        {companies?.map((company, index) => (
          <div key={index} className="my-2">
            <div className="flex flex-col my-1">
                <div className="flex flex-col">
                  {company.position && <p className="font-medium text-lg">{company.position}</p>}
                  <a href={company.url} target="_blank" className="font-normal text-base flex items-center text-gray-500">
                    {company.name}
                    {company.url && <ExternalLink className='ml-1' size={15} />}
                  </a>
                </div>
              <div>
                <span className="uppercase font-light text-sm mt-1">
                  {convertISOToFormattedDate(company?.startDate)} {company?.startDate && company?.endDate && "-"} {convertISOToFormattedDate(company?.endDate)}
                </span>
              </div>
            </div>
            {company?.summary && <p className="font-light text-sm mt-1">{company.summary}</p>}
          </div>
        ))}
      </div>
    )
  )
};

export default WorkExperience;
