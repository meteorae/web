import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

import { ComponentProps } from '../../utils/types/ComponentProps';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export const ButtonPrimary = styled(ButtonBase)<ButtonBaseProps>`
  color: ${themeGet('colors.button.primary.foreground')};
  background-color: ${themeGet('colors.button.primary.background')};
  border: 1px solid ${themeGet('colors.button.primary.border')};
  box-shadow: ${themeGet('elevation.5')};

  &:hover {
    color: ${themeGet('colors.button.primary.hoverText')};
    background-color: ${themeGet('colors.button.primary.hoverBackground')};
    border-color: ${themeGet('colors.button.primary.hoverBorder')};
  }

  // focus must come before :active so that the active box shadow overrides
  &:focus {
    border-color: ${themeGet('colors.button.primary.focusBorder')};
  }

  &:active {
    background-color: ${themeGet('colors.button.primary.selectedBackground')};
  }

  &:disabled {
    color: ${themeGet('colors.button.primary.disabledForeground')};
    background-color: ${themeGet('colors.button.primary.disabledBackground')};
    border-color: ${themeGet('colors.button.primary.disabledBorder')};
  }
`;

export type ButtonPrimaryProps = ComponentProps<typeof ButtonPrimary>;
export default ButtonPrimary;
