import { UserSchema } from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { CalendarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Badge } from '../ui/badge';
import z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { getSkillsData } from '@/app/actions/user-actions';
import { SkillRef } from '@/types/skillRef';
import { MultiSelect } from '../ui/multi-select';
import TWButton from '../ui/tailwbutton';

type FormData = z.infer<typeof UserSchema>;
type Option = {
  value: string;
  label: string;
};

const ProjectsField = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    clearErrors,
    trigger,
  } = useFormContext<FormData>();
  const [options, setOptions] = useState<Option[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: 'projects.projectsArr',
  });
  const handleAddProject = () => {
    appendProject({
      name: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      description: '',
      githubUrl: '',
      deployedUrl: '',
      techStack: [],
      highlights: [],
    });
    clearErrors('projects.projectsArr');
  };
  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsData = await getSkillsData();
        const formattedOptions = skillsData.map((skill) => ({
          value: skill.id,
          label: skill.name,
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
    if(highlight[index] && highlight[index].length != 0){
      trigger(`projects.projectsArr.${index}.highlights`);
      const currentHighlights = getValues(`projects.projectsArr.${index}.highlights`) || [];
      setValue(`projects.projectsArr.${index}.highlights`, [...currentHighlights, highlight[index]]);
      let updatedHighlights = [...highlight];
      updatedHighlights[index] = ''; // Clear input after adding
      setHighlight(updatedHighlights);
    }
  };
  return (
    <div className="flex flex-col w-full">
      {projectFields.map((item, index) => (
        <div key={item.id} className='my-4'>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2">
              <FormLabel>Project Name <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Personal Portfolio" />}
                />
              </FormControl>
              <FormMessage>{errors?.projects?.projectsArr?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>Start Date <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <Controller
                name={`projects.projectsArr.${index}.startDate`}
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
                            onSelect={(date) => {
                              date &&
                                setValue(
                                  `projects.projectsArr.${index}.startDate`,
                                  new Date(date).toISOString()
                                );
                              trigger(`projects.projectsArr.${index}.endDate`);
                            }}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                    <FormMessage>
                      {errors.projects?.projectsArr?.[index]?.startDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>End Date <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <Controller
                name={`projects.projectsArr.${index}.endDate`}
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
                            onSelect={(date) => {
                              date &&
                                setValue(
                                  `projects.projectsArr.${index}.endDate`,
                                  new Date(date).toISOString()
                                );
                            }}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                    <FormMessage>
                      {errors.projects?.projectsArr?.[index]?.endDate?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="m-2">
              <FormLabel>Description <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.description`}
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Developed a personal portfolio website to showcase my projects and skills."
                    />
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors?.projects?.projectsArr?.[index]?.description?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Github link <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.githubUrl`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="URL" type="url" value={field.value || ''} />
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors?.projects?.projectsArr?.[index]?.githubUrl?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Deployment link <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.deployedUrl`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="URL" type="url" value={field.value || ''} />
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors?.projects?.projectsArr?.[index]?.deployedUrl?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Tech Stack <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.techStack`}
                  control={control}
                  render={({ field }) => (
                    <MultiSelect
                      options={options}
                      onValueChange={(value) => {
                        setValue(`projects.projectsArr.${index}.techStack`, value);
                        trigger(`projects.projectsArr.${index}.techStack`);
                      }}
                      defaultValue={getValues(`projects.projectsArr.${index}.techStack`) || []}
                      placeholder="Select stack"
                      variant="inverted"
                      maxCount={3}
                      onChange={() => {}}
                    />
                  )}
                />
              </FormControl>
              <FormMessage>
                {errors?.projects?.projectsArr?.[index]?.techStack?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Highlights </FormLabel>
              <FormControl>
                <Controller
                  name={`projects.projectsArr.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col  justify-center">
                      <div className="flex justify-center items-center">
                        <Textarea
                          value={highlight[index]}
                          onChange={(e) => {
                            let updatedHighlights = [...highlight];
                            updatedHighlights[index] = e.target.value;
                            setHighlight(updatedHighlights);
                          }}
                          placeholder="Add a highlight"
                        />
                        <Button type="button" className='mx-2 text-lg' onClick={() => handleAddHighlight(index)}>
                          +
                        </Button>
                      </div>
                      <div className="flex justify-start items-center flex-wrap mt-2">
                        {getValues(`projects.projectsArr.${index}.highlights`)?.map(
                          (hl, hlIndex) => (
                            <Badge key={hlIndex} className="m-[1px]">
                              {hl}
                              <button
                                className="m-2"
                                type="button"
                                onClick={() => {
                                  const currentHighlights =
                                    getValues(`projects.projectsArr.${index}.highlights`) || [];
                                  currentHighlights.splice(hlIndex, 1);
                                  setValue(
                                    `projects.projectsArr.${index}.highlights`,
                                    currentHighlights
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
                {errors?.work?.[index]?.highlights?.message}
              </FormMessage>
            </FormItem>
          </div>
          <Button type="button" onClick={() => handleRemoveProject(index)} className="mt-2">
            <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
          </Button>
        </div>
      ))}
      <TWButton onClick={handleAddProject}>
          <span className="text-4xl">+</span>
        </TWButton>
    </div>
  );
};

export default ProjectsField;
