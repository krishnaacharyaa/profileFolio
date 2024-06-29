"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown, Languages, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

export default function LanguageInput() {
    const [language, setShowLanguage] = useState(false)
    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowLanguage(!language)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <Languages size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Languages</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${language ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${language ? 'block' : 'hidden'}`}>
                <ListOfLanguages />
            </div>
        </div>
    )
}

interface LanguageProps {
    showInputs: boolean;
}

function ListOfLanguages() {
    const [languages, setLanguages] = useState<LanguageProps[]>([]);

    const toggleInputs = (index: number) => {
        const newLanguage = [...languages];
        newLanguage[index].showInputs = !newLanguage[index].showInputs;
        setLanguages(newLanguage);
    };

    const addLanguage = () => {
        setLanguages([...languages, { showInputs: false }]);
    };

    const deleteLanguage = (index: number) => {
        const newLanguage = languages.filter((_, i) => i !== index);
        setLanguages(newLanguage);
    };
    return (
        <div className='flex flex-col gap-3 px-2'>
            {languages.map((language, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>Language</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteLanguage(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${language.showInputs ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {language.showInputs && <LanguageInputs />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addLanguage}>
                + Add Language
            </Button>
        </div>
    )
}
 function LanguageInputs() {
    return (
        <div className='grid md:grid-cols-2 gap-3'>
            <Input name='language' id='language' placeholder='Enter language' />
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expart">Expart</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
