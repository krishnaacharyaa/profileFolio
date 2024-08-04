'use client';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Language {
  language: string;
  fluency: string;
}

const Languages = () => {
  const { watch } = useFormContext();
  const languages: Language[] = watch('languages');

  return (
    languages?.length > 0 && (
      <div className="flex flex-col gap-1 px-8 py-6">
        <h1 className="text-2xl font-bold">Languages</h1>
        <div className="grid grid-cols-2 my-5 gap-4">
          {languages && languages.map((val) =>
            <div className='flex justify-between border-2 border-gray-200 py-4 px-4 rounded-md'>
              <span className="capitalize font-semibold text-base">{val.language}</span>
              <span className="capitalize font-semibold text-base">{val.fluency}</span>
            </div>)}
        </div>
      </div>
    )
  );
};

export default Languages;
