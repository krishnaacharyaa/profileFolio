'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const response = await fetch('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      props: {
        userData: null,
      },
    };
  }
}

const RadialProfileCard = ({ userData }: any) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [message, setMessage] = useState({ percentage: 0, msg: '' });
  const [completionStatus, setCompletionStatus] = useState({
    name: false,
    label: false,
    image: false,
    email: false,
    phone: false,
    url: false,
    githubUrl: false,
    education: false,
    certificates: false,
    skills: false,
  });

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

  const updateCompletionStatus = (data: any) => {
    setCompletionStatus({
      name: !!data?.basics?.name,
      label: !!data?.basics?.label,
      image: !!data?.basics?.image,
      email: !!data?.basics?.email,
      phone: !!data?.basics?.phone,
      url: !!data?.basics?.url,
      githubUrl: !!data?.projects[0]?.githubUrl,
      education: !!data?.education[0]?.institution,
      certificates: !!data?.certificates[0]?.name,
      skills: data?.projects[0]?.techStack.length > 2,
    });
  };

   useEffect(() => {
    if (userData) {
      const percentage = calculateProfileCompletion(userData);
      setCompletionPercentage(percentage);
      updateStatusMessage(percentage);
      updateCompletionStatus(userData);
    }
  }, [userData]);

  return (
    <div className="flex flex-col w-2/12 mx-3 mr-3">
      <Card>
        <CardHeader className="px-4 py-5">
          <CardTitle>Hey Suyash</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="px-3">
          <div className="flex flex-col outline-1 w-full">
            <div className="h-fit w-full relative flex mx-auto flex-col py-5 items-center bg-slate-100 rounded-xl">
              <div className="relative w-32 h-36 flex justify-center items-center">
                <div className="photo flex justify-center items-center">
                  <img
                    className="w-[90%] h-[80%] rounded-full"
                    src="https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=600"
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
                            src={completionStatus.name ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.name ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Name included
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.label ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.label ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Position specified
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.skills ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.skills ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        At least 2 skills
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.image ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.image ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Photo uploaded
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.education ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.education ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Educational Details
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.email ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.email ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Email verified
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.githubUrl ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.githubUrl ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Github link
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.url ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.url ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Url included
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.certificates ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.certificates ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        Certifications
                      </li>
                      <li className="flex items-center">
                        <span>
                          <Image
                            className="w-6 h-6 mr-1"
                            src={completionStatus.phone ? '/svg/tick.svg' : '/svg/cross.svg'}
                            width={100}
                            alt={completionStatus.phone ? 'tick' : 'cross'}
                            height={100}
                          />
                        </span>
                        PhoneNo
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
};

export default dynamic(() => Promise.resolve(RadialProfileCard), { ssr: false });
