
"use client"; 
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
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
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
//import { calculateProfileCompletion, fetchUserData } from '@/utils/profileCompletionCheck';
// get API endpoint BE
export const fetchUserData = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/user'); 
    
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null; 
  }
};

export const calculateProfileCompletion = (userData: any) => {
  let completedFields = 0;
  const totalFields = 10; // Adjust based on your criteria

  // Check if specific fields are filled
  if (userData.basics?.name) completedFields++; // name
  if (userData.basics?.label) completedFields++; // label Role
  if (userData.basics?.image) completedFields++; // image
  if (userData.basics?.email) completedFields++; // Email
  if (userData.basics?.phone) completedFields++; // phone
  if (userData.basics?.url) completedFields++; // url
  if (userData.projects[0]?.githubUrl) completedFields++; // github
  if (userData.education[0]?.institution) completedFields++; //  education 
  if (userData.certificates[0]?.name) completedFields++; //  certificates
  if (userData.projects[0].techStack.length > 2) completedFields++; //  skills

  return (completedFields / totalFields) * 100;
};

const RadialProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [message, setMessage] = useState({ percentage: 0, msg: '' });
  //const [color, setColor] = useState('');

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (completionPercentage / 100) * circumference;

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
      const percentage = calculateProfileCompletion(data);
      setCompletionPercentage(percentage);
      updateStatusMessage(percentage);
    };
    getUserData();
  }, []);

  const updateStatusMessage = (percentage: number) => {
    let msg = '';
    //let color = 'blue';
    
    if (percentage == 100) {
      msg = 'Share It Now';
      //color = 'green';
    }else if (percentage >= 80 && percentage!=100) {
      msg = 'Almost there';
      //color = 'green';
    } else if (percentage >= 60) {
      msg = 'So close!';
    } else if (percentage >= 40) {
      msg = 'Keep going!';
    } else {
      msg = 'Lots of stuff to improve';
    }
  
    setMessage({ percentage, msg });
    //setColor(color);
  };
  

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
          <DialogTrigger className="px-2 w-full bg-white hover:bg-white rounded-md py-4 text-black-900 border border-blue-500 flex items-center justify-between">
  <span className="flex items-center justify-center bg-yellow-300 rounded-full h-8 w-8 mr-2">
    <img src="/svg/Warning.png" alt="Warning" className="h-5 w-5" />
  </span>
  <span className="flex-1 flex items-center justify-between">
    <span>
      <strong>{message.percentage}%</strong>&nbsp;<span className="text-sm font-medium">{message.msg}</span>
    </span>
    <img src="/svg/RightArrow.png" alt="arrow" className="w-4 h-4 ml-2"/>
  </span>
</DialogTrigger>



            <DialogContent>
              <DialogHeader>
                <DialogTitle className='pl-1'>Good to have in Resume</DialogTitle>
                <DialogDescription>
                  <div className='flex flex-col px-3'>
                    <ul className='text-start'>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/cross.svg'} width={100} alt='cross' height={100} /></span>At least 2 projects</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/cross.svg'} width={100} alt='cross' height={100} /></span>Work experience</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/cross.svg'} width={100} alt='cross' height={100} /></span>At least 5 skills</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Your photo</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Educational Details</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Email verified</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Github link</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>LinkedIn</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Certifications</li>
                      <li className='flex items-center'><span><Image className='w-6 h-6 mr-1' src={'/svg/tick.svg'} width={100} alt='cross' height={100} /></span>Course Work</li>
                    </ul>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button className='px-4 py-8 w-full bg-blue-600 hover:bg-green-600'>
            <span><Image width={100} height={100} alt='link' className='w-[22px] mr-2 -ml-2' src={'/svg/link.png'} /></span>Get Profile Link
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default dynamic(() => Promise.resolve(RadialProfileCard), { ssr: false });
