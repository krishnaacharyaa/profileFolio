import CertificateField from "@/components/Fields/CertificateField";
import EducationField from "@/components/Fields/EducationField";

const Step3Form= () => {
  return (
    <div className='flex flex-col w-full my-4'>
      <EducationField />
      <CertificateField />
    </div>
)}

export default Step3Form;
