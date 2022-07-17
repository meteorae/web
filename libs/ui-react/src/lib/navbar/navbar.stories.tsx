import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import Navbar from './navbar';

export default {
  component: Navbar,
  decorators: [withRouter],
  args: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleCollapsed: () => {},
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    toggleCollapsed: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
