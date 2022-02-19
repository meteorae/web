import { ESLINT_MODES } from '@craco/craco';
import path from 'path';

const cracoConfig = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

export default cracoConfig;
