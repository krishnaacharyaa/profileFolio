'use client'
import React, { useRef } from 'react'
import Education from '@/components/portfolio-builder/Template1/Education';
import WorkExperience from '@/components/portfolio-builder/Template1/Experience';
import About from '@/components/portfolio-builder/Template1/About';
import Projects from '@/components/portfolio-builder/Template1/Projects';
import Skills from '@/components/portfolio-builder/Template1/Skills';
import Languages from './Template1/Languages';
import Certifications from './Template1/Certificates';
import { useFormContext } from 'react-hook-form';

const Template1 = () => {
    const about = useRef(null);
    const education = useRef(null);
    const workexperience = useRef(null);
    const project = useRef(null);
    const certificates = useRef(null);
    const skills = useRef(null);

    const { watch } = useFormContext();
    const personalInfo = watch('basics');

    const scrollToSection = (ref: any) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <div className='flex bg-black justify-between py-6 px-8 items-center'>
                <div className='flex-col text-white items-center'>
                    {personalInfo?.name && <p className='text-lg'>{personalInfo.name}</p>}
                    {personalInfo?.label && <p className='text-sm text-gray-300'>{personalInfo.label}</p>}
                </div>
                <div className='flex'>
                    <p onClick={() => scrollToSection(about)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>About</p>
                    <p onClick={() => scrollToSection(education)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>Education</p>
                    <p onClick={() => scrollToSection(workexperience)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>Experience</p>
                    <p onClick={() => scrollToSection(project)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>Projects</p>
                    <p onClick={() => scrollToSection(skills)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>Skills</p>
                    <p onClick={() => scrollToSection(certificates)} className='hover:underline text-white hover:cursor-pointer mx-2 text-sm'>Certificates</p>
                </div>
            </div>
            <span ref={about}>
                <About />
            </span>
            <span ref={education}>
                <Education />
            </span>
            <span ref={workexperience}>
                <WorkExperience />
            </span>
            <span ref={project}>
                <Projects />
            </span>
            <span ref={skills}>
                <Skills />
            </span>
            <Languages />
            <span ref={certificates}>
                <Certifications />
            </span>
        </div>
    )
}

export default Template1
