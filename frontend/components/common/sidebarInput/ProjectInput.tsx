"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { Airplay, ChevronDown, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'
import { DatePickerWithRange } from '@/components/ui/datePicker'

export default function ProjectInput() {
    const [projects, setShowProjects] = useState(false)

    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowProjects(!projects)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <Airplay size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Projects</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${projects ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${projects ? 'block' : 'hidden'}`}>
                <ListOfProjects />
            </div>
        </div>
    )
}

interface ProjectsProps {
    showInputs: boolean;
}

function ListOfProjects() {
    const [projects, setProjects] = useState<ProjectsProps[]>([]);

    const toggleInputs = (index: number) => {
        const newProject = [...projects];
        newProject[index].showInputs = !newProject[index].showInputs;
        setProjects(newProject);
    };

    const addProject = () => {
        setProjects([...projects, { showInputs: false }]);
    };

    const deleteProject = (index: number) => {
        const newProject = projects.filter((_, i) => i !== index);
        setProjects(newProject);
    };
    return (
        <div className='flex flex-col gap-3 px-2'>
            {projects.map((project, index) => (
                <div key={index}>
                    <div
                        className='flex justify-between items-center px-4 py-4 cursor-pointer'
                        onClick={() => toggleInputs(index)}
                    >
                        <h1 className='text-slate-600 font-semibold text-base'>Open source /Personal projects</h1>
                        <div className='flex gap-3 items-center'>
                            <Trash2 size={20} className='text-slate-400 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                deleteProject(index);
                            }} />
                            <ChevronDown size={20} className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${project.showInputs ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                    {project.showInputs && <ProjectInputs />}
                </div>
            ))}
            <Button variant={'outline'} onClick={addProject}>
                + Add Contribution / Projects
            </Button>
        </div>
    )
}
function ProjectInputs() {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3 px-4'>
                <InputWithLabel label='Project name' name='name' type='text' placeholder='Project name' />
                <InputWithLabel label='Technologies Used' name='technologies' type='text' placeholder='React.js , Node.js , TypeScript ...' />
                <InputWithLabel label='Project Link / GitHub Repository' name='url' type='text' placeholder='github.com/your-username/repository' />
                <div className='flex flex-col gap-3 w-full'>
                    <Label htmlFor='duration' className="text-base font-normal text-slate-500">Duration</Label>
                    <DatePickerWithRange />
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <Label htmlFor="description" className="text-base font-normal text-slate-500">Description</Label>
                <Textarea placeholder='Enter description' name='description' id='description' />
            </div>
        </div>
    )
}
