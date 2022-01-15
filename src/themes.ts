import { DefaultTheme } from 'styled-components';
import { lighten, darken, transparentize } from 'color2k';

import { fontStack } from './utils/theme';

const common = {
  colors: {
    primary: '#DB1C2D',
    primaryHover: '#C30E1E',
    primaryActive: '#9A1924',
    black: '#000',
    white: '#fff',
    'gray-50': '#EDF7FA',
    'gray-100': '#DDE9EC',
    'gray-200': '#BFD4D9',
    'gray-300': '#9DC6CF',
    'gray-400': '#76B0BC',
    'gray-500': '#529DAD',
    'gray-600': '#407E8C',
    'gray-650': '#36707D',
    'gray-700': '#2E606B',
    'gray-800': '#1E4148',
    'gray-900': '#112428',
  },
  space: [
    '0',
    '4px',
    '8px',
    '16px',
    '24px',
    '32px',
    '40px',
    '48px',
    '64px',
    '80px',
    '96px',
    '112px',
    '128px',
  ],
  radii: ['0', '5px', '10px', '100px'],
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600,
    extraBold: 700,
    black: 800,
  },
  fontSizes: ['10px', '12px', '16px', '20px', '25px', '31px', '39px', '48px'],
  fonts: {
    normal: fontStack(['Lato', 'sans-serif']),
  },
};

export const lightTheme: DefaultTheme = {
  ...common,
  colors: {
    ...common.colors,
    background: common.colors['gray-100'],
    foreground: '#000',
    muted: common.colors['gray-500'],
    button: {
      foreground: common.colors.black,
      disabledForeground: transparentize(common.colors.black, 0.5),
      background: common.colors['gray-200'],
      disabledBackground: transparentize(common.colors['gray-200'], 0.5),
      hoverBackground: darken(common.colors['gray-200'], 0.05),
      selectedBackground: darken(common.colors['gray-200'], 0.1),
      border: common.colors['gray-300'],
      disabledBorder: transparentize(common.colors['gray-300'], 0.5),
      primary: {
        foreground: common.colors.white,
        disabledForeground: transparentize(common.colors.white, 0.5),
        background: common.colors.primary,
        disabledBackground: transparentize(common.colors.primary, 0.5),
        hoverBackground: darken(common.colors.primary, 0.05),
        selectedBackground: darken(common.colors.primary, 0.1),
        border: darken(common.colors.primary, 0.1),
        disabledBorder: transparentize(common.colors.primary, 0.5),
      },
    },
    input: {
      background: common.colors.white,
      // TODO: This one looks like crap
      selectedBackground: darken(common.colors['gray-100'], 0.0005),
      foreground: common.colors.black,
      border: common.colors['gray-300'],
      selectedBorder: darken(common.colors['gray-300'], 0.1),
    },
  },
  elevation: {
    5: `0px 1px 5px rgba(30, 65, 72, 0.2)`,
    30: `0px 4px 30px rgba(30, 65, 72, 0.2)`,
  },
  modal: {
    background: common.colors['gray-50'],
    padding: common.space[3],
    border: common.colors['gray-300'],
  },
};

export const darkTheme: DefaultTheme = {
  ...common,
  colors: {
    ...common.colors,
    background: common.colors['gray-900'],
    foreground: '#FFF',
    muted: common.colors['gray-500'],
    button: {
      foreground: common.colors.white,
      disabledForeground: transparentize(common.colors.white, 0.5),
      background: common.colors['gray-700'],
      disabledBackground: transparentize(common.colors['gray-700'], 0.5),
      hoverBackground: lighten(common.colors['gray-700'], 0.05),
      selectedBackground: lighten(common.colors['gray-700'], 0.1),
      border: common.colors['gray-600'],
      disabledBorder: transparentize(common.colors['gray-600'], 0.5),
      primary: {
        foreground: common.colors.white,
        disabledForeground: transparentize(common.colors.white, 0.5),
        background: common.colors.primary,
        disabledBackground: transparentize(common.colors.primary, 0.5),
        hoverBackground: lighten(common.colors.primary, 0.05),
        selectedBackground: lighten(common.colors.primary, 0.1),
        border: lighten(common.colors.primary, 0.1),
        disabledBorder: transparentize(common.colors.primary, 0.5),
      },
    },
    input: {
      background: common.colors['gray-700'],
      selectedBackground: lighten(common.colors['gray-700'], 0.05),
      foreground: common.colors.white,
      border: common.colors['gray-600'],
      selectedBorder: lighten(common.colors['gray-600'], 0.05),
    },
  },
  elevation: {
    5: `0px 1px 5px #071113`,
    30: `0px 4px 30px #071113`,
  },
  modal: {
    background: common.colors['gray-800'],
    border: common.colors['gray-700'],
    padding: common.space[3],
  },
};
