
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxSelectField } from './fitx-select-field.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

const options = [{ text: 'Item 1', demoField: 1 },{ text: 'Item 2', demoField: 2 },{ text: 'Item 3', demoField: 3 }]

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/select-field',
  component: FitxSelectField,
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
    options,
    label: 'Select Field Demo'
  }
} satisfies Meta<typeof FitxSelectField>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
  },
};

export const Selected: Story = {
  args: {
    modelValue: options[1],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Hint: Story = {
  args: {
    hint: 'Dont select Item 4',
  },
};

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'Please enter your Name',
  },
};


