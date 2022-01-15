import { ComponentStory, ComponentMeta } from '@storybook/react';

import LayoutDialog from '../LayoutDialog';

export default {
  title: 'Pages/Onboarding',
  component: LayoutDialog,
} as ComponentMeta<typeof LayoutDialog>;

const Template: ComponentStory<typeof LayoutDialog> = () => (
  <LayoutDialog>
    <div>Main page content goes here</div>
  </LayoutDialog>
);

export const Main = Template.bind({});
