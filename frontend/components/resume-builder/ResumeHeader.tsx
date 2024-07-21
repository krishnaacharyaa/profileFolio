'use client';
import { ChevronDown, EditIcon, Share2 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface HeaderProps {
  currentResume: any
}
export default function ResumeHeader({ currentResume }: HeaderProps) {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        <h1 className='font-semibold text-base'>{currentResume?.name || "Resume name"}</h1>
        <EditIcon size={20} cursor={'pointer'} />
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
