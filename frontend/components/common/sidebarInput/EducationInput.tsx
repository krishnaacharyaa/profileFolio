'use client';

import "react-datepicker/dist/react-datepicker.css";
import { Button } from '@/components/ui/button';
import { BookText, ChevronDown, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { InputWithLabel } from '../InputWithLabel';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import DatePicker from 'react-datepicker';

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
          className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showEducation ? 'rotate-180' : ''
            }`}
          size={20}
        />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${showEducation ? 'block' : 'hidden'
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
    name: 'education',
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
      startDate: '',
      endDate: ''
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
                {watch(`education.${index}.institution`) || 'Institution name'}
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
                  className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showInputs === index ? 'rotate-180' : ''
                    }`}
                />
              </div>
            </div>
            {showInputs === index && <InstituteInputs index={index} />}
          </div>
        );
      })}
      <Button variant={'outline'} onClick={addEducation} type="button">
        + Add Education
      </Button>
    </div>
  );
}

function InstituteInputs({ index }: { index: number }) {
  const { register, watch, setValue } = useFormContext();
  const watchStartDate = watch(`education.${index}.startDate`);
  const watchEndDate = watch(`education.${index}.endDate`);

  const [startDate, setStartDate] = useState<Date | undefined>(watchStartDate ? new Date(watchStartDate) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(watchEndDate ? new Date(watchEndDate) : undefined);

  const handleDateChange = (date: Date | null, fieldName: string) => {
    if (date) {
      const formattedDate = date.toISOString();
      setValue(`education.${index}.${fieldName}`, formattedDate);
      if (fieldName === 'startDate') setStartDate(date);
      if (fieldName === 'endDate') setEndDate(date);
    } else {
      setValue(`education.${index}.${fieldName}`, '');
      if (fieldName === 'startDate') setStartDate(undefined);
      if (fieldName === 'endDate') setEndDate(undefined);
    }
  };

  return (
    <div className='flex flex-col gap-3 px-4'>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-3'>
        <InputWithLabel label='Institution' type='text' placeholder='University name' schemaType={`education.${index}`} name="institution" />
        <InputWithLabel label='Website' schemaType={`education.${index}`} name="url" type='url' placeholder='Institution website' />
        <InputWithLabel label='Degree' schemaType={`education.${index}`} name="studyType" type='text' placeholder='Bachelors' />
        <InputWithLabel label='Field of Study' schemaType={`education.${index}`} name="area" type='text' placeholder='Computer science' />
        <Input {...register(`education.${index}.score`)} type="text" placeholder='4.5' />
        <Select
          onValueChange={(value) => setValue(`education.${index}.scoreType`, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpa">GPA</SelectItem>
            <SelectItem value="cgpa">CGPA</SelectItem>
            <SelectItem value="percentage">Percentage</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col gap-3 w-full'>
        <Label className="text-base font-normal text-slate-500">Duration</Label>
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
  )
}
