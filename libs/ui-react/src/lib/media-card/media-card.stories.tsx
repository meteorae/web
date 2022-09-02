import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import MediaCard from './media-card';

const TEST_ITEM = {
  id: 1,
  title: 'Test Item',
  startDate: '2020-01-01',
  thumb: 'https://via.placeholder.com/260x390',
};

const TEST_ITEM_NO_IMAGE = {
  ...TEST_ITEM,
  thumb: null,
};

export default {
  component: MediaCard,
  decorators: [withRouter],
  args: {
    item: TEST_ITEM,
    width: 260,
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    item: {
      control: {
        type: 'object',
        options: [TEST_ITEM],
      },
    },
    width: {
      control: {
        type: 'range',
        min: 100,
        max: 240,
      },
    },
    square: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
    seen: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
  },
} as ComponentMeta<typeof MediaCard>;

const Template: ComponentStory<typeof MediaCard> = (args) => (
  <MediaCard {...args} />
);

export const Portrait = Template.bind({});
Portrait.args = {
  square: false,
  seen: false,
};

export const Square = Template.bind({});
Square.args = {
  square: true,
  seen: false,
};

export const Seen = Template.bind({});
Seen.args = {
  square: false,
  seen: true,
};

export const NoImage = Template.bind({});
NoImage.args = {
  item: TEST_ITEM_NO_IMAGE,
  square: false,
  seen: false,
};
