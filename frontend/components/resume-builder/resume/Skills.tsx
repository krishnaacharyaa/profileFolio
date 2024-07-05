import { useFormContext } from "react-hook-form"

interface Skill {
    languages?: string;
    libraries?: string;
    tools?: string;
    database?: string;
}
export default function Skills() {
    const { watch } = useFormContext()
    const skills = watch("skills") as Skill

    const hasSkills = skills && (
        skills.languages ||
        skills.libraries ||
        skills.tools ||
        skills.database
    );
    return hasSkills && (
        <div className="flex flex-col gap-1 mt-2">
            {skills && (
                <h1 className='text-xl font-semibold border-b border-slate-500'>Skills</h1>
            )}
            <div className="p-3 flex flex-col gap-2">
                {
                    skills?.languages && (
                        <div className="flex">
                            <span className="text-base font-semibold w-60">Programming Languages :</span>
                            <span className="text-sm font-semibold flex-1">{skills?.languages}</span>
                        </div>
                    )
                }
                {
                    skills?.libraries && (
                        <div className="flex">
                            <span className="text-base font-semibold w-60">Libraries / Frameworks:</span>
                            <span className="text-sm font-semibold flex-1">{skills?.libraries}</span>
                        </div>
                    )
                }
                {
                    skills?.tools && (
                        <div className="flex">
                            <span className="text-base font-semibold w-60">Tools / Platform :</span>
                            <span className="text-sm font-semibold flex-1">{skills?.tools}</span>
                        </div>
                    )
                }
                {
                    skills?.database && (
                        <div className="flex">
                            <span className="text-base font-semibold w-60">Databases :</span>
                            <span className="text-sm font-semibold flex-1">{skills?.database}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
