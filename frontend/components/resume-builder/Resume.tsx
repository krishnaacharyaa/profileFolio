'use client'
import { BasicDetails } from "./resume/BasicDetails";
import { Projects } from "./resume/Projects";
import { Experience } from "./resume/Experience";
import { Skills } from "./resume/Skills";
import { Certifications } from "./resume/Certifications";
import { Education } from "./resume/Education";


export const Resume = () => {
  return (
    <div className=" bg-white shadow-md text-sm mx-16 h-[297mm] w-[220mm]  my-2 ">
      <div className="py-2 px-6">
          <BasicDetails/>
          <Projects/>
          <Experience/>
          <Skills/>
          <Education/>  
          <Certifications/>
      </div>
    </div>
  );
};
