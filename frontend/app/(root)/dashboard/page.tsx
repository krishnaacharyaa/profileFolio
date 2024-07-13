import React from 'react';
import RadialProfileCard from '../../../components/radialProfileCard';
import UserResume from '@/components/dashboard/UserResume';

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
import CoverLetter from '../../../components/dashboard/CoverLetter';
import Image from 'next/image';

const cards = [
  {
    icon: '/svg/ai-sparkle.svg',
    name: 'Generate AI Cover Letter',
    description:
      'Craft personalized cover letters tailored to job descriptions using smart data extraction and customizable templates.',
    dialogContent: <CoverLetter />,
    dialogTrigger: 'Open Cover Letter',
  },
  {
    icon: '/svg/ai-sparkle.svg',
    name: 'Generate AI Resume',
    description:
      'Create professional, tailored resumes effortlessly using smart data extraction and customizable templates.',
    dialogContent: '',
    dialogTrigger: 'Open Resume',
  },
  {
    icon: '/svg/github.png',
    name: 'Generate Github Profile Readme',
    description:
      'Create a compelling, personalized README to showcase your GitHub profile and projects',
    dialogContent: '',
    dialogTrigger: 'Open Profile Analysis',
  },
  {
    icon: '/svg/github.png',
    name: 'Generate Github Repo Readme',
    description:
      'Create a compelling, personalized README to showcase your GitHub profile and projects',
    dialogContent: '',
    dialogTrigger: 'Open Job Description',
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex bg-[#DFDFDF33] w-full px-8 py-4">
        <RadialProfileCard />
        <div className="w-9/12 mx-2 flex flex-col h-full">
          <Card className="bg-[#3987FB1A]">
            <CardHeader className="py-3">
              <CardTitle className="p-0 text-lg font-normal text-[#717171]">
                Fun fact from your Profile !!
              </CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                You Are 5% Likely To Be Replaced By AI 😟
              </CardContent>
            </CardHeader>
          </Card>
          <div className="grid grid-cols-2 gap-1 my-2">
            {cards.map((card, index) => (
              <>
                <div key={index} className="rounded-lg py-1 px-1">
                  <Dialog>
                    <Card className="border-2 flex h-[20vh] hover:border-[#3987FB] ">
                      <DialogTrigger>
                        <CardHeader className="px-4 text-left pt-3 pb-1">
                          <span>
                            <Image
                              alt="Github"
                              height={100}
                              width={100}
                              className="w-6 mb-[2px]"
                              src={card.icon}
                            />
                          </span>
                          <CardTitle>{card.name}</CardTitle>
                          <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="pb-3 px-4"></CardFooter>
                      </DialogTrigger>
                    </Card>
                    <DialogContent className="min-w-[75%] min-h-[75%]">
                      {card.dialogContent}
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="px-8 py-2 w-[93vw]">
        <UserResume />
      </div>
    </div>
  );
};

export default Dashboard;
