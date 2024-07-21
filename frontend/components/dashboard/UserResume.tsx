'use client';

import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoMdAdd } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useState } from 'react';

interface ResumeProps {
  resumes: any[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UserResume({ resumes, setRefresh }: ResumeProps) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
  const [resumeList, setResumeList] = useState(resumes);
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;

  const handleResumeClick = (id: string) => {
    router.push(`/resume-builder?resumeId=${id}`);
  };

  const handleNewResume = () => {
    router.push('/resume-builder');
  };

  const handlePortfolio = () => {
    router.push("/portfolio-builder")
  }

  const handleDelete = async (resumeId: string) => {
    try {

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.delete(`${backendUrl}/api/user/${userId}/resumes/${resumeId}`, config)
      if (response.status === 200) {
        const newResumes = resumeList.filter((resume: any) => resume._id !== resumeId);
        setResumeList(newResumes);
        setRefresh(true);

        toast.success(response.data?.message, {
          position: 'top-center'
        });
      }
    } catch (error: any) {
      toast.error(error?.response?.data || error.message, {
        position: 'top-center'
      })
    }
  }

  return (
    <div className="w-full mx-3 px-6 py-4 md:py-4 lg:py-4">
      <h2 className="text-3xl font-bold tracking-tight mb-8 md:mb-10 lg:mb-12">My Collections</h2>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        <div>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Resume</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {resumes && resumes.length > 0 && (
              resumes.map((resume: any, index) => (
                <div key={index}>
                  <div className="relative overflow-hidden rounded-lg border p-2 shadow-lg group hover:shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 ">
                    <img
                      src="/svg/portfolio.jpeg"
                      alt="Resume Image 1"
                      width={300}
                      height={400}
                      className="object-cover w-full aspect-[3/4] cursor-pointer"
                      onClick={() => handleResumeClick(resume?._id)}
                    />
                    <div className="flex mx-3 justify-between">
                      <span className='text-sm capitalize'>{resume?.name}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Image
                            width={100}
                            height={100}
                            alt="menu"
                            className="h-5 w-5"
                            src={'/svg/dots.png'}
                          />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Make Default</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleDelete(resume?._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))
            )}
            {resumes.length < 3 && (
              <div
                onClick={handleNewResume}
                className="relative overflow-hidden cursor-pointer rounded-lg border p-2 shadow-lg group hover:shadow-xl flex justify-between items-center"
              >
                <p className="mx-auto">
                  <IoMdAdd className="text-2xl" />
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='justify-self-end' onClick={handlePortfolio}>
          <h3 className="text-xl font-semibold mb-4 md:mb-6">Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6 lg:gap-8">
            <div className="relative w-[12vw] justify-self-end overflow-hidden rounded-lg p-2 shadow-lg group hover:shadow-xl ">
              <Link href="#" className="absolute z-10" prefetch={false}>
                <span className="sr-only">View</span>
              </Link>
              <img
                src="/svg/portfolio.jpeg"
                alt="Portfolio Image 1"
                width={300}
                height={400}
                className="object-cover w-full aspect-[3/4]"
              />
              <div className="flex mx-3 justify-between">
                <h3>Name</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      width={100}
                      height={100}
                      alt="menu"
                      className="h-5 w-5"
                      src={'/svg/dots.png'}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
