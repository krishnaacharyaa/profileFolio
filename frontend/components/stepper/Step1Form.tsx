import React from 'react';
import UserDetails from '@/components/Fields/UserDetails';
import AddressField from '@/components/Fields/AddressField';
import Profiles from '@/components/Fields/ProfilesField';
import LanguagesField from '@/components/Fields/LanguagesField';
import InterestsField from '@/components/Fields/InterestsField';

const Step1Form = () => {
  return (
    <div className='flex flex-col w-full my-6'>
        <UserDetails /> 
        <AddressField />     
        <Profiles />
        <LanguagesField />
        <InterestsField />
    </div>
  );
};

export default Step1Form;
