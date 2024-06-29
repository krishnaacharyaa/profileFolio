'use client'
import { useRef } from "react";
import { BasicDetails } from "./resume/BasicDetails";
import { Projects } from "./resume/Projects";
import { Experience } from "./resume/Experience";
import { Skills } from "./resume/Skills";
import { Certifications } from "./resume/Certifications";


export const Resume = () => {
  const componentRef = useRef<any>(null)
  return (
    <div className=" bg-white shadow-md mx-16 h-[297mm] w-[220mm]  my-2 ">
      <div ref={componentRef} className="py-2 px-6">
          <BasicDetails/>
          <Projects/>
          <Experience/>
          <Skills/>
          <Certifications/>
      </div>
    </div>
  );
};
