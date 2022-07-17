/* eslint-disable */
export default {
  displayName: 'ui-react',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/ui-react',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
