import React, { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type FormData = z.infer<typeof UserSchema>;

const WorkExp = () => {
    const { control, formState: { errors }, setValue, getValues } = useFormContext<FormData>();
    const [noEnd, setNoEnd] = useState(true);
    const [highlight, setHighlight] = useState<string[]>([]);
    const { fields, append, remove } = useFieldArray({
        control,
        name: "work",
    });

    const handleAddField = () => {
        append({ name: "", position: "", url: "", startDate: new Date(), summary: "", highlights: [] });
    };

    const handleRemoveField = (index: number) => {
        remove(index);
    };
    const handleAddHighlight = (index: number) => {
        const currentHighlights = getValues(`work.${index}.highlights`) || [];
        setValue(`work.${index}.highlights`, [...currentHighlights, highlight[index]]);
        let updatedHighlights = [...highlight];
        updatedHighlights[index] = ""; // Clear input after adding
        setHighlight(updatedHighlights);
    };    
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
                                onSelect={(date) => {
                                    date && setValue(`work.${index}.startDate`, new Date(date));
                                    setNoEnd(false);
                                }}
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
                            {!noEnd && <FormMessage>{errors.work?.[index]?.endDate?.message}</FormMessage>}
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
                    <FormItem className='m-2'>
                    <FormLabel>Highlights</FormLabel>
                    <FormControl>
                        <Controller
                        name={`work.${index}.highlights`}
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
                            {getValues(`work.${index}.highlights`)?.map((hl, hlIndex) => (
                                <div key={hlIndex} className="flex justify-center items-center bg-gray-200 rounded-full px-3 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                {hl}
                                <button className='m-2' onClick={() => {
                                    const currentHighlights = getValues(`work.${index}.highlights`) || [];
                                    currentHighlights.splice(hlIndex, 1);
                                    setValue(`work.${index}.highlights`, currentHighlights);
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
                <div className="flex items-center space-x-2">
                    <Checkbox id="noEnd" checked={noEnd} onClick={() => {
                        setValue(`work.${index}.endDate`, noEnd ? new Date() : undefined);
                        setNoEnd(!noEnd);
                    }}/>
                    <label
                        htmlFor="noEnd"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Working till present
                    </label>
                </div>
                <Button type="button" onClick={() => handleRemoveField(index)} className="mt-2">Remove</Button>
                </div>
            ))}
        <Button type="button" onClick={handleAddField} className="mt-2">Add Work Experience</Button>
    </div>
  )
}

export default WorkExp