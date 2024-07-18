import {UserSchema} from '@/app/zod/user-zod';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import z from "zod";
import { PhoneInput } from '@/components/phone-input/index';

type FormData = z.infer<typeof UserSchema>;


const UserDetails = () => {
    const { control, formState: { errors }, trigger, setValue, getValues } = useFormContext<FormData>()

  return (
    <div className='flex flex-col w-full'>
        <div className='grid grid-cols-3 w-full'>
        <FormItem className='m-2'>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Controller
              name="basics.name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder='John dvivedi' />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.name?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Controller
              name="basics.current_role"
              control={control}
              render={({ field }) => (
                <Input {...field} type="text" placeholder="Software engineer" />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.current_role?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Image Url</FormLabel>
          <FormControl>
            <Controller
              name="basics.image"
              control={control}
              render={({ field }) => (
                <Input {...field} type="url" placeholder="URL" />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.image?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Controller
              name="basics.email"
              control={control}
              render={({ field }) => (
                <Input {...field} type="email" placeholder="johndvivedi@gmail.com" />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.email?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Controller
              name="basics.phone"
              control={control}
              render={({ field }) => (
                <PhoneInput {...field} value={field.value}/>
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.phone?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Portfolio link</FormLabel>
          <FormControl>
            <Controller
              name="basics.url"
              control={control}
              render={({ field }) => (
                <Input {...field} type="url" placeholder="URL" />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.url?.message}</FormMessage>
        </FormItem>
        <FormItem className='m-2'>
          <FormLabel>Tell us about yourself</FormLabel>
          <FormControl>
            <Controller
              name="basics.summary"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="I'm currently unemployed. I apply to jobs for a living." />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.summary?.message}</FormMessage>
        </FormItem>
        </div>
    </div>
  )
}

export default UserDetails