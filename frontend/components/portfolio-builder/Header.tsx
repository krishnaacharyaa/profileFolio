'use client'
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaLinkedin, FaGithub, FaEnvelope, FaMobile } from 'react-icons/fa';

interface HeaderProps {
  name: string;
  jobTitle: string;
  image: string;
  email: string;
  phone: string;
  links: Link[];
  imgUrl: string;
}
interface Link {
  social: string;
  url: string;
}
const Header = () => {
  const { watch } = useFormContext();
  const [personalInfo,setpersonalInfo]=useState<HeaderProps>()
  useEffect(()=>{
    const data = watch("personalInfo") as HeaderProps
    setpersonalInfo(data)
  },[])
  return(
  <header className='flex flex-col items-start p-4 bg-gray-100 rounded-lg shadow-md'>
    <div className="mb-4">
      <img 
        className="rounded-full w-32 h-32 object-cover shadow-lg" 
        src={"https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
        alt={`jane's photo`} 
      />
    </div>
    <div className='text-left'>
      <h1 className='text-2xl font-bold text-gray-900'>{personalInfo?.name}</h1>
      <p className='text-lg text-gray-600'>{personalInfo?.jobTitle}</p>
      <div className='flex items-center space-x-4'>
        <a href={`mailto:${personalInfo?.email}`} className='text-blue-500 hover:underline flex items-center'>
          <FaEnvelope className='mr-2' /> {personalInfo?.email}
        </a>
        <p className='text-blue-500 hover:underline flex items-center'>
          <FaMobile className='mr-2'/>{personalInfo?.phone}
        </p>
        {/* <a href={'url'} className='text-blue-500 hover:underline'>https://janesmith.com</a> */}
      </div>
      <div className='flex items-center space-x-4 mt-2'>
        {personalInfo?.links.map(profile => {
          if (profile?.social === 'linkedin') {
            return (
              <a key={profile.social} href={profile?.url} className='text-blue-700 hover:underline flex items-center'>
                <FaLinkedin className='mr-2' /> LinkedIn
              </a>
            );
          } else if (profile?.social === 'github') {
            return (
              <a key={profile?.social} href={profile?.url} className='text-blue-500 hover:underline flex items-center'>
                <FaGithub className='mr-2'/> GitHub
              </a>
            );
          }
          return null;
        })}
      </div>
    </div>
  </header>
  )};

export default Header;

