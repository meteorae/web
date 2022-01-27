import { extendTheme } from '@chakra-ui/react';

const customTheme = {
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: {
      'html, body': {
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    },
  },
};

const theme = extendTheme(customTheme);

export default theme;
