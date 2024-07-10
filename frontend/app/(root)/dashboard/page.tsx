import React from 'react';
import RadialProfileCard from '../../../components/radialProfileCard';
import UserResume from '../../../components/dashboard/UserResume';

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
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.',
    dialogContent: <CoverLetter />,
    dialogTrigger: 'Open Cover Letter',
  },
  {
    icon: '/svg/ai-sparkle.svg',
    name: 'Generate AI Resume',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.',
    dialogContent: '',
    dialogTrigger: 'Open Resume',
  },
  {
    icon: '/svg/github.png',
    name: 'Generate Github Profile Readme',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.',
    dialogContent: '',
    dialogTrigger: 'Open Profile Analysis',
  },
  {
    icon: '/svg/github.png',
    name: 'Generate Github Repo Readme',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime at aliquid quisquam velit ducimus eos.',
    dialogContent: '',
    dialogTrigger: 'Open Job Description',
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex bg-[#DFDFDF33] px-8 py-4">
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
                  <Card className="border-2 hover:border-[#3987FB] ">
                    <CardHeader className="px-4 pt-3 pb-1">
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
                    <CardFooter className="pb-3 px-4">
                      <Dialog>
                        <DialogTrigger>{card.dialogTrigger}</DialogTrigger>

                        <DialogContent className="min-w-[75%] min-h-[75%]">
                          {card.dialogContent}
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="px-8 py-2">
        <UserResume />
      </div>
    </div>
  );
};

export default Dashboard;
