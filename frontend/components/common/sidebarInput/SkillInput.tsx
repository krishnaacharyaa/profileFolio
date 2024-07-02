"use client"
import { ChevronDown, Database } from 'lucide-react'
import React, { useState } from 'react'
import { InputWithLabel } from '../InputWithLabel'

export default function SkillsInput() {
    const [skills, setShowSkills] = useState(false)
    return (
        <div className='py-4 px-3 flex flex-col gap-4'>
            <div className='flex justify-between items-center cursor-pointer' onClick={() => setShowSkills(!skills)}>
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full flex justify-center items-center bg-slate-300'>
                        <Database size={15} />
                    </div>
                    <span className='text-slate-500 text-base'>Skills</span>
                </div>
                <ChevronDown className={`text-slate-400 cursor-pointer transform transition-transform duration-300 ${skills ? 'rotate-180' : ''}`} size={20} />
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${skills ? 'block' : 'hidden'}`}>
                <SkillsInputs />
            </div>
        </div>
    )
}
function SkillsInputs() {
    return (
        <div className='p-2 flex flex-col gap-3 items-center'>
            <InputWithLabel label='Add languages' name='languages' type='text' placeholder='Java, javascript, TypeScript, Python' schemaType='skills'  />
            <InputWithLabel label='Add libraries / frameworks' name='libraries' type='text' placeholder='React.js , Next.js' schemaType='skills'  />
            <InputWithLabel label='Add tools / platforms' name='tools' type='text' placeholder='Vs code , Git' schemaType='skills'  />
            <InputWithLabel label='Add databases' name='databases' type='text' placeholder='Mongodb , SQL , Postgress' schemaType='skills'  />
        </div>
    )
}
