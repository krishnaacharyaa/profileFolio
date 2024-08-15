import ProjectsField from '@/components/Fields/ProjectsField';
import SkillsField from '@/components/Fields/SkillsField';
import { useFormContext } from 'react-hook-form';
import z from 'zod';
import { UserSchema } from '@/app/zod/user-zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type FormData = z.infer<typeof UserSchema>;

const Step4Form = () => {
  const {
    formState: { errors },
  } = useFormContext<FormData>();
  const projectsArr = errors?.projects?.projectsArr;
  const hasProjectsErrors =
    (Array.isArray(projectsArr) &&
      projectsArr.some(
        (project) =>
          project?.name?.message ||
          project?.startDate?.message ||
          project?.endDate?.message ||
          project?.highlights?.message ||
          project?.description?.message ||
          project?.githubUrl?.message ||
          project?.techStack?.message ||
          project?.deployedUrl?.message
      )) ||
    projectsArr?.message;

  const skills = errors?.projects?.skills;
  const hasSkillsErrors =
    (Array.isArray(skills) &&
      skills.some(
        (skill) => skill?.name?.message || skill?.keywords?.message || skill?.level?.message
      )) ||
    skills?.message;
  return (
    <div className="flex flex-col my-6 w-4/5">
      <Tabs defaultValue="projects" className="w-full p-2">
        <TabsList>
          <TabsTrigger value="projects" className={`${hasProjectsErrors && "bg-red-200"}`}>Projects <span className='text-red-500 mx-[1px]'>*</span></TabsTrigger>
          <TabsTrigger value="skills" className={`${hasSkillsErrors && "bg-red-200"}`}>Skills <span className='text-red-500 mx-[1px]'>*</span></TabsTrigger>
        </TabsList>
        <TabsContent value="projects"><ProjectsField /></TabsContent>
        <TabsContent value="skills"><SkillsField /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Step4Form;
