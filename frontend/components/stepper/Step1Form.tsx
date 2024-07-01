// components/steps/Step1Form.tsx
import React, { useRef, useState } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input } from "@/components/ui/input"; 
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"; 
import {UserSchema} from '@/app/zod/user-zod';
import { z } from 'zod';
import { Textarea } from '../ui/textarea';
import { Check, ChevronsUpDown, Divide } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type FormData = z.infer<typeof UserSchema>;
// Define the allowed fluency values as a union type
type Fluency = "Beginner" | "Intermediate" | "Advanced" | "Native";

const Step1Form = () => {
  const { control, formState: { errors }, trigger, setValue } = useFormContext<FormData>();

  const [keyValue, setKeyValue] = useState("")
  const { fields: profileFields, append: appendProfile, remove: removeProfile } = useFieldArray({
    control,
    name: "basics.profiles",
  });
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control,
    name: "basics.languages",
  });

  // const { fields: interestFields, append: appendInterest, remove: removeInterest } = useFieldArray({
  //   control,
  //   name: "basics.interests",
  // });

  const fluencyOptions: { value: Fluency, label: string }[] = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    { value: "Native", label: "Native" },
  ];

  const keywordRefs = useRef<HTMLInputElement[]>([]);


  const handleAddProfile = () => {
    appendProfile({ username: "", url: "", network: ""});
  };

  const handleRemoveProfile = (index: number) => {
    removeProfile(index);
  };

  const handleAddLanguage = () => {
    appendLanguage({ language: "", fluency: "Beginner"});
  };

  const handleRemoveLanguage = (index: number) => {
    removeLanguage(index);
  };

  // const handleAddInterest = () => {
  //   appendInterest({ name: "", keywords: []});
  // };

  // const handleRemoveInterest = (index: number) => {
  //   removeInterest(index);
  // };


  return (
    <div className='flex flex-col w-full my-6'>
      <div className='text-2xl font-bold my-4'>User Details</div>
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
                <Input {...field} type="text" placeholder="1234567890" />
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
          <FormLabel>Country code</FormLabel>
          <FormControl>
            <Controller
              name="basics.location.countryCode"
              control={control}
              render={({ field }) => (
                <Input {...field} type='text' placeholder="IN" />
              )}
            />
          </FormControl>
          <FormMessage className='text-red-500'>{errors.basics?.location?.countryCode?.message}</FormMessage>
        </FormItem>
        </div>
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
        <div className='text-2xl font-bold my-4'>Languages</div>
        <div className='w-full'>
        {languageFields && languageFields.map((item, index) => (
          <div key={item.id} className='my-2'>
          <div className="grid grid-cols-3 items-center">
            <FormItem className='m-2'>
              <FormLabel>Language</FormLabel>
              <FormControl>
                <Controller
                  name={`basics.languages.${index}.language`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='English' />
                  )}
                />
              </FormControl>
              <FormMessage className='text-red-500'>{errors?.basics?.languages?.[index]?.language?.message}</FormMessage>
            </FormItem>
            <FormItem className='flex flex-col mx-2 justify-center'>
              <FormLabel>Fluency</FormLabel>
              <FormControl>
              <Controller
                name={`basics.languages.${index}.fluency`}
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                        ? fluencyOptions.find(
                            (fluency) => fluency.value === field.value
                          )?.label
                        : "Select fluency"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search fluency..." />
                        <CommandEmpty>No fluency found.</CommandEmpty>
                        <CommandList>
                        <CommandGroup>
                        {fluencyOptions.map((fl) => (
                        <CommandItem
                          value={fl.label}
                          key={fl.value}
                          onSelect={() => {
                            setValue(`basics.languages.${index}.fluency`, fl.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              fl.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {fl.label}
                        </CommandItem>
                      ))}
                        </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
            </FormControl>
            <FormMessage className='text-red-500'>{errors?.basics?.languages?.[index]?.fluency?.message}</FormMessage>            </FormItem>
          </div>
            <Button type="button" onClick={() => handleRemoveLanguage(index)} className="mt-2">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddLanguage} className="mt-2">Add Language</Button>
        </div>
        {/* <div className='text-2xl font-bold my-4'>Interests</div>
        <div className='flex flex-col justify-center items-start w-full flex-grow'>
        {interestFields.map((item, index) => (
          <div key={item.id} className='my-2'>
          <div className="grid grid-cols-3 mb-4">
            <FormItem className='m-2'>
              <FormLabel>Interest</FormLabel>
              <FormControl>
                <Controller
                  name={`basics.interests.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='Cybersecurity'/>
                  )}
                />
              </FormControl>
              <FormMessage className='text-red-500'>{errors?.basics?.interests?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Controller
                  name={`basics.interests.${index}.keywords`}
                  control={control}
                  render={({ field }) => (
                    <div className='flex flex-col justify-center'>
                      <div className='flex justify-center items-center'>
                        <Input 
                          placeholder='White hat' 
                          type='text' 
                          ref={(el) => {
                            if (el) {
                              keywordRefs.current[index] = el;
                            }
                          }} 
                        />
                        <Button onClick={() => handleAddKeyword(index)}>Add</Button>
                      </div>
                      <div className='flex justify-start items-center'>
                        {field.value}
                      </div>
                    </div>
                  )}
                />
              </FormControl>
              <FormMessage className='text-red-500'>{errors?.basics?.profiles?.[index]?.username?.message}</FormMessage>
            </FormItem>
          </div>
            <Button type="button" onClick={() => handleRemoveInterest(index)} className="mt-2">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddInterest} className="mt-2">Add Interests</Button>
        </div> */}
    </div>
  );
};

export default Step1Form;
