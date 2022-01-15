import styled, { css } from 'styled-components';
import {
  MaxWidthProps,
  MinWidthProps,
  variant,
  WidthProps,
} from 'styled-system';
import { themeGet } from '@styled-system/theme-get';

const sizeVariants = variant({
  prop: 'size',
  variants: {
    small: {
      minHeight: '28px',
      px: 2,
      py: '3px',
      fontSize: 0,
      lineHeight: '20px',
    },
    large: {
      px: 2,
      py: '10px',
      fontSize: 3,
    },
  },
});

export type StyledWrapperProps = {
  disabled?: boolean;
  hasLeadingVisual?: boolean;
  hasTrailingVisual?: boolean;
  block?: boolean;
  contrast?: boolean;
  validationStatus?: 'error' | 'warning';
  size?: 'small' | 'large';
} & WidthProps &
  MinWidthProps &
  MaxWidthProps;

export const textInputHorizPadding = '12px';

const TextInputWrapper = styled.span<StyledWrapperProps>`
  min-height: 32px;
  font-size: ${themeGet('fontSizes.2')};
  line-height: 20px;
  color: ${themeGet('colors.input.foreground')};
  vertical-align: middle;
  background-color: ${themeGet('colors.input.background')};
  background-repeat: no-repeat; // Repeat and position set for form states (success, error, etc)
  background-position: right 8px center; // For form validation. This keeps images 8px from right and centered vertically.
  border: 1px solid ${themeGet('colors.input.border')};
  border-radius: ${themeGet('radii.1')};
  outline: none;
  box-shadow: ${themeGet('elevation.5')};
  cursor: text;
  display: inline-flex;
  align-items: stretch;
  & > :not(:last-child) {
    margin-right: ${themeGet('space.2')};
  }

  ${(props) =>
    css`
      padding-left: ${props.hasLeadingVisual ? textInputHorizPadding : 0};
      padding-right: ${props.hasTrailingVisual ? textInputHorizPadding : 0};

      > input,
      > select {
        padding-left: ${!props.hasLeadingVisual ? textInputHorizPadding : 0};
        padding-right: ${!props.hasTrailingVisual ? textInputHorizPadding : 0};
      }
    `}

  .TextInput-icon {
    align-self: center;
    color: ${themeGet('colors.foreground.muted')};
    flex-shrink: 0;
  }

  &:focus-within {
    background-color: ${themeGet('colors.input.selectedBackground')};
    border-color: ${themeGet('colors.input.selectedBorder')};
  }

  ${(props) =>
    props.contrast &&
    css`
      background-color: ${themeGet('colors.canvas.inset')};
    `}

  ${(props) =>
    props.disabled &&
    css`
      color: ${themeGet('colors.primer.foreground.disabled')};
      background-color: ${themeGet('colors.input.disabledBg')};
      border-color: ${themeGet('colors.border.default')};
    `}

  ${(props) =>
    props.validationStatus === 'error' &&
    css`
      border-color: ${themeGet('colors.danger.emphasis')};
      &:focus-within {
        border-color: ${themeGet('colors.danger.emphasis')};
        box-shadow: ${themeGet('elevation.5')};
      }
    `}

  ${(props) =>
    props.validationStatus === 'warning' &&
    css`
      border-color: ${themeGet('colors.attention.emphasis')};
      &:focus-within {
        border-color: ${themeGet('colors.attention.emphasis')};
        box-shadow: ${themeGet('elevation.5')};
      }
    `}

    ${(props) =>
    props.block &&
    css`
      width: 100%;
      display: flex;
    `}

    // Ensures inputs don' t zoom on mobile but are body-font size on desktop
    @media (min-width: ${themeGet('breakpoints.1')}) {
    font-size: ${themeGet('fontSizes.1')};
  }
  ${sizeVariants}
`;

export default TextInputWrapper;
