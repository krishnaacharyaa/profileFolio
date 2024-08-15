import { UserSchema } from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command } from 'cmdk';
import { CalendarIcon, Check, ChevronsUpDown, Divide } from 'lucide-react';
import React, { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import TWButton from '../ui/tailwbutton';

type FormData = z.infer<typeof UserSchema>;

type StudyType = 'Remote' | 'In-premise';

const EducationField = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    trigger,
  } = useFormContext<FormData>();
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education.educationArr',
  });
  const [noEnd, setNoEnd] = useState(true);
  const [course, setCourse] = useState<string[]>([]);
  const StudyOptions: { value: StudyType; label: string }[] = [
    { value: 'Remote', label: 'Remote' },
    { value: 'In-premise', label: 'In-premise' },
  ];

  const handleAddEducation = () => {
    appendEducation({
      institution: '',
      url: '',
      area: '',
      studyType: 'In-premise',
      startDate: new Date().toISOString(),
      score: '',
      courses: [],
    });
    clearErrors('education.educationArr');
  };

  const handleRemoveEducation = (index: number) => {
    removeEducation(index);
  };

  const handleAddCourse = (index: number) => {
    if(course[index] && course[index].length != 0){
      const currentCourses = getValues(`education.educationArr.${index}.courses`) || [];
      setValue(`education.educationArr.${index}.courses`, [...currentCourses, course[index]]);
      let updatedCourses = [...course];
      updatedCourses[index] = ''; // Clear input after adding
      setCourse(updatedCourses);
      trigger(`education.educationArr.${index}.courses`);
    }
  };
  return (
    <div className="flex flex-col w-full">
      {educationFields.map((item, index) => (
        <div key={item.id} className='my-4'>
          <div className="grid grid-cols-3 w-full">
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
            <FormItem className="flex flex-col justify-start col-span-1 m-2 my-4 gap-2">
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
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>Start Date</FormLabel>
              <Controller
                name={`education.educationArr.${index}.startDate`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => {
                              date &&
                                setValue(
                                  `education.educationArr.${index}.startDate`,
                                  new Date(date).toISOString()
                                );
                              trigger(`education.educationArr.${index}.endDate`);
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
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>End Date</FormLabel>
              <Controller
                name={`education.educationArr.${index}.endDate`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn("w-[240px] justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align="start" className=" w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                            onSelect={(date) => {
                              date &&
                                setValue(
                                  `education.educationArr.${index}.endDate`,
                                  new Date(date).toISOString()
                                );
                              setNoEnd(false);
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
              <div className="flex mt-2">
                <Checkbox
                  id="noEnd"
                  checked={noEnd}
                  onCheckedChange={() => {
                    console.log(noEnd);
                    setValue(
                      `education.educationArr.${index}.endDate`,
                      noEnd
                        ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                        : undefined
                    );
                    setNoEnd(!noEnd);
                    clearErrors(`education.educationArr.${index}.endDate`);
                  }}
                />
                <label
                  htmlFor="noEnd"
                  className="text-sm mx-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Enrolled till date
                </label>
              </div>
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
            <FormItem className="m-2">
              <FormLabel>Courses</FormLabel>
              <FormControl>
                <Controller
                  name={`education.educationArr.${index}.courses`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col  justify-center">
                      <div className="flex justify-center items-center">
                        <Input
                          value={course[index]}
                          onChange={(e) => {
                            let updatedCourses = [...course];
                            updatedCourses[index] = e.target.value;
                            setCourse(updatedCourses);
                          }}
                          placeholder="CS101 - Introduction to Computer Science"
                        />
                        <Button type="button" className='mx-2 text-lg' onClick={() => handleAddCourse(index)}>
                          +
                        </Button>
                      </div>
                      <div className="flex justify-start items-center flex-wrap mt-2">
                        {getValues(`education.educationArr.${index}.courses`)?.map(
                          (Course, CIndex) => (
                            <Badge key={CIndex} className="m-[1px]">
                              {Course}
                              <button
                                className="m-2"
                                type="button"
                                onClick={() => {
                                  const currentCourses =
                                    getValues(`education.educationArr.${index}.courses`) || [];
                                  currentCourses.splice(CIndex, 1);
                                  trigger(`education.educationArr.${index}.courses`);
                                  setValue(
                                    `education.educationArr.${index}.courses`,
                                    currentCourses
                                  );
                                }}
                              >
                                X
                              </button>
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                />
              </FormControl>
              <FormMessage className="text-red-500">
                {errors?.education?.educationArr?.[index]?.courses?.message}
              </FormMessage>
            </FormItem>
          </div>

          <Button type="button" onClick={() => handleRemoveEducation(index)} className="mt-2">
            <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
          </Button>
        </div>
      ))}
      <TWButton onClick={handleAddEducation}>
          <span className="text-4xl">+</span>
        </TWButton>
    </div>
  );
};

export default EducationField;
