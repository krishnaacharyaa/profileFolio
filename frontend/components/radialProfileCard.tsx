import React from 'react';

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
} from "@/components/ui/dialog"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const RadialProfileCard = () => {

  let message = ''
  let color = ''
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (80 / 100) * circumference;

  const getStatus = (status: number) => {
    switch (status) {
      case 40:
        message = "Keep going!";
        color = 'red'
        break;
      case 60:
        message = "Almost there!";
        color = 'slate'
        break;
      case 80:
        message = "So close!";
        color = 'slate'
        break;
      case 100:
        message = "Ready to share";
        color = 'green'
        break;
      default:
        message = "Lots of stuff to improve";
        color = 'red'
    }
    return message
  }

  getStatus(100)

  return (
    <div className="flex flex-col w-2/12 mx-3 mr-3">
      <Card>
        <CardHeader className='px-4 py-5'>
          <CardTitle>Hey Suyash</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className='px-3'>
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
            <DialogTrigger className={`px-2 w-full tracking-tight bg-${color}-500 hover:bg-${color}-500 rounded-md py-2 text-white`}>{message}</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Good to have in Resume</DialogTitle>
                <DialogDescription>
                  <div className='flex flex-col px-3'>
                    <ul className='text-start'>
                      <li className='flex items-center'><span><Image className='w-3 mr-1' src={'/svg/cross.png'} width={100} alt='cross' height={100} /></span>2 projects</li>
                      <li className='flex items-center'><span><Image className='w-3 mr-1' src={'/svg/cross.png'} width={100} alt='cross' height={100} /></span>Work experience</li>
                      <li className='flex items-center'><span><Image className='w-3 mr-1' src={'/svg/cross.png'} width={100} alt='cross' height={100} /></span>Atleast 5 skills</li>
                      <li className='flex items-center'><span><Image className='w-3 mr-1' src={'/svg/tick.png'} width={100} alt='cross' height={100} /></span>Your photo</li>
                      <li className='flex items-center'><span><Image className='w-3 mr-1' src={'/svg/tick.png'} width={100} alt='cross' height={100} /></span>Education/Courses</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


          <Button className='w-full'>
            <span><Image width={100} height={100} alt='link' className='w-[22px] mr-2 -ml-2' src={'/svg/link.png'} /></span>Get Profile Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RadialProfileCard;