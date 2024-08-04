import { format, parseISO } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface Experience {
  name: string;
  position: string;
  url?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
}

export default function Experience() {
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
      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-xl font-semibold border-b border-slate-500">Experience</h1>
        {companies?.map((company, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {company?.url ? (
                <div className="flex items-center gap-2">
                  <a href={company.url} target="_blank" className="font-semibold text-xl">
                    {company.name}
                  </a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{company.name}</h1>
              )}
              <div>
                <p className="font-light text-sm">{company.position}</p>
                <span className="uppercase font-light text-sm">
                  {convertISOToFormattedDate(company?.startDate)}{' '}
                  {company?.startDate && company?.endDate && '-'}{' '}
                  {convertISOToFormattedDate(company?.endDate)}
                </span>
              </div>
            </div>
            {company?.summary && <p className="font-light text-sm px-1 mt-2">{company.summary}</p>}
          </div>
        ))}
      </div>
    )
  );
}
