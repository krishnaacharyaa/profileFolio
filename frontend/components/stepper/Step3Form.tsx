import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { UserSchema } from '@/app/zod/user-zod';

type FormData = z.infer<typeof UserSchema>;

type StudyType = 'Remote' | 'In-premise';

const Step3Form = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormData>();
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education.educationArr',
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control,
    name: 'education.certificates',
  });

  const StudyOptions: { value: StudyType; label: string }[] = [
    { value: 'Remote', label: 'Beginner' },
    { value: 'In-premise', label: 'Intermediate' },
  ];

  const handleAddEducation = () => {
    appendEducation({
      institution: '',
      url: '',
      area: '',
      studyType: 'In-premise',
      startDate: new Date(),
      endDate: new Date(),
      score: '',
    });
  };

  const handleRemoveEducation = (index: number) => {
    removeEducation(index);
  };

  const handleAddCertificates = () => {
    appendCertificate({ name: '', date: new Date(), issuer: '', url: '' });
  };

  const handleRemoveCertificates = (index: number) => {
    removeCertificate(index);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="text-2xl font-bold mb-4">Education</div>
      {educationFields.map((item, index) => (
        <div key={item.id}>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2">
              <FormLabel>Instituion name</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.institution`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Institution Name" />}
                />
              </FormControl>
              <FormMessage>
                {errors?.education?.educationArr?.[index]?.institution?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Institution Website</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="URL" type="url" value={field.value || ''} />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.education?.educationArr?.[index]?.url?.message}</FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Area of study</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.area`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Computer Science" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.educationArr?.[index]?.area?.message}</FormMessage>
            </FormItem>
            <FormItem className="flex flex-col mx-2 justify-center">
              <FormLabel>Study Type</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.studyType`}
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-[200px] justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? StudyOptions.find((studyType) => studyType.value === field.value)
                                  ?.label
                              : 'Select Study Type'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search Study types..." />
                          <CommandEmpty>No Study Options found.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {StudyOptions.map((ST) => (
                                <CommandItem
                                  value={ST.label}
                                  key={ST.value}
                                  onSelect={() => {
                                    setValue(`education.educationArr.${index}.studyType`, ST.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      ST.value === field.value ? 'opacity-100' : 'opacity-0'
                                    )}
                                  />
                                  {ST.label}
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
              <FormMessage className="text-red-500">
                {errors?.education?.educationArr?.[index]?.studyType?.message}
              </FormMessage>{' '}
            </FormItem>
            <div className="my-2">
              <FormLabel>Start Date</FormLabel>
              <Controller
                name={`education.educationArr.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            date &&
                              setValue(`education.educationArr.${index}.startDate`, new Date(date));
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>
                      {errors.education?.educationArr?.[index]?.startDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="my-2">
              <FormLabel>End Date</FormLabel>
              <Controller
                name={`education.educationArr.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value || undefined}
                          onSelect={(date) => {
                            date &&
                              setValue(`education.educationArr.${index}.endDate`, new Date(date));
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>
                      {errors.education?.educationArr?.[index]?.endDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="m-2">
              <FormLabel>Score</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.score`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="9" type="text" value={field.value || ''} />
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors.education?.educationArr?.[index]?.score?.message}
              </FormMessage>
            </FormItem>
          </div>
          <Button type="button" onClick={() => handleRemoveEducation(index)} className="mt-2">
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddEducation} className="mt-2">
        Add Education
      </Button>
      <div className="text-2xl font-bold my-4">Certificates</div>
      {certificateFields.map((item, index) => (
        <div key={item.id}>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2">
              <FormLabel>Certificate Name</FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Comptia a+" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <div className="my-2">
              <FormLabel>Issuance Date</FormLabel>
              <Controller
                name={`education.certificates.${index}.date`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            date &&
                              setValue(`education.certificates.${index}.date`, new Date(date));
                          }}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>
                      {errors.education?.certificates?.[index]?.date?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="m-2">
              <FormLabel>Issuer</FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.issuer`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="CNCF" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.issuer?.message}</FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Issuer Website</FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="URL"
                      type="url"
                      value={field.value || undefined}
                    />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.url?.message}</FormMessage>
            </FormItem>
          </div>
          <Button type="button" onClick={() => handleRemoveCertificates(index)} className="mt-2">
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddCertificates} className="mt-2">
        Add Certificate
      </Button>
    </div>
  );
};

export default Step3Form;
