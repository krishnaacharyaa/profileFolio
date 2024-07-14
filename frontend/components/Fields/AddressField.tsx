import {UserSchema} from '@/app/zod/user-zod';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import z from "zod";

type FormData = z.infer<typeof UserSchema>;

const AddressField = () => {
    const { control, formState: { errors }, trigger, setValue, getValues } = useFormContext<FormData>();
    return (
        <div className='flex flex-col w-full'>
            <div className='text-2xl font-bold my-4'>Address</div>
            <div className='grid grid-cols-3 w-full'>
            <FormItem className='m-2'>
            <FormLabel>Address</FormLabel>
            <FormControl>
                <Controller
                name="basics.location.address"
                control={control}
                render={({ field }) => (
                    <Input {...field} type='text' placeholder="Bengaluru streets" />
                )}
                />
            </FormControl>
            <FormMessage className='text-red-500'>{errors.basics?.location?.address?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
            <FormLabel>Postal code</FormLabel>
            <FormControl>
                <Controller
                name="basics.location.postalCode"
                control={control}
                render={({ field }) => (
                    <Input {...field} type='text' placeholder="800900" />
                )}
                />
            </FormControl>
            <FormMessage className='text-red-500'>{errors.basics?.location?.postalCode?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
            <FormLabel>City</FormLabel>
            <FormControl>
                <Controller
                name="basics.location.city"
                control={control}
                render={({ field }) => (
                    <Input {...field} type='text' placeholder="Bengaluru" />
                )}
                />
            </FormControl>
            <FormMessage className='text-red-500'>{errors.basics?.location?.city?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
            <FormLabel>Region</FormLabel>
            <FormControl>
                <Controller
                name="basics.location.region"
                control={control}
                render={({ field }) => (
                    <Input {...field} type='text' placeholder="Noida" />
                )}
                />
            </FormControl>
            <FormMessage className='text-red-500'>{errors.basics?.location?.region?.message}</FormMessage>
            </FormItem>
            </div>
        </div>
  )
}

export default AddressField