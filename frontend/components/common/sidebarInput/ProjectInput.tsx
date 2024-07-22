'use client';

import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Airplay, ChevronDown, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { InputWithLabel } from '../InputWithLabel';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from 'react-datepicker';

export default function ProjectInput() {
  const [projects, setShowProjects] = useState(false);

  return (
    <div className="py-4 px-3 flex flex-col gap-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setShowProjects(!projects)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-300">
            <Airplay size={15} />
          </div>
          <span className="text-slate-500 text-base">Projects</span>
        </div>
        <ChevronDown
          className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${projects ? 'rotate-180' : ''
            }`}
          size={20}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${projects ? 'block' : 'hidden'
          }`}
      >
        <ListOfProjects />
      </div>
    </div>
  );
}

export function ListOfProjects() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });
  const [showInputs, setShowInputs] = useState<number | null>(null);

  const toggleInputs = (index: number) => {
    setShowInputs(showInputs === index ? null : index);
  };

  const addProject = () => {
    append({ name: '', startDate: '', endDate: '', description: '', technologies: '', githubUrl: '', deployedUrl: '' });
  };

  const deleteProject = (index: number) => {
    remove(index);
  };
  return (
    <div className="flex flex-col gap-3 px-2">
      {fields.map((project, index) => (
        <div key={index}>
          <div
            className="flex justify-between items-center px-4 py-4 cursor-pointer"
            onClick={() => toggleInputs(index)}
          >
            <h1 className="text-slate-600 font-semibold text-base">
              {watch(`projects.${index}.name`) || 'Open source /Personal projects'}
            </h1>
            <div className="flex gap-3 items-center">
              <Trash2
                size={20}
                className="text-slate-400 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(index);
                }}
              />
              <ChevronDown
                size={20}
                className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showInputs === index ? 'rotate-180' : ''
                  }`}
              />
            </div>
          </div>
          {showInputs === index && <ProjectInputs index={index} />}
        </div>
      ))}
      <Button variant={'outline'} onClick={addProject} type="button">
        + Add Contribution / Projects
      </Button>
    </div>
  );
}
function ProjectInputs({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext();
  const watchStartDate = watch(`projects.${index}.startDate`);
  const watchEndDate = watch(`projects.${index}.endDate`);

  const [startDate, setStartDate] = useState<Date | undefined>(watchStartDate ? new Date(watchStartDate) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(watchEndDate ? new Date(watchEndDate) : undefined);


  const handleDateChange = (date: Date | null, fieldName: string) => {
    if (date) {
      const formattedDate = date.toISOString();
      setValue(`projects.${index}.${fieldName}`, formattedDate);
      if (fieldName === 'startDate') setStartDate(date);
      if (fieldName === 'endDate') setEndDate(date);
    } else {
      setValue(`projects.${index}.${fieldName}`, '');
      if (fieldName === 'startDate') setStartDate(undefined);
      if (fieldName === 'endDate') setEndDate(undefined);
    }
  };
  return (
    <div className='flex flex-col gap-3 px-4'>
      <div className='flex flex-col gap-3'>
        <InputWithLabel label='Project name' type='text' placeholder='Project name' schemaType={`projects.${index}`} name='name' />
        <InputWithLabel label='Technologies Used' schemaType={`projects.${index}`} name='technologies' type='text' placeholder='React.js , Node.js , TypeScript ...' />
        <InputWithLabel label='Project Link' schemaType={`projects.${index}`} name='deployedUrl' type='url' placeholder='https://project.com' />
        <InputWithLabel label='GitHub Repository' schemaType={`projects.${index}`} name='githubUrl' type='url' placeholder='https://github.com/your-username/repository' />
        <div className='flex flex-col gap-3 w-full'>
          <Label htmlFor='duration' className="text-base font-normal text-slate-500">Duration</Label>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => handleDateChange(date, 'startDate')}
              selectsStart
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => handleDateChange(date, 'endDate')}
              selectsEnd
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="w-full p-2 border rounded"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <Label htmlFor={`projects.${index}.description`} className="text-base font-normal text-slate-500">Description</Label>
        <Textarea placeholder='Enter description' {...register(`projects.${index}.description`)} id='description' />
      </div>
    </div>
  );
}
