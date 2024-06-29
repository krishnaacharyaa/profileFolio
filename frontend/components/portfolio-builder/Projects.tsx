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

const Projects: React.FC<Props> = ({ projects }) => (
    <div className="mt-8 p-6">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {projects.map((project, index) => (
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
      ))}
    </div>
  );
  
  export default Projects;