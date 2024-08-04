'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { calculateProfileCompletion } from '@/utils/profileCompletionCheck';
import { useSession } from 'next-auth/react';
import useApi from '@/hooks/useClientHook';

interface UserData {
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: {
      address: string;
      postalCode: string;
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    name: string;
    position: string;
    url: string;
    startDate: string;
    summary: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    url: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
    score: string;
    courses: string[];
  }>;
  certificates: Array<{
    name: string;
    date: string;
    issuer: string;
    url: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
    keywords: string[];
  }>;
  projects: Array<{
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
    githubUrl: string;
    deployedUrl: string;
    techStack: string[];
  }>;
}

export default function RadialProfileCard() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [message, setMessage] = useState({ percentage: 0, msg: '' });
  const { data, loading, error } = useApi(`/api/user/${session?.user?.id}`);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionPercentage / 100) * circumference;

  const updateStatusMessage = (percentage: number) => {
    let msg = '';
    if (percentage === 100) {
      msg = 'Share It Now';
    } else if (percentage >= 80 && percentage !== 100) {
      msg = 'Almost there';
    } else if (percentage >= 60) {
      msg = 'So close!';
    } else if (percentage >= 40) {
      msg = 'Keep going!';
    } else {
      msg = 'Lots of stuff to improve';
    }
    setMessage({ percentage, msg });
  };

  useEffect(() => {
    if (data) {
      setUserData(data);
      const percentage = calculateProfileCompletion(data);
      setCompletionPercentage(percentage);
      updateStatusMessage(percentage);
    }
  }, [data]);

  return (
    <div className="flex flex-col w-2/12 mx-3 mr-3">
      <Card>
        <CardHeader className="px-4 py-5">
          <CardTitle>Hey {userData?.basics?.name || 'User'}</CardTitle>
          <CardDescription>{userData?.basics?.label || 'Your position'}</CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <div className="flex flex-col outline-1 w-full">
            <div className="h-fit w-full relative flex mx-auto flex-col py-5 items-center bg-slate-100 rounded-xl">
              <div className="relative w-32 h-36 flex justify-center items-center">
                <div className="photo flex justify-center items-center">
                  <img
                    className="w-[90%] h-[80%] rounded-full"
                    src={
                      userData?.basics?.image ||
                      'https://t4.ftcdn.net/jpg/00/65/77/27/240_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
                    }
                    alt="Person's Photo"
                  />
                </div>
                <svg viewBox="0 0 36 36" className="circle-svg w-[100%] h-[100%] relative">
                  <path
                    className="circle-bg"
                    d={`M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                  />
                  <path
                    className="circle"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={offset}
                    d={`M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831`}
                  />
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 px-3">
          <Dialog>
            {message.percentage === 100 ? (
              <button className="px-2 w-full bg-white rounded-md py-4 text-black-900 border border-blue-500 flex items-center justify-between hover:bg-green-700">
                <span className="flex items-center justify-center bg-green-500 rounded-full h-8 w-8 mr-2">
                  <img src="/svg/tick.svg" alt="Tick" className="h-8 w-8" />
                </span>
                <span className="flex-1 flex items-center justify-between">
                  <span>
                    <strong>{message.percentage}%</strong>&nbsp;
                    <span className="text-sm font-medium">{message.msg}</span>
                  </span>
                  <img src="/svg/RightArrow.png" alt="arrow" className="w-4 h-4 ml-2" />
                </span>
              </button>
            ) : (
              <DialogTrigger className="px-2 w-full bg-white hover:bg-white rounded-md py-4 text-black-900 border border-blue-500 flex items-center justify-between">
                <span className="flex items-center justify-center bg-yellow-300 rounded-full h-8 w-8 mr-2">
                  <img src="/svg/Warning.png" alt="Warning" className="h-5 w-5" />
                </span>
                <span className="flex-1 flex items-center justify-between">
                  <span>
                    <strong>{message.percentage}%</strong>&nbsp;
                    <span className="text-sm font-medium">{message.msg}</span>
                  </span>
                  <img src="/svg/RightArrow.png" alt="arrow" className="w-4 h-4 ml-2" />
                </span>
              </DialogTrigger>
            )}
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="pl-1">Good to have in Resume</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col px-3">
                    <ul className="text-start">
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics?.name ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics?.name ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Name included
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics?.label ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics?.label ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Position specified
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={
                              userData?.skills && userData.skills.length > 0
                                ? '/svg/tick.svg'
                                : '/svg/cross.svg'
                            }
                            width={100}
                            alt={userData?.skills && userData.skills.length > 0 ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        At least 2 skills
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics.image ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics.image ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Photo uploaded
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={
                              userData?.education && userData.education.length > 0
                                ? '/svg/tick.svg'
                                : '/svg/cross.svg'
                            }
                            width={100}
                            alt={
                              userData?.education && userData.education.length > 0
                                ? 'tick'
                                : 'cross'
                            }
                            height={100}
                          />
                        </span>
                        Educational Details
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics.email ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics.email ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Email verified
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={
                              userData?.projects && userData.projects[0].githubUrl
                                ? '/svg/tick.svg'
                                : '/svg/cross.svg'
                            }
                            width={100}
                            alt={
                              userData?.projects && userData.projects[0].githubUrl
                                ? 'tick'
                                : 'cross'
                            }
                            height={100}
                          />
                        </span>
                        Github link
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics.url ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics.url ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Url included
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={
                              userData?.certificates && userData.certificates.length > 0
                                ? '/svg/tick.svg'
                                : '/svg/cross.svg'
                            }
                            width={100}
                            alt={
                              userData?.certificates && userData.certificates.length > 0
                                ? 'tick'
                                : 'cross'
                            }
                            height={100}
                          />
                        </span>
                        Certifications
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={userData?.basics.phone ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={userData?.basics.phone ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Phone Number
                      </li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button className="px-4 py-8 w-full bg-blue-600 hover:bg-blue-800">
            <span>
              <Image
                width={100}
                height={100}
                alt="link"
                className="w-[22px] mr-2 -ml-2"
                src={'/svg/link.png'}
              />
            </span>
            Get Profile Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
