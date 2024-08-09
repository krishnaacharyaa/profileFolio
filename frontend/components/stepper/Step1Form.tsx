import React from 'react';
import UserDetails from '@/components/Fields/UserDetails';
import AddressField from '@/components/Fields/AddressField';
import Profiles from '@/components/Fields/ProfilesField';
import LanguagesField from '@/components/Fields/LanguagesField';
import InterestsField from '@/components/Fields/InterestsField';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '../ui/badge';
import { useFormContext } from 'react-hook-form';
import z from 'zod';
import { UserSchema } from '@/app/zod/user-zod';

type FormData = z.infer<typeof UserSchema>;

const Step1Form = () => {
  const {
    formState: { errors },
  } = useFormContext<FormData>();

  // Check if there are any errors in the UserDetails fields
  const hasUserDetailsErrors = !!(
    errors.basics?.name ||
    errors.basics?.current_role ||
    errors.basics?.image ||
    errors.basics?.phone ||
    errors.basics?.summary
  );
  // Check if there are any errors in the Address fields
  const hasAddressErrors = !!(
    errors?.basics?.location?.address?.message ||
    errors?.basics?.location?.postalCode?.message ||
    errors?.basics?.location?.city?.message ||
    errors?.basics?.location?.region?.message
  );

  const profiles = errors?.basics?.profiles;
  const hasProfilesErrors =
    Array.isArray(profiles) &&
    profiles.filter(
      (profile) => profile?.network?.message || profile?.username?.message || profile?.url?.message
    ).length > 0;

  // Check if there are any errors in the Languages fields
  const languages = errors?.basics?.languages;
  const hasLanguagesErrors =
    Array.isArray(languages) &&
    languages.some((language) => language?.language?.message || language?.fluency?.message);

  // Check if there are any errors in the Interests fields
  const interests = errors?.basics?.interests;
  const hasInterestsErrors =
    Array.isArray(interests) &&
    interests.some(
      (interest) =>
        interest?.name?.message || interest?.keywords?.message
    );

  return (
    <div className="flex flex-col my-6 w-3/4">
      <Accordion type="multiple" className="w-full" defaultValue={['item-1', 'item-2']}>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex w-full justify-between items-center px-4">
              <div className="flex justify-center items-center text-2xl font-bold">
                User Details <span className="text-sm text-red-500">{'*'}</span>
              </div>
              {hasUserDetailsErrors && <Badge variant={'destructive'}>Error</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <UserDetails />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex w-full justify-between items-center px-4">
              <div className="flex justify-center items-center text-2xl font-bold">
                Address <span className="text-sm text-red-500">{'*'}</span>
              </div>
              {hasAddressErrors && <Badge variant={'destructive'}>Error</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <AddressField />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex w-full justify-between items-center px-4">
              <div className="text-2xl font-bold">Profiles</div>
              {hasProfilesErrors && <Badge variant={'destructive'}>Error</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Profiles />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex w-full justify-between items-center px-4">
              <div className="text-2xl font-bold">Languages</div>
              {hasLanguagesErrors && <Badge variant={'destructive'}>Error</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <LanguagesField />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            <div className="flex w-full justify-between items-center px-4">
              <div className="text-2xl font-bold">Interests</div>
              {hasInterestsErrors && <Badge variant={'destructive'}>Error</Badge>}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <InterestsField />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Step1Form;
