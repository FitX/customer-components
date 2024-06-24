import type { Meta, StoryObj } from '@storybook/vue3';
import { default as FitxLabel } from './fitx-label.vue';
import { computed } from 'vue';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Form/Label',
  component: FitxLabel,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof FitxLabel>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    text: 'Label Content',
  },
  parameters: {
    docs: {
      description: {
        story: `**Usage** Currently only with Inputs.
          `,
      },
    },
  },
};

export const Overview: Story = {
  args: {
    text: 'default',
  },
  parameters: {
    docs: {},
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxLabel,
    },
    setup() {
      return {
        theme: computed(() => args.theme),
      };
    },
    template: `
      <component is="style">
        section, .demo {
          --demo-text-color: inherit;
          &:is([data-theme=dark]) {
            --demo-text-color: white;
          }

          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-block-end: 3rem;
          color: var(--demo-text-color);
          & p { margin: 0 }
          & h1 {
            flex: 1 0 100%;
            margin: 0;
          }
        }
      </component>
      <section :data-theme="theme">
        <fitx-label
          :theme="theme" modifier="disabled" text="Disabled Label" for="label-disabled" />
        <fitx-label
          :theme="theme" :error="true" text="Error Label" for="label-error" />
      </section>
    `,
  }),
};
