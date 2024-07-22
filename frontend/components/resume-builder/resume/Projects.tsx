import { useFormContext } from 'react-hook-form';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

interface Project {
  name: '';
  description: '';
  technologies: '';
  githubUrl: '';
  deployedUrl: '';
  startDate?: '';
  endDate?: '';
}

export default function Projects() {
  const { watch } = useFormContext();

  const projects = watch('projects') as Project[];

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
    projects?.length > 0 && (
      <div className="flex flex-col gap-1 mt-2">
        <h1 className="text-xl font-semibold border-b border-slate-500">
          Open source /Personal projects
        </h1>
        {projects?.map((project, index) => (
          <div key={index} className="px-2">
            <div className="flex items-center justify-between">
              <div className='flex items-center gap-2'>
                {project?.deployedUrl ? (
                  <div className="flex items-center gap-2">
                    <a href={project.deployedUrl} target="_blank" className="font-semibold text-xl">
                      {project.name}
                    </a>
                    <ExternalLink size={15} />
                  </div>
                ) : (
                  <h1 className="font-semibold text-xl">{project.name}</h1>
                )}
                {project?.githubUrl && (
                  <a href={project.githubUrl} target="_blank">
                    <FaGithub size={15} />
                  </a>
                )}
              </div>
              <div>
                <p className="font-normal text-base">{project.technologies}</p>
                <span className="uppercase font-light text-sm">
                  {convertISOToFormattedDate(project?.startDate)} {project?.startDate && project?.endDate && "-"} {convertISOToFormattedDate(project?.endDate)}
                </span>
              </div>
            </div>
            {project?.description && (
              <p className="font-light text-sm px-1 mt-2">{project.description}</p>
            )}
          </div>
        ))}
      </div>
    )
  );
}
