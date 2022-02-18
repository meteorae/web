const restrictedGlobals = require('confusing-browser-globals');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    //'plugin:jsdoc/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jest-formatting/strict',
    'plugin:testing-library/react',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:lodash/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:json/recommended',
    'plugin:storybook/recommended',
    'plugin:storybook/csf-strict',
    'plugin:storybook/addon-interactions',
    'plugin:eslint-comments/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['**/__generated__/**'],
  rules: {
    'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'jest/consistent-test-it': ['error'],
    'import/no-named-as-default': 'off',
    // TODO: Fix this
    'import/no-unresolved': 'off',
  },
  overrides: [
    {
      files: ['*.graphql'],
      parser: '@graphql-eslint/eslint-plugin',
      plugins: ['@graphql-eslint'],
      rules: {
        '@graphql-eslint/known-type-names': 'error',
      },
      parserOptions: {
        schema: './src/schema.json',
      },
    },
  ],
};
