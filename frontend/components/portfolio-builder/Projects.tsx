'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Project {
  name: string;
  description: string;
  technologies: string;
  giturl?: string;
  liveurl?: string;
  tectStack?:string
}

const Projects = () => {
  const { watch } = useFormContext()

  const projects = watch("projects") as Project[]
  return (
    <div className="mt-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {projects?.map((project, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <div className="flex mb-2">
            <a
              href={project.giturl}
              className="text-blue-500 hover:underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={project.liveurl}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live
            </a>
          </div>
          <div className="text-gray-500">
            Tech Stack: {project.technologies}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Projects;
