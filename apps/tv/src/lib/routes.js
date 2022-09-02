import { LinkManually, LinkWithMeteorae, Welcome } from '../pages';

export default {
  boot: () => {
    // TODO: Get token here and set logged in/linked state.
    return new Promise((resolve) => {
      resolve();
    });
  },
  root: () => {
    return new Promise((resolve) => {
      // TODO: Check for authentication here.
      resolve('welcome');
    });
  },
  routes: [
    {
      path: 'welcome',
      component: Welcome,
    },
    {
      path: 'link-with-meteorae',
      component: LinkWithMeteorae,
    },
    {
      path: 'link-manually',
      component: LinkManually,
    },
  ],
};
