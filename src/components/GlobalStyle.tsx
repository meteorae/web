import { createGlobalStyle } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}

body {
  color: ${themeGet('colors.foreground')};
  background-color: ${themeGet('colors.background')};
  font-family: ${themeGet('fonts.normal')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
`;

export default GlobalStyle;
