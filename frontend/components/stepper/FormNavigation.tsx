import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useFormContext, useWatch } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { FormMessage } from '../ui/form';
import { Divide } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Steps[];
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
}) => {
  const [notExp, setNotExp] = useState<boolean>();
  const [errValidation, setErrValidation] = useState<boolean>();
  const { control, formState: { errors }, trigger, setValue, getValues, clearErrors } = useFormContext();
  const workFields = useWatch({
    control,
    name: "work", // Assuming "work" is the name of the work experience section
  });

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStepFields = async (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return await trigger("basics");
      case 2:
        return await trigger("work");
      case 3:
        return await trigger("education");
      case 4:
        return await trigger("projects");
      default:
        return false;
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateStepFields(currentStep);
    console.log(notExp);
    console.log(isStepValid);

    const isWorkFilled = workFields && Object.values(workFields).some(field => field);
    if(currentStep != 2 && isStepValid){
      setCurrentStep(currentStep + 1);
    }else if(currentStep == 2){
      if(notExp){
        setCurrentStep(currentStep + 1);
        setValue('work', [])
        setNotExp(!notExp);
        clearErrors('work')
        setErrValidation(false);
      }else if(isStepValid && !notExp && getValues('work').length != 0){
        setCurrentStep(currentStep + 1);
        setErrValidation(false);
      }
      else{
        setErrValidation(true);
        console.log(`Step ${currentStep} validation failed. Cannot proceed. ${JSON.stringify(errors)}`);
      }
    }else{
      setErrValidation(true);
      console.log(`Step ${currentStep} validation failed. Cannot proceed. ${JSON.stringify(errors)}`);
    }
  };

  return (
    <div className='flex flex-col items-center w-full'>
      {currentStep === 2 && (
        <div className="flex justify-center items-center w-full m-4">
          <Checkbox
            id="terms"
            onCheckedChange={(checked) => {
              console.log("Checkbox changed: ", checked);
              setNotExp(checked === true);
            }}
          />
          <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {"I've no Experience yet"}
          </Label>
        </div>
      )}
      {getValues('work') && currentStep == 2 && errValidation && getValues('work').length == 0 && !notExp && <div className='text-sm'>Either check that you have no work experience or add fields for your work experience</div>}
      <div className="flex justify-between items-center w-full">
        <Button
          type="button"
          className="bg-black text-white"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          Back
        </Button>
        <Button
          type="button"
          className="bg-black text-white"
          onClick={handleNext}
          disabled={currentStep === totalSteps}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;