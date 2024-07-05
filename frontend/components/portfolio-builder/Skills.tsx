// app/components/Skills.tsx
import React from 'react';
import { FaStar,FaStarHalfAlt } from 'react-icons/fa';


interface Skill {
  name: string;
  level: string;
  keywords: { $oid: string }[];
}

interface SkillDetail {
  _id: { $oid: string };
  name: string;
}

interface SkillsProps {
  skills: Skill[];
  skillsDetails: SkillDetail[];
}
const getStars=(level:string)=>{
  const startCount={
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4,
    'Master': 5
  }[level]||0;

  return Array(5).fill(0).map((_,index)=>
  index <startCount ? <FaStar key={index} className='text-yellow-400'/>:
  index === startCount && startCount%1!==0 ? <FaStarHalfAlt key={index} className='text-yellow-400'/>:
  <FaStar key={index} className='text-gray-300'/>
  );
};

const Skills = () => (
    <section className="p-8 mt-5 bg-gradient-to-br from-purple-50 to-indigo-100">
    <h2 className="text-3xl font-bold mb-8 text-indigo-800 border-b-2 border-indigo-300 pb-2">
      Skills
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     <div key={1} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">{'Web Development'}</h3>
          <div className="flex items-center mb-3">
            <span className="mr-2 text-gray-600">Level: {'Expert'}</span>
            <div className="flex">
              {getStars('4')}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                {'typescript'}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                {'typescript'}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                {'typescript'}
              </span>
          </div>
        </div>

    {/* {skills.map(skill => {
      const skillNames = skill.keywords.map(keyword => {
        const skillDetail = skillsDetails.find(s => s._id.$oid === keyword.$oid);
        return skillDetail ? skillDetail.name : '';

      }).filter(Boolean);
      return (
        <div key={skill.keywords[0].$oid} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
          <h3 className="text-xl font-semibold mb-3 text-indigo-700">{skill.name}</h3>
          <div className="flex items-center mb-3">
            <span className="mr-2 text-gray-600">Level: {skill.level}</span>
            <div className="flex">
              {getStars(skill.level)}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillNames.map((name, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                {name}
              </span>
            ))}
          </div>
        </div>
      );
    })} */}
  </div>
</section>
);

export default Skills;
