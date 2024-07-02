import React from 'react';

interface Step {
  title: string;
  stepNumber: number;
}

interface StepIndicatorInput {
  steps: Step[];
  currentStep: number;
}


const StepIndicator:React.FC<StepIndicatorInput> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-center items-center w-3/4">
      {steps.map((step, index) => (
        <React.Fragment key={step.stepNumber}>
          <div className={`flex items-center ${currentStep === step.stepNumber ? 'text-teal-600' : 'text-gray-600'}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep === step.stepNumber ? 'bg-teal-600 text-white' : 'border-2 border-gray-300'}`}>
              {step.stepNumber}
            </div>
            <div className="ml-2">{step.title}</div>
          </div>
          {index < steps.length - 1 && <div className="pb-[5px] mx-6 text-2xl">{">"}</div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default StepIndicator;
