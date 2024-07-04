import React from "react";

interface Project{
    name: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
    highlights: string[];
    githubUrl: string;
    deployedUrl: string;
    techStack: string[]; 
}

interface Props {
    projects: Project[];
}

const Projects = () => (
    <div className="mt-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div key={1} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{`Personal Portfolio`}</h3>
          <p className="text-gray-600 mb-2">{'Developed a personal portfolio website to showcase my projects and skills.'}</p>
          <ul className="list-disc list-inside mb-4">
            <li>{'Designed and implemented a responsive user interface.'}</li>
            <li>{'Designed and implemented a responsive user interface.'}</li>
            <li>{'Designed and implemented a responsive user interface.'}</li>
          </ul>
          <div className="flex mb-2">
            <a
              href={'www.github.com'}
              className="text-blue-500 hover:underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={'www.github.com'}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </div>
          <div className="text-gray-500">
            Tech Stack: {'Typescript,Nodejs,ReactJs,TailwindCSS'}
          </div>
        </div>
      {/* {projects.map((project, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-2">{project.description}</p>
          <ul className="list-disc list-inside mb-4">
            {project.highlights.map((highlight, idx) => (
              <li key={idx}>{highlight}</li>
            ))}
          </ul>
          <div className="flex mb-2">
            <a
              href={project.githubUrl}
              className="text-blue-500 hover:underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href={project.deployedUrl}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          </div>
          <div className="text-gray-500">
            Tech Stack: {project.techStack.join(', ')}
          </div>
        </div>
      ))} */}
    </div>
  );
  
  export default Projects;