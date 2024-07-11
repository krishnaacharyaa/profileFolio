"use client"
import React, { useEffect, useState } from 'react';
import StepIndicator from '@/components/stepper/StepIndicator';
import Step1Form from '@/components/stepper/Step1Form';
import {UserSchema} from '@/app/zod/user-zod';
import {FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step2Form from '@/components/stepper/Step2Form';
import Step3Form from '@/components/stepper/Step3Form';
import Step4Form from '@/components/stepper/Step4Form';
import { Button } from '@/components/ui/button';
import FormNavigation from '@/components/stepper/FormNavigation';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm<FormData>({
    resolver: zodResolver(UserSchema),
    mode: "all",
    delayError: 2000
  });

  const steps = [
    { title: "User Details", stepNumber: 1 },
    { title: "Work", stepNumber: 2 },
    { title: "Education & Certifications", stepNumber: 3 },
    { title: "Projects & Skills", stepNumber: 4 }
  ];


  const stepForms = [
    <Step1Form key={1}/>,
    <Step2Form key={2}/>,
    <Step3Form key={3}/>,
    <Step4Form key={4}/>
  ]

  const watchedValues = useWatch({
    control: methods.control
  });

  // Log the watched values to the console
  useEffect(() => {
    console.log("Watched values:", watchedValues);
    console.log(methods.formState.errors)
  }, [watchedValues]);

  const onSubmit = async (data: FormData) => {
    console.log('submitted')
    console.log(data);

    router.push('/dashboard')
  };

  return (
    <div className="flex flex-col justify-center w-full min-h-screen">
      <div className="flex justify-between items-center w-full h-[60px] bg-black text-white px-5 font-bold text-xl">
        <div>Logo</div>
        <div>Profile pic</div>
      </div>
      <div className="flex justify-center items-start w-full flex-grow py-4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="flex justify-center items-start flex-grow py-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex justify-center items-start w-full flex-grow flex-col px-10"
          >
            {stepForms[currentStep - 1]}
            <FormNavigation
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              totalSteps={steps.length}
              steps={steps}
            />
            {currentStep === steps.length && (
              <Button type='submit' className="bg-black text-white">
                Submit
              </Button>
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
