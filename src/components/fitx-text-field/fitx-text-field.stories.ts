
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxTextField } from './fitx-text-field.vue';
import IconCheckmark from '@/assets/icons/checkmark.svg';
import IconSearch from '@/assets/icons/search.svg';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';
import { h } from 'vue';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Text Field',
  component: FitxTextField,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        //story: ComponentDescription,
        component: ComponentDescription,
      },
    },
  },
  args: {
    label: 'Username'
  },
} satisfies Meta<typeof FitxTextField>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    modelValue: '',
  },
};

export const Hover: Story = {
  args: {
    state: 'hover'
  },
};

export const Focused: Story = {
  args: {
    state: 'focused'
  },
};

export const Disabled: Story = {
  args: {
    state: 'disabled',
    modelValue: 'Jon Doe'
  },
};

export const Slots: Story = {
  args: {
    label: 'Firstname',
    modelValue: 'Jane',
    'input-start': () => h(IconCheckmark),
    'input-end': '!!!',
  },
};

export const ErrorMessage: Story = {
  args: {
    label: 'Firstname',
    modelValue: 'Jane',
    'input-start': () => h(IconSearch),
    'input-end': '!!!',
    errorMessage: 'Please enter your Name',
  },
};

export const Valid: Story = {
  args: {
    label: 'Firstname',
    modelValue: 'Jane',
    isValid: true,
  },
};
