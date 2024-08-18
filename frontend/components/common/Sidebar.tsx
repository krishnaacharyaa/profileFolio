'use client';
import React from 'react';
import UserDetailsInput from './sidebarInput/UserDetailsInput';
import Experience from './sidebarInput/ExperienceInput';
import ProjectInput from './sidebarInput/ProjectInput';
import EducationInput from './sidebarInput/EducationInput';
import SkillsInput from './sidebarInput/SkillInput';
import LanguageInput from './sidebarInput/LanguageInput';
import CertificateInput from './sidebarInput/CertificateInput';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Sidebar({ isLoading }: { isLoading: boolean }) {
  const router = useRouter();
  return (
    <div className="lg:w-[400px] md:w-[260px] h-full ">
      <div className="py-4 border border-gray-200 rounded-md h-[530px] overflow-y-auto scrollbar-none scroll-smooth">
        <h1 className="font-semibold text-slate-600 text-base mb-4 px-4">Resume Details</h1>
        <hr />
        <div className="flex flex-col">
          <UserDetailsInput />
          <hr />
          <EducationInput />
          <hr />
          <Experience />
          <hr />
          <ProjectInput />
          <hr />
          <SkillsInput />
          <hr />
          <LanguageInput />
          <hr />
          <CertificateInput />
        </div>
      </div>
      <div className="flex items-center justify-between py-4 px-3">
        <Button variant={'outline'} type='button' onClick={() => router.back()}>Cancel</Button>
        <Button variant={'default'} type="submit" disabled={isLoading}>
          {
            isLoading ? (
              <>
                Saving {' '} <Loader2 className='animate-spin h-5 w-5' />
              </>
            ) : (
              'Save'
            )
          }
        </Button>
      </div>
    </div>
  );
}
