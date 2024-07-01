import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RadialProfileCard = () => {
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (80 / 100) * circumference;

  return (
    <div className="flex flex-col w-2/12 mx-2 mr-3">
      <Card>
        <CardHeader>
          <CardTitle>Hey Suyash</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col outline-1 w-full">
            <div className="h-fit w-56 relative flex flex-col py-5 items-center bg-slate-100 rounded-xl">
              <div className="relative w-32 h-32 flex justify-center items-center">
                <div className="photo flex justify-center items-center">
                  <img
                    className="w-[90%] h-[90%] rounded-full"
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
              <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button variant="destructive">warning 80% almost there &gt;</Button>

          <Button>
            <span className="material-symbols-outlined mr-2">link</span>Get Profile Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RadialProfileCard;
