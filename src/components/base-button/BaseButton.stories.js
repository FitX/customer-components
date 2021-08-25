import { TemplateWrapper } from '../../../.storybook/custom-templates';
import BaseButton, {
  modifier,
} from './BaseButton.vue';

export default {
  title: 'Components/Buttons/BaseButton',
  component: BaseButton,
  argTypes: {
    tag: {
      options: ['button', 'a'],
      control: {
        type: 'select',
      },
    },
    modifier: {
      options: modifier,
      control: {
        type: 'multi-select',
      },
    },
    isDarkMode: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {},
  },
};

const baseTemplate = () => `<base-button v-bind="args">{{ backgroundColor }}
    <template v-if="args?.slotProps?.default" #default>{{ args.slotProps.default }}</template>
    </base-button>`;

const Template = (args, context) => TemplateWrapper({
  args,
  context,
  components: { BaseButton },
  template: baseTemplate(),
});

export const DefaultButton = Template.bind({});
DefaultButton.args = {
  tag: 'button',
  text: 'Button',
};

export const PrimaryAsLink = Template.bind({});
PrimaryAsLink.args = {
  tag: 'a',
  text: 'Primary as Link',
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  modifier: 'disabled',
  text: 'Primary disabled',
};

export const PrimaryNativeDisabled = Template.bind({});
PrimaryNativeDisabled.args = {
  disabled: 'disabled',
  text: 'Primary disabled',
};

export const WithSlot = Template.bind({});
WithSlot.args = {
  slotProps: {
    default: 'Text in Slot',
  },
};

export const Secondary = Template.bind({});
Secondary.args = {
  modifier: 'secondary',
  text: 'Secondary',
};

export const SecondaryDisabled = Template.bind({});
SecondaryDisabled.args = {
  modifier: ['secondary', 'disabled'],
  text: 'Secondary disabled',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  modifier: 'tertiary',
  text: 'Tertiary',
};

export const TertiaryDisabled = Template.bind({});
TertiaryDisabled.args = {
  modifier: ['tertiary', 'disabled'],
  text: 'Tertiary disabled',
};

const PrimaryGroupItems = [
  {
    args: {
      tag: 'button',
      text: 'Primary Button',
    },
  },
  {
    args: {
      tag: 'button',
      disabled: true,
      text: 'Primary disabled',
    },
  },
];

export const PrimaryGroup = () => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { PrimaryGroupItems };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="display: flex; gap: 1rem">
      <base-button v-for="(button, index) in PrimaryGroupItems" :kex="index" v-bind="button.args" />
    </div>
  `,
});

const TemplateGroup = (group) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { BaseButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return {
      group,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <div style="display: flex; gap: 1rem">
      <base-button v-for="(button, index) in group" :kex="index" v-bind="button.args" />
    </div>
  `,
});

const groupTemplate = (group) => (args) => TemplateWrapper({
  args,
  additionalSetup: {
    group,
  },
  components: { BaseButton },
  template: `
    <div style="display: flex; gap: 1rem">
      <base-button
        v-for="(button, index) in group"
        :key="index"
        isDarkMode
        v-bind="button.args" />
    </div>
  `,
});

export const PrimaryButtonsTest = groupTemplate([
  {
    args: {
      tag: 'button',
      text: 'Primary Button',
    },
  },
  {
    args: {
      tag: 'button',
      disabled: true,
      text: 'Primary disabled',
    },
  },
]);

export const PrimaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      text: 'Primary Button',
    },
  },
  {
    args: {
      tag: 'button',
      disabled: true,
      text: 'Primary disabled',
    },
  },
]);

export const SecondaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      text: 'Secondary Button',
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'secondary',
      disabled: true,
      text: 'Secondary disabled',
    },
  },
]);

export const TertiaryButtons = () => TemplateGroup([
  {
    args: {
      tag: 'button',
      modifier: 'tertiary',
      text: 'Tertiary Button',
    },
  },
  {
    args: {
      tag: 'button',
      modifier: 'tertiary',
      disabled: true,
      text: 'Tertiary disabled',
    },
  },
]);
