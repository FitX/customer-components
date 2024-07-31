import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxAutoSuggest } from './fitx-auto-suggest.vue';
import { IconExclamationmark, IconClear } from '@/components';

const getSVGComponent = (mayBeAComponent: any) => {
  if (mayBeAComponent?.type === 'svg') return mayBeAComponent;
  return mayBeAComponent?.render();
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/AutoSuggest',
  component: FitxAutoSuggest,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxAutoSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    label: 'Auto Suggest',
  },
};

export const WithIconStart: Story = {
  args: {
    label: 'Input',
    'icon-start': getSVGComponent(IconExclamationmark),
  },
};

export const WithIconEnd: Story = {
  args: {
    label: 'Input',
    'icon-end': getSVGComponent(IconClear),
  },
};

export const WithIcons: Story = {
  args: {
    label: 'With Slots',
    'icon-start': getSVGComponent(IconExclamationmark),
    'icon-end': getSVGComponent(IconClear),
  },
};

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    errorMessage: 'This Field has a Error',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Input Disabled',
    disabled: true,
  },
};

export const DisabledModifierFilled: Story = {
  args: {
    label: 'Input Disabled',
    modelValue: 'Lorem Ipsum', // some Content
    modifier: 'disabled',
  },
};
