import { ComponentStory, ComponentMeta } from '@storybook/react';

import Login from '../../pages/Login';

export default {
  title: 'Pages/Login',
  component: Login,
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const Main = Template.bind({});
