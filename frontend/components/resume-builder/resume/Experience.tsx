import { Subheading } from "@/components/common/Subheading";

export const Experience = () => {
  return (
    <div className="pt-4 px-4">
      <Subheading text="EXPERIENCE" />
      <div className="py-[1px] bg-black "></div>
      <ExpItem />
      <ExpItem />
    </div>
  );
};
export const ExpItem = () => {
  return (
    <div className="py-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <div className=" font-medium">TechTOnions</div>
          <div className="text-gray-500">Software Development Engineer</div>
        </div>
        <div className=" font-medium">Jan-2024 to Present</div>
      </div>
      <div className="px-4 text-gray-700 pt-2 text-justify">
        -worked with React hooks like useEffect,UseState.-worked with React
        hooks like useEffect,UseState.-worked with React hooks like
        useEffect,UseState. -worked with React hooks like
        useEffect,UseState.-worked with React hooks like
        useEffect,UseState.-worked with React hooks like useEffect,UseState.
      </div>
    </div>
  );
};
