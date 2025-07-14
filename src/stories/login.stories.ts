import { Login } from '@/pages/login';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Example/Login',
  component: Login,
  tags: ['autodocs'],
  parameters: {
     layout: 'fullscreen'
  }
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultLogin: Story = {
  args: {
    onDone: () => {}
  }
};
