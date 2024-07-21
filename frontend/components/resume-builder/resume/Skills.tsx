import { useFormContext } from 'react-hook-form';

interface Skill {
  name: string;
  techStack: string;
}
export default function Skills() {
  const { watch } = useFormContext();
  const skills = watch('skills') as Skill[];

  const hasSkills = skills && skills.length > 0;
  return (
    hasSkills && (
      <div className="flex flex-col gap-1 mt-2">
        {skills && <h1 className="text-xl font-semibold border-b border-slate-500">Skills</h1>}
        <div className="p-3 flex flex-col gap-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex">
              <span className="text-base font-semibold w-60 capitalize">{skill.name}:</span>
              <span className="text-sm font-semibold flex-1">{skill.techStack}</span>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
