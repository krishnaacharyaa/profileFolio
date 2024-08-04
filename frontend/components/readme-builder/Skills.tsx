import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
interface SkillsProps {
  onSkillsChange: (skills: string[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ onSkillsChange }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const availableSkills = [
    'git',
    'aws',
    'cpp',
    'css',
    'discord',
    'docker',
    'postgres',
    'prisma',
    'pug',
    'dynamodb',
    'express',
    'figma',
    'firebase',
    'redis',
    'github',
    'html',
    'java',
    'js',
    'linux',
    'md',
    'materialui',
    'nginx',
    'mongodb',
    'mysql',
    'nextjs',
    'nodejs',
    'postman',
    'py',
    'react',
    'redux',
    'tailwind',
    'ts',
    'vscode',
    'kubernetes',
  ];

  //Function to handle dropdown skill selection
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prevSkills) => {
      const newSkills = prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill];

      onSkillsChange(newSkills);
      return newSkills;
    });
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Skills</h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Add Skills</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto transform translate-x-4">
          <DropdownMenuSeparator />
          <div className="flex flex-wrap gap-2 p-2">
            {availableSkills.map((skill) => (
              <Badge
                key={skill}
                variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Skills;
