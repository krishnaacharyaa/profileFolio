'use client';
import Sidebar from '@/components/common/Sidebar';
import PortfolioView from '@/components/portfolio-builder/PortfolioView';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

const Page = () => {
  const methods = useForm();
  const onSubmit = async (data: FieldValues) => console.log(data, 'userDetails-Resume');
  return (
    <div className="h-full px-12">
    <hr />

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
          <div className="mt-7 flex justify-between h-full">
            <Sidebar />
            <PortfolioView />
          </div>
        <button type="submit" className='border-2 border-black rounded-md p-4'>Submit</button>
      </form>
    </FormProvider>
  </div>
  );
};

export default Page;
