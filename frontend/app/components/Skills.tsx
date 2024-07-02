import React, { useState } from 'react';

interface SkillsProps {
    onSkillsChange: (skills: string[]) => void;
}

const Skills: React.FC<SkillsProps> = ({ onSkillsChange }) => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const availableSkills = [
        'git', 'aws', 'cpp', 'css', 'discord', 'docker', 'postgres', 'prisma', 'pug',
        'dynamodb', 'express', 'figma', 'firebase', 'redis', 'github', 'html', 'java',
        'js', 'linux', 'md', 'materialui', 'nginx', 'mongodb', 'mysql', 'nextjs',
        'nodejs', 'postman', 'py', 'react', 'redux', 'tailwind', 'ts', 'vscode', 'kubernetes'
    ];

    const handleSkillToggle = (skill: string) => {
        setSelectedSkills(prevSkills => {
            let newSkills;
            if (prevSkills.includes(skill)) {
                newSkills = prevSkills.filter(s => s !== skill);
            } else {
                newSkills = [...prevSkills, skill];
            }
            onSkillsChange(newSkills);
            return newSkills;
        });
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {availableSkills.map(skill => (
                    <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1 rounded-full text-sm ${selectedSkills.includes(skill)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                    >
                        {skill}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Skills;