import React from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from 'zod';
import {UserSchema} from '@/app/zod/user-zod';
import { parseISO, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from "@/lib/utils";
import { Textarea } from '../ui/textarea';

type FormData = z.infer<typeof UserSchema>;

const Step2Form = () => {
  const { control, formState: { errors }, setValue } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work",
  });

  const handleAddField = () => {
    append({ name: "", position: "", url: "", startDate: new Date(), endDate: new Date(), summary: "", highlights: [] });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };

  // const handleSelectDate = (date: Date | null, field: any) => {
  //   setValue(field., date); // Store Date object directly in form state
  // };

  return (
    <div className='flex flex-col w-full'>
      <div className='text-2xl font-bold mb-4'>Work Experience</div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className='m-2'>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='Company Name' />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.position`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='Position' />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.position?.message}</FormMessage>
            </FormItem>
            <FormItem className='m-2'>
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder='URL' />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.url?.message}</FormMessage>
            </FormItem>
            <div className='my-2'>
              <FormLabel>Start Date</FormLabel>
              <Controller
                name={`work.${index}.startDate`}
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
                          onSelect={(date) => {date && setValue(`work.${index}.startDate`, new Date(date))}}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{errors.work?.[index]?.startDate?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className='my-2'>
              <FormLabel>End Date</FormLabel>
              <Controller
                name={`work.${index}.endDate`}
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
                    onSelect={(date) => {date && setValue(`work.${index}.endDate`, new Date(date))}}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{errors.work?.[index]?.endDate?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormItem className='m-2'>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.summary`}
                  control={control}
                  render={({ field }) => (
                    <Textarea {...field} placeholder="I centered a div as frontend developer" />
                  )}
                />
              </FormControl>
              <FormMessage className='text-red-500'>{errors.work?.[index]?.summary?.message}</FormMessage>
            </FormItem>
          </div>
          <Button type="button" onClick={() => handleRemoveField(index)} className="mt-2">Remove</Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddField} className="mt-2">Add Work Experience</Button>
    </div>
  );
};

export default Step2Form;