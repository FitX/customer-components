
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxToast } from './fitx-toast.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Toast',
  component: FitxToast,
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
} satisfies Meta<typeof FitxToast>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Success: Story = {
  args: {
    type: 'success',
    text: 'Großartige Arbeit heute!'
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    text: 'Du hast keine Zugriffsberechtigung.'
  },
};
