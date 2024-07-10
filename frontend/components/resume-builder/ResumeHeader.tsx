'use client';
import { ChevronDown, EditIcon, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { handelDownload } from '@/utils/download';

export default function ResumeHeader() {
  const [loader,setloader] = useState(false)
  const downloadResume = async (filename:string,id:string) => {
    try {
       setloader(true)
      await handelDownload(filename,id)
      setloader(false)
      
    } catch (error) {
      setloader(false)
      alert('error ocured try again')
      
    }
  }
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex gap-2 items-center">
        Resume name
        <EditIcon size={20} cursor={'pointer'} />
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
          Change Template
        </span>
        <Button variant={'outline'} className="py-0 px-3">
          <Share2 size={15} />
        </Button>
       {
        loader ? <p>Downloading...</p> :  <Button onClick={()=>downloadResume("Resume name","user-resume-download")} className="bg-green-500 text-white hover:bg-green-700">
        Download
        <ChevronDown />
      </Button>
       }
      </div>
    </div>
  );
}
