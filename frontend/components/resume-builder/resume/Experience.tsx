import { ExternalLink } from "lucide-react";
import { useFormContext } from "react-hook-form"

interface Experience {
  name: string;
  position: string;
  url?: string;
  summary?: string;
}

export default function Experience() {
  const { watch } = useFormContext()

  const companies = watch("companies") as Experience[]
  return companies?.length > 0 && (
    <div className="flex flex-col gap-1 mt-2">
      <h1 className='text-xl font-semibold border-b border-slate-500'>Experience</h1>
      {
        companies?.map((company, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {company?.url ? (
                <div className='flex items-center gap-2'>
                  <a href={company.url} target="_blank" className="font-semibold text-xl">{company.name}</a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{company.name}</h1>
              )}
              <p className="font-light text-sm">{company.position}</p>
            </div>
            {company?.summary && (
              <p className="font-light text-sm px-1 mt-2">{company.summary}</p>
            )}
          </div>
        ))
      }
    </div>
  )
}
