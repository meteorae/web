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
  colors: {
    gray: {
      50: '#EDF7FA',
      100: '#DDE9EC',
      200: '#BFD4D9',
      300: '#9DC6CF',
      400: '#76B0BC',
      500: '#529DAD',
      600: '#407E8C',
      700: '#2E606B',
      800: '#1E4148',
      900: '#112428',
    },
    red: {
      500: '#DB1C2D',
    },
  },
  fonts: {
    body: 'Lato, system-ui, sans-serif',
    heading: 'Vollkorn, serif',
    mono: 'Menlo, monospace',
  },
});

export default theme;
