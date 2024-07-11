import {UserSchema} from '@/app/zod/user-zod';
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from "zod";
import { cn } from '@/lib/utils';
import { format } from "date-fns";
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command } from 'cmdk';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { MultiSelect } from '../ui/multi-select';
import { getSkillsData } from '@/app/actions/user-actions';

type FormData = z.infer<typeof UserSchema>;
type Option = {
    value: string;
    label: string;
  };


type LevelType = 'Novice' | 'Proficient' | 'Expert';
const SkillsField = () => {
  const { control, formState: { errors } , setValue, getValues, clearErrors} = useFormContext<FormData>();
    const [keyword, setKeyword] = useState<string[]>([]);
    const [options, setOptions] = useState<Option[]>([]);
    const {fields: skillFields , append: appendSkill, remove: removeSkill} = useFieldArray({
        control,
        name:"projects.skills"
    })

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


    const handleAddSkill = () => {
        appendSkill({name: "", level: "Novice", keywords: []});
        clearErrors('projects.skills')
    };

    const handleRemoveSkill = (index: number) => {
        removeSkill(index);
    };

    const handleAddKeyword = (index: number) => {
      const currentKeywords = getValues(`projects.skills.${index}.keywords`) || [];
      const newKeyword = keyword[index];
      if (newKeyword) {
          setValue(`projects.skills.${index}.keywords`, [...currentKeywords, newKeyword]);
          // Clear the keyword input after adding
          let updatedKeywords = [...keyword];
          updatedKeywords[index] = ""; // Clear input after adding
          setKeyword(updatedKeywords);
      }
  };

    const SkillOptions: { value: LevelType, label: string }[] = [
        { value: "Novice", label: "Novice" },
        { value: "Proficient", label: "Proficient" },
        { value: "Expert", label: "Expert"}
    ];
  return (
    <div className='flex flex-col w-full'>
        <div className='text-2xl font-bold mb-4'>Skills</div> 
        {skillFields.length == 0 ? <FormMessage>{errors.projects?.skills?.message ? <div className='text-sm text-red-500'>Skills Field is Required</div> : ""}</FormMessage>: ""}
            {skillFields.map((item, index) => (
                <div key={item.id}>
                <div className="grid grid-cols-3 w-full mb-4 justify-center items-center">
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
                    <FormMessage className='text-red-500'>{errors?.projects?.skills?.[index]?.level?.message}</FormMessage>            
                    </FormItem>
                    <FormItem className='m-2'>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                        <Controller
                        name={`projects.skills.${index}.keywords`}
                        control={control}
                        render={({ field }) => (
                            <MultiSelect
                                options={options}
                                onValueChange={(value) => {
                                    console.log(value)
                                    setValue(`projects.skills.${index}.keywords`, value)
                                }}
                                defaultValue={[]}
                                placeholder="Select Keywords"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                            />
                        )}
                        />
                    </FormControl>
                    <FormMessage>{errors?.projects?.projectsArr?.[index]?.techStack?.message}</FormMessage>
                    </FormItem>
                </div>
                <Button type="button" onClick={() => handleRemoveSkill(index)} className="mt-2">Remove</Button>
            </div>
            ))}
        <Button type="button" onClick={handleAddSkill} className="mt-2">Add Skill</Button>
    </div>
  )
}

export default SkillsField