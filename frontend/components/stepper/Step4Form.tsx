import ProjectsField from "@/components/Fields/ProjectsField";
import SkillsField from "@/components/Fields/SkillsField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '../ui/badge';
import { useFormContext } from 'react-hook-form';
import z from "zod";
import { UserSchema } from '@/app/zod/user-zod';

type FormData = z.infer<typeof UserSchema>;

const Step4Form = () => {
  const { formState: { errors } } = useFormContext<FormData>();
  const projectsArr = errors?.projects?.projectsArr;
  const hasProjectsErrors = Array.isArray(projectsArr) &&
  projectsArr.some(project =>
    project?.name?.message ||
    project?.startDate?.message ||
    project?.endDate?.message ||
    project?.highlights?.message ||
    project?.description?.message ||
    project?.githubUrl?.message ||
    project?.techStack?.message ||
    project?.deployedUrl?.message
  ) || projectsArr?.message;

  const skills = errors?.projects?.skills;
  const hasSkillsErrors = Array.isArray(skills) &&
  skills.some(skill =>
    skill?.name?.message ||
    skill?.keywords?.message ||
    skill?.level?.message
  )|| skills?.message;
  return (
    <div className='flex flex-col w-full'>
      <Accordion type="multiple" className="w-full" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
      <AccordionTrigger>
        <div className='flex w-full justify-between items-center px-4'>
        <div className='flex justify-center items-center text-2xl font-bold'>Projects<span className='text-sm text-red-500'>{"*"}</span></div>
        {hasProjectsErrors && <Badge variant={"destructive"}>Error</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
      <ProjectsField />
      </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
      <AccordionTrigger>
        <div className='flex w-full justify-between items-center px-4'>
        <div className='flex justify-center items-center text-2xl font-bold'>Skills<span className='text-sm text-red-500'>{"*"}</span></div>
        {hasSkillsErrors && <Badge variant={"destructive"}>Error</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
      <SkillsField />
      </AccordionContent>
      </AccordionItem>
      </Accordion>
    </div>  
  )}

export default Step4Form;