import { ExternalLink } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { format, parseISO } from 'date-fns';

interface Certificates {
  name: '';
  url?: '';
  issuer?: '';
  date?: '';
}
export default function Certifications() {
  const { watch } = useFormContext();
  const certificates = watch('certificates') as Certificates[];

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
    certificates?.length > 0 && (
      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-xl font-semibold border-b border-slate-500">Certificates</h1>
        {certificates?.map((certificate, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {certificate?.url ? (
                <div className="flex items-center gap-2">
                  <a href={certificate.url} target="_blank" className="font-semibold text-xl">
                    {certificate.name}
                  </a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{certificate.name}</h1>
              )}
              <div className='flex items-center gap-2'>
                <p className="font-light text-sm">{certificate.issuer}</p>
                {certificate.issuer && certificate.date && ("|")}
                <p className="font-light text-sm">{convertISOToFormattedDate(certificate.date)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
