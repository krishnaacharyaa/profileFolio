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
        <div key={item.id}>
          <div className="grid grid-cols-3 w-full mb-4">
            <FormItem className="m-2">
              <FormLabel>Certificate Name</FormLabel>
              <FormControl>
                <Controller
                  name={`education.certificates.${index}.name`}
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="Comptia a+" />}
                />
              </FormControl>
              <FormMessage>{errors?.education?.certificates?.[index]?.name?.message}</FormMessage>
            </FormItem>
            <div className="my-2">
              <FormLabel>Issuance Date</FormLabel>
              <Controller
                name={`education.certificates.${index}.date`}
                control={control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
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
              <FormLabel>Issuer</FormLabel>
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
              <FormLabel>Issuer Website</FormLabel>
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
            className="mt-2 mx-4 "
          >
            <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
          </Button>
        </div>
      ))}
      <Button type="button" onClick={handleAddCertificates} className="mt-2 mx-4 max-w-20">
        <Image src="./add.svg" alt="svg" width={20} height={20}></Image>
      </Button>
    </div>
  );
};

export default CertificateField;
