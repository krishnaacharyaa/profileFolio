"use client"
import { Button } from '@/components/ui/button'
import { Label } from '@radix-ui/react-label'
import { Briefcase, ChevronDown, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'
import { DatePickerWithRange } from '@/components/ui/datePicker'
import { Textarea } from '@/components/ui/textarea'

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

interface CompaniesProps {
    showInputs: boolean;
}

function ListOfCompanies() {
    const [companies, setCompanies] = useState<CompaniesProps[]>([]);

    const toggleInputs = (index: number) => {
        const newCompanies = [...companies];
        newCompanies[index].showInputs = !newCompanies[index].showInputs;
        setCompanies(newCompanies);
    };

    const addCompany = () => {
        setCompanies([...companies, { showInputs: false }]);
    };

    const deleteCompany = (index: number) => {
        const newCompanies = companies.filter((_, i) => i !== index);
        setCompanies(newCompanies);
    };
    return (
        <div className='flex flex-col gap-3 px-2'>
            {companies.map((company, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>Company Name</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteCompany(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${company.showInputs ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {company.showInputs && <CompaniesInput />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addCompany}>
                + Add Experiences
            </Button>
        </div>
    )
}

 function CompaniesInput() {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3 px-4'>
                <InputWithLabel label='Company name' name='name' type='text' placeholder='Company name' />
                <InputWithLabel label='Website' name='url' type='url' placeholder='Company website' />
                <InputWithLabel label='Job Title' name='position' type='text' placeholder='Software Emgineer' />
                <div className='flex flex-col gap-3 w-full'>
                    <Label htmlFor='duration' className="text-base font-normal text-slate-500">Duration</Label>
                    <DatePickerWithRange />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Label htmlFor="summary" className="text-base font-normal text-slate-500">Summary</Label>
                <Textarea placeholder='Enter Summary' name='summary' id='summary' />
            </div>
        </div>
    )
}