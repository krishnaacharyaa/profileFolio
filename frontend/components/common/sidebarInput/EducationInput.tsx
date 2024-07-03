"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookText, ChevronDown, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePickerWithRange } from '@/components/ui/datePicker'

export default function EducationInput() {
    const [showEducation, setShowEducation] = useState(false)

    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowEducation(!showEducation)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <BookText size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Education</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showEducation ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showEducation ? 'block' : 'hidden'}`}>
                <ListOfInstitution />
            </div>
        </div>
    )
}

interface Education {
    showInputs: boolean;
}

function ListOfInstitution() {
    const [educations, setEducations] = useState<Education[]>([]);

    const toggleInputs = (index: number) => {
        const newEducations = [...educations];
        newEducations[index].showInputs = !newEducations[index].showInputs;
        setEducations(newEducations);
    };

    const addEducation = () => {
        setEducations([...educations, { showInputs: false }]);
    };

    const deleteEducation = (index: number) => {
        const newEducations = educations.filter((_, i) => i !== index);
        setEducations(newEducations);
    };

    return (
        <div className='flex flex-col gap-3 px-2'>
            {educations.map((education, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>Institute Name</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteEducation(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${education.showInputs ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {education.showInputs && <InstituteInputs />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addEducation}>
                + Add Education
            </Button>
        </div>
    )
}
function InstituteInputs() {
    return (
        <div className='grid md:grid-cols-2 gap-3 px-4'>
            <InputWithLabel label='Institution' name='institution' type='text' placeholder='University name' />
            <InputWithLabel label='Website' name='url' type='url' placeholder='Institution website' />
            <InputWithLabel label='Degree' name='degree' type='text' placeholder='Bachelors' />
            <InputWithLabel label='Field of Study' name='area' type='text' placeholder='Computer science' />
            <Input placeholder='4.5' name='score' id='score' />
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="gpa">GPA</SelectItem>
                    <SelectItem value="cgpa">CGPA</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                </SelectContent>
            </Select>
            <div className='flex flex-col gap-3 w-full'>
                <Label htmlFor='duration' className="text-base font-normal text-slate-500">Duration</Label>
                <DatePickerWithRange />
            </div>
        </div>
    )
}
