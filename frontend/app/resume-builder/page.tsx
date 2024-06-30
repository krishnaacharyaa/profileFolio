'use client'
import Sidebar from '@/components/common/Sidebar';
import ResumeHeader from '@/components/resume-builder/ResumeHeader';
import ResumeView from '@/components/resume-builder/ResumeView';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToggleState } from '../store';
import { AlignJustify, CircleX } from 'lucide-react';
import { useForm, FormProvider, useFormContext, FieldValues } from 'react-hook-form';

export default function Page() {
  const [toggle, setToggle] = useRecoilState(ToggleState);
  const methods = useForm();

  const onSubmit = async (data: FieldValues) => console.log(data, 'userdetails');

  return (
    <div className="h-full px-12">
      <ResumeHeader />
      <hr />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
          {toggle ? (
            <div className="mt-7 flex justify-between h-full">
              <Sidebar />
              <ResumeView />
            </div>
          ) : (
            <div>
              <AlignJustify
                className="cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
              <ResumeView />
            </div>
          )}
          <button type="submit" className='border-2 border-black rounded-md p-4'>Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}
