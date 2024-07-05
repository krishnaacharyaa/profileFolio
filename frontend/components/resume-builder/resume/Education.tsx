import { ExternalLink } from "lucide-react";
import { useFormContext } from "react-hook-form"

interface Education {
  institution: string;
  url?: string;
  area?: string;
  studyType?: string;
  score?: string;
  scoreType?: string;
}

export default function Educations() {
  const { watch } = useFormContext()
  const educations = watch('educations') as Education[]

  return educations?.length > 0 && (
    <div className="flex flex-col gap-1 mt-2">
      <h1 className='text-xl font-semibold border-b border-slate-500'>Education</h1>
      {
        educations?.map((education, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {education?.url ? (
                <div className='flex items-center gap-2'>
                  <a href={education.url} target="_blank" className="font-semibold text-xl">{education.institution}</a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{education.institution}</h1>
              )}
              <p className="font-light text-sm">{education?.area} {education?.studyType && education?.area && "|"} {education?.studyType}</p>
            </div>
            {education?.score && education?.scoreType && (
              <span className="uppercase font-light text-sm">{education?.scoreType} - {education?.score}</span>
            )}
          </div>
        ))
      }
    </div>
  )
}
