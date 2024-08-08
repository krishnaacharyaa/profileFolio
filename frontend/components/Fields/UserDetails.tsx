import { UserSchema } from '@/app/zod/user-zod';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import z from 'zod';
import { PhoneInput } from '../ui/phone-input';

type FormData = z.infer<typeof UserSchema>;

const UserDetails = () => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
    clearErrors,
    getValues,
  } = useFormContext<FormData>();
  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-3 w-full mb-4">
        <FormItem className="m-2 col-span-1">
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Controller
              name="basics.name"
              control={control}
              render={({ field }) => <Input {...field} placeholder="John dvivedi" />}
            />
          </FormControl>
          <FormMessage className="text-red-500">{errors.basics?.name?.message}</FormMessage>
        </FormItem>
        <FormItem className="m-2 col-span-1">
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
          <FormMessage className="text-red-500">{errors.basics?.current_role?.message}</FormMessage>
        </FormItem>
        <FormItem className="m-2 col-span-1">
          <FormLabel>Image Url</FormLabel>
          <FormControl>
            <Controller
              name="basics.image"
              control={control}
              render={({ field }) => <Input {...field} type="url" placeholder="URL" />}
            />
          </FormControl>
          <FormMessage className="text-red-500">{errors.basics?.image?.message}</FormMessage>
        </FormItem>
        <FormItem className="m-2 col-span-1">
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Controller
              name="basics.phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onCountryChange={() => {clearErrors('basics.phone')}}
                  onChange={(number) => {
                    setValue('basics.phone', number);
                    setTimeout(() => {
                      trigger('basics.phone');
                    }, 1000);
                  }}
                  international={true}
                  placeholder="Enter a phone number"
                  defaultCountry="IN"
                />
              )}
            />
          </FormControl>
          <FormMessage className="text-red-500">{errors.basics?.phone?.message}</FormMessage>
        </FormItem>
        <FormItem className="m-2 col-span-1">
          <FormLabel>Tell us about yourself</FormLabel>
          <FormControl>
            <Controller
              name="basics.summary"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="I'm currently unemployed. I apply to jobs for a living."
                />
              )}
            />
          </FormControl>
          <FormMessage className="text-red-500">{errors.basics?.summary?.message}</FormMessage>
        </FormItem>
      </div>
    </div>
  );
};

export default UserDetails;
