import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: never) => ({
      'html, body': {
        bg: mode('gray.100', 'gray.900')(props),
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      },
      '#root': {
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
    }),
  },
});

export default theme;
