import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxLoading from './fitx-loading.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Loading',
  component: FitxLoading,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxLoading>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `fitx-loading are used when retrieving data or performing slow computations, and help to notify users that loading is processing`,
      },
    },
  },
};
