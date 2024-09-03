
import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxButton } from './fitx-button.vue';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/WIP/Button',
  component: FitxButton,
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
} satisfies Meta<typeof FitxButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    default: 'Klick mich',
  },
};

export const Slots: Story = {
  args: {
    default: 'blubb',
    'icon-start': '(:',
    'icon-end': '!!!'
  },
};

export const Slotti: Story = {
  slots: {
    default: 'foo'
  },
  args: {
  },
};
