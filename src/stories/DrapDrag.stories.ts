import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropDrag } from '@/widgets/drop-drag';

const meta = {
  title: 'Example/DrapDrag',
  component: DropDrag,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof DropDrag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {};
