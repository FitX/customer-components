import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxButton from './fitx-button.vue';
import { ref } from 'vue'
import { buttonStates } from '@/types'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Button',
  component: FitxButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    modifier: { control: 'multi-select', options: buttonStates },
  },
  args: {
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof FitxButton>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    modifier: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    modifier: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    modifier: 'tertiary',
  },
};

export const Quaternary: Story = {
  args: {
    modifier: 'quaternary',
  },
};

export const Overview: Story = {
  args: {
    // size: 'default',
  },
  parameters: {
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxButton,
    },
    setup() {
      const demoStyles = 'display: flex; gap: 1rem; margin-block-end: 1rem';
      return {
        demoStyles,
      };
    },
    template: `
      <section :style="demoStyles">
        <h1>Primary</h1>
        <fitx-button modifier="primary">Primary</fitx-button>
        <fitx-button modifier="primary" fake-modifier="hover">Primary (hover|focus|active)</fitx-button>
        <fitx-button :modifier="['primary', 'disabled']" fake-modifier="hover">Primary disabled</fitx-button>
      </section>

      <section :style="demoStyles">
        <h1>Secondary</h1>
        <fitx-button modifier="secondary">Secondary</fitx-button>
        <fitx-button modifier="secondary" fake-modifier="hover">Secondary (hover|focus|active)</fitx-button>
        <fitx-button :modifier="['secondary', 'disabled']" fake-modifier="hover">Secondary disabled</fitx-button>
      </section>

      <section :style="demoStyles">
        <h1>Tertiary</h1>
        <fitx-button modifier="tertiary">Tertiary</fitx-button>
        <fitx-button modifier="tertiary" fake-modifier="hover">Tertiary (hover|focus|active)</fitx-button>
        <fitx-button :modifier="['tertiary', 'disabled']" fake-modifier="hover">Tertiary disabled</fitx-button>
      </section>

      <section :style="demoStyles">
        <h1>Quaternary</h1>
        <fitx-button modifier="quaternary">Quaternary</fitx-button>
        <fitx-button modifier="quaternary" fake-modifier="hover">Quaternary (hover|focus|active)</fitx-button>
        <fitx-button :modifier="['quaternary', 'disabled']" fake-modifier="hover">Quaternary disabled</fitx-button>
      </section>
    `
  })
};
