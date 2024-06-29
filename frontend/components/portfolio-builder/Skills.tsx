// app/components/Skills.tsx
import React from 'react';

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

const Skills: React.FC<SkillsProps> = ({ skills, skillsDetails }) => (
    <section className="p-6 bg-white">
    <h2 className="text-2xl font-semibold mb-4">Skills</h2>
    {skills.map(skill => {
      const skillNames = skill.keywords.map(keyword => {
        const skillDetail = skillsDetails.find(s => s._id.$oid === keyword.$oid);
        return skillDetail ? skillDetail.name : '';
      }).join(', ');
      return (
        <div key={skill.keywords[0].$oid}>
          <h3>{skillNames}</h3>
          <p>Level: {skill.level}</p>
        </div>
      );
    })}
  </section>
);

export default Skills;
