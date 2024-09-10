
import type { Meta, StoryObj } from '@storybook/vue3';
import { h } from 'vue';
import { default as FitxLink } from './fitx-link.vue';
import IconArrowLeft from '@/assets/icons/arrow-left.svg';
import IconArrowRight from '@/assets/icons/arrow-right.svg';
import ContentDe from './readme.de.md?raw';
// import ContentEn from './readme.en.md?raw';
import { getMarkdownDocsTranslationBlock } from '../../../utils/docs-translation';

const ComponentDescription = getMarkdownDocsTranslationBlock(ContentDe);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Link',
  component: FitxLink,
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
    default: 'link',
  }
} satisfies Meta<typeof FitxLink>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    // text: 'This is an error message',
  },
};

export const Hover: Story = {
  args: {
    state: 'hover'
  },
};

export const Secondary: Story = {
  args: {
    modifier: 'secondary'
  },
};

export const withIconStart: Story = {
  args: {
    'icon-start': () => h(IconArrowLeft),
  },
};

export const withIconEnd: Story = {
  args: {
    'icon-end': () => h(IconArrowRight)
  },
};
