import {UserSchema} from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import z from "zod";

type FormData = z.infer<typeof UserSchema>;

const Profiles = () => {
    const { control, formState: { errors }, trigger, setValue, getValues, clearErrors } = useFormContext<FormData>();
    const { fields: profileFields, append: appendProfile, remove: removeProfile } = useFieldArray({
        control,
        name: "basics.profiles",
      });
      const handleAddProfile = () => {
        appendProfile({ username: "", url: "", network: ""});
        clearErrors('basics.profiles')
      };
    
      const handleRemoveProfile = (index: number) => {
        removeProfile(index);
      };
  return (
    <div className='flex flex-col w-full'>
        <div className='text-2xl font-bold my-4'>Profiles</div>
            <div className='w-full'>
            {profileFields.map((item, index) => (
            <div key={item.id} className='my-2'>
            <div className="grid grid-cols-3 mb-4">
                <FormItem className='m-2'>
                <FormLabel>Platform</FormLabel>
                <FormControl>
                    <Controller
                    name={`basics.profiles.${index}.network`}
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder='Linkedin' />
                    )}
                    />
                </FormControl>
                <FormMessage className='text-red-500'>{errors?.basics?.profiles?.[index]?.network?.message}</FormMessage>
                </FormItem>
                <FormItem className='m-2'>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Controller
                    name={`basics.profiles.${index}.username`}
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder='johndvivedi101' type='text' />
                    )}
                    />
                </FormControl>
                <FormMessage className='text-red-500'>{errors?.basics?.profiles?.[index]?.username?.message}</FormMessage>
                </FormItem>
                <FormItem className='m-2'>
                <FormLabel>Link</FormLabel>
                <FormControl>
                    <Controller
                    name={`basics.profiles.${index}.url`}
                    control={control}
                    render={({ field }) => (
                        <Input {...field} placeholder='https://linkedin.com/in/janesmith' type='url' />
                    )}
                    />
                </FormControl>
                <FormMessage className='text-red-500'>{errors?.basics?.profiles?.[index]?.url?.message}</FormMessage>
                </FormItem>
            </div>
            <Button type="button" onClick={() => handleRemoveProfile(index)} className="mt-2">Remove</Button>
        </div>
    ))}
    <Button type="button" onClick={handleAddProfile} className="mt-2">Add Profile</Button>
        </div>
    </div>
  )
}

export default Profiles