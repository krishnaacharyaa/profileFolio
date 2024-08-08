import React, { useState } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { UserSchema } from '@/app/zod/user-zod';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

type FormData = z.infer<typeof UserSchema>;

const WorkExp = () => {
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    clearErrors,
  } = useFormContext<FormData>();
  const [noEnd, setNoEnd] = useState(true);
  const [highlight, setHighlight] = useState<string[]>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'work',
  });

  const handleAddField = () => {
    append({
      name: '',
      position: '',
      url: '',
      startDate: new Date().toISOString(),
      summary: '',
      highlights: [],
    });
  };

  const handleRemoveField = (index: number) => {
    remove(index);
  };
  const handleAddHighlight = (index: number) => {
    if(highlight[index] && highlight[index].length != 0){
      trigger(`work.${index}.highlights`);
      const currentHighlights = getValues(`work.${index}.highlights`) || [];
      setValue(`work.${index}.highlights`, [...currentHighlights, highlight[index]]);
      let updatedHighlights = [...highlight];
      updatedHighlights[index] = ''; // Clear input after adding
      setHighlight(updatedHighlights);
      }
  };
  return (
    <div className="flex flex-col w-full">
      <div className="text-2xl font-bold mb-4">Work Experience</div>
      {fields.map((item, index) => (
        <div key={item.id} className='mb-4'>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2 col-span-1">
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Company Name" />}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <FormItem className="m-2 col-span-1">
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.position`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Position" />}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.position?.message}</FormMessage>
            </FormItem>
            <FormItem className="m-2 col-span-1">
              <FormLabel>Company Website</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.url`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="URL" />}
                />
              </FormControl>
              <FormMessage>{errors?.work?.[index]?.url?.message}</FormMessage>
            </FormItem>
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>Start Date</FormLabel>
              <Controller
                name={`work.${index}.startDate`}
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
                                setValue(`work.${index}.startDate`, new Date(date).toISOString());
                              trigger(`work.${index}.endDate`);
                            }}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                    <FormMessage>{errors.work?.[index]?.startDate?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>End Date</FormLabel>
              <Controller
                name={`work.${index}.endDate`}
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
                              date && setValue(`work.${index}.endDate`, new Date(date).toISOString());
                              setNoEnd(false);
                            }}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                            fromYear={1960}
                            toYear={2030}
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                    {!noEnd && <FormMessage>{errors.work?.[index]?.endDate?.message}</FormMessage>}
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
                      `work.${index}.endDate`,
                      noEnd
                        ? new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
                        : undefined
                    );
                    setNoEnd(!noEnd);
                    clearErrors(`work.${index}.endDate`);
                  }}
                />
                <label
                  htmlFor="noEnd"
                  className="text-sm mx-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Working till date
                </label>
              </div>
            </div>
            <FormItem className="m-2 col-span-1">
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
              <FormMessage className="text-red-500">
                {errors.work?.[index]?.summary?.message}
              </FormMessage>
            </FormItem>
            <FormItem className="m-2 col-span-1">
              <FormLabel>Highlights</FormLabel>
              <FormControl>
                <Controller
                  name={`work.${index}.highlights`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col  justify-center">
                      <div className="flex justify-center items-center">
                        <Textarea
                          value={highlight[index]}
                          onChange={(e) => {
                            let updatedHighlights = [...highlight];
                            updatedHighlights[index] = e.target.value;
                            console.log(updatedHighlights);
                            console.log(e.target.value);
                            console.log(index);
                            setHighlight(updatedHighlights);
                          }}
                          placeholder="Add a highlight"
                        />
                        <Button
                          type="button"
                          className="mx-2"
                          onClick={() => handleAddHighlight(index)}
                        >
                          <Image src="./add.svg" alt="svg" width={20} height={20}></Image>
                        </Button>
                      </div>
                      <div className="flex flex-wrap mt-2 justify-start items-start w-full">
                        {getValues(`work.${index}.highlights`)?.map((hl, hlIndex) => (
                          <Badge key={hlIndex}>
                            {hl}
                            <button
                              className="m-2"
                              type="button"
                              onClick={() => {
                                const currentHighlights =
                                  getValues(`work.${index}.highlights`) || [];
                                currentHighlights.splice(hlIndex, 1);
                                setValue(`work.${index}.highlights`, currentHighlights);
                              }}
                            >
                              X
                            </button>
                          </Badge>
                        ))}
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
          <Button type="button" onClick={() => handleRemoveField(index)} className="mt-2">
            <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddField} className="mt-2 max-w-20">
      <Image src="./add.svg" alt="svg" width={20} height={20}></Image>
      </Button>
    </div>
  );
};

export default WorkExp;
