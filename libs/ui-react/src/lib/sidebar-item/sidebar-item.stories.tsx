import { mdiHome } from '@mdi/js';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import SidebarItem from './sidebar-item';

export default {
  component: SidebarItem,
  decorators: [withRouter],
  args: {
    children: 'Sidebar Item',
    to: '/',
    icon: mdiHome,
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    children: {
      control: {
        type: 'text',
        name: 'Label',
      },
    },
    to: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof SidebarItem>;

const Template: ComponentStory<typeof SidebarItem> = (args) => (
  <SidebarItem {...args} />
);

export const Expanded = Template.bind({});
Expanded.args = {};
