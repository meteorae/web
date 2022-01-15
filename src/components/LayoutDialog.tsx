import React from 'react';
import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

export const FullPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FakeDialogContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: ${themeGet('radii.2')};
  background-color: ${themeGet('modal.background')};
  border: 1px solid ${themeGet('modal.border')};
  box-shadow: ${themeGet('elevation.30')};
  padding: ${themeGet('modal.padding')};
`;

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const LayoutDialog: React.FC<OnboardingLayoutProps> = (
  props: OnboardingLayoutProps,
) => {
  return (
    <FullPageContainer>
      <FakeDialogContainer>{props.children}</FakeDialogContainer>
    </FullPageContainer>
  );
};

export default LayoutDialog;
