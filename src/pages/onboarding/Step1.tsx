import React from 'react';
import { motion } from 'framer-motion';
import OnboardingStep from '../../components/OnboardingStep';

interface OnboardingStep1Props {
  onClickNext: () => void;
}

const Step1: React.FC<OnboardingStep1Props> = (props: OnboardingStep1Props) => {
  return (
    <motion.div
      className='p-3 h-100'
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}>
      <OnboardingStep title="Welcome to" titleRed="Meteorae" onClickNext={props.onClickNext}>
        <p>
          Before you start exploring your content,
          <br /> we need to set some things up.
        </p>
      </OnboardingStep>
    </motion.div>
  );
};

export default Step1;
