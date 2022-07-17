import { getJestProjects } from '@nrwl/jest';

const esModules = ['lodash-es'].join('|');

export default {
  projects: getJestProjects(),
  moduleNameMapper: {
    '^lodash-es/(.*)$': 'lodash/$1',
  },
};
