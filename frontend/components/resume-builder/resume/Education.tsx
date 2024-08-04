import { format, parseISO } from 'date-fns';
import { ExternalLink } from 'lucide-react';
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
}

export default function Educations() {
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

  return (
    educations?.length > 0 && (
      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-xl font-semibold border-b border-slate-500">Education</h1>
        {educations?.map((education, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {education?.url ? (
                <div className="flex items-center gap-2">
                  <a href={education.url} target="_blank" className="font-semibold text-xl">
                    {education.institution}
                  </a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{education.institution}</h1>
              )}
              <p className="font-light text-sm">
                {education?.area} {education?.studyType && education?.area && '|'}{' '}
                {education?.studyType}
              </p>
            </div>
            <div className="flex items-center justify-between">
              {education?.score && education?.scoreType && (
                <span className="uppercase font-light text-sm">
                  {education?.scoreType} - {education?.score}
                </span>
              )}
              <span className="uppercase font-light text-sm">
                {convertISOToFormattedDate(education?.startDate)}{' '}
                {education?.startDate && education?.endDate && '-'}{' '}
                {convertISOToFormattedDate(education?.endDate)}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
