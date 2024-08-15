import { UserSchema } from '@/app/zod/user-zod';
import TWButton  from '@/components/ui/tailwbutton';
import {Button}  from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from 'zod';
import Image from 'next/image';

type FormData = z.infer<typeof UserSchema>;

const Profiles = () => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    clearErrors,
  } = useFormContext<FormData>();
  const {
    fields: profileFields,
    append: appendProfile,
    remove: removeProfile,
  } = useFieldArray({
    control,
    name: 'basics.profiles',
  });
  const handleAddProfile = () => {
    appendProfile({ username: '', url: '', network: '' });
    clearErrors('basics.profiles');
  };

  const handleRemoveProfile = (index: number) => {
    removeProfile(index);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        {profileFields.map((item, index) => (
          <div key={item.id} className="flex justify-start items-center my-2">
            <div className="grid grid-cols-3 mb-4 flex-1">
              <FormItem className="m-2">
                <FormLabel>Platform</FormLabel>
                <FormControl>
                  <Controller
                    name={`basics.profiles.${index}.network`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Linkedin" />}
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors?.basics?.profiles?.[index]?.network?.message}
                </FormMessage>
              </FormItem>
              <FormItem className="m-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Controller
                    name={`basics.profiles.${index}.username`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="johndvivedi101" type="text" />
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors?.basics?.profiles?.[index]?.username?.message}
                </FormMessage>
              </FormItem>
              <FormItem className="m-2">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Controller
                    name={`basics.profiles.${index}.url`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="https://linkedin.com/in/janesmith"
                        type="url"
                      />
                    )}
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors?.basics?.profiles?.[index]?.url?.message}
                </FormMessage>
              </FormItem>
            </div>
            <Button onClick={() => handleRemoveProfile(index)}>
              <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
            </Button>
          </div>
        ))}
        <TWButton onClick={handleAddProfile}>
          <span className="text-4xl">+</span>
        </TWButton>
      </div>
    </div>
  );
};

export default Profiles;
