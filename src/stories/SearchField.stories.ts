// Import компонента и типов
import { SearchFieldUI } from '@/shared/ui/search-fieldUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/SearchField',
  component: SearchFieldUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSearchField: Story = {
  args: {
    onReset: () => {}
  }
};
