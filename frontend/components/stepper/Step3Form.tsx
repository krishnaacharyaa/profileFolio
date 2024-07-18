import CertificateField from "@/components/Fields/CertificateField";
import EducationField from "@/components/Fields/EducationField";
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

const Step3Form= () => {
  const { formState: { errors }, getValues } = useFormContext<FormData>();

  const educationArr = errors?.education?.educationArr;
  const hasEducationErrors = Array.isArray(educationArr) &&
    educationArr.some(education =>
      education?.url?.message ||
      education?.startDate?.message ||
      education?.institution?.message ||
      education?.area?.message ||
      education?.studyType?.message ||
      education?.score?.message ||
      education?.endDate?.message ||
      education?.courses?.message
    ) || educationArr?.message;

  const certificates = errors?.education?.certificates;
  const hasCertificatesErrors = Array.isArray(certificates) &&
      certificates.some(certificate =>
        certificate?.date?.message ||
        certificate?.name?.message ||
        certificate?.url?.message ||
        certificate?.issuer?.message 
  );
  return (
    <div className='flex flex-col w-full my-6'>
      <Accordion type="multiple" className="w-full" defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
      <AccordionTrigger>
        <div className='flex w-full justify-between items-center px-4'>
        <div className='flex justify-center items-center text-2xl font-bold'>Education<span className='text-sm text-red-500'>{"*"}</span></div>
        {hasEducationErrors && <Badge variant={"destructive"}>Error</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
      <EducationField />
      </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
      <AccordionTrigger>
        <div className='flex w-full justify-between items-center px-4'>
        <div className='flex justify-center items-center text-2xl font-bold'>Certificates</div>
        {hasCertificatesErrors && <Badge variant={"destructive"}>Error</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
      <CertificateField />
      </AccordionContent>
      </AccordionItem>
      </Accordion>
    </div>
)}

export default Step3Form;
