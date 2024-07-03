// import { Subheading } from "";

import { Subheading } from "@/components/common/Subheading";

export const Projects = () => {
  return (
    <div className="pt-4 px-4">
      <Subheading text="PROJECTS"/>
      <div className="py-[1px] bg-black "></div>
      <div className="flex flex-col gap-1">
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
      </div>
    </div>
  );
};

const ProjectItem = () => {
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <div className="text-lg">
            Airbnb{" "}
            <a
              href="http://github.com/PatelYash7"
              target="_blank"
              className="text-gray-600 text-sm"
            >
              -Link
            </a>
          </div>
          <div className="text-sm font-medium text-gray-500">
            <span>Reactjs,</span>
            <span>TailwindCss,</span>
            <span>Javascript,</span>
          </div>
        </div>
        <div className="px-2 text-gray-700 text-justify">
          -worked with React hooks like useEffect,UseState.-worked with React
          hooks like useEffect,UseState.-worked with React hooks like
          useEffect,UseState. -worked with React hooks like
          useEffect,UseState.-worked with React hooks like
          useEffect,UseState.-worked with React hooks like useEffect,UseState.
        </div>
      </div>
    </>
  );
};
