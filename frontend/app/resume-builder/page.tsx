'use client'
import Sidebar from '@/components/common/Sidebar';
import ResumeHeader from '@/components/resume-builder/ResumeHeader';
import ResumeView from '@/components/resume-builder/ResumeView';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToggleState } from '../store';
import { AlignJustify, CircleX } from 'lucide-react';

export default function Page() {
  const[toggle, setToggle] = useRecoilState(ToggleState);
  return (
    <div className="h-full px-12">
      <ResumeHeader />
      <hr />
      {toggle ? (
        <div className="mt-7 flex justify-between h-full">
          <Sidebar />
          <ResumeView />
        </div>
      ) : (
        <div className=''>
            <AlignJustify className=' cursor-pointer ' onClick={()=>{setToggle(!toggle)}}/>
            <ResumeView />
        </div>
      )}
    </div>
  );
}
