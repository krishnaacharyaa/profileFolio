import { Subheading } from '@/components/common/Subheading';

interface Education {
  instituition: string;
  url: string;
  degree: string;
  area: string;
  score: string;
  duration:string;
}

export const Education = () => {
  return (
    <div className="px-4 pt-2">
      <Subheading text="EDUCATION" />
      <div className="py-[1px] bg-black"></div>
      <div className='pt-1'>
        <div className="flex justify-between font-medium">
          <div>Government Engineering College,Rajkot</div>
          <div>June-2020 to June-2024</div>
        </div>
        <div className="flex justify-between">
          <div>Bachelor's in Computer Engineering</div>
          <div>9.17 CGPA</div>
        </div>
      </div>
    </div>
  );
};
