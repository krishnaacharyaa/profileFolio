'use client'
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';


interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface ProfileProps {
  summary: string;
  location: Location;
  profiles: { network: string; username: string; url: string }[];
}

const Profile = () => {
  const { watch } = useFormContext();
  const userDetails = watch('personalInfo') as ProfileProps
  return (
    <section className='p-8 bg-gradient-to-br from-purple-50 to-pink-100'>
    <h2 className='text-3xl font-bold mb-8 text-purple-800 border-b-2 border-purple-300 pb-2 animate-fade-in'>
      About Me
    </h2>
    <div className='bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in'>
      <div className='p-6'>
        <p className='text-lg text-gray-700 mb-6 leading-relaxed text-justify'>{userDetails?.summary}</p>
        <div className='flex items-center text-gray-600 mb-4'>
          <FaMapMarkerAlt className='text-purple-500 mr-2' />
          <p>
            {/* Add City in Input Box */}
            Rajkot,India
          </p>
        </div>
        <div className='flex flex-wrap gap-4 mt-6'>
          {/* {profiles.map(profile => (
            <a 
            key={profile.network} 
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className='flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition duration-300'
            >
            <FaGlobe className='mr-2' />
            {profile.network}
            </a>
            ))} */}
        </div>
      </div>
    </div>
  </section>
)};

export default Profile;
