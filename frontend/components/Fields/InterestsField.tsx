import { UserSchema } from '@/app/zod/user-zod';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import z from 'zod';
import { Badge } from '../ui/badge';
import TWButton from '../ui/tailwbutton';

type FormData = z.infer<typeof UserSchema>;

const InterestsField = () => {
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
    getValues,
    clearErrors,
  } = useFormContext<FormData>();
  const [keyword, setKeyword] = useState<string[]>([]);
  const {
    fields: interestFields,
    append: appendInterest,
    remove: removeInterest,
  } = useFieldArray({
    control,
    name: 'basics.interests',
  });

  const handleAddInterest = () => {
    appendInterest({ name: '', keywords: [] });
    clearErrors('basics.interests');
  };

  const handleRemoveInterest = (index: number) => {
    removeInterest(index);
  };

  const handleAddKeyword = (index: number) => {
    if(keyword[index] && keyword[index].length != 0){
      const currentKeywords = getValues(`basics.interests.${index}.keywords`) || [];
      setValue(`basics.interests.${index}.keywords`, [...currentKeywords, keyword[index]]);
      let updatedKeywords = [...keyword];
      trigger(`basics.interests.${index}.keywords`);
      updatedKeywords[index] = ''; // Clear input after adding
      setKeyword(updatedKeywords);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-center items-start w-full flex-grow">
        {interestFields.map((item, index) => (
          <div key={item.id} className="flex justify-center items-start my-2 w-3/4">
            <div className="flex-1 grid grid-cols-2 gap-2 mb-4">
              <FormItem className="m-2">
                <FormLabel>Interest <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
                <FormControl>
                  <Controller
                    name={`basics.interests.${index}.name`}
                    control={control}
                    render={({ field }) => <Input {...field} placeholder="Cybersecurity" />}
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors?.basics?.interests?.[index]?.name?.message}
                </FormMessage>
              </FormItem>
              <FormItem className="m-2">
                <FormLabel>Keywords <span className='text-red-500 mx-[1px]'>*</span></FormLabel>
                <FormControl>
                  <Controller
                    name={`basics.interests.${index}.keywords`}
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col justify-center">
                        <div className="flex justify-center items-center">
                          <Input
                            value={keyword[index] || ''}
                            onChange={(e) => {
                              let updatedKeywords = [...keyword];
                              updatedKeywords[index] = e.target.value;
                              setKeyword(updatedKeywords);
                            }}
                            placeholder="Add keywords (max 5)"
                          />
                          <Button className='mx-2 text-lg' type="button" onClick={() => handleAddKeyword(index)} disabled={getValues(`basics.interests.${index}.keywords`).length > 4}>
                            +
                          </Button>
                        </div>
                        <div className="flex justify-start items-center flex-wrap mt-2">
                          {getValues(`basics.interests.${index}.keywords`)?.map((kw, kwIndex) => (
                            <Badge key={kwIndex} className="m-[1px]">
                              {kw}
                              <button
                                className="m-2"
                                type="button"
                                onClick={() => {
                                  const currentKeywords =
                                    getValues(`basics.interests.${index}.keywords`) || [];
                                  currentKeywords.splice(kwIndex, 1);
                                  setValue(`basics.interests.${index}.keywords`, currentKeywords);
                                  trigger(`basics.interests.${index}.keywords`)
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
                  {errors?.basics?.interests?.[index]?.keywords?.message}
                </FormMessage>
              </FormItem>
            </div>
            <Button type="button" onClick={() => handleRemoveInterest(index)} className="static mt-[29px]">
              <Image src="./delete.svg" alt="svg" width={20} height={20}></Image>
            </Button>
          </div>
        ))}
        <TWButton onClick={handleAddInterest}>
          <span className="text-4xl">+</span>
        </TWButton>
      </div>
    </div>
  );
};

export default InterestsField;
