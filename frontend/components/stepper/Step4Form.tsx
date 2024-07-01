import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import {UserSchema} from '@/app/zod/user-zod';
import { z } from 'zod';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { Textarea } from '../ui/textarea';
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

type LevelType = 'Novice' | 'Proficient' | 'Expert';

const Step4Form = () => {
  const { control, formState: { errors } , setValue} = useFormContext<FormData>();
  const {fields: projectFields , append: appendProject, remove: removeProject} = useFieldArray({
    control,
    name:"projects.projectsArr"
  })

  const {fields: skillFields , append: appendSkill, remove: removeSkill} = useFieldArray({
    control,
    name:"projects.skills"
  })

  const handleAddProject = () => {
    appendProject({name: "",startDate: new Date(), endDate: new Date(), description: "", githubUrl: "", deployedUrl: ""});
  };

  const handleRemoveProject = (index: number) => {
    removeProject(index);
  };

  const handleAddSkill = () => {
    appendSkill({name: "", level: "Novice"});
  };

  const handleRemoveSkill = (index: number) => {
    removeSkill(index);
  };

  const SkillOptions: { value: LevelType, label: string }[] = [
    { value: "Novice", label: "Novice" },
    { value: "Proficient", label: "Proficient" },
    { value: "Expert", label: "Expert"}
  ];



  return (
    <div className='flex flex-col w-full'>
        <div className='text-2xl font-bold mb-4'>Projects</div> 
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
                          onSelect={(date) => {date && setValue(`projects.projectsArr.${index}.startDate`, new Date(date))}}
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
          </div>
          <Button type="button" onClick={() => handleRemoveProject(index)} className="mt-2">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddProject} className="mt-2">Add Project</Button>
      <div className='text-2xl font-bold mb-4'>Skills</div> 
      {skillFields.map((item, index) => (
        <div key={item.id}>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className='m-2'>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Controller
                  name={`projects.skills.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='Web Development' />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.projects?.skills?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <FormItem className='flex flex-col mx-2 justify-center'>
              <FormLabel>Skill Level</FormLabel>
              <FormControl>
              <Controller
                name={`projects.skills.${index}.level`}
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
                        ? SkillOptions.find(
                            (skillType) => skillType.value === field.value
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
                        {SkillOptions.map((level) => (
                        <CommandItem
                          value={level.label}
                          key={level.value}
                          onSelect={() => {
                            setValue(`projects.skills.${index}.level`, level.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              level.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {level.label}
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
            <FormMessage className='text-red-500'>{errors?.projects?.skills?.[index]?.level?.message}</FormMessage>            </FormItem>
          <Button type="button" onClick={() => handleRemoveSkill(index)} className="mt-2">Remove</Button>
        </div>
      </div>
      ))}
      <Button type="button" onClick={handleAddSkill} className="mt-2">Add Skill</Button>
    </div>  
  )}

export default Step4Form;