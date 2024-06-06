import type { Meta, StoryObj } from '@storybook/vue3';
// import { fn } from '@storybook/test';
import FitxSwitch from './fitx-switch.vue';
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'components/Switch',
  component: FitxSwitch,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {},
  parameters: {},
} satisfies Meta<typeof FitxSwitch>;

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
        story: `**@TODO**.
          `,
      },
    },
  },
  args: {
    label: 'Switch',
    modelValue: false,
  },
};

export const Overview: Story = {
  args: {
    label: '',
    modelValue: false,
    // size: 'default',
  },
  parameters: {
    docs: {},
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxSwitch,
    },
    setup() {
      const trueValue = ref(true);
      const falseValue = ref(false);
      return {
        theme: args.theme,
        trueValue,
        falseValue,
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
        <h1>Switch Unselected</h1>
        <fitx-switch :theme="theme" label="Unselected" v-model="falseValue" />
        <fitx-switch :theme="theme" label="Unselected Hover" fake-modifier="hover" v-model="falseValue" />
        <fitx-switch :theme="theme" label="Unselected Focus" fake-modifier="focus" v-model="falseValue" />
      </section>

      <section :data-theme="theme">
        <h1>Switch Selected</h1>
        <fitx-switch :theme="theme" label="Selected" v-model="trueValue" />
        <fitx-switch :theme="theme" label="Selected Hover" fake-modifier="hover" v-model="trueValue" />
        <fitx-switch :theme="theme" label="Selected Focus" fake-modifier="focus" v-model="trueValue" />
      </section>

      <section :data-theme="theme">
        <h1>Switch Disabled Unselected</h1>
        <fitx-switch :theme="theme" label="Disabled Unselected" v-model="falseValue" disabled />
        <fitx-switch :theme="theme" label="Disabled Unselected Hover" fake-modifier="hover" v-model="falseValue" disabled />
        <fitx-switch :theme="theme" label="Disabled Unselected Focus" fake-modifier="focus" v-model="falseValue" disabled />
      </section>

      <section :data-theme="theme">
        <h1>Switch Disabled Selected</h1>
        <fitx-switch :theme="theme" label="Disabled Selected" v-model="trueValue" disabled />
        <fitx-switch :theme="theme" label="Disabled Selected Hover" fake-modifier="hover" v-model="trueValue" id="test1" disabled />
        <fitx-switch :theme="theme" label="Disabled Selected Focus" fake-modifier="focus" v-model="trueValue" id="test2" disabled />
      </section>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: '',
    modelValue: false,
    // size: 'default',
  },
  parameters: {
    docs: {},
    controls: {
      disable: true,
    },
  },
  render: (args) => ({
    components: {
      FitxSwitch,
    },
    setup() {
      const trueValue = ref(true);
      const falseValue = ref(false);
      return {
        theme: args.theme,
        trueValue,
        falseValue,
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
        <h1>Modifier Disabled</h1>
        <fitx-switch :theme="theme" label="Unselected" v-model="falseValue" modifier="disabled" />
        <fitx-switch :theme="theme" label="Unselected Hover" fake-modifier="hover" v-model="falseValue" modifier="disabled" />
        <fitx-switch :theme="theme" label="Unselected Focus" fake-modifier="focus" v-model="falseValue" modifier="disabled" />
      </section>

      <section :data-theme="theme">
        <h1>Attribute Disabled</h1>
        <fitx-switch :theme="theme" label="Selected" v-model="trueValue" disabled />
        <fitx-switch :theme="theme" label="Disabled Selected Hover" fake-modifier="hover" v-model="trueValue" disabled />
        <fitx-switch :theme="theme" label="Disabled Selected Focus" fake-modifier="focus" v-model="trueValue" disabled />
      </section>
    `,
  }),
};
