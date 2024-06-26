import { getSkillNameById } from '../helper/utils';
import { SkillRef } from '../types/skillRef';
import { User } from '../types/user';

interface ProfileCardProps {
  user: User;
  skills: SkillRef[];
}

export default function ProfileCard({ user, skills }: ProfileCardProps) {
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-5">{user.basics.name}</h1>
      <p className="mb-5">{user.basics.summary}</p>

      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Profiles</h2>
        {skills.map((skill) => (
          <div>{skill.name}</div>
        ))}
        {user.basics.profiles?.map((profile, index) => (
          <p key={index}>
            <a
              href={profile.url}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.network}: {profile.username}
            </a>
          </p>
        ))}
      </div>

      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Work</h2>
        {user.work?.map((job, index) => (
          <div key={index} className="mb-5">
            <p className="font-bold">
              {job.position} at{' '}
              <a href={job.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                {job.name}
              </a>
            </p>
            <p>
              {job.startDate.toString()} - {job.endDate?.toString() || 'Present'}
            </p>
            <p>{job.summary}</p>
            <ul className="list-disc ml-5">
              {job.highlights?.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <h2 className="text-2xl font-semibold">Education</h2>
        {user.education?.map((edu, index) => (
          <div key={index} className="mb-5">
            <p className="font-bold">
              {edu.studyType} in {edu.area} at{' '}
              <a
                href={edu.url || ''}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {edu.institution}
              </a>
            </p>
            <p>
              {edu.startDate} - {edu.endDate || 'Present'}
            </p>
            <p>Score: {edu.score || '-'}</p>
            <ul className="list-disc ml-5">
              {edu.courses?.map((course, i) => (
                <li key={i}>{course}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Projects</h2>
        {user.projects?.map((project, index) => (
          <div key={index} className="mb-5">
            <div>{project.deployedUrl}</div>
            <div>
              <strong>Tech Stack:</strong>
              <ul className="list-disc ml-5">
                {project.techStack.map((techStack) => (
                  <div>{getSkillNameById(skills, techStack.toString())}</div>
                ))}
              </ul>
            </div>
            <p className="font-bold">
              <a
                href={project.githubUrl || ''}
                className="text-blue-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
            </p>
            <p>
              {project.startDate.toString()} - {project.endDate?.toString() || 'Present'}
            </p>
            <p>{project.description}</p>
            <ul className="list-disc ml-5">
              {project.highlights?.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
