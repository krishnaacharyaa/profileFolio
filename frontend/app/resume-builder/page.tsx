'use client'
import Sidebar from '@/components/common/Sidebar';
import ResumeHeader from '@/components/resume-builder/ResumeHeader';
import ResumeView from '@/components/resume-builder/ResumeView';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInputSchema } from '../zod/user-inputs';
import defaultUserInputs from '../store/default-user-inputs';


export default function Page() {
  const methods = useForm({
    resolver: zodResolver(UserInputSchema),
    defaultValues: defaultUserInputs,
  });

  const onSubmit = async (data: FieldValues) => console.log(data, 'userdetails');

  return (
    <div className="h-full px-12">
      <ResumeHeader />
      <hr />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
            <div className="mt-7 flex justify-between h-full">
              <Sidebar />
              <ResumeView />
            </div>
          <button type="submit" className='border-2 border-black rounded-md p-4'>Submit</button>
        </form>
      </FormProvider>
    </div>
  );
}
