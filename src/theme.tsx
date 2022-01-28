import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: any) => ({
      'html, body': {
        height: '100%',
        bg: mode('gray.100', 'gray.900')(props),
      },
      '#root': {
        height: '100%',
      },
    }),
  },
});

export default theme;
