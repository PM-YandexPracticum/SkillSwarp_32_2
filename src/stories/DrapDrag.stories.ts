import type { Meta, StoryObj } from '@storybook/react-vite';
import { DrapDragUI } from '@/shared/ui/drap-dragUI';

const meta = {
  title: 'Example/DrapDrag',
  component: DrapDragUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof DrapDragUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {};
