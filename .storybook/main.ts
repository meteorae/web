module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    'storybook-addon-performance/register',
    '@whitespace/storybook-addon-html',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
