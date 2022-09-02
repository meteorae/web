import { create } from '@storybook/theming';

export default create({
  base: 'dark',

  colorPrimary: '#DB1C2D',
  colorSecondary: '#DB1C2D',

  // UI
  appBg: '#221C1F',
  appContentBg: '#44373F',
  appBorderColor: '#A48F9C',
  appBorderRadius: 5,

  // Text colors
  textColor: '#EDE9EB',
  textInverseColor: '#221C1F',

  // Toolbar default and active colors
  barTextColor: '#EDE9EB',
  barSelectedColor: '#DB1C2D',
  barBg: '#44373F',

  // Form colors
  inputBg: '#66535E',
  inputBorder: '#886E7E',
  inputTextColor: '#EDE9EB',
  inputBorderRadius: 5,

  brandTitle: 'Meteorae',
  brandUrl: 'https://meteorae.tv',
  brandImage:
    'https://raw.githubusercontent.com/meteorae/meta/master/assets/logo.svg',
  brandTarget: '_self',
});
