import {UserSchema} from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command } from 'cmdk';
import { CalendarIcon, Check, ChevronsUpDown, Divide } from 'lucide-react';
import React, { useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from "zod";
import {format } from "date-fns";
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

type FormData = z.infer<typeof UserSchema>;

type StudyType = 'Remote' | 'In-premise';

const EducationField = () => {
    const { control, formState: { errors }, setValue, getValues, clearErrors } = useFormContext<FormData>();
    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education.educationArr",
    });
    const [course, setCourse] = useState<string[]>([]);
    const StudyOptions: { value: StudyType, label: string }[] = [
        { value: "Remote", label: "Remote" },
        { value: "In-premise", label: "In-premise" }
    ];
    
    const handleAddEducation = () => {
        appendEducation({institution: "", url: "", area: "", studyType: "In-premise", startDate: new Date(), endDate: new Date(), score: "", courses: []});
        clearErrors('education.educationArr')
    };
    
    const handleRemoveEducation = (index: number) => {
        removeEducation(index);
    };

    const handleAddCourse = (index: number) => {
        const currentCourses = getValues(`education.educationArr.${index}.courses`) || [];
        setValue(`education.educationArr.${index}.courses`, [...currentCourses, course[index]]);
        let updatedCourses = [...course];
        updatedCourses[index] = ""; // Clear input after adding
        setCourse(updatedCourses);
      };
  return (
    <div className='flex flex-col w-full'>
        <div className='text-2xl font-bold mb-4'>Education</div>
            {educationFields.length == 0 ? <FormMessage>{errors.education?.educationArr?.message ? <div className='text-sm text-red-500'>Education Field is Required</div> : ""}</FormMessage>: ""}
            {educationFields.map((item, index) => (
                <div key={item.id}>
                <div className="grid grid-cols-3 w-full mb-4">
                    <FormItem className='m-2'>
                    <FormLabel>Instituion name</FormLabel>
                    <FormControl>
                        <Controller
                        name={`education.educationArr.${index}.institution`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='Institution Name' />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.education?.educationArr?.[index]?.institution?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Institution Website</FormLabel>
                    <FormControl>
                        <Controller
                        name={`education.educationArr.${index}.url`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='URL' type="url" value={field.value || ''} />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.education?.educationArr?.[index]?.url?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Area of study</FormLabel>
                    <FormControl>
                        <Controller
                        name={`education.educationArr.${index}.area`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='Computer Science' />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.education?.educationArr?.[index]?.area?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='flex flex-col mx-2 justify-center'>
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
                                    "w-[200px] justify-between",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value
                                ? StudyOptions.find(
                                    (studyType) => studyType.value === field.value
                                )?.label
                                : "Select Study Type"}
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
                                    setValue(`education.educationArr.${index}.studyType`, ST.value)
                                }}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    ST.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
                    <FormMessage className='text-red-500'>{errors?.education?.educationArr?.[index]?.studyType?.message}</FormMessage>            </FormItem>
                    <div className='my-2'>
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
                                    variant={"outline"}
                                    className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                    format(new Date(field.value), "PPP")
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
                                onSelect={(date) => {date && setValue(`education.educationArr.${index}.startDate`, new Date(date))}}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage>{errors.education?.educationArr?.[index]?.startDate?.message}</FormMessage>
                        </FormItem>
                        )}
                    />
                    </div>
                    <div className='my-2'>
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
                                    variant={"outline"}
                                    className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                    format(new Date(field.value), "PPP")
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
                            onSelect={(date) => {date && setValue(`education.educationArr.${index}.endDate`, new Date(date))}}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                            </PopoverContent>
                            </Popover>
                            <FormMessage>{errors.education?.educationArr?.[index]?.endDate?.message}</FormMessage>
                        </FormItem>
                        )}
                    />
                    </div>
                    <FormItem className='m-2'>
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                        <Controller
                        name={`education.educationArr.${index}.score`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='9' type="text" value={field.value || ''}/>
                        )}
                        />
                    </FormControl>
                    <FormMessage className='text-red-500'>{errors.education?.educationArr?.[index]?.score?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Courses</FormLabel>
                    <FormControl>
                        <Controller
                        name={`education.educationArr.${index}.courses`}
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col  justify-center'>
                            <div className='flex justify-center items-center'>
                                <Input
                                value={course[index]}
                                onChange={(e) => {
                                    let updatedCourses = [...course];
                                    updatedCourses[index] = e.target.value;
                                    console.log(updatedCourses)
                                    console.log(e.target.value)
                                    console.log(index)
                                    setCourse(updatedCourses);
                                }}
                                placeholder="CS101 - Introduction to Computer Science"
                                />
                                <Button type="button" onClick={() => handleAddCourse(index)}>Add</Button>
                            </div>
                            <div className='flex flex-col justify-start items-start w-full'>
                            {getValues(`education.educationArr.${index}.courses`)?.map((Course, CIndex) => (
                                <div key={CIndex} className="flex justify-center items-center bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {Course}
                                <button className='m-2' onClick={() => {
                                    const currentCourses = getValues(`education.educationArr.${index}.courses`) || [];
                                    currentCourses.splice(CIndex, 1);
                                    setValue(`education.educationArr.${index}.courses`, currentCourses);
                                }}>X</button>
                                </div>
                            ))}
                            </div>
                            </div>
                        )}
                        />
                    </FormControl>
                  <FormMessage className='text-red-500'>{errors?.education?.educationArr?.[index]?.courses?.message}</FormMessage>
                </FormItem>
                </div>
                <Button type="button" onClick={() => handleRemoveEducation(index)} className="mt-2">Remove</Button>
                </div>
            ))}
        <Button type="button" onClick={handleAddEducation} className="mt-2">Add Education</Button>
    </div>
  )
}

export default EducationField