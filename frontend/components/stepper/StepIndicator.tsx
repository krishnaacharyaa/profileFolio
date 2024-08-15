import React from 'react';

interface Step {
  title: string;
  stepNumber: number;
}

interface StepIndicatorInput {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorInput> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center w-4/5 bg-gray-200 py-6 px-5">
      <div className='text-2xl font-bold'>{steps[currentStep -1].title}</div>
      <div className="flex space-x-4 items-center">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`h-2 w-8 rounded-full ${currentStep === step.stepNumber
              ? 'bg-blue-500'
              : currentStep > step.stepNumber
              ?'bg-green-500'
              : 'bg-slate-500'
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
