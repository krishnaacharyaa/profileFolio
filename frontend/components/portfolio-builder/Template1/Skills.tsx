'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Skill {
  name: string;
  techStack: string;
}

const Skills = () => {
  
  const { watch } = useFormContext();
  const skills = watch('skills') as Skill[];

  return (
    skills?.length > 0 && (
      <div className="flex flex-col gap-1 px-8 py-6">
        {skills && <h1 className="text-2xl font-bold">Skills</h1>}
        <div className="my-3 flex flex-col">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col mx-1 my-2 min-w-48">
              <span className="text-lg font-semibold capitalize">{skill.name}</span>
              <div className='flex flex-wrap justify-start gap-0 mt-1'>
                {skill.techStack && skill.techStack.split(",").map((element: any) => (<span className="text-base mx-1 flex items-center text-black px-2 py-1 rounded-md border-2 border-gray-200 text-center font-medium my-1"><span><img className='h-4 mr-1' src="/svg/skill.png" alt="" /></span>{element}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  )
};

export default Skills;
