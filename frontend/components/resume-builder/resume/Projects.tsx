import { useFormContext } from 'react-hook-form'
import { ExternalLink } from 'lucide-react'

interface Project {
  name: "",
  description: "",
  technologies: "",
  url?: ""
}

export default function Projects() {
  const { watch } = useFormContext()

  const projects = watch("projects") as Project[]
  return projects?.length > 0 && (
    <div className="flex flex-col gap-1 mt-2">
      <h1 className='text-xl font-semibold border-b border-slate-500'>Open source /Personal projects</h1>
      {
        projects?.map((project, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              {project?.url ? (
                <div className='flex items-center gap-2'>
                  <a href={project.url} target="_blank" className="font-semibold text-xl">{project.name}</a>
                  <ExternalLink size={15} />
                </div>
              ) : (
                <h1 className="font-semibold text-xl">{project.name}</h1>
              )}
              <p className="font-semibold text-base">{project.technologies}</p>
            </div>
            {project?.description && (
              <p className="font-light text-sm px-1 mt-2">{project.description}</p>
            )}
          </div>
        ))
      }
    </div>
  )
}
