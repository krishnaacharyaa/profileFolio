import {UserSchema} from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from "zod";
import { Textarea } from '@/components/ui/textarea';
import { getSkillsData } from '@/app/actions/user-actions';
import { SkillRef } from '@/types/skillRef';
import { MultiSelect } from '../ui/multi-select';


type FormData = z.infer<typeof UserSchema>;
type Option = {
    value: string;
    label: string;
  };

const ProjectsField = () => {
    const { control, formState: { errors } , setValue, getValues, clearErrors, trigger} = useFormContext<FormData>();
    const [options, setOptions] = useState<Option[]>([]);
    const [highlight, setHighlight] = useState<string[]>([]);
    const {fields: projectFields , append: appendProject, remove: removeProject} = useFieldArray({
        control,
        name:"projects.projectsArr"
    })
    const handleAddProject = () => {
        appendProject({name: "", startDate: new Date(), endDate: new Date(), description: "", githubUrl: "", deployedUrl: "", techStack: [], highlights: []});
        clearErrors('projects.projectsArr')
    };
      useEffect(() => {
        async function fetchSkills() {
          try {
            const skillsData = await getSkillsData();
            const formattedOptions = skillsData.map(skill => ({
              value: skill.id,
              label: skill.name
            }));
    
            setOptions(formattedOptions);
          } catch (error) {
            console.error('Failed to fetch skills data', error);
          }
        }
    
        fetchSkills();
      }, []);


    const handleRemoveProject = (index: number) => {
        removeProject(index);
    };

    const handleAddHighlight = (index: number) => {
        trigger(`projects.projectsArr.${index}.highlights`)
        const currentHighlights = getValues(`projects.projectsArr.${index}.highlights`) || [];
        setValue(`projects.projectsArr.${index}.highlights`, [...currentHighlights, highlight[index]]);
        let updatedHighlights = [...highlight];
        updatedHighlights[index] = ""; // Clear input after adding
        setHighlight(updatedHighlights);
    };  
    return (
        <div className='flex flex-col w-full'>
            <div className='text-2xl font-bold mb-4'>Projects</div> 
            {projectFields.length == 0 ? <FormMessage>{errors.projects?.projectsArr?.message ? <div className='text-sm text-red-500'>Projects Field is Required</div> : ""}</FormMessage>: ""}
                {projectFields.map((item, index) => (
                <div key={item.id}>
                <div className="grid grid-cols-3 w-full mb-4">
                    <FormItem className='m-2'>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.name`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='Personal Portfolio' />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.name?.message}</FormMessage>
                    </FormItem>
                    <div className='my-2'>
                    <FormLabel>Start Date</FormLabel>
                    <Controller
                        name={`projects.projectsArr.${index}.startDate`}
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
                                onSelect={(date) => {
                                    date && setValue(`projects.projectsArr.${index}.startDate`, new Date(date))
                                    trigger(`projects.projectsArr.${index}.endDate`)
                                }}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                />
                            </PopoverContent>
                            </Popover>
                            <FormMessage>{errors.projects?.projectsArr?.[index]?.startDate?.message}</FormMessage>
                        </FormItem>
                        )}
                    />
                    </div>
                    <div className='my-2'>
                    <FormLabel>End Date</FormLabel>
                    <Controller
                        name={`projects.projectsArr.${index}.endDate`}
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
                            onSelect={(date) => {date && setValue(`projects.projectsArr.${index}.endDate`, new Date(date))}}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                            </PopoverContent>
                            </Popover>
                            <FormMessage>{errors.projects?.projectsArr?.[index]?.endDate?.message}</FormMessage>
                        </FormItem>
                        )}
                    />
                    </div>
                    <FormItem className='m-2'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.description`}
                        control={control}
                        render={({ field }) => (
                            <Textarea {...field} placeholder='Developed a personal portfolio website to showcase my projects and skills.' />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.description?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Github link</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.githubUrl`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='URL' type="url" value={field.value || ''} />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.githubUrl?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Deployment link</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.deployedUrl`}
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder='URL' type="url" value={field.value || ''} />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.deployedUrl?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Tech Stack</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.techStack`}
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={options}
                                onValueChange={(value) => {
                                    setValue(`projects.projectsArr.${index}.techStack`, value)
                                }}
                                defaultValue={[]}
                                placeholder="Select stack"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                onChange={() => {}}
                            />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.techStack?.message}</FormMessage>
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Highlights</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.projectsArr.${index}.highlights`}
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col  justify-center'>
                            <div className='flex justify-center items-center'>
                                <Textarea
                                value={highlight[index]}
                                onChange={(e) => {
                                    let updatedHighlights = [...highlight];
                                    updatedHighlights[index] = e.target.value;
                                    console.log(updatedHighlights)
                                    console.log(e.target.value)
                                    console.log(index)
                                    setHighlight(updatedHighlights);
                                }}
                                placeholder="Add a highlight"
                                />
                                <Button type="button" onClick={() => handleAddHighlight(index)}>Add</Button>
                            </div>
                            <div className='flex flex-col justify-start items-center w-full'>
                            {getValues(`projects.projectsArr.${index}.highlights`)?.map((hl, hlIndex) => (
                                <div key={hlIndex} className="flex justify-center items-center bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {hl}
                                <button className='m-2' onClick={() => {
                                    const currentHighlights = getValues(`projects.projectsArr.${index}.highlights`) || [];
                                    currentHighlights.splice(hlIndex, 1);
                                    setValue(`projects.projectsArr.${index}.highlights`, currentHighlights);
                                }}>X</button>
                                </div>
                            ))}
                            </div>
                            </div>
                        )}
                        />
                    </FormControl>
                  <FormMessage className='text-red-500'>{errors?.work?.[index]?.highlights?.message}</FormMessage>
                </FormItem>
                </div>
                <Button type="button" onClick={() => handleRemoveProject(index)} className="mt-2">Remove</Button>
                </div>
            ))}
        <Button type="button" onClick={handleAddProject} className="mt-2">Add Project</Button>
        </div>
    )
    }

export default ProjectsField