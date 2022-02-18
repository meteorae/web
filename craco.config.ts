import { ESLINT_MODES, whenProd } from '@craco/craco';
import SentryWebpackPlugin from '@sentry/webpack-plugin';
import path from 'path';
import VERSION from './src/utils/version';

const cracoConfig = {
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
          ],
          [],
        ),
      ],
    },
  },
};

export default cracoConfig;
