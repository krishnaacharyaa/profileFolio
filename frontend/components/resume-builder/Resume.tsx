'use client'
import BasicDetails from "./resume/BasicDetails";
import Projects from "./resume/Projects";
import Experience from "./resume/Experience";
import Skills from "./resume/Skills";
import Certifications from "./resume/Certifications";
import Education from "./resume/Education";
import Summary from "./resume/Summary";
import Languages from "./resume/Languages";


export const Resume = () => {
  return (
    <div className=" bg-white shadow-md text-sm mx-16 h-[297mm] w-[220mm]  my-2 ">
      <div className="h-full w-full overflow-hidden flex flex-col px-8 py-6">
        <BasicDetails />
        <Summary />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Languages />
        <Certifications />
      </div>
    </div>
  );
};
