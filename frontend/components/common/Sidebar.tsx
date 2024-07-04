'use client'
import React from 'react'
import UserDetailsInput from './sidebarInput/UserDetailsInput'
import Experience from './sidebarInput/ExperienceInput'
import ProjectInput from './sidebarInput/ProjectInput'
import EducationInput from './sidebarInput/EducationInput'
import SkillsInput from './sidebarInput/SkillInput'
import LanguageInput from './sidebarInput/LanguageInput'
import CertificateInput from './sidebarInput/CertificateInput'
import { CircleX } from 'lucide-react'




export default function Sidebar() {
  return (
    <div className='w-[400px] h-full'>
      <div className='py-4 border border-gray-200 rounded-md h-[530px] overflow-y-auto scrollbar-none scroll-smooth'>
        <h1 className='font-semibold text-slate-600 text-base mb-4 px-4 flex justify-between'>Resume Details</h1>
        <hr />
        <div className='flex flex-col'>
          <UserDetailsInput/>
          <hr />
          <EducationInput />
          <hr />
          <Experience />
          <hr />
          <ProjectInput/>
          <hr />
          <SkillsInput />
          <hr />
          <LanguageInput />
          <hr />
          <CertificateInput />
        </div>
      </div>
    </div>
  )
}
