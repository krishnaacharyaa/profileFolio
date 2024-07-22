'use client';
import { ChevronDown, EditIcon, Share2, Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HeaderProps {
  resumeName: string;
  setResumeName: (name: string) => void;
}

export default function ResumeHeader({ setResumeName, resumeName }: HeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(resumeName);

  useEffect(() => {
    setInputValue(resumeName);
  }, [resumeName]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckClick = () => {
    setResumeName(inputValue);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-40"
            />
            <Check size={20} cursor={'pointer'} className='text-green-500' onClick={handleCheckClick} />
          </>
        ) : (
          <>
            <h1 className='font-semibold text-base'>{resumeName}</h1>
            <EditIcon size={20} cursor={'pointer'} onClick={handleEditClick} />
          </>
        )}
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
          Change Template
        </span>
        <Button variant={'outline'} className="py-0 px-3">
          <Share2 size={15} />
        </Button>
        <Button className="bg-green-500 text-white hover:bg-green-700">
          Download
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}