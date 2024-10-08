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
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import z from 'zod';
import TWButton from '../ui/tailwbutton';

type FormData = z.infer<typeof UserSchema>;
type Fluency = 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';

const LanguagesField = () => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    clearErrors,
  } = useFormContext<FormData>();
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: 'basics.languages',
  });
  const fluencyOptions: { value: Fluency; label: string }[] = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Native', label: 'Native' },
  ];
  const handleAddLanguage = () => {
    appendLanguage({ language: '', fluency: 'Beginner' });
    clearErrors('basics.languages');
  };

  const handleRemoveLanguage = (index: number) => {
    removeLanguage(index);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-3/4">
        {languageFields &&
          languageFields.map((item, index) => (
            <div key={item.id} className="flex justify-center items-start my-2">
              <div className="flex-1 grid grid-cols-2 items-start gap-2">
                <FormItem className="m-2">
                  <FormLabel>Language <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
                  <FormControl>
                    <Controller
                      name={`basics.languages.${index}.language`}
                      control={control}
                      render={({ field }) => <Input {...field} placeholder="English" />}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500">
                    {errors?.basics?.languages?.[index]?.language?.message}
                  </FormMessage>
                </FormItem>
                <FormItem className="flex flex-col justify-center items-start mt-4">
                  <FormLabel>Fluency <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
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
                                  'w-[200px] justify-between',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value
                                  ? fluencyOptions.find((fluency) => fluency.value === field.value)
                                      ?.label
                                  : 'Select fluency'}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandList>
                                <CommandGroup>
                                  {fluencyOptions.map((fl) => (
                                    <CommandItem
                                      value={fl.label}
                                      key={fl.value}
                                      onSelect={() => {
                                        setValue(`basics.languages.${index}.fluency`, fl.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          fl.value === field.value ? 'opacity-100' : 'opacity-0'
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
                  <FormMessage className="text-red-500">
                    {errors?.basics?.languages?.[index]?.fluency?.message}
                  </FormMessage>{' '}
                </FormItem>
              </div>
              <Button type="button" onClick={() => handleRemoveLanguage(index)} className="mt-[27px]">
                <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
              </Button>
            </div>
          ))}
        <TWButton onClick={handleAddLanguage}>
          <span className="text-4xl">+</span>
        </TWButton>
      </div>
    </div>
  );
};

export default LanguagesField;
