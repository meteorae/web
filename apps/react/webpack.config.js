const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const { merge } = require('webpack-merge');

module.exports = (config) => {
  const webpackConfig = getWebpackConfig(config);

  return merge(webpackConfig, {
    module: {
      rules: [
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: '@graphql-tools/webpack-loader',
          options: {},
        },
      ],
    },
    devServer: {
      proxy: [
        {
          context: ['/query', '/image', '/library'],
          target: 'http://localhost:42000',
        },
      ],
    },
  });
};
