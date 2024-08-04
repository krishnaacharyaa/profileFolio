'use client';
import { ChevronDown, Database, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { InputWithLabel } from '../InputWithLabel';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';

export default function SkillsInput() {
  const [skills, setShowSkills] = useState(false);
  return (
    <div className="py-4 px-3 flex flex-col gap-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowSkills(!skills)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-300">
            <Database size={15} />
          </div>
          <span className="text-slate-500 text-base">Skills</span>
        </div>
        <ChevronDown
          className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${
            skills ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          skills ? 'block' : 'hidden'
        }`}
      >
        <ListOfSkills />
      </div>
    </div>
  );
}
function ListOfSkills() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  const [showInputs, setShowInputs] = useState<number | null>(null);

  const toggleInputs = (index: number) => {
    setShowInputs(showInputs === index ? null : index);
  };

  const addSkill = () => {
    append({ name: '', techStack: '' });
  };

  const deleteSkill = (index: number) => {
    remove(index);
  };
  return (
    <div className="flex flex-col gap-3 px-2">
      {fields.map((skill, index) => (
        <div key={index}>
          <div
            className="flex justify-between items-center px-4 py-4 cursor-pointer"
            onClick={() => toggleInputs(index)}
          >
            <h1 className="text-slate-600 font-semibold text-base">
              {watch(`skills.${index}.name`) || 'New Skill'}
            </h1>
            <div className="flex gap-3 items-center">
              <Trash2
                size={20}
                className="text-slate-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSkill(index);
                }}
              />
              <ChevronDown
                size={20}
                className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${
                  showInputs === index ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
          {showInputs === index && <SkillsInputs index={index} />}
        </div>
      ))}
      <Button variant={'outline'} onClick={addSkill} type="button">
        + Add new skill
      </Button>
    </div>
  );
}
function SkillsInputs({ index }: { index: number }) {
  return (
    <div className="p-2 flex flex-col gap-3 items-center">
      <InputWithLabel
        label="Skill name"
        name="name"
        type="text"
        placeholder="Web development , Databases, Tools ,etc..."
        schemaType={`skills.${index}`}
      />
      <InputWithLabel
        label="Techstack"
        name="techStack"
        type="text"
        placeholder="React.js , Next.js, Node.js, Mongodb"
        schemaType={`skills.${index}`}
      />
    </div>
  );
}
