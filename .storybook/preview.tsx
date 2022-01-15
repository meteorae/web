import { addDecorator } from '@storybook/react';
import { withPerformance } from 'storybook-addon-performance';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { normalize } from 'styled-normalize';

import { darkTheme, lightTheme } from '../src/themes';

addDecorator(withPerformance);

// Set global theme styles for each story
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

// Only remove padding for multi-theme view grid
const GlobalStyleMultiTheme = createGlobalStyle`
  body {
    padding: 0 !important;
  }
`;

// Duo theme view, this can be extended for more themes
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;
`;

// Instead of global theme, only theme wrapper for each story
const ThemedSectionStyle = styled.div`
  ${normalize}

  color: ${themeGet('colors.foreground')};
  background-color: ${themeGet('colors.background')};
  font-family: ${themeGet('fonts.normal')};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  padding: 1rem;
`;

export const globalTypes = {
  colorMode: {
    name: 'Color mode',
    description: 'Color mode (light, dark, all)',
    defaultValue: 'light',
    toolbar: {
      icon: 'paintbrush',
      // array of colorMode items
      items: ['light', 'dark', 'all'],
      showName: true,
    },
  },
};

// context.globals.X references items in globalTypes
const withThemeProvider = (Story, context) => {
  if (context.globals.colorMode === 'all') {
    return (
      <Wrapper>
        <GlobalStyleMultiTheme />
        <ThemeProvider theme={lightTheme}>
          <ThemedSectionStyle>
            <Story {...context} />
          </ThemedSectionStyle>
        </ThemeProvider>
        <ThemeProvider theme={darkTheme}>
          <ThemedSectionStyle>
            <div id='html-addon-root'>
              <Story {...context} />
            </div>
          </ThemedSectionStyle>
        </ThemeProvider>
      </Wrapper>
    );
  }

  return (
    <ThemeProvider
      theme={context.globals.colorMode === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div id='html-addon-root'>
        <Story {...context} />
      </div>
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider, withPerformance];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  html: {
    root: '#html-addon-root',
    removeEmptyComments: true,
  },
};
