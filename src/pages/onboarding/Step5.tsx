import React from 'react';
import { motion } from 'framer-motion';
import OnboardingStep from '../../components/OnboardingStep';

interface OnboardingStep2Props {
  onClickNext: () => void;
  onClickBack: () => void;
}

const Step5: React.FC<OnboardingStep2Props> = (props: OnboardingStep2Props) => {
  return (
    <motion.div
      className='p-3 h-100'
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}>
      <OnboardingStep
        title="You're"
        titleRed="All Set"
        isFinalStep
        onClickBack={props.onClickBack}
        onClickNext={props.onClickNext}>
        <p>This is another step.</p>
      </OnboardingStep>
    </motion.div>
  );
};

export default Step5;
