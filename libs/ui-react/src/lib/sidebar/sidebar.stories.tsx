import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import Sidebar from './sidebar';

export default {
  component: Sidebar,
  decorators: [withRouter],
  args: {
    libraries: [
      { id: '1', name: 'Library 1', type: 'movie' },
      { id: '2', name: 'Library 2', type: 'image' },
      { id: '3', name: 'Library 3', type: 'music' },
      { id: '4', name: 'Library 4', type: 'tv' },
    ],
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    collapsed: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
    libraries: {
      control: {
        type: 'array',
        options: [
          { id: '1', name: 'Library 1', type: 'movie' },
          { id: '2', name: 'Library 2', type: 'image' },
          { id: '3', name: 'Library 3', type: 'music' },
          { id: '4', name: 'Library 4', type: 'tv' },
        ],
      },
    },
  },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => (
  <Sidebar {...args} />
);

export const Expanded = Template.bind({});
Expanded.args = {
  collapsed: false,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  collapsed: true,
};
