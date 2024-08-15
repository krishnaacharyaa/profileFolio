import React from 'react';
import UserDetails from '@/components/Fields/UserDetails';
import AddressField from '@/components/Fields/AddressField';
import Profiles from '@/components/Fields/ProfilesField';
import LanguagesField from '@/components/Fields/LanguagesField';
import InterestsField from '@/components/Fields/InterestsField';
import { useFormContext } from 'react-hook-form';
import z from 'zod';
import { UserSchema } from '@/app/zod/user-zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type FormData = z.infer<typeof UserSchema>;

const Step1Form = () => {
  const {
    formState: { errors },
  } = useFormContext<FormData>();

  // Check if there are any errors in the UserDetails fields
  const hasUserDetailsErrors = !!(
    errors.basics?.message ||
    errors.basics?.name ||
    errors.basics?.current_role ||
    errors.basics?.image ||
    errors.basics?.phone ||
    errors.basics?.summary
  );
  // Check if there are any errors in the Address fields
  const hasAddressErrors = !!(
    errors?.basics?.location?.message ||
    errors?.basics?.location?.address?.message ||
    errors?.basics?.location?.postalCode?.message ||
    errors?.basics?.location?.city?.message ||
    errors?.basics?.location?.region?.message
  );

  const profiles = errors?.basics?.profiles;
  const hasProfilesErrors =
    Array.isArray(profiles) &&
    profiles.filter(
      (profile) => profile?.network?.message || profile?.username?.message || profile?.url?.message || profile?.message
    ).length > 0;

  // Check if there are any errors in the Languages fields
  const languages = errors?.basics?.languages;
  const hasLanguagesErrors =
    Array.isArray(languages) &&
    languages.some((language) => language?.language?.message || language?.fluency?.message || language?.message);

  // Check if there are any errors in the Interests fields
  const interests = errors?.basics?.interests;
  const hasInterestsErrors =
    Array.isArray(interests) &&
    interests.some(
      (interest) =>
        interest?.name?.message || interest?.keywords?.message || interest?.message
    );

  return (
    <div className="flex flex-col my-6 w-4/5">
      <Tabs defaultValue="user" className="w-full p-2">
        <TabsList>
          <TabsTrigger value="user" className={`${hasUserDetailsErrors && "bg-red-200"}`}>User Details <span className='text-red-500 mx-[1px]'>*</span></TabsTrigger>
          <TabsTrigger value="address" className={`${hasAddressErrors && "bg-red-200"}`}>Address <span className='text-red-500 mx-[1px]'>*</span></TabsTrigger>
          <TabsTrigger value="profiles" className={`${hasProfilesErrors && "bg-red-200"}`}>Profiles</TabsTrigger>
          <TabsTrigger value="languages" className={`${hasLanguagesErrors && "bg-red-200"}`}>Languages</TabsTrigger>
          <TabsTrigger value="interests" className={`${hasInterestsErrors && "bg-red-200"}`}>Interests</TabsTrigger>
        </TabsList>
        <TabsContent value="user"><UserDetails /></TabsContent>
        <TabsContent value="address"><AddressField /></TabsContent>
        <TabsContent value="profiles"><Profiles /></TabsContent>
        <TabsContent value="languages"><LanguagesField /></TabsContent>
        <TabsContent value="interests"><InterestsField /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Step1Form;
