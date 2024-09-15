import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext, useWatch } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { FormMessage } from '../ui/form';
import { Divide } from 'lucide-react';
import { toast } from 'sonner';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Steps[];
  notExp: boolean;
  setNotExp: React.Dispatch<React.SetStateAction<boolean>>;
}

type Steps = {
  title: string;
  stepNumber: number;
};

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  setCurrentStep,
  steps,
  notExp,
  setNotExp
}) => {
  const [errValidation, setErrValidation] = useState<boolean>();
  const {
    control,
    formState: { errors },
    trigger,
    getValues,
    clearErrors,
  } = useFormContext();
  const workFields = useWatch({
    control,
    name: 'work', // Assuming "work" is the name of the work experience section
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStepFields = async (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return await trigger('basics');
      case 2:
        return await trigger('work');
      case 3:
        return await trigger('education');
      case 4:
        return await trigger('projects');
      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateStepFields(currentStep);

    const isWorkFilled = workFields && Object.values(workFields).some((field) => field);
    if (currentStep != 2 && isStepValid) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep == 2) {
      if (notExp) {
        setCurrentStep(currentStep + 1);
        setNotExp(!notExp);
        clearErrors('work');
        setErrValidation(false);
      } else if (isStepValid && !notExp && getValues('work').length != 0) {
        setCurrentStep(currentStep + 1);
        setErrValidation(false);
      } else if (!isStepValid && !notExp && getValues('work').length != 0) {
        setErrValidation(false);
        console.log(
          `Step ${currentStep} validation failed. Cannot proceed. ${JSON.stringify(errors)}`
        );
      } else {
        setErrValidation(true);
        toast.warning(
          'Either check that you have no work experience or add fields for your work experience',
          {
            position: 'bottom-right',
            duration: 4000,
          }
        );
      }
    } else {
      setErrValidation(true);
      console.log(
        `Step ${currentStep} validation failed. Cannot proceed. ${JSON.stringify(errors)}`
      );
      toast.error(
        'Please fill all the fields with appropriate input',
        {
          position: 'bottom-right',
          duration: 4000,
        }
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-start w-full">
      {currentStep === 2 && (
        <div className={`flex justify-start items-center w-full mb-4 ${getValues('work') && getValues('work').length != 0 ? "invisible" : ""}`}>
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => {
              setNotExp(checked === true);
            }}
            checked={notExp}
            className='mx-2'
          />
          <Label
            htmlFor="terms"
            className="text-sm mx-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {"I've no Experience yet"}
          </Label>
        </div>
      )}
      <div className="flex justify-between items-center gap-4 w-full">
        <Button
          type="button"
          className={`bg-black text-white ${currentStep == 1 ? "invisible": ""}`}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          type="button"
          className={`bg-black text-white ${currentStep === totalSteps ? "invisible": ""}`}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
