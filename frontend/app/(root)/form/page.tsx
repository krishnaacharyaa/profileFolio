"use client"
import React, { useEffect, useState } from 'react';
import StepIndicator from '@/components/stepper/StepIndicator';
import Step1Form from '@/components/stepper/Step1Form';
import {UserSchema} from '@/app/zod/user-zod';
import {FormProvider, useForm, useWatch} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step2Form from '@/components/stepper/Step2Form';
import Step3Form from '@/components/stepper/Step3Form';
import Step4Form from '@/components/stepper/Step4Form';
import { Button } from '@/components/ui/button';
import FormNavigation from '@/components/stepper/FormNavigation';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import z from "zod";
interface AnyObject {
  [key: string]: any;
}

type FormData = z.infer<typeof UserSchema>



export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || "";
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1);
  const { data: session } = useSession();
  const methods = useForm<FormData>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    delayError: 1000,
  });
  const watchedValues = useWatch({
    control: methods.control
  });

  useEffect(() => {
    console.log("Watched values:", watchedValues);
    console.log(methods.formState.errors)
  }, [watchedValues]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${id}`,{ headers: {Authorization: `Bearer ${session?.user.accessToken}`}});
          if (response.status == 200) {
            const serverData:any = response.data;
            console.log(serverData)
            const newDataObject = {
              basics: {
                name: serverData.basics.name? serverData.basics.name : "",
                current_role: serverData.basics.label ? serverData.basics.label : "",
                image: serverData.basics.image ? serverData.basics.image: "",
                email: serverData.basics.email? serverData.basics.email : "",
                phone: serverData.basics.phone? serverData.basics.phone: "",
                url: serverData.basics.url? serverData.basics.url : "",
                summary: serverData.basics.summary? serverData.basics.summary :"",
                location: serverData.basics.location? serverData.basics.location : "",
                profiles: serverData.basics.profiles? serverData.basics.profiles : [],
                languages: serverData.languages? serverData.languages : [],
                interests: serverData.interests? serverData.interests : []
              },
              work: serverData.work? serverData.work : [],
              education : {
                educationArr: serverData.education? serverData.education : [],
                certificates: serverData.certificates? serverData.certificates : []
              },
              projects: {
                projectsArr: serverData.projects? serverData.projects: [],
                skills: serverData.skills? serverData.skills : []
              }
            };
            console.log(newDataObject)
            methods.reset(newDataObject)
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (session?.user.accessToken) {
      fetchData();
    }
  }, [id, session]);
  const steps = [
    { title: "User Details", stepNumber: 1 },
    { title: "Work", stepNumber: 2 },
    { title: "Education & Certifications", stepNumber: 3 },
    { title: "Projects & Skills", stepNumber: 4 }
  ];


  const stepForms = [
    <Step1Form key={1} />,
    <Step2Form key={2} />,
    <Step3Form key={3} />,
    <Step4Form key={4} />
  ]

  const onSubmit = async (data: any) => {
    console.log('submitted')
    console.log(data);
    console.log(session?.user.id);
    let newDataObject: any = {
      basics: {name: data.basics.name, image: data.basics.image, label: data.basics.current_role, phone: data.basics.phone, summary: data.basics.summary, email: data.basics.email, url: data.basics.url, location: data.basics.location, profiles: data.basics.profiles},
      work: data.work,
      education: data.education.educationArr,
      certificates: data.education.certificates,
      skills: data.projects.skills,
      languages: data.basics.languages,
      interests: data.basics.interests,
      projects: data.projects.projectsArr
    }
    const response = await axios.patch(`http://localhost:8080/api/user/${session?.user.id}`, newDataObject, {headers: {Authorization: `Bearer ${session?.user.accessToken}`}})
    console.log(response)
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

      <div className="flex justify-center  items-start flex-grow py-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex justify-center items-center w-full flex-grow flex-col px-10"
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
