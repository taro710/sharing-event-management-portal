import type { Meta, StoryObj } from '@storybook/react';

import TagCheckbox from '@/components/presentations/Form/TagCheckbox/TagCheckbox';


const meta = {
  title: 'Form/TagCheckbox',
  component: TagCheckbox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TagCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'TagCheckbox',
  },
};
