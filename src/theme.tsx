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
      50: '#FCE8EA',
      100: '#F7C0C5',
      200: '#F2979F',
      300: '#EC6E7A',
      400: '#E74654',
      500: '#E21D2E',
      600: '#B51725',
      700: '#88111C',
      800: '#5A0C13',
      900: '#2D0609',
    },
  },
  fonts: {
    body: 'Lato, system-ui, sans-serif',
    heading: 'Vollkorn, serif',
    mono: 'Menlo, monospace',
  },
});

export default theme;
