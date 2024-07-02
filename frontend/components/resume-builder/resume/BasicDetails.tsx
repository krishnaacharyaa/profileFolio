import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const BasicDetails = ()=>{
    const { watch, getValues } = useFormContext();
    const [personalInfo, setPersonalInfo] = useState({
        name: '',
        jobTitle: '',
        email: '',
        phone: '',
    });
    // useEffect to reduce the number of re-renders
    useEffect(() => {
        setPersonalInfo({
            name: getValues('personalInfo.name'),
            jobTitle: getValues('personalInfo.jobTitle'),
            email: getValues('personalInfo.email'),
            phone: getValues('personalInfo.phone'),
        })
        const subscription = watch((values) => {
            setPersonalInfo({
                name: values.personalInfo.name,
                jobTitle: values.personalInfo.jobTitle,
                email: values.personalInfo.email,
                phone: values.personalInfo.phone,
            });
        }, ['name', 'jobTitle', 'email', 'phone']);

        return () => subscription.unsubscribe();
    }, [watch]);

  return <div className="flex flex-col">
    <div className="text-3xl text-center font-medium">{personalInfo.name}</div>
    <div className="text-center text-sm font-light">{personalInfo.jobTitle}</div>
    <div className="flex justify-center text-sm font-light">
        <div className=" border-r-2 border-gray-500 px-1">{personalInfo.email}</div>
        <div className="px-1 border-r-2 border-gray-500">{personalInfo.phone}</div>
        <div  className="border-r-2 border-gray-500 px-1">
           <a href="http://www.github.com/PatelYash7" target="_blank" rel="noopener noreferrer">
                {watch('personalInfo.links.0.social')}
           </a>
        </div>
        <div  className="px-1">
            <a href="http://www.linkedin.com/in/yash-patel-86666b1b9" target="_blank" rel="noopener noreferrer">
                {watch('personalInfo.links.1.social')}
           </a>
        </div>
    </div>
  </div>
}