'use client'
import { useFormContext } from 'react-hook-form';
import { format, parseISO } from 'date-fns';

interface Certificates {
  name: string;
  url?: string;
  issuer?: string;
  date?: string;
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
      <div className="flex flex-col gap-1 px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <div className='grid grid-cols-2 gap-4'>
          {certificates?.map((certificate, index) => (
            <div key={index} className="my-3">
              <div className="flex flex-col border border-gray-300 rounded-md px-4 py-4">
                <div className='flex items-center'>
                  {certificate.name && <span className='bg-gray-200 w-fit h-fit rounded-md px-3 py-3 mr-3'>
                    <BadgeIcon className="w-6 h-6" />
                  </span>}
                  <div className='flex-col w-full'>
                    {certificate.name && <h2 className='text-lg font-semibold tracking-tighter'>{certificate.name}</h2>}
                    {certificate.issuer && <p className='text-base text-gray-500'>Issued by {certificate.issuer}</p>}
                  </div>
                </div>
                {certificate.date && <div className='flex justify-between text-base text-gray-500 mt-2'>
                  <p>Issued on</p>
                  <p>{convertISOToFormattedDate(certificate.date)}</p>
                </div>}
                {certificate.url && <p className='mt-2 hover:underline text-base font-medium'>View Certificate</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

function BadgeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  )
}