"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Briefcase, ChevronDown, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel, TextAreaWithLabel } from '../InputWithLabel'
import { DatePickerWithRange } from '@/components/ui/datePicker'
import { Textarea } from '@/components/ui/textarea'
import { useFieldArray, useFormContext } from 'react-hook-form'

export default function ExperienceInput() {
    const [experience, setShowExperience] = useState(false)
    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowExperience(!experience)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <Briefcase size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Experience</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${experience ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${experience ? 'block' : 'hidden'}`}>
                <ListOfCompanies />
            </div>
        </div>
    )
}

export function ListOfCompanies() {
    const { control, watch } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "companies",
    });

    const [showInputs, setShowInputs] = useState<number | null>(null);

    const toggleInputs = (index: number) => {
        setShowInputs(showInputs === index ? null : index);
    };

    const addCompany = () => {
        append({ name: "", position: "", url: "", startDate: "", endDate: "", summary: "" })
    };

    const deleteCompany = (index: number) => {
        remove(index)
    };
    return (
        <div className='flex flex-col gap-3 px-2'>
            {fields.map((company, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>{watch(`companies.${index}.name`) || "Company Name"}</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteCompany(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showInputs === index ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {showInputs === index && <CompaniesInput index={index} />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addCompany}>
                + Add Experiences
            </Button>
        </div>
    )
}

 function CompaniesInput({index}:{index:number}) {
    const { register } = useFormContext();
    return (
        <div className='grid md:grid-cols-1 gap-3 px-4'>
            <div className='flex flex-col gap-3'>
                <InputWithLabel label='Company name' name='name' type='text' schemaType={`companies.${index}`} placeholder='Company name' />
                <InputWithLabel label='Website' name='url' type='url' schemaType={`companies.${index}`} placeholder='Company website' />
                <InputWithLabel label='Job Title' name='position' type='text' schemaType={`companies.${index}`} placeholder='Software Emgineer' />
                <div className='flex flex-col gap-3 w-full'>
                    <Label htmlFor='duration' className="text-base font-normal text-slate-500">Duration</Label>
                    <DatePickerWithRange />
                </div>
            </div>
            <TextAreaWithLabel label='Job Title' name='summary' schemaType={`companies.${index}`} placeholder='Summary'/>
        </div>
    )
}