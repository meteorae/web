import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  styles: {
    global: (props: never) => ({
      '*': {
        scrollbarColor: `${mode(
          'rgb(136, 110, 126)',
          'rgb(200, 188, 196)',
        )(props)} transparent`,
      },
      '*::-webkit-scrollbar': {
        width: '14px',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundClip: 'padding-box',
        backgroundColor: mode(
          'rgb(136, 110, 126)',
          'rgb(200, 188, 196)',
        )(props),
        border: '3px solid transparent',
        borderRadius: '8px',
        minHeight: '50px',
      },
      '*::-webkit-scrollbar-track': {
        background: 'initial',
      },
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
      100: '#EDE9EB',
      200: '#DBD2D7',
      300: '#C8BCC4',
      400: '#B6A5B0',
      500: '#A48F9C',
      600: '#886E7E',
      700: '#66535E',
      800: '#44373F',
      900: '#221C1F',
    },
    red: {
      100: '#FBE2E4',
      200: '#F4A8AE',
      300: '#EC6D79',
      400: '#E9505E',
      500: '#DB1C2D',
      600: '#C01827',
      700: '#89111C',
      800: '#520A11',
      900: '#1B0306',
    },
    orange: {
      500: '#FF8427',
    },
    green: {
      500: '#8CD867',
    },
  },
  fonts: {
    body: 'Lato, system-ui, sans-serif',
    heading: 'Vollkorn, serif',
    mono: 'Menlo, monospace',
  },
});

export default theme;
