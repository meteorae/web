import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string;
      foreground: string;
      primary: string;
      muted: string;
      black: string;
      white: string;
      'gray-50': string;
      'gray-100': string;
      'gray-200': string;
      'gray-300': string;
      'gray-400': string;
      'gray-500': string;
      'gray-600': string;
      'gray-650': string;
      'gray-700': string;
      'gray-800': string;
      'gray-900': string;
      button: {
        foreground: string;
        disabledForeground: string;
        background: string;
        disabledBackground: string;
        hoverBackground: string;
        selectedBackground: string;
        border: string;
        disabledBorder: string;
        primary: {
          foreground: string;
          disabledForeground: string;
          background: string;
          disabledBackground: string;
          hoverBackground: string;
          selectedBackground: string;
          border: string;
          disabledBorder: string;
        };
      };
      input: {
        background: string;
        selectedBackground: string;
        foreground: string;
        border: string;
        selectedBorder: string;
      };
    };
    space: Array<string>;
    radii: Array<string>;
    fonts: {
      normal: string;
    };
    elevation: {
      5: string;
      30: string;
    };
    modal: {
      background: string;
      padding: string;
      border: string;
    };
  }
}
