import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaMobile } from 'react-icons/fa';

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface HeaderProps {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  profiles: Profile[];
}

const Header = () => {
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
      <h1 className='text-2xl font-bold text-gray-900'>Jane Smith</h1>
      <p className='text-lg text-gray-600'>Software Engineer</p>
      <div className='flex items-center space-x-4'>
        <a href={`mailto:jane.smith@gmail.com`} className='text-blue-500 hover:underline flex items-center'>
          <FaEnvelope className='mr-2' /> jane.smith@gmail.com
        </a>
        <p className='text-blue-500 hover:underline flex items-center'>
          <FaMobile className='mr-2'/>(123) 456-7890
        </p>
        <a href={'url'} className='text-blue-500 hover:underline'>https://janesmith.com</a>
      </div>
      <div className='flex items-center space-x-4 mt-2'>
        {/* {profiles.map(profile => {
          if (profile.network === 'LinkedIn') {
            return (
              <a key={profile.network} href={profile.url} className='text-blue-700 hover:underline flex items-center'>
                <FaLinkedin className='mr-2' /> LinkedIn
              </a>
            );
          } else if (profile.network === 'GitHub') {
            return (
              <a key={profile.network} href={profile.url} className='text-blue-500 hover:underline flex items-center'>
                <FaGithub className='mr-2' /> GitHub
              </a>
            );
          }
          return null;
        })} */}
      </div>
    </div>
  </header>
  )};

export default Header;

