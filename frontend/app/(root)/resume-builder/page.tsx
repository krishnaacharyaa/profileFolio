'use client';
import { Suspense, useEffect, useState } from 'react';
import Sidebar from '@/components/common/Sidebar';
import ResumeHeader from '@/components/resume-builder/ResumeHeader';
import ResumeView from '@/components/resume-builder/ResumeView';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import useApi from '@/hooks/useClientHook';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { toast } from 'sonner';

function PageContent() {
  const searchParams = useSearchParams();
  const resumeId = searchParams?.get('resumeId');
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;
  const { data: user, loading, error } = useApi(`/api/user/${userId}`);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

  const [currentResume, setCurrentResume] = useState<any>(null);
  const [resumeName, setResumeName] = useState<string>('');

  useEffect(() => {
    if (user && user.resumes && resumeId) {
      const foundResume = user.resumes.find((resume: any) => resume._id === resumeId);
      setCurrentResume(foundResume || null);
    }
  }, [user, resumeId]);

  useEffect(() => {
    if (user) {
      if (resumeId && currentResume) {
        setResumeName(currentResume.name || 'Resume name');
      } else {
        const userName = user?.basics?.name;
        setResumeName(userName || 'Resume name');
      }
    }
  }, [user, currentResume, resumeId]);

  const methods = useForm();

  useEffect(() => {
    if (currentResume) {
      methods.reset(currentResume);
    }
  }, [currentResume, methods]);

  const onSubmit = async (data: FieldValues) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let response;
      if (resumeId) {
        // PUT request to update existing resume
        const updatedData = { ...data, name: resumeName };
        response = await axios.put(
          `${backendUrl}/api/user/${userId}/resumes/${resumeId}`,
          updatedData,
          config
        );
      } else {
        // POST request to create new resume
        const resumeData = { ...data, name: resumeName, isDefault: false, templateId: '' };
        response = await axios.post(`${backendUrl}/api/user/${userId}/resumes`, resumeData, config);
      }

      toast.success(response.data?.message, {
        position: 'top-center',
      });
    } catch (error: any) {
      toast.error(error?.response?.data || error.message, {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="h-full px-12">
      <ResumeHeader resumeName={resumeName} setResumeName={setResumeName} />
      <hr />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="h-full">
          <div className="mt-7 flex justify-between h-full gap-8">
            <Sidebar />
            <ResumeView />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
