'use client';
import React, { useEffect, useState, Suspense } from 'react';
import StepIndicator from '@/components/stepper/StepIndicator';
import Step1Form from '@/components/stepper/Step1Form';
import { UserSchema } from '@/app/zod/user-zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Step2Form from '@/components/stepper/Step2Form';
import Step3Form from '@/components/stepper/Step3Form';
import Step4Form from '@/components/stepper/Step4Form';
import { Button } from '@/components/ui/button';
import FormNavigation from '@/components/stepper/FormNavigation';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { error } from 'console';

interface AnyObject {
  [key: string]: any;
}
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
type FormData = z.infer<typeof UserSchema>;

function FormComponent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [notExp, setNotExp] = useState(false);
  const id = searchParams?.get('id') || '';
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [serverData, setServerData] = useState();
  const { data: session } = useSession();
  const methods = useForm<FormData>({
    resolver: zodResolver(UserSchema),
    mode: 'onChange',
    delayError: 1000
  });
  
  const storedvalue = useWatch({ control: methods.control});
  useEffect(() => {
    if(localStorage.getItem("localValue") != null){
      const resetValue = localStorage.getItem("localValue")|| "";
      methods.reset(JSON.parse(resetValue))
    }
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('localValue', JSON.stringify(storedvalue));
    }, 700); // 700ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [storedvalue]);

  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      if (id) {
        try {
          const response = await axios.get(`${backendUrl}/api/user/${id}`, {
            headers: { Authorization: `Bearer ${session?.user.accessToken}` },
          });
          if (response.status == 200) {
            setServerData(response.data);
            const serverData: any = response.data;
            console.log(serverData);
            const newDataObject = {
              basics: {
                name: serverData.basics.name ? serverData.basics.name : '',
                current_role: serverData.basics.label ? serverData.basics.label : '',
                image: serverData.basics.image ? serverData.basics.image : '',
                email: serverData.basics.email ? serverData.basics.email : '',
                phone: serverData.basics.phone ? serverData.basics.phone : '',
                url: serverData.basics.url ? serverData.basics.url : '',
                summary: serverData.basics.summary ? serverData.basics.summary : '',
                location: serverData.basics.location ? serverData.basics.location : '',
                profiles: serverData.basics.profiles ? serverData.basics.profiles : [],
                languages: serverData.languages ? serverData.languages : [],
                interests: serverData.interests ? serverData.interests : [],
              },
              work: serverData.work ? serverData.work : [],
              education: {
                educationArr: serverData.education ? serverData.education : [],
                certificates: serverData.certificates ? serverData.certificates : [],
              },
              projects: {
                projectsArr: serverData.projects ? serverData.projects : [],
                skills: serverData.skills ? serverData.skills : [],
              },
            };
            console.log(newDataObject);
            methods.reset(newDataObject);
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
    { title: 'User Details', stepNumber: 1 },
    { title: 'Work', stepNumber: 2 },
    { title: 'Education & Certifications', stepNumber: 3 },
    { title: 'Projects & Skills', stepNumber: 4 },
  ];

  const stepForms = [
    <Step1Form key={1} />,
    <Step2Form key={2} notExp={notExp}/>,
    <Step3Form key={3} />,
    <Step4Form key={4} />,
  ];

  const onSubmit = async (data: any) => {
    console.log('submitted');
    console.log(data);
    console.log(session?.user.id);
    let newDataObject: any = {
      basics: {
        name: data.basics.name,
        image: data.basics.image,
        label: data.basics.current_role,
        phone: data.basics.phone,
        summary: data.basics.summary,
        email: session?.user.email,
        location: data.basics.location,
        profiles: data.basics.profiles,
      },
      work: data.work,
      education: data.education.educationArr,
      certificates: data.education.certificates,
      skills: data.projects.skills,
      languages: data.basics.languages,
      interests: data.basics.interests,
      projects: data.projects.projectsArr,
      resumes: [],
    };
    const response = await axios.patch(
      `${backendUrl}/api/user/${session?.user.id}`,
      newDataObject,
      {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      }
    );
    console.log(response);
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen overflow-hidden my-6">
      <div className="flex justify-center items-start w-3/4">
        <StepIndicator steps={steps} currentStep={currentStep} />
      </div>

      <div className="flex justify-center items-start py-4 w-3/4 min-h-screen mb-2">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex justify-between items-center overflow-y-visible flex-col w-full min-h-screen-75"
          >
            {stepForms[currentStep - 1]}
            <div className="flex gap-4 flex-col justify-center items-start mt-6 w-4/5">
            <FormNavigation
              notExp={notExp}
              setNotExp={setNotExp}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              totalSteps={steps.length}
              steps={steps}
            />
            {currentStep === steps.length && (
              <Button type="submit" className="bg-black text-white" onClick={() => {
                if(!methods.formState.isValid){
                  toast.error(
                    'Please fill all the fields with appropriate input',
                    {
                      position: 'bottom-right',
                      duration: 4000,
                    }
                  );
                }else{
                  localStorage.removeItem('localValue')
                  setIsLoading(true);
                }
              }}>
                {isLoading ? "Loading.." : "Submit"}
              </Button>
            )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormComponent />
    </Suspense>
  );
}
