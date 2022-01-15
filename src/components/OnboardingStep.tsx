import React from 'react';

interface OnboardingStepProps {
  title: string;
  titleRed: string;
  children: React.ReactNode;
  isFinalStep?: boolean;
  onClickNext: () => void;
  onClickBack?: () => void;
}

const OnboardingStep: React.FC<OnboardingStepProps> = (
  props: OnboardingStepProps,
) => {
  return (
    <div className='d-flex flex-column h-100'>
      <h1 className='text-center'>
        {props.title} <span className='text-primary'>{props.titleRed}</span>
      </h1>
      <div className='flex-fill d-flex flex-column justify-content-center align-items-center text-center'>
        {props.children}
      </div>
      <div className='d-flex justify-content-center'></div>
    </div>
  );
};

export default OnboardingStep;
