import CertificateField from '@/components/Fields/CertificateField';
import EducationField from '@/components/Fields/EducationField';
import { useFormContext } from 'react-hook-form';
import z from 'zod';
import { UserSchema } from '@/app/zod/user-zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

type FormData = z.infer<typeof UserSchema>;

const Step3Form = () => {
  const {
    formState: { errors },
    getValues,
  } = useFormContext<FormData>();

  const educationArr = errors?.education?.educationArr;
  const hasEducationErrors =
    (Array.isArray(educationArr) &&
      educationArr.some(
        (education) =>
          education?.url?.message ||
          education?.startDate?.message ||
          education?.institution?.message ||
          education?.area?.message ||
          education?.studyType?.message ||
          education?.score?.message ||
          education?.endDate?.message ||
          education?.courses?.message
      )) ||
    educationArr?.message;

  const certificates = errors?.education?.certificates;
  const hasCertificatesErrors =
    Array.isArray(certificates) &&
    certificates.some(
      (certificate) =>
        certificate?.date?.message ||
        certificate?.name?.message ||
        certificate?.url?.message ||
        certificate?.issuer?.message
    );
  return (
    <div className="flex flex-col my-6 w-4/5">
      <Tabs defaultValue="education" className="w-full">
        <TabsList>
          <TabsTrigger value="education" className={`${hasEducationErrors && "bg-red-200"}`}>Education <span className='text-red-500 mx-[1px]'>*</span></TabsTrigger>
          <TabsTrigger value="certificates" className={`${hasCertificatesErrors && "bg-red-200"}`}>Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="education"><EducationField /></TabsContent>
        <TabsContent value="certificates"><CertificateField /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Step3Form;
