import SentryWebpackPlugin from '@sentry/webpack-plugin';
import { ESLINT_MODES, whenProd } from '@craco/craco';
import type { CracoConfig } from '@craco/craco';
import VERSION from './src/utils/version';
import path from 'path';

const cracoConfig: CracoConfig = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: {
      add: [
        ...whenProd(
          () => [
            new SentryWebpackPlugin({
              authToken: process.env.SENTRY_AUTH_TOKEN,
              org: 'meteorae',
              project: 'react',
              release: VERSION,
              include: '.',
              ignore: ['node_modules', 'webpack.config.js'],
            }),
            'append',
          ],
          [],
        ),
      ],
    },
  },
};

export default cracoConfig;
