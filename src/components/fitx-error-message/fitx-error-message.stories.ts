import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxErrorMessage } from './fitx-error-message.vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Error',
  component: FitxErrorMessage,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    modifier: { control: 'radio', options: ['errorMessage', 'supportingText'] },
    // showIcon: { control: 'boolean' },
  },
} satisfies Meta<typeof FitxErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Error: Story = {
  args: {
    modifier: 'errorMessage',
    text: 'This is an error message',
  },
};

export const SupportingText: Story = {
  args: {
    modifier: 'supportingText',
    text: 'I am an emotional support text',
  },
};

export const ErrorWithoutIcon: Story = {
  args: {
    modifier: 'errorMessage',
    text: 'This is an error message without an icon',
    showIcon: false,
  },
};

export const SupportingTextWithoutIcon: Story = {
  args: {
    modifier: 'supportingText',
    text: 'I am an emotional support text without an icon ...so sad',
    showIcon: false,
  },
};
