import { Subheading } from "@/components/common/Subheading"

export const Skills = ()=>{
    return <div className="p-4">
        <Subheading text="SKILLS"/>
        <div className="py-[1px] bg-black "></div>
        <div className="flex flex-col gap-1">
        <div className="grid grid-cols-3">
            <div className=" col-span-1 text-sm font-medium ">
                Programming Language:
            </div>
            <div className=" col-span-2 text-sm">
                Java,C++,Javascript,Typescript
            </div>
        </div>
        <div className="grid grid-cols-3">
            <div className=" col-span-1 text-sm font-medium ">
                Framework:
            </div>
            <div className=" col-span-2 text-sm">
                Java,C++,Javascript,Typescript,Typescript,TypescriptTypescript
            </div>
        </div>
        <div className="grid grid-cols-3">
            <div className=" col-span-1 text-sm font-medium ">
                Database and ORM:
            </div>
            <div className=" col-span-2 text-sm">
                Java,C++,Javascript,Typescript
            </div>
        </div>
        <div className="grid grid-cols-3">
            <div className=" col-span-1 text-sm font-medium ">
                Tools & Platform:
            </div>
            <div className=" col-span-2 text-sm">
                Java,C++,Javascript,Typescript
            </div>
        </div>
        </div>
    </div>
}