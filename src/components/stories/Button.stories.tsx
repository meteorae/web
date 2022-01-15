import { Meta } from '@storybook/react';
import { ButtonStyleProps } from 'styled-system';

import { Button, ButtonPrimary } from '../Button';
import { ButtonBaseProps } from '../Button/ButtonBase';

type StrictButtonStyleProps = ButtonStyleProps & {
  variant: ButtonBaseProps['variant'];
};

export default {
  title: 'Composite components/Button',
  argTypes: {
    variant: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large'],
      },
    },
  },
} as Meta;

export const defaultButton = (args: StrictButtonStyleProps) => (
  <Button {...args}>Default Button</Button>
);
export const primaryButton = (args: StrictButtonStyleProps) => (
  <ButtonPrimary {...args}>Primary Button</ButtonPrimary>
);
export const disabledButton = (args: StrictButtonStyleProps) => {
  const props = { disabled: true, ...args };
  return <Button {...props}>Disabled Button</Button>;
};
