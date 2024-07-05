'use client';
import { Button } from '@/components/ui/button';
import { BookText, ChevronDown, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { InputWithLabel } from '../InputWithLabel';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function EducationInput() {
  const [showEducation, setShowEducation] = useState(false);
  return (
    <div className="py-4 px-3 flex flex-col gap-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowEducation(!showEducation)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-300">
            <BookText size={15} />
          </div>
          <span className="text-slate-500 text-base">Education</span>
        </div>
        <ChevronDown
          className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${
            showEducation ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          showEducation ? 'block' : 'hidden'
        }`}
      >
        <ListOfInstitution />
      </div>
    </div>
  );
}

export function ListOfInstitution() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  const [showInputs, setShowInputs] = useState<number | null>(null);

  const toggleInputs = (index: number) => {
    setShowInputs(showInputs === index ? null : index);
  };

  const addEducation = () => {
    append({
      institution: '',
      url: '',
      studyType: '',
      area: '',
      score: '',
      scoreType: '',
      duration: '',
    });
  };

  const deleteEducation = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-col gap-3 px-2">
      {fields.map((education, index) => {
        return (
          <div key={index}>
            <div
              className="flex justify-between items-center px-4 py-4 cursor-pointer"
              onClick={() => toggleInputs(index)}
            >
              <h1 className="text-slate-600 font-semibold text-base">
                {watch(`educations.${index}.institution`) || 'Institution name'}
              </h1>
              <div className="flex gap-3 items-center">
                <Trash2
                  size={20}
                  className="text-slate-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEducation(index);
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
            {showInputs === index && <InstituteInputs index={index} />}
          </div>
        );
      })}
      <Button variant={'outline'} onClick={addEducation}>
        + Add Education
      </Button>
    </div>
  );
}

function InstituteInputs({ index }: { index: number }) {
  return (
    <div className="grid md:grid-cols-2 gap-3 px-4">
      <InputWithLabel
        label="Institution"
        name="institution"
        type="text"
        schemaType={`educations.${index}`}
        placeholder="University name"
      />
      <InputWithLabel
        label="Website"
        name="url"
        type="url"
        schemaType={`educations.${index}`}
        placeholder="Institution website"
      />
      <InputWithLabel
        label="Degree"
        name="degree"
        type="text"
        schemaType={`educations.${index}`}
        placeholder="Bachelors"
      />
      <InputWithLabel
        label="Field of Study"
        name="area"
        type="text"
        schemaType={`educations.${index}`}
        placeholder="Computer science"
      />
      <InputWithLabel
        label="Score"
        name="score"
        type="text"
        schemaType={`educations.${index}`}
        placeholder="GPA/CGPA"
      />
      <InputWithLabel
        label="duration"
        name="duration"
        type="text"
        schemaType={`educations.${index}`}
        placeholder="date"
      />

      <InputWithLabel
        label="Courses"
        name="courses"
        type="textarea"
        schemaType={`educations.${index}`}
        placeholder="Courses"
      />
    </div>
  );
}
