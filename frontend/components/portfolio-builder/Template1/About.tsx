'use client';
import { useFormContext } from 'react-hook-form';

interface HeaderProps {
  name: string;
  jobTitle: string;
  image: string;
  email: string;
  phone: string;
  profiles: Link[];
  imgUrl: string;
}
interface Link {
  network: string;
  url: string;
}
const About = () => {
  const { watch } = useFormContext();
  const personalInfo = watch('basics') as HeaderProps;
  const summary = watch('basics.summary');

  console.log(personalInfo)

  return (
      <div className='px-8 pt-10 pb-6 w-full flex justify-between items-center'>
        <div className="flex flex-col gap-2 w-7/12 justify-center">
          {(summary || personalInfo?.email || personalInfo?.phone || personalInfo?.profiles?.length > 0) && <h1 className="text-2xl font-bold">About Me</h1>}
          <p className="text-[15px] font-light">{summary}</p>
          {personalInfo?.phone && <p className='capitalize font-light text-sm flex items-center'><img className='h-4 mr-2' src="/svg/phone.png" alt="" />{personalInfo?.phone}</p>}
          {personalInfo?.email && <p className='capitalize font-light text-sm flex items-center'><img className='h-4 mr-2' src="/svg/mail.png" alt="" />{personalInfo?.email}</p>}
          <div className='mt-1 flex gap-1 text-black'>
            {personalInfo?.profiles?.map((link, index) => {
              return (link?.url && <div key={index} className="flex items-center gap-1">
                <a href={link?.url} target="_blank" className="capitalize font-semibold text-base">
                  <img className='h-6 mr-3' src={`/svg/${link?.network}.png`} alt="" />
                </a>
              </div>)
            })}
          </div>
        </div>
        {(summary || personalInfo?.email || personalInfo?.phone || personalInfo?.profiles?.length > 0) && <img src={'https://imgs.search.brave.com/xBUlwLXr1MYk6UKLJKqe8w-FM2y9RszKw6O-qQIGLv4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE0/OTAxOTUxMTczNTIt/YWEyNjdmNDdmMmQ5/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjAuMyZp/eGlkPU0zd3hNakEz/ZkRCOE1IeGxlSEJz/YjNKbExXWmxaV1I4/T0h4OGZHVnVmREI4/Zkh4OGZBPT0.jpeg'} alt='people' className='w-40 h-40 rounded-full mr-8 object-cover' />}
      </div>
  );
};

export default About;