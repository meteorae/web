import { ComponentMeta, ComponentStory } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import CardSizeSlider from './card-size-slider';

export default {
  component: CardSizeSlider,
  decorators: [withRouter],
  args: {
    defaultValue: 170,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: () => {},
  },
  argTypes: {
    as: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    onChange: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof CardSizeSlider>;

const Template: ComponentStory<typeof CardSizeSlider> = (args) => (
  <CardSizeSlider {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
