import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { ComponentProps } from '../../utils/types/ComponentProps';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

const Button = styled(ButtonBase)<ButtonBaseProps>`
  color: ${themeGet('colors.button.foreground')};
  background-color: ${themeGet('colors.button.background')};
  border: 1px solid ${themeGet('colors.button.border')};
  box-shadow: ${themeGet('elevation.5')};

  &:hover {
    background-color: ${themeGet('colors.button.hoverBackground')};
    border-color: ${themeGet('colors.button.hoverBorder')};
  }

  // focus must come before :active so that the active box shadow overrides
  &:focus {
    border-color: ${themeGet('colors.button.focusBorder')};
  }

  &:active {
    background-color: ${themeGet('colors.button.selectedBackground')};
  }

  &:disabled {
    color: ${themeGet('colors.button.disabledForeground')};
    background-color: ${themeGet('colors.button.disabledBackground')};
    border-color: ${themeGet('colors.button.disabledBorder')};
  }
`;

export type ButtonProps = ComponentProps<typeof Button>;
export default Button;
