import React, { useEffect } from 'react';
import { useLocation, Routes, Route, useNavigate } from 'react-router-dom';

import LayoutDialog from '../components/LayoutDialog';
import Step1 from './onboarding/Step1';
import Step2 from './onboarding/Step2';
import Step3 from './onboarding/Step3';
import Step4 from './onboarding/Step4';
import Step5 from './onboarding/Step5';

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = React.useState(1);

  function stepBackward() {
    setStep(step - 1);
  }

  function stepForward() {
    setStep(step + 1);
  }

  useEffect(() => {
    navigate(`/onboarding/step-${step}`);
  }, [step, navigate]);

  return (
    <LayoutDialog>
      <Routes location={location} key={location.pathname}>
        <Route path='step-1' element={<Step1 onClickNext={stepForward} />} />
        <Route
          path='step-2'
          element={
            <Step2 onClickBack={stepBackward} onClickNext={stepForward} />
          }
        />
        <Route
          path='step-3'
          element={
            <Step3 onClickBack={stepBackward} onClickNext={stepForward} />
          }
        />
        <Route
          path='step-4'
          element={
            <Step4 onClickBack={stepBackward} onClickNext={stepForward} />
          }
        />
        <Route
          path='step-5'
          element={
            <Step5 onClickBack={stepBackward} onClickNext={stepForward} />
          }
        />
      </Routes>
    </LayoutDialog>
  );
}

export default Home;
