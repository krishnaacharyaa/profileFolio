"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ChevronDown, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function UserDetailsInput() {
    const [showInputs, setShowInputs] = useState(false)
    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowInputs(!showInputs)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <User size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Personal Info</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${showInputs ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showInputs ? 'block' : 'hidden'}`}>
                <UserInfoInputs />
            </div>
        </div>
    )
}

function UserInfoInputs() {
    const { register, control, setValue, watch } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'personalInfo.links',
        control
    })


    const handleAddLink = () => {
        if (fields.length < 5) {
            append({ url: '', social: '' })
        }
    }
    const detectLinkType = (url: string) => {
        if (url.includes("github.com")) return "github";
        if (url.includes("linkedin.com")) return "linkedin";
        if (url.includes("twitter.com") || url.includes("x.com")) return "x";
        if (url.includes("hackerrank.com")) return "hackerrank";
        if (url.includes("leetcode.com")) return "leetcode";
        return "portfolio";
    };

    useEffect(() => {
        fields.forEach((link, index) => {
            const url = watch(`personalInfo.links.${index}.url`);
            if (url) {
                const type = detectLinkType(url);
                setValue(`personalInfo.links.${index}.social`, type);
            }
        });
    }, []);

    return (
        <div className='flex flex-col gap-4 px-2'>
            <div className='grid md:grid-cols-2 gap-3'>
                <InputWithLabel label='Name' name='name' type='text' placeholder='John Doe' schemaType='personalInfo' />
                <InputWithLabel label='Email' name='email' type='email' placeholder='john.doe@example.com' schemaType='personalInfo' />
                <InputWithLabel label='Phone' name='phone' type='string' placeholder='(+1) 123 456 7890' schemaType='personalInfo' />
                <InputWithLabel label='Job Title' name='jobTitle' type='text' placeholder='Full-Stack Developer' schemaType='personalInfo' />
            </div>
            <div className='flex flex-col gap-3'>
                <Label htmlFor="summary" className="text-base font-normal text-slate-500">Summary</Label>
                <Textarea placeholder='Enter Summary' id='summary' {...register('personalInfo.summary')} />
            </div>
            <div className='flex flex-col gap-3'>
                <h1 className='text-slate-700 font-medium text-base'>Links({fields.length}/5)</h1>
                {fields.map((field, index) => (
                    <div key={field.id} className='flex items-center justify-between gap-3'>
                        <div className='grid md:grid-cols-2 gap-3'>
                            <Input
                                placeholder='Your link here'
                                type='url'
                                {...register(`personalInfo.links.${index}.url`)}
                                onChange={(e) => {
                                    const url = e.target.value;
                                    const type = detectLinkType(url);
                                    setValue(`personalInfo.links.${index}.social`, type);
                                }}
                            />
                            <Select
                                value={watch(`personalInfo.links.${index}.social`)}
                                onValueChange={(value) => setValue(`personalInfo.links.${index}.social`, value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="github">Github</SelectItem>
                                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                                    <SelectItem value="x">X</SelectItem>
                                    <SelectItem value="hackerrank">Hackerrank</SelectItem>
                                    <SelectItem value="portfolio">Portfolio</SelectItem>
                                    <SelectItem value="leetcode">Leetcode</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='cursor-pointer' onClick={() => remove(index)}>
                            <Trash2 size={'15'} />
                        </div>
                    </div>
                ))}
                <Button variant={'outline'} onClick={handleAddLink} disabled={fields.length >= 5}>
                    + Add Link
                </Button>
            </div>
        </div>
    )
}
