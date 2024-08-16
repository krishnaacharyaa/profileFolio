import { UserSchema } from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import z from 'zod';
import TWButton from '../ui/tailwbutton';

type FormData = z.infer<typeof UserSchema>;

const CertificateField = () => {
  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext<FormData>();
  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control,
    name: 'education.certificates',
  });

  const handleAddCertificates = () => {
    appendCertificate({ name: '', date: new Date().toISOString(), issuer: '', url: '' });
    clearErrors('education.certificates');
  };

  const handleRemoveCertificates = (index: number) => {
    removeCertificate(index);
  };
  return (
    <div className="flex flex-col w-full">
      {certificateFields.map((item, index) => (
        <div key={item.id} className="my-4">
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2">
              <FormLabel>Certificate Name <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Comptia a+" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <div className="flex flex-col justify-start col-span-1 my-4 m-2 gap-2">
              <FormLabel>Issuance Date <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <Controller
                name={`education.certificates.${index}.date`}
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
                                  `education.certificates.${index}.date`,
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
                      {errors.education?.certificates?.[index]?.date?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <FormItem className="m-2">
              <FormLabel>Issuer <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.issuer`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="CNCF" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.issuer?.message}</FormMessage>
            </FormItem>
            <FormItem className="m-2">
              <FormLabel>Certificate link</FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.url`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="URL"
                      type="url"
                      value={field.value || undefined}
                    />
                  )}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.url?.message}</FormMessage>
            </FormItem>
          </div>
          <Button
            type="button"
            onClick={() => handleRemoveCertificates(index)}
            className="mt-2"
          >
            <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
          </Button>
        </div>
      ))}
      <TWButton onClick={handleAddCertificates}>
          <span className="text-4xl">+</span>
        </TWButton>
    </div>
  );
};

export default CertificateField;
