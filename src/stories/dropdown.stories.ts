// Import компонента и типов
import { DropdownUI } from '@/shared/ui/dropdownUI';
import type { Meta, StoryObj } from '@storybook/react-vite';

// Метаданные истории
const meta: Meta = {
  title: 'Example/Dropdown',
  component: DropdownUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Английский язык', value: 'english' },
 // { label: 'Русский язык', value: 'russian' },
  //{ label: 'Французский язык', value: 'french' },
];

// Рендер-проп для отображения опций
const renderOptions = (props: { filter: string }) => {
  const filteredOptions =
    props.filter !== ''
      ? options.filter(option => option.label.includes(props.filter))
      : options;

  return filteredOptions.map((opt, index) => (
    `<li key=${index}>${opt.label}</li>`
  ));
};

export const DefaultCheckbox: Story = {
  args:{
    value: [{ name: 'Английский язык', id: '1' }],
    withFilter:false, 
    isMultiSelect:false, 
    placeholder:'Категория',
    children: renderOptions
  }
};
