'use client';
import { format, parseISO } from 'date-fns';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Project {
  name: string;
  description: string;
  technologies: string;
  githubUrl: string;
  deployedUrl: string;
  startDate?: string;
  endDate?: string;
}

const Projects = () => {
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
      <div className="flex flex-col px-8 mt-2 py-6">
        <h1 className="text-2xl font-bold">
          Open source /Personal projects
        </h1>
        {projects?.map((project, index) => (
          <div key={index} className="my-3 border-2 border-gray-200 px-6 py-4 rounded-md">
            <div className="flex flex-col justify-between">
              <div className='flex items-center justify-between gap-2'>
                {project?.name && (
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-lg">
                      {project.name}
                    </p>
                  </div>
                )}
                <p className="font-normal text-base">{project.technologies}</p>
              </div>
              <span className="uppercase font-light text-sm">
                {convertISOToFormattedDate(project?.startDate)} {project?.startDate && project?.endDate && "-"} {convertISOToFormattedDate(project?.endDate)}
              </span>
            </div>
            {project?.description && (
              <p className="font-light text-sm my-2">{project.description}</p>
            )}
            <div className='flex mt-2'>
              {project?.githubUrl && (
                <a href={project.githubUrl} target="_blank" className='px-3 py-2 mr-2 font-medium rounded-md bg-black text-white'>View on Github</a>
              )}
              {project?.deployedUrl && (
                <a href={project.deployedUrl} target="_blank" className='px-3 py-2 font-medium rounded-md text-black hover:border-black border-2'>Live Demo</a>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  );
};
export default Projects;
